// Newest entry first. Bump with every user-visible change.
// When bumping, also update the ?v= query on style.css and main.js in
// index.html so browsers fetch the new files immediately.
export const CHANGELOG = [
  {
    v: '0.06',
    note: 'The hunt: the dead now track you between places, and the text tells you when it’s the same one still coming. A darker, larger city — hotels, theaters, subways, cemeteries, funeral homes and more — plus smoke over survivor shelters so the living can be found.',
  },
  {
    v: '0.05',
    note: 'Dock polish: bolder compass arrows, icon-only standard buttons in a fixed row (pack · search · rest · fire · sleep · map), bigger chip text, and room actions slide sideways instead of stacking.',
  },
  {
    v: '0.04',
    note: 'One story stream: everything that happens flows into a single scrollable journal, with a fixed action dock below — compass row plus standard actions in steady slots, energy costs on every button.',
  },
  {
    v: '0.03',
    note: 'The game now tells you plainly when you’ve shaken the dead off, and the page no longer zooms or selects text when you tap around.',
  },
  {
    v: '0.02',
    note: 'Prose-first mobile layout: the scene text keeps the screen, movement is a compact compass row, and new versions now reach your browser without a stale cache.',
  },
  {
    v: '0.01',
    note: 'First city: procedural streets, buildings and rooms, roaming zombies, survivors you can win over, day-count survival, auto-save.',
  },
];

export const VERSION = CHANGELOG[0].v;
export const LATEST_NOTE = CHANGELOG[0].note;
