// Newest entry first. Bump with every user-visible change.
// When bumping, also update the ?v= query on style.css and main.js in
// index.html so browsers fetch the new files immediately.
export const CHANGELOG = [
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
