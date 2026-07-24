// Procedural city. Everything derives deterministically from the world seed:
// grid layout, street names, buildings, rooms, prose, loot tables, survivors.
// Only player-caused changes (visits, searches, unlocked doors) and moving
// actors (zombies) live in mutable state.

import { rngFor } from './rng.js';
import {
  TABLES, STREET_FIRST, STREET_KIND_H, STREET_KIND_V, DISTRICTS, BUILDINGS,
  ROOM_DESC, SURVIVOR_FIRST, SURVIVOR_TRAIT, SURVIVOR_ROLES, fill, pickFill,
} from './data/text.js';

export const CITY_W = 13;
export const CITY_H = 13;
export const START = { x: 6, y: 6 };

// ---- layout -------------------------------------------------------------

export function inBounds(x, y) {
  return x >= 0 && x < CITY_W && y >= 0 && y < CITY_H;
}

export function baseType(x, y) {
  const ex = x % 2 === 0, ey = y % 2 === 0;
  if (ex && ey) return 'intersection';
  if (ex) return 'street_v';
  if (ey) return 'street_h';
  return 'interior';
}

export function district(x, y) {
  if (x >= 4 && x <= 8 && y >= 4 && y <= 8) return 'downtown';
  if (x < 6 && y < 6) return 'residential';
  if (x >= 6 && y < 6) return 'commercial';
  if (x < 6) return 'industrial';
  return 'oldtown';
}

export function streetNameV(seed, x) {
  const r = rngFor(seed, 'streetV', x);
  return `${r.pick(STREET_FIRST)} ${r.pick(STREET_KIND_V)}`;
}
export function streetNameH(seed, y) {
  const r = rngFor(seed, 'streetH', y);
  return `${r.pick(STREET_FIRST)} ${r.pick(STREET_KIND_H)}`;
}

const INTERIOR_KINDS = [
  ['alley', 3], ['courtyard', 2], ['park', 1.5], ['parking', 1.5], ['plaza', 0.7],
  ['ruins', 1.5], ['market', 1], ['underpass', 1], ['cemetery', 0.8], ['construction', 1],
];

const DISTRICT_BUILDINGS = {
  downtown: [['office', 4], ['cafe', 2], ['hotel', 1.5], ['pharmacy', 1], ['police', 1], ['bookshop', 1], ['clinic', 1], ['theater', 1], ['bar', 1], ['subway', 1]],
  residential: [['apartment', 5], ['grocery', 1.5], ['laundromat', 1], ['school', 1], ['church', 1], ['bakery', 1], ['clinic', 0.7], ['cafe', 0.7], ['bar', 0.5]],
  commercial: [['grocery', 3], ['cafe', 2], ['hardware', 2], ['pharmacy', 1.5], ['butcher', 1], ['bakery', 1], ['bar', 1], ['bookshop', 1], ['laundromat', 1], ['office', 1], ['subway', 0.7]],
  industrial: [['warehouse', 4], ['gasstation', 1.5], ['hardware', 1.5], ['bar', 0.7], ['office', 0.7], ['police', 0.7], ['subway', 0.7]],
  oldtown: [['apartment', 2], ['church', 1.5], ['cafe', 1.5], ['bookshop', 1.5], ['funeral', 1], ['bar', 1], ['clinic', 1], ['grocery', 1], ['hotel', 0.7], ['theater', 0.7], ['butcher', 0.7], ['pharmacy', 0.7]],
};

// ---- cells --------------------------------------------------------------

const cellCache = new Map();

export function getCell(seed, x, y) {
  const ck = `${seed}|${x},${y}`;
  if (cellCache.has(ck)) return cellCache.get(ck);
  const r = rngFor(seed, 'cell', x, y);
  const bt = baseType(x, y);
  const dist = district(x, y);
  const cell = { x, y, district: dist };

  if (bt === 'interior') {
    cell.type = r.weighted(INTERIOR_KINDS);
    cell.name = {
      alley: 'Back alley', courtyard: 'Courtyard', park: 'Overgrown park',
      parking: 'Parking lot', plaza: 'Plaza', ruins: 'Collapsed block',
      market: 'Market square', underpass: 'Underpass', cemetery: 'Old cemetery',
      construction: 'Construction site',
    }[cell.type];
  } else {
    cell.type = bt;
    if (bt === 'intersection') {
      cell.name = `${streetNameV(seed, x)} & ${streetNameH(seed, y)}`;
    } else if (bt === 'street_v') {
      cell.name = streetNameV(seed, x);
    } else {
      cell.name = streetNameH(seed, y);
    }
  }

  // buildings
  const maxB = bt === 'intersection' ? 1 : bt === 'interior' ? 1 : 2;
  const minB = bt === 'interior' ? 0 : 1;
  const nB = r.int(minB, maxB);
  cell.buildings = [];
  for (let slot = 0; slot < nB; slot++) {
    cell.buildings.push(genBuilding(seed, x, y, slot, dist));
  }
  cellCache.set(ck, cell);
  return cell;
}

