// Headless smoke test: generates worlds and plays hundreds of random turns.
// Run: node test/smoke.mjs
import { Game } from '../src/game.js';
import { getCell, describeCell, describeRoom, genSurvivors, CITY_W, CITY_H, weatherForDay, clearCellCache } from '../src/world.js';
import { rngFor } from '../src/rng.js';

let failures = 0;
const check = (cond, msg) => {
  if (!cond) { failures++; console.error('FAIL:', msg); }
};

// --- determinism ---------------------------------------------------------
{
  const a = getCell('seed-a', 3, 5);
  clearCellCache();
  const b = getCell('seed-a', 3, 5);
  check(JSON.stringify(a) === JSON.stringify(b), 'cell generation deterministic');
  clearCellCache();
}

// --- world coverage ------------------------------------------------------
for (const seed of ['alpha', 'beta', 'gamma']) {
  let buildings = 0, rooms = 0, locked = 0;
  for (let y = 0; y < CITY_H; y++) {
    for (let x = 0; x < CITY_W; x++) {
      const cell = getCell(seed, x, y);
      check(cell.name, `cell ${x},${y} has a name`);
      const desc = describeCell(seed, cell, 0, weatherForDay(seed, 1));
      check(desc.length > 0 && desc.every((d) => typeof d === 'string' && !d.includes('{')), `cell ${x},${y} prose has no unfilled slots: ${desc}`);
      for (const b of cell.buildings) {
        buildings++;
        for (const rm of b.rooms) {
          rooms++;
          if (rm.locked) locked++;
          const rd = describeRoom(seed, cell, b, rm.idx, 0);
          check(rd.every((d) => !d.includes('{')), `room prose has no unfilled slots: ${rd}`);
          for (const adj of rm.adj) check(adj >= 0 && adj < b.rooms.length, 'room adjacency in range');
        }
        check(b.rooms.length >= 2, 'building has at least 2 rooms');
      }
    }
  }
  const sv = genSurvivors(seed);
  check(sv.length === 6, `6 survivors generated (got ${sv.length})`);
  for (const s of sv) {
    const cell = getCell(seed, s.home.x, s.home.y);
    check(cell.buildings[s.home.b], `survivor ${s.name} home building exists`);
    check(cell.buildings[s.home.b].rooms[s.home.r], `survivor ${s.name} home room exists`);
  }
  console.log(`world '${seed}': ${buildings} buildings, ${rooms} rooms (${locked} locked), survivors: ${sv.map((s) => `${s.name}/${s.role}@${s.home.x},${s.home.y}`).join(' ')}`);
  clearCellCache();
}

// --- random play ---------------------------------------------------------
for (let run = 0; run < 30; run++) {
  const seed = `fuzz-${run}`;
  const g = new Game(seed);
  const r = rngFor(seed, 'driver');
  let turns = 0;
  const modesSeen = new Set();
  while (g.s.mode !== 'dead' && turns < 400) {
    turns++;
    modesSeen.add(g.s.mode);
    const acts = g.actions();
    check(acts.length > 0, `actions available in mode ${g.s.mode} (run ${run}, turn ${turns})`);
    if (!acts.length) break;
    const enabled = acts.filter((a) => !a.disabled);
    check(enabled.length > 0, `at least one enabled action (mode ${g.s.mode}, energy ${g.s.stats.energy})`);
    if (!enabled.length) break;
    // occasionally use an item
    if (r.chance(0.15)) {
      const ids = Object.keys(g.s.inv);
      if (ids.length) g.perform('use_item', r.pick(ids));
    }
    const a = r.pick(enabled);
    g.perform(a.id, a.arg);
    const st = g.s.stats;
    for (const k of ['energy', 'health', 'hunger', 'warmth']) {
      check(Number.isFinite(st[k]) && st[k] >= 0 && st[k] <= 100, `stat ${k} in range (${st[k]})`);
    }
    check(g.s.pos.x >= 0 && g.s.pos.x < CITY_W && g.s.pos.y >= 0 && g.s.pos.y < CITY_H, 'player in bounds');
    if (g.indoors) {
      check(g.building, 'building exists at player pos');
      check(g.room, 'room exists at player pos');
    }
    for (const line of g.s.log.slice(-3)) {
      check(!line.text.includes('{'), `log line has no unfilled slots: "${line.text}"`);
      check(!line.text.includes('undefined'), `log line has no undefined: "${line.text}"`);
    }
  }
  const days = g.s.day;
  if (run < 5 || g.s.mode === 'dead') {
    console.log(`run ${run}: ${turns} turns, day ${days}, mode ${g.s.mode}${g.s.deathCause ? ` (died: ${g.s.deathCause})` : ''}, modes seen: ${[...modesSeen].join(',')}`);
  }
  clearCellCache();
}

// --- map data ------------------------------------------------------------
{
  const g = new Game('map-test');
  const cells = g.mapData();
  check(cells.length === CITY_W * CITY_H, 'map data covers grid');
  check(cells.some((c) => c && c.here), 'map shows player');
}

if (failures) {
  console.error(`\n${failures} check(s) FAILED`);
  process.exit(1);
}
console.log('\nAll smoke checks passed.');
