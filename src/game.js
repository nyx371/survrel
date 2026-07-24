// Game state and turn logic. UI-free: everything here is testable headless.

import { rngFor, liveRng, randomSeed } from './rng.js';
import { ITEMS, itemName } from './data/items.js';
import {
  getCell, describeCell, describeRoom, locKey, neighbors, inBounds,
  lootTableFor, rollLoot, weatherForDay, ambientWarmth, genSurvivors,
  initialZombies, START, CITY_W, CITY_H, streetNameV, streetNameH,
} from './world.js';
import {
  TABLES, LOCKED_DESC, UNLOCK_DESC, SURVIVOR_ROLES, SURVIVOR_MEET,
  SURVIVOR_TALK_T0, SURVIVOR_TALK_T1, SURVIVOR_TALK_T2, SURVIVOR_TALK_T3,
  SURVIVOR_THANKS, SURVIVOR_NEED_LINE, EAT_LINES, DRINK_LINES, TOO_TIRED,
  COLD_WARNING, HUNGER_WARNING, DEATH_COLD, DEATH_HUNGER, DEATH_ZED, fill,
} from './data/text.js';

const DAY_MIN = 24 * 60;
const SAVE_KEY = 'survrel.save.v1';

export const COSTS = {
  move: { energy: 4, minutes: 15 },
  enter: { energy: 3, minutes: 10 },
  room: { energy: 2, minutes: 5 },
  search: { energy: 8, minutes: 40 },
  rest: { energy: 0, minutes: 45 },
  wait: { energy: 0, minutes: 30 },
  talk: { energy: 1, minutes: 10 },
  give: { energy: 1, minutes: 5 },
  eat: { energy: 0, minutes: 10 },
  flee: { energy: 10, minutes: 10 },
  fire: { energy: 3, minutes: 20 },
  pry: { energy: 6, minutes: 15 },
};

export class Game {
  constructor(seed) {
    this.seed = seed || randomSeed();
    this.newGame();
  }

  newGame() {
    const seed = this.seed;
    this.s = {
      seed,
      day: 1,
      minutes: 7 * 60 + 30,
      stats: { energy: 90, health: 100, hunger: 75, warmth: 60 },
      pos: { x: START.x, y: START.y, b: null, r: null },
      inv: { water: 1, cracker: 2, matches: 1 },
      visited: {},
      searched: {},
      unlocked: {},
      zombies: initialZombies(seed),
      survivors: genSurvivors(seed).map((sv) => ({ ...sv, trust: 0, met: false, given: 0, giftDay: 0 })),
      noise: 0,
      mode: 'explore', // explore | encounter | talk | dead
      talkTo: null,
      fireUntil: -1,
      log: [],
      deathCause: null,
      turn: 0,
      known: {}, // map cells revealed by tips: key -> true
      zedKnownDay: 0, // radio perk: day zombie positions were shared
    };
    this.markVisited();
    this.say(`Day 1. ${this.timeString()}. You are alone, hungry, and alive — one of those is fixable right now.`, 'system');
    this.describeHere(true);
    this.save();
  }

  // ---- helpers ----------------------------------------------------------

  get stats() { return this.s.stats; }
  get pos() { return this.s.pos; }
  get here() { return getCell(this.s.seed, this.s.pos.x, this.s.pos.y); }
  get indoors() { return this.s.pos.b !== null; }
  get building() { return this.indoors ? this.here.buildings[this.s.pos.b] : null; }
  get room() { return this.indoors ? this.building.rooms[this.s.pos.r] : null; }
  get weather() { return weatherForDay(this.s.seed, this.s.day); }
  get hour() { return this.s.minutes / 60; }
  get isNight() { return this.hour < 6 || this.hour >= 20; }
  get totalMinutes() { return (this.s.day - 1) * DAY_MIN + this.s.minutes; }

