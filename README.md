# SURVREL — a city, after

A procedural, text-driven survival game. You wake up alone in a small
post-apocalyptic city and try to live through as many days as you can.

## Play

No build step, no dependencies. Serve the folder and open it:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

(Any static file server works; ES modules just need to be served over HTTP.)

Progress auto-saves to `localStorage` after every turn. Dying clears the save
and shows how many days you lasted. The `↻` button starts a fresh city.

## How it plays

- **Energy** is the currency of action. Moving, searching and prying doors all
  spend it; **sleep**, **rest**, and food give it back.
- **Health**, **hunger** and **warmth** are the other three dials. Hunger and
  cold drain health; fires, jackets, shelter and hot meals push back.
- Each turn advances the clock. Nights are cold and dark; searching in the
  dark without a flashlight finds less. Weather changes daily.
- **Zombies** roam the city on their own — they wander the streets, follow
  noise, and will walk into a building (and a room) you're standing in.
  When one finds you, running is the only option.
- **Survivors** live out there. Bring them what they need and trust grows:
  tips and map knowledge first, then daily help (healing, hot meals, gear),
  and finally a safe place to sleep.

## Procedural city

Everything derives deterministically from the world seed — streets, alleys,
courtyards, buildings, rooms, loot, prose, survivors. Nothing is stored until
you change it: the save file holds only your footprints (visited/searched
places, opened doors) and the moving actors.

- 13×13 grid: named streets and intersections on the even lines; alleys,
  courtyards, parks and lots between them.
- Five districts (downtown, residential, market, industrial, old town), each
  with its own building mix — pharmacies, groceries, warehouses, churches,
  police posts, apartment blocks…
- Buildings have 2–5 connected rooms; some doors are locked (a crowbar
  opens them, loudly). Loot tables follow the building type.
- Prose is assembled from a large template corpus, seeded per location, so a
  place reads the same every time *you* return to it — and differently in the
  next city.

## Code layout

| File | What it is |
| --- | --- |
| `src/rng.js` | Seeded RNG (xmur3 + mulberry32), namespaced sub-generators |
| `src/data/text.js` | The prose corpus and template filler |
| `src/data/items.js` | Item catalog |
| `src/world.js` | City/building/room generation, loot, weather, spawns |
| `src/game.js` | Game state, turn loop, stats, zombies, survivors, saves |
| `src/ui.js`, `src/main.js` | Minimal icon-driven UI (full re-render per turn) |
| `src/icons.js` | Generated inline SVG registry (see below) |
| `test/smoke.mjs` | Headless test: world integrity + 30 fuzzed runs (`node test/smoke.mjs`) |

## Icon attribution

All symbols are from [game-icons.net](https://game-icons.net), used under
[CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Authors: **Lorc**,
**Delapouite** and **Skoll**. Source SVGs live in `assets/icons/`;
`src/icons.js` inlines them (background stripped, fill set to
`currentColor`).
