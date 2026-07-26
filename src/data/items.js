// Item catalog. kind: food | drink | med | wear | tool | misc
// use effects apply immediately; wear items are passive while carried (worn).
// Flavor text follows the voice guide in data/text.js: plain, concrete, no jokes.

export const ITEMS = {
  canned_food: { name: 'Canned food', icon: 'canned_food', kind: 'food', hunger: 35, energy: 5, flavor: 'The label is gone. The tin is dented but not swollen.' },
  cracker: { name: 'Crackers', icon: 'cracker', kind: 'food', hunger: 15, energy: 3, flavor: 'Stale but intact in their wax paper.' },
  chocolate: { name: 'Chocolate', icon: 'chocolate', kind: 'food', hunger: 10, energy: 15, flavor: 'Bloomed white with age. Still edible.' },
  berries: { name: 'Dried berries', icon: 'berries', kind: 'food', hunger: 12, energy: 8, flavor: 'A handful of dried berries in a sealed bag.' },
  water: { name: 'Water bottle', icon: 'water', kind: 'drink', hunger: 4, energy: 8, flavor: 'Sealed and clear enough to drink.' },
  soda: { name: 'Flat soda', icon: 'soda', kind: 'drink', hunger: 6, energy: 12, flavor: 'Warm and flat. Sugar and caffeine.' },
  bandage: { name: 'Bandage', icon: 'bandage', kind: 'med', health: 15, flavor: 'Sterile wrapping, still sealed.' },
  medkit: { name: 'First aid kit', icon: 'medkit', kind: 'med', health: 40, flavor: 'A full kit: sutures, antiseptic, dressings.' },
  pills: { name: 'Medicine', icon: 'pills', kind: 'med', health: 25, flavor: 'Assorted pharmacy stock, labels intact.' },
  jacket: { name: 'Heavy jacket', icon: 'jacket', kind: 'wear', warmth: 12, flavor: 'Somebody’s good winter coat. It fits.' },
  scarf: { name: 'Scarf & gloves', icon: 'scarf', kind: 'wear', warmth: 8, flavor: 'Wool, mismatched, warm.' },
  sleeping_bag: { name: 'Sleeping bag', icon: 'sleeping_bag', kind: 'gear', flavor: 'Rated for cold weather. Sleeping rough is survivable in it.' },
  matches: { name: 'Matches', icon: 'matches', kind: 'tool', flavor: 'A box of strike-anywheres. One fire per box, if you’re careful.' },
  crowbar: { name: 'Crowbar', icon: 'crowbar', kind: 'tool', flavor: 'Cold steel with real weight. Locked doors stop being locked.' },
  flashlight: { name: 'Flashlight', icon: 'flashlight', kind: 'tool', flavor: 'A steady beam, while the batteries last.' },
  battery: { name: 'Batteries', icon: 'battery', kind: 'misc', flavor: 'Cells with some charge left.' },
  rope: { name: 'Rope', icon: 'rope', kind: 'misc', flavor: 'Ten meters of climbing-grade line.' },
  knife: { name: 'Knife', icon: 'knife', kind: 'tool', flavor: 'A short fixed blade, still sharp.' },
  bottle: { name: 'Glass bottle', icon: 'soda', kind: 'tool', flavor: 'Empty, and heavy enough to throw far. Breaking glass carries.' },
  key: { name: 'Odd key', icon: 'key', kind: 'misc', flavor: 'A key without a door, so far.' },
  radio: { name: 'Pocket radio', icon: 'radio', kind: 'misc', flavor: 'Static on every band. Almost every band.' },
  map_scrap: { name: 'Map fragment', icon: 'map', kind: 'misc', flavor: 'A torn city map with someone’s marks on it.' },
};

export function itemName(id) {
  return ITEMS[id] ? ITEMS[id].name : id;
}