  timeString() {
    const h = Math.floor(this.s.minutes / 60), m = Math.floor(this.s.minutes % 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  say(text, kind = 'info') {
    this.s.log.push({ text, kind });
    if (this.s.log.length > 60) this.s.log.splice(0, this.s.log.length - 60);
  }

  live() {
    // deterministic per turn so saves replay identically
    return rngFor(this.s.seed, 'live', this.s.turn);
  }

  markVisited() {
    const k = locKey(this.s.pos);
    this.s.visited[k] = (this.s.visited[k] || 0) + 1;
    this.s.visited[`c:${this.s.pos.x},${this.s.pos.y}`] = this.s.visited[`c:${this.s.pos.x},${this.s.pos.y}`] || 1;
  }

  visitCount() {
    return (this.s.visited[locKey(this.s.pos)] || 1) - 1;
  }

  survivorHere() {
    return this.s.survivors.find((sv) => locKey(sv.home) === locKey(this.s.pos)) || null;
  }
  survivorInBuilding() {
    if (!this.indoors) return null;
    return this.s.survivors.find((sv) => sv.home.x === this.s.pos.x && sv.home.y === this.s.pos.y && sv.home.b === this.s.pos.b) || null;
  }

  zombiesHere() {
    const k = locKey(this.s.pos);
    return this.s.zombies.filter((z) => locKey(z) === k);
  }

  // ---- description of current location ----------------------------------

  describeHere(first = false) {
    const vc = first ? this.visitCount() : this.visitCount();
    let parts;
    if (this.indoors) {
      parts = describeRoom(this.s.seed, this.here, this.building, this.s.pos.r, vc);
      if (this.s.pos.r === 0) {
        const sv = this.survivorInBuilding();
        if (sv && !sv.met) parts.push('Signs of habitation: swept floor, a cold fire ring, the smell of recent cooking. Somebody lives here.');
      }
    } else {
      parts = describeCell(this.s.seed, this.here, vc, this.weather);
    }
    const sv = this.survivorHere();
    if (sv) {
      const role = SURVIVOR_ROLES[sv.role];
      if (!sv.met) {
        const r = this.live();
        parts.push(r.pick(SURVIVOR_MEET));
        parts.push(fill(r, role.intro, { name: sv.name }) + ` This is ${sv.name}, ${sv.trait} — a ${role.label}.`);
        sv.met = true;
      } else {
        parts.push(`${sv.name} the ${role.label} is here.`);
      }
    }
    this.currentDesc = parts;
    return parts;
  }

  // ---- time & stat simulation -------------------------------------------

  passTime(minutes, opts = {}) {
    const st = this.s.stats;
    const chunk = 30;
    let left = minutes;
    while (left > 0 && this.s.mode !== 'dead') {
      const step = Math.min(chunk, left);
      left -= step;
      this.s.minutes += step;
      while (this.s.minutes >= DAY_MIN) {
        this.s.minutes -= DAY_MIN;
        this.s.day += 1;
        this.say(`— Day ${this.s.day} —`, 'system');
      }
      const hours = step / 60;
      st.hunger = Math.max(0, st.hunger - 2.5 * hours);
      if (!opts.sleeping) st.energy = Math.max(0, st.energy - 0.6 * hours);

      // warmth drifts toward ambient target
      const fire = this.totalMinutes <= this.s.fireUntil;
      let target = ambientWarmth(this.hour, this.weather, this.indoors)
        + (this.s.inv.jacket ? 12 : 0)
        + (this.s.inv.scarf ? 8 : 0)
        + (fire ? 28 : 0)
        + (opts.sleeping && this.s.inv.sleeping_bag ? 12 : 0);
      target = Math.min(95, target);
      st.warmth += (target - st.warmth) * Math.min(1, 0.5 * hours);
      st.warmth = Math.max(0, Math.min(100, st.warmth));

      // health consequences
      if (st.hunger <= 0) st.health -= 3 * hours;
      if (st.warmth < 15) st.health -= 4 * hours;
      else if (st.warmth < 30) st.health -= 1.5 * hours;
      if (st.health < 100 && st.hunger > 50 && st.warmth > 40) st.health += (opts.sleeping ? 2.5 : 1) * hours;
      st.health = Math.max(0, Math.min(100, st.health));

      if (st.health <= 0) {
        this.die(st.hunger <= 0 ? 'hunger' : st.warmth < 30 ? 'cold' : 'zed');
        return;
      }
    }
    this.s.noise = Math.max(0, this.s.noise - 1);
  }

  die(cause) {
    this.s.mode = 'dead';
    this.s.deathCause = cause;
    const pool = cause === 'cold' ? DEATH_COLD : cause === 'hunger' ? DEATH_HUNGER : DEATH_ZED;
    this.say(this.live().pick(pool), 'danger');
    this.say(`You survived ${this.s.day} day${this.s.day === 1 ? '' : 's'}.`, 'system');
    this.clearSave();
  }

  warnings() {
    const r = this.live();
    if (this.s.stats.hunger < 20 && this.s.stats.hunger > 0 && r.chance(0.5)) this.say(r.pick(HUNGER_WARNING), 'warn');
    if (this.s.stats.warmth < 28 && r.chance(0.5)) this.say(r.pick(COLD_WARNING), 'warn');
  }

  // ---- zombie simulation -------------------------------------------------

  stepZombies(steps = 1) {
    const r = this.live();
    for (let s = 0; s < steps; s++) {
      for (const z of this.s.zombies) {
        this.stepOneZombie(z, r);
      }
    }
  }

  stepOneZombie(z, r) {
    const p = this.s.pos;
    if (z.b === null) {
      const dist = Math.abs(z.x - p.x) + Math.abs(z.y - p.y);
      const smell = this.s.noise > 0 ? 3 : 2;
      if (p.b === null && dist > 0 && dist <= smell && r.chance(0.7)) {
        // shamble toward the player
        const dx = Math.sign(p.x - z.x), dy = Math.sign(p.y - z.y);
        if (dx !== 0 && (dy === 0 || r.chance(0.5))) z.x += dx; else if (dy !== 0) z.y += dy;
      } else if (r.chance(0.45)) {
        const n = r.pick(neighbors(z.x, z.y));
        z.x = n.x; z.y = n.y;
      } else if (r.chance(0.1)) {
        const cell = getCell(this.s.seed, z.x, z.y);
        if (cell.buildings.length) {
          z.b = r.int(0, cell.buildings.length - 1);
          z.r = 0;
        }
      }
    } else {
      const cell = getCell(this.s.seed, z.x, z.y);
      const bld = cell.buildings[z.b];
      if (!bld) { z.b = null; z.r = null; return; }
      const inSameBuilding = p.x === z.x && p.y === z.y && p.b === z.b;
      if (inSameBuilding && z.r !== p.r && r.chance(0.6)) {
        // move one room along adjacency toward the player (greedy: any adjacent
        // room; small building graphs make this good enough)
        const room = bld.rooms[z.r];
        const next = room.adj.find((a) => a === p.r);
        z.r = next !== undefined ? next : r.pick(room.adj.length ? room.adj : [z.r]);
      } else if (z.r === 0 && r.chance(0.3)) {
        z.b = null; z.r = null;
      } else if (r.chance(0.4)) {
        const room = bld.rooms[z.r];
        if (room.adj.length) {
          const dest = bld.rooms[r.pick(room.adj)];
          if (!dest.locked || this.s.unlocked[this.roomKey(z.x, z.y, z.b, dest.idx)]) z.r = dest.idx;
        }
      }
    }
  }

  roomKey(x, y, b, ri) { return `r:${x},${y},${b},${ri}`; }

  checkEncounter() {
    if (this.s.mode === 'dead') return;
    const zeds = this.zombiesHere();
    if (zeds.length && this.s.mode !== 'encounter') {
      this.s.mode = 'encounter';
      const r = this.live();
      this.say(fill(r, r.pick(TABLES.zed_appear)), 'danger');
      if (zeds.length > 1) this.say(`There are ${zeds.length} of them.`, 'danger');
    } else if (!zeds.length && this.s.mode === 'encounter') {
      this.s.mode = 'explore';
    }
  }

  // ---- actions -----------------------------------------------------------

  // list of {id, icon, label, sub, cost, disabled, reason, arg}
  actions() {
    const s = this.s;
    if (s.mode === 'dead') return [];
    const acts = [];
    const canAfford = (c) => s.stats.energy >= c.energy;

    if (s.mode === 'encounter') {
      for (const exit of this.exits()) {
        if (exit.locked) continue;
        acts.push({
          id: 'flee', arg: exit.arg, icon: 'run',
          label: `Flee ${exit.label}`, cost: COSTS.flee,
          disabled: false,
        });
      }
      return acts;
    }

    if (s.mode === 'talk') {
      const sv = s.survivors.find((v) => v.id === s.talkTo);
      if (sv) {
        const needCount = s.inv[sv.need] || 0;
        if (sv.trust < 3 && needCount > 0) {
          acts.push({ id: 'give', arg: sv.id, icon: 'give', label: `Give ${itemName(sv.need)}`, sub: `${needCount} carried`, cost: COSTS.give });
        }
        if (sv.trust >= 2 && sv.giftDay < s.day) {
          acts.push({ id: 'ask_help', arg: sv.id, icon: SURVIVOR_ROLES[sv.role].icon, label: 'Ask for help', sub: SURVIVOR_ROLES[sv.role].perk3, cost: COSTS.talk });
        }
        if (sv.trust >= 3) {
          acts.push({ id: 'sleep_safe', arg: sv.id, icon: 'sleep', label: 'Sleep here', sub: 'safe, watched', cost: COSTS.rest });
        }
        acts.push({ id: 'leave_talk', icon: 'exit', label: 'Step away', cost: { energy: 0, minutes: 0 } });
      }
      return acts;
    }

    // explore mode ---------------------------------------------------------
    for (const exit of this.exits()) {
      acts.push({
        id: exit.kind, arg: exit.arg, icon: exit.icon, label: exit.label,
        sub: exit.sub, cost: exit.cost,
        disabled: !canAfford(exit.cost) || exit.locked,
        reason: exit.locked ? 'locked' : !canAfford(exit.cost) ? 'too tired' : null,
      });
      if (exit.locked && (s.inv.crowbar || 0) > 0) {
        acts.push({ id: 'pry', arg: exit.arg, icon: 'crowbar', label: `Pry open ${exit.label.replace(/^To /, '')}`, cost: COSTS.pry, disabled: !canAfford(COSTS.pry), reason: canAfford(COSTS.pry) ? null : 'too tired' });
      }
    }

    const sk = locKey(s.pos);
    const searchedTimes = s.searched[sk] || 0;
    acts.push({
      id: 'search', icon: 'search', label: 'Search',
      sub: searchedTimes === 0 ? 'untouched' : searchedTimes === 1 ? 'searched once' : 'picked over',
      cost: COSTS.search,
      disabled: !canAfford(COSTS.search),
      reason: canAfford(COSTS.search) ? null : 'too tired',
    });

    const sv = this.survivorHere();
    if (sv && sv.met) {
      acts.push({ id: 'talk', arg: sv.id, icon: 'talk', label: `Talk to ${sv.name}`, cost: COSTS.talk });
    }

    if ((s.inv.matches || 0) > 0 && this.totalMinutes > s.fireUntil) {
      acts.push({ id: 'fire', icon: 'fire', label: 'Light a fire', sub: 'warmth for a while', cost: COSTS.fire });
    }

    acts.push({ id: 'rest', icon: 'wait', label: 'Rest', sub: '+energy, time passes', cost: COSTS.rest });
    acts.push({ id: 'sleep', icon: 'sleep', label: 'Sleep', sub: this.sleepSafety().label, cost: { energy: 0, minutes: 0 } });
    return acts;
  }

  exits() {
    const s = this.s;
    const out = [];
    if (!this.indoors) {
      for (const n of neighbors(s.pos.x, s.pos.y)) {
        const cell = getCell(s.seed, n.x, n.y);
        const seen = s.visited[`c:${n.x},${n.y}`];
        out.push({
          kind: 'move', arg: n.dir, icon: 'move',
          label: `${n.dir[0].toUpperCase() + n.dir.slice(1)}`,
          sub: seen ? cell.name : 'unexplored',
          cost: COSTS.move,
        });
      }
      this.here.buildings.forEach((b, i) => {
        out.push({
          kind: 'enter', arg: i, icon: b.icon,
          label: `Enter ${b.name}`, sub: b.label, cost: COSTS.enter,
        });
      });
    } else {
      const bld = this.building;
      const room = this.room;
      for (const adjIdx of room.adj) {
        const dest = bld.rooms[adjIdx];
        const locked = dest.locked && !s.unlocked[this.roomKey(s.pos.x, s.pos.y, s.pos.b, adjIdx)];
        out.push({
          kind: 'goroom', arg: adjIdx, icon: locked ? 'key' : 'door',
          label: `To the ${dest.type}`, sub: locked ? 'locked' : null,
          cost: COSTS.room, locked,
        });
      }
      if (s.pos.r === 0) {
        out.push({ kind: 'exit_building', arg: null, icon: 'exit', label: 'Back to the street', sub: this.here.name, cost: COSTS.room });
      }
    }
    return out;
  }

  sleepSafety() {
    if (this.indoors) {
      const sv = this.survivorInBuilding();
      if (sv && sv.trust >= 3) return { level: 'safe', label: 'safe — watched over' };
      return { level: 'indoors', label: 'sheltered' };
    }
    return { level: 'rough', label: 'exposed — risky' };
  }

  // Perform an action. Returns nothing; UI re-reads state.
  perform(id, arg) {
    if (this.s.mode === 'dead') return;
    this.s.turn += 1;
    const handler = {
      move: () => this.doMove(arg),
      enter: () => this.doEnter(arg),
      goroom: () => this.doGoRoom(arg),
      exit_building: () => this.doExitBuilding(),
      search: () => this.doSearch(),
      rest: () => this.doRest(),
      sleep: () => this.doSleep(false),
      sleep_safe: () => this.doSleep(true),
      wait: () => this.doWait(),
      talk: () => this.doTalk(arg),
      give: () => this.doGive(arg),
      ask_help: () => this.doAskHelp(arg),
      leave_talk: () => { this.s.mode = 'explore'; this.s.talkTo = null; this.describeHere(); },
      fire: () => this.doFire(),
      pry: () => this.doPry(arg),
      flee: () => this.doFlee(arg),
      use_item: () => this.doUseItem(arg),
      drop_item: () => this.doDropItem(arg),
    }[id];
    if (handler) handler();
    this.save();
  }

  spend(cost, opts = {}) {
    this.s.stats.energy = Math.max(0, this.s.stats.energy - cost.energy);
    this.passTime(cost.minutes, opts);
    if (this.s.mode === 'dead') return;
    this.stepZombies(1);
    this.checkEncounter();
    this.warnings();
  }

  doMove(dir) {
    const d = { north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0] }[dir];
    const nx = this.s.pos.x + d[0], ny = this.s.pos.y + d[1];
    if (!inBounds(nx, ny)) return;
    this.s.pos = { x: nx, y: ny, b: null, r: null };
    this.spend(COSTS.move);
    if (this.s.mode === 'dead') return;
    this.markVisited();
    this.describeHere();
    const r = this.live();
    if (r.chance(0.18)) this.say(r.pick(TABLES.ambient_event), 'flavor');
  }

  doEnter(slot) {
    this.s.pos = { ...this.s.pos, b: slot, r: 0 };
    this.spend(COSTS.enter);
    if (this.s.mode === 'dead') return;
    this.markVisited();
    this.describeHere();
  }

  doGoRoom(idx) {
    const locked = this.building.rooms[idx].locked
      && !this.s.unlocked[this.roomKey(this.s.pos.x, this.s.pos.y, this.s.pos.b, idx)];
    if (locked) {
      this.say(this.live().pick(LOCKED_DESC), 'info');
      return;
    }
    this.s.pos = { ...this.s.pos, r: idx };
    this.spend(COSTS.room);
    if (this.s.mode === 'dead') return;
    this.markVisited();
    this.describeHere();
  }

  doExitBuilding() {
    this.s.pos = { ...this.s.pos, b: null, r: null };
    this.spend(COSTS.room);
    if (this.s.mode === 'dead') return;
    this.markVisited();
    this.describeHere();
  }

  doPry(idx) {
    const key = this.roomKey(this.s.pos.x, this.s.pos.y, this.s.pos.b, idx);
    this.s.unlocked[key] = true;
    this.s.noise += 2;
    this.say(this.live().pick(UNLOCK_DESC), 'info');
    this.spend(COSTS.pry);
  }

  doSearch() {
    const s = this.s;
    const k = locKey(s.pos);
    const count = s.searched[k] || 0;
    s.searched[k] = count + 1;
    s.noise += 2;
    const r = rngFor(s.seed, 'loot', k, count);
    let bonus = 0;
    if (this.indoors && this.room.locked) bonus += 1;
    if (this.isNight && (s.inv.flashlight || 0) > 0) bonus += 0; // flashlight just cancels the night penalty
    if (this.isNight && !(s.inv.flashlight || 0)) bonus -= 1;
    const table = lootTableFor(this.here, this.building);
    const found = rollLoot(r, table, count, bonus);
    if (found.length) {
      for (const it of found) s.inv[it] = (s.inv[it] || 0) + 1;
      const names = found.map((i) => itemName(i).toLowerCase()).join(', ');
      this.say(fill(this.live(), this.live().pick(TABLES.search_find), { itemlist: names }), 'loot');
    } else {
      this.say(fill(this.live(), this.live().pick(TABLES.search_empty)), 'info');
    }
    this.spend(COSTS.search);
  }

  doRest() {
    this.s.stats.energy = Math.min(100, this.s.stats.energy + 12);
    this.say('You find a spot with your back covered and let your legs stop shaking.', 'info');
    this.spend(COSTS.rest);
  }

  doWait() {
    this.say('You wait, and listen, and let the city do whatever it is doing.', 'info');
    this.spend(COSTS.wait);
  }

  doSleep(safe) {
    const s = this.s;
    const safety = safe ? { level: 'safe' } : this.sleepSafety();
    // sleep until ~06:30, or at least 6 hours
    let mins = ((6.5 * 60) - s.minutes + DAY_MIN) % DAY_MIN;
    if (mins < 6 * 60) mins += 0; // dawn is close: short night, fine
    if (mins > 12 * 60) mins = 8 * 60; // daytime nap caps at 8h
    const r = this.live();
    const lines = safety.level === 'safe' ? TABLES.sleep_safe : TABLES.sleep_rough;
    this.say(r.pick(lines), 'info');

    // simulate the night in chunks so cold/hunger apply
    this.passTime(mins, { sleeping: true });
    if (s.mode === 'dead') return;

    let gain = 45;
    if (safety.level === 'indoors') gain += 15;
    if (safety.level === 'safe') gain += 30;
    if ((s.inv.sleeping_bag || 0) > 0) gain += 10;

    // danger while sleeping rough or sheltered: the dead wander
    if (safety.level !== 'safe') {
      this.stepZombies(4);
      const zeds = this.zombiesHere();
      if (zeds.length) {
        s.stats.health = Math.max(1, s.stats.health - 12);
        gain = Math.floor(gain / 2);
        this.say('You wake to a sound that is already too close — scrambling up, heart hammering.', 'danger');
      }
    }
    s.stats.energy = Math.min(100, s.stats.energy + gain);
    this.say(r.pick(TABLES.wake), 'info');
    if (r.chance(0.5)) this.say(r.pick(TABLES.dream), 'flavor');
    this.checkEncounter();
    this.describeHere();
  }

  doTalk(id) {
    const sv = this.s.survivors.find((v) => v.id === id);
    if (!sv) return;
    this.s.mode = 'talk';
    this.s.talkTo = id;
    const pool = [SURVIVOR_TALK_T0, SURVIVOR_TALK_T1, SURVIVOR_TALK_T2, SURVIVOR_TALK_T3][sv.trust] || SURVIVOR_TALK_T3;
    const r = this.live();
    this.say(`${sv.name}: ` + r.pick(pool), 'talk');
    if (sv.trust < 3) {
      this.say(SURVIVOR_NEED_LINE[sv.need] || `They could use ${itemName(sv.need).toLowerCase()}.`, 'talk');
    }
    this.s.stats.energy = Math.max(0, this.s.stats.energy - COSTS.talk.energy);
    this.passTime(COSTS.talk.minutes);
  }

  doGive(id) {
    const sv = this.s.survivors.find((v) => v.id === id);
    if (!sv || (this.s.inv[sv.need] || 0) <= 0) return;
    this.s.inv[sv.need] -= 1;
    if (this.s.inv[sv.need] <= 0) delete this.s.inv[sv.need];
    sv.given += 1;
    sv.trust = Math.min(3, sv.trust + 1);
    const r = this.live();
    this.say(r.pick(SURVIVOR_THANKS), 'talk');
    const role = SURVIVOR_ROLES[sv.role];
    if (sv.trust === 1) {
      this.say(`${sv.name} leans in: “Word of advice — try ${role.tip}.”`, 'talk');
      this.revealTip(sv);
    } else if (sv.trust === 2) {
      this.say(`${sv.name}: “Come by whenever. If I can help, I will.” (You can now ask ${sv.name} for help once a day.)`, 'talk');
    } else if (sv.trust === 3) {
      this.say(`${sv.name}: “You need a roof, mine’s yours. Sleep here any time.”`, 'talk');
    }
    this.passTime(COSTS.give.minutes);
  }

  revealTip(sv) {
    // trust 1: reveal the map around their home district
    const r = rngFor(this.s.seed, 'tip', sv.id);
    const cx = r.int(1, CITY_W - 2), cy = r.int(1, CITY_H - 2);
    for (let dx = -2; dx <= 2; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        if (inBounds(cx + dx, cy + dy)) this.s.known[`c:${cx + dx},${cy + dy}`] = true;
      }
    }
    this.say('They sketch a corner of the city on the back of a receipt. (New area marked on your map.)', 'system');
  }

