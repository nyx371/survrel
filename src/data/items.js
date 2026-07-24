// Item catalog. kind: food | drink | med | wear | tool | misc
// use effects apply immediately; wear items are passive while carried (worn).

export const ITEMS = {
  canned_food: { name: 'Canned food', icon: 'canned_food', kind: 'food', hunger: 35, energy: 5, flavor: 'Label long gone. Dented, not swollen — the good kind of mystery.' },
  cracker: { name: 'Crackers', icon: 'cracker', kind: 'food', hunger: 15, energy: 3, flavor: 'Stale into a new kind of durability.' },
  chocolate: { name: 'Chocolate', icon: 'chocolate', kind: 'food', hunger: 10, energy: 15, flavor: 'Bloomed white with age. Sugar keeps you moving when nothing else will.' },
  berries: { name: 'Dried berries', icon: 'berries', kind: 'food', hunger: 12, energy: 8, flavor: 'A handful of sweetness from a kinder season.' },
  water: { name: 'Water bottle', icon: 'water', kind: 'drink', hunger: 4, energy: 8, flavor: 'Clear enough. You’ve drunk worse.' },
  soda: { name: 'Flat soda', icon: 'soda', kind: 'drink', hunger: 6, energy: 12, flavor: 'Warm and flat. Sugar and caffeine, which is to say: distance.' },
  bandage: { name: 'Bandage', icon: 'bandage', kind: 'med', health: 15, flavor: 'Sterile wrapping, worth more than money ever was.' },
  medkit: { name: 'First aid kit', icon: 'medkit', kind: 'med', health: 40, flavor: 'A real kit: sutures, antiseptic, the works.' },
  pills: { name: 'Medicine', icon: 'pills', kind: 'med', health: 25, flavor: 'Assorted pharmacy stock. You read labels carefully now.' },
  jacket: { name: 'Heavy jacket', icon: 'jacket', kind: 'wear', warmth: 12, flavor: 'Somebody’s good coat. It fits well enough.' },
  scarf: { name: 'Scarf & gloves', icon: 'scarf', kind: 'wear', warmth: 8, flavor: 'Wool, mismatched, indispensable.' },
  sleeping_bag: { name: 'Sleeping bag', icon: 'sleeping_bag', kind: 'gear', flavor: 'Sleeping rough counts as sleeping, with this.' },
  matches: { name: 'Matches', icon: 'matches', kind: 'tool', flavor: 'A box of strike-anywheres. Warmth on demand, once per fire.' },
  crowbar: { name: 'Crowbar', icon: 'crowbar', kind: 'tool', flavor: 'Cold steel with honest weight. Locked doors stop being locked.' },
  flashlight: { name: 'Flashlight', icon: 'flashlight', kind: 'tool', flavor: 'Steady beam while the batteries last.' },
  battery: { name: 'Batteries', icon: 'battery', kind: 'misc', flavor: 'Cells with some life left. Everyone wants these.' },
  rope: { name: 'Rope', icon: 'rope', kind: 'misc', flavor: 'Ten meters of climbing-grade line.' },
  knife: { name: 'Knife', icon: 'knife', kind: 'tool', flavor: 'Not a weapon, you tell yourself. A tool.' },
  key: { name: 'Odd key', icon: 'key', kind: 'misc', flavor: 'A key without a door, so far.' },
  radio: { name: 'Pocket radio', icon: 'radio', kind: 'misc', flavor: 'Static on every band. Almost every band.' },
  map_scrap: { name: 'Map fragment', icon: 'map', kind: 'misc', flavor: 'A torn city map with someone’s marks on it.' },
};

export function itemName(id) {
  return ITEMS[id] ? ITEMS[id].name : id;
}