function genBuilding(seed, x, y, slot, dist) {
  const r = rngFor(seed, 'bldg', x, y, slot);
  const type = r.weighted(DISTRICT_BUILDINGS[dist]);
  const spec = BUILDINGS[type];
  const name = fill(r, r.pick(spec.namePat), { sfirst: r.pick(STREET_FIRST) });
  const nRooms = Math.min(spec.rooms.length, r.int(2, spec.rooms.length));
  const rooms = [];
  for (let i = 0; i < nRooms; i++) {
    const roomType = spec.rooms[i];
    const room = {
      idx: i,
      type: roomType,
      locked: i > 0 && r.chance(0.18),
      adj: [],
    };
    rooms.push(room);
  }
  // adjacency: tree rooted at entrance, biased toward corridors
  for (let i = 1; i < nRooms; i++) {
    const parent = r.chance(0.55) ? i - 1 : r.int(0, i - 1);
    rooms[i].adj.push(parent);
    rooms[parent].adj.push(i);
  }
  return { slot, type, label: spec.label, icon: spec.icon, name, rooms };
}

// ---- prose --------------------------------------------------------------

export function describeCell(seed, cell, visitCount, weatherKey) {
  const r = rngFor(seed, 'desc', cell.x, cell.y, Math.min(visitCount, 1));
  const parts = [];
  if (visitCount > 0) {
    parts.push(r.pick(TABLES.revisit));
  } else {
    const extra = {};
    if (cell.type === 'street_v') {
      extra.streetname = cell.name;
      extra.direction = 'north–south';
      parts.push(pickFill(r, 'street_open', extra));
    } else if (cell.type === 'street_h') {
      extra.streetname = cell.name;
      extra.direction = 'east–west';
      parts.push(pickFill(r, 'street_open', extra));
    } else if (cell.type === 'intersection') {
      extra.streetname = streetNameV(seed, cell.x);
      extra.streetname2 = streetNameH(seed, cell.y);
      parts.push(pickFill(r, 'intersection_open', extra));
    } else {
      parts.push(pickFill(r, `${cell.type}_open`));
    }
    parts.push(r.pick(DISTRICTS[cell.district].flavor));
  }
  parts.push(r.pick(TABLES[`wx_${weatherKey}`]));
  if (cell.buildings.length && visitCount === 0) {
    for (const b of cell.buildings) {
      const br = rngFor(seed, 'bdesc', cell.x, cell.y, b.slot);
      parts.push(`${b.name} — ${fill(br, br.pick(BUILDINGS[b.type].exterior))}`);
    }
  }
  return parts;
}

export function describeRoom(seed, cell, building, roomIdx, visitCount) {
  const r = rngFor(seed, 'rdesc', cell.x, cell.y, building.slot, roomIdx, Math.min(visitCount, 1));
  const room = building.rooms[roomIdx];
  const parts = [];
  if (visitCount > 0) {
    parts.push(r.pick(TABLES.revisit));
  } else {
    const pool = ROOM_DESC[room.type] || ROOM_DESC.default;
    parts.push(fill(r, r.pick(pool)));
  }
  return parts;
}

// ---- positions ----------------------------------------------------------

// pos: {x, y, b: slotIndex|null, r: roomIdx|null}
export function locKey(pos) {
  return pos.b === null || pos.b === undefined
    ? `c:${pos.x},${pos.y}`
    : `r:${pos.x},${pos.y},${pos.b},${pos.r}`;
}

export function samePlace(a, b) {
  return locKey(a) === locKey(b);
}

export function neighbors(x, y) {
  const out = [];
  for (const [dx, dy, dir] of [[0, -1, 'north'], [1, 0, 'east'], [0, 1, 'south'], [-1, 0, 'west']]) {
    if (inBounds(x + dx, y + dy)) out.push({ x: x + dx, y: y + dy, dir });
  }
  return out;
}

// ---- loot ---------------------------------------------------------------