  doAskHelp(id) {
    const sv = this.s.survivors.find((v) => v.id === id);
    if (!sv || sv.trust < 2 || sv.giftDay >= this.s.day) return;
    sv.giftDay = this.s.day;
    const r = this.live();
    const give = (item, n = 1) => {
      this.s.inv[item] = (this.s.inv[item] || 0) + n;
      this.say(`${sv.name} hands you ${n > 1 ? n + '× ' : ''}${itemName(item).toLowerCase()}.`, 'loot');
    };
    switch (sv.role) {
      case 'medic': {
        this.s.stats.health = Math.min(100, this.s.stats.health + 20);
        this.say(`${sv.name} looks you over, cleans what needs cleaning, and rewraps what needs wrapping. (+health)`, 'loot');
        break;
      }
      case 'cook': {
        this.s.stats.hunger = Math.min(100, this.s.stats.hunger + 40);
        this.s.stats.warmth = Math.min(100, this.s.stats.warmth + 15);
        this.say(`${sv.name} ladles you a bowl of the eternal stew. It is the best thing in the ruined world. (+food, +warmth)`, 'loot');
        break;
      }
      case 'scavenger': give(r.pick(['crowbar', 'flashlight', 'rope', 'map_scrap'])); break;
      case 'mechanic': give(r.pick(['battery', 'crowbar', 'matches'])); break;
      case 'watchman': {
        this.s.stats.energy = Math.min(100, this.s.stats.energy + 15);
        this.say(`${sv.name} stands your watch while you close your eyes for a real half hour. (+energy)`, 'loot');
        break;
      }
      case 'radio_op': {
        this.s.zedKnownDay = this.s.day;
        this.say(`${sv.name} runs the dial and marks where the dead are drifting today. (Zombies shown on your map until tomorrow.)`, 'system');
        break;
      }
    }
    this.passTime(COSTS.talk.minutes);
  }

