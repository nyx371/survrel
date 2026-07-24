// Deterministic seeded RNG: xmur3 string hash feeding mulberry32.
// The whole world derives from (seed, ...keys) so nothing needs to be stored
// until the player changes it.

function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Rng {
  constructor(fn) {
    this.next = fn;
  }
  // float in [0,1)
  f() {
    return this.next();
  }
  // integer in [min,max] inclusive
  int(min, max) {
    return min + Math.floor(this.next() * (max - min + 1));
  }
  chance(p) {
    return this.next() < p;
  }
  pick(arr) {
    return arr[Math.floor(this.next() * arr.length)];
  }
  // weighted pick from [[value, weight], ...]
  weighted(pairs) {
    let total = 0;
    for (const [, w] of pairs) total += w;
    let roll = this.next() * total;
    for (const [v, w] of pairs) {
      roll -= w;
      if (roll <= 0) return v;
    }
    return pairs[pairs.length - 1][0];
  }
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

// Deterministic generator for a namespaced key, e.g. rngFor(seed, 'cell', 3, 7)
export function rngFor(seed, ...keys) {
  return new Rng(mulberry32(xmur3(seed + '|' + keys.join('|'))()));
}

// Non-deterministic-ish runtime rng (still seedable for tests)
export function liveRng(seedStr) {
  return new Rng(mulberry32(xmur3(seedStr)()));
}

export function randomSeed() {
  const words = ['ash', 'rust', 'ember', 'frost', 'dust', 'grim', 'pale', 'hollow', 'stray', 'murk'];
  const n = Math.floor(Math.random() * 9999);
  const w1 = words[Math.floor(Math.random() * words.length)];
  const w2 = words[Math.floor(Math.random() * words.length)];
  return `${w1}-${w2}-${n}`;
}