// Interior/outdoor cells have a thin loot table.
const OUTDOOR_LOOT = {
  alley: [['cracker', 1], ['soda', 1], ['matches', 1], ['rope', 0.5], ['key', 0.5]],
  courtyard: [['matches', 1], ['water', 1], ['berries', 0.7], ['jacket', 0.4]],
  park: [['berries', 2], ['water', 0.7], ['rope', 0.4]],
  parking: [['soda', 1], ['battery', 1], ['crowbar', 0.5], ['flashlight', 0.5], ['map_scrap', 0.5]],
  plaza: [['soda', 1], ['cracker', 1], ['chocolate', 0.5], ['map_scrap', 0.5]],
  ruins: [['crowbar', 1], ['rope', 1], ['matches', 0.7], ['key', 0.7], ['pills', 0.5]],
  market: [['canned_food', 1.5], ['cracker', 1], ['berries', 1], ['knife', 0.5], ['scarf', 0.5]],
  underpass: [['matches', 1], ['soda', 1], ['sleeping_bag', 0.6], ['flashlight', 0.5], ['knife', 0.4]],
  cemetery: [['matches', 1], ['key', 0.7], ['scarf', 0.6], ['flashlight', 0.4]],
  construction: [['rope', 1.5], ['crowbar', 1], ['battery', 0.7], ['jacket', 0.5]],
  street_h: [['soda', 0.7], ['cracker', 0.7], ['battery', 0.5], ['map_scrap', 0.4], ['bandage', 0.4]],
  street_v: [['soda', 0.7], ['cracker', 0.7], ['battery', 0.5], ['map_scrap', 0.4], ['bandage', 0.4]],
  intersection: [['soda', 0.7], ['map_scrap', 0.6], ['battery', 0.5]],
};

export function lootTableFor(cell, building) {
  if (building) return BUILDINGS[building.type].loot;
  return OUTDOOR_LOOT[cell.type] || OUTDOOR_LOOT.alley;
}

// searchCount: how many times this spot has been searched already.
export function rollLoot(rng, table, searchCount, bonus = 0) {
  let n;
  if (searchCount === 0) n = rng.int(1, 2) + (rng.chance(0.35) ? 1 : 0) + bonus;
  else if (searchCount === 1) n = rng.chance(0.4) ? 1 : 0;
  else n = rng.chance(0.12) ? 1 : 0;
  const found = [];
  for (let i = 0; i < n; i++) found.push(rng.weighted(table));
  return found;
}

// ---- weather ------------------------------------------------------------

export function weatherForDay(seed, day) {
  const r = rngFor(seed, 'wx', day);
  return r.weighted([['clear', 3], ['overcast', 3], ['rain', 2], ['snap', 1.5]]);
}

// outdoor ambient temperature 0-100 comfort scale
export function ambientWarmth(hour, weatherKey, indoors) {
  // day curve: coldest 04:00, warmest 15:00
  const dayCurve = 38 + 22 * Math.sin(((hour - 9) / 24) * Math.PI * 2);
  let t = dayCurve;
  if (weatherKey === 'rain') t -= 10;
  if (weatherKey === 'snap') t -= 18;
  if (weatherKey === 'clear') t += 4;
  if (indoors) t = Math.max(t + 18, 45);
  return Math.max(0, Math.min(80, t));
}

// ---- survivors ----------------------------------------------------------

const NEED_POOL = ['canned_food', 'water', 'bandage', 'medkit', 'pills', 'battery', 'rope', 'matches'];

export function genSurvivors(seed) {
  const r = rngFor(seed, 'survivors');
  const roles = r.shuffle(Object.keys(SURVIVOR_ROLES));
  const names = r.shuffle(SURVIVOR_FIRST);
  const survivors = [];
  const used = new Set([`${START.x},${START.y}`]);
  let attempts = 0;
  while (survivors.length < 8 && attempts < 400) {
    attempts++;
    const x = r.int(0, CITY_W - 1), y = r.int(0, CITY_H - 1);
    if (used.has(`${x},${y}`)) continue;
    if (Math.abs(x - START.x) + Math.abs(y - START.y) < 2) continue;
    const cell = getCell(seed, x, y);
    if (!cell.buildings.length) continue;
    const b = cell.buildings[0];
    // home in an unlocked, non-entrance room if possible
    const options = b.rooms.filter((rm) => !rm.locked && rm.idx > 0);
    const room = options.length ? r.pick(options) : b.rooms[0];
    used.add(`${x},${y}`);
    const i = survivors.length;
    survivors.push({
      id: `s${i}`,
      name: names[i],
      trait: r.pick(SURVIVOR_TRAIT),
      role: roles[i % roles.length],
      need: r.pick(NEED_POOL),
      needQty: r.int(2, 3),
      home: { x, y, b: b.slot, r: room.idx },
    });
  }
  return survivors;
}

// ---- zombies ------------------------------------------------------------

export function initialZombies(seed, count = 26) {
  const r = rngFor(seed, 'zeds');
  const zeds = [];
  let attempts = 0;
  while (zeds.length < count && attempts < 2000) {
    attempts++;
    const x = r.int(0, CITY_W - 1), y = r.int(0, CITY_H - 1);
    if (Math.abs(x - START.x) + Math.abs(y - START.y) < 3) continue;
    zeds.push({ id: `z${zeds.length}`, x, y, b: null, r: null });
  }
  return zeds;
}

export function clearCellCache() {
  cellCache.clear();
}