  doFire() {
    if ((this.s.inv.matches || 0) <= 0) return;
    this.s.inv.matches -= 1;
    if (this.s.inv.matches <= 0) delete this.s.inv.matches;
    this.s.fireUntil = this.totalMinutes + 90;
    this.s.noise += 2;
    this.say(this.indoors
      ? 'You build a small fire in a can and feed it slowly. Heat crawls back into your hands.'
      : 'You get a fire going in the lee of a wall. The light feels loud out here, but the warmth is worth it.', 'info');
    this.spend(COSTS.fire);
  }

  doFlee(arg) {
    const r = this.live();
    // scratched?
    const scratchChance = this.s.stats.energy < 30 ? 0.45 : this.zombiesHere().length > 1 ? 0.35 : 0.2;
    if (r.chance(scratchChance)) {
      this.s.stats.health = Math.max(1, this.s.stats.health - r.int(6, 14));
      this.say(r.pick(TABLES.flee_scratch), 'danger');
    } else {
      this.say(fill(r, r.pick(TABLES.flee_ok)), 'info');
    }
    this.s.noise += 2;
    this.s.stats.energy = Math.max(0, this.s.stats.energy - COSTS.flee.energy);

    // move through the chosen exit without triggering the normal spend loop
    if (!this.indoors) {
      const d = { north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0] }[arg];
      if (d) this.s.pos = { x: this.s.pos.x + d[0], y: this.s.pos.y + d[1], b: null, r: null };
      else if (typeof arg === 'number') this.s.pos = { ...this.s.pos, b: arg, r: 0 };
    } else if (arg === null || arg === 'out') {
      this.s.pos = { ...this.s.pos, b: null, r: null };
    } else {
      this.s.pos = { ...this.s.pos, r: arg };
    }
    this.passTime(COSTS.flee.minutes);
    if (this.s.mode === 'dead') return;
    this.markVisited();
    this.s.mode = 'explore';
    this.stepZombies(1);
    this.checkEncounter();
    this.describeHere();
  }

  // In encounter mode, exits() needs the same shape; reuse with flee labels.
  // (exits() already covers outdoor dirs + indoor rooms; encounters use it via actions()).

  doUseItem(itemId) {
    const s = this.s;
    if ((s.inv[itemId] || 0) <= 0) return;
    const def = ITEMS[itemId];
    if (!def) return;
    const r = this.live();
    if (def.kind === 'food' || def.kind === 'drink') {
      s.inv[itemId] -= 1;
      if (s.inv[itemId] <= 0) delete s.inv[itemId];
      s.stats.hunger = Math.min(100, s.stats.hunger + (def.hunger || 0));
      s.stats.energy = Math.min(100, s.stats.energy + (def.energy || 0));
      this.say(r.pick(def.kind === 'food' ? EAT_LINES : DRINK_LINES), 'info');
      this.passTime(COSTS.eat.minutes);
    } else if (def.kind === 'med') {
      s.inv[itemId] -= 1;
      if (s.inv[itemId] <= 0) delete s.inv[itemId];
      s.stats.health = Math.min(100, s.stats.health + (def.health || 0));
      this.say('You patch yourself up as best you can.', 'info');
      this.passTime(COSTS.eat.minutes);
    } else if (itemId === 'map_scrap') {
      s.inv[itemId] -= 1;
      if (s.inv[itemId] <= 0) delete s.inv[itemId];
      const cx = r.int(1, CITY_W - 2), cy = r.int(1, CITY_H - 2);
      for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) {
        if (inBounds(cx + dx, cy + dy)) s.known[`c:${cx + dx},${cy + dy}`] = true;
      }
      this.say('You study the marked-up map fragment and commit a new corner of the city to memory.', 'system');
    } else {
      this.say(def.flavor, 'flavor');
    }
    this.save();
  }

  doDropItem(itemId) {
    const s = this.s;
    if ((s.inv[itemId] || 0) <= 0) return;
    s.inv[itemId] -= 1;
    if (s.inv[itemId] <= 0) delete s.inv[itemId];
    this.say(`You leave the ${itemName(itemId).toLowerCase()} behind.`, 'info');
    this.save();
  }

  // ---- map data for UI ---------------------------------------------------

  mapData() {
    const cells = [];
    for (let y = 0; y < CITY_H; y++) {
      for (let x = 0; x < CITY_W; x++) {
        const k = `c:${x},${y}`;
        const visited = !!this.s.visited[k];
        const known = !!this.s.known[k];
        if (!visited && !known) { cells.push(null); continue; }
        const cell = getCell(this.s.seed, x, y);
        const sv = this.s.survivors.find((v) => v.met && v.home.x === x && v.home.y === y);
        const zeds = this.s.zedKnownDay >= this.s.day
          ? this.s.zombies.filter((z) => z.x === x && z.y === y).length : 0;
        cells.push({
          x, y, type: cell.type, name: cell.name, visited, known,
          buildings: cell.buildings.length, survivor: !!sv, zeds,
          here: this.s.pos.x === x && this.s.pos.y === y,
        });
      }
    }
    return cells;
  }

  // ---- persistence -------------------------------------------------------

  save() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.s));
    } catch (e) { /* storage full or unavailable — play on without saves */ }
  }

  clearSave() {
    if (typeof localStorage === 'undefined') return;
    try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
  }

  static load() {
    if (typeof localStorage === 'undefined') return null;
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || !s.seed) return null;
      const g = Object.create(Game.prototype);
      g.seed = s.seed;
      g.s = s;
      g.describeHere();
      return g;
    } catch (e) {
      return null;
    }
  }
}
