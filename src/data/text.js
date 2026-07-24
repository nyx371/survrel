// Procedural prose. Templates contain {slot} references resolved from TABLES
// (recursively) with a deterministic rng, so every location reads differently
// but identically on every revisit of the same world seed.

export const TABLES = {
  // ---- generic atmosphere fragments -------------------------------------
  decay: [
    'rust-streaked', 'soot-stained', 'water-damaged', 'half-collapsed', 'boarded-up',
    'fire-gutted', 'mold-blackened', 'graffiti-covered', 'bullet-pocked', 'sagging',
    'ivy-choked', 'wind-scoured',
  ],
  debris: [
    'burned-out cars', 'toppled vending machines', 'drifts of wet newspaper',
    'a spill of broken glass', 'abandoned luggage', 'a snarl of downed power lines',
    'shopping carts fused with rust', 'sandbags from some forgotten barricade',
    'a mattress swollen with rain', 'shoes — always single shoes', 'shell casings',
    'a child’s tricycle on its side', 'crates split open and picked clean',
    'office paper, thousands of pages of it', 'a delivery van on flat tires',
  ],
  sound: [
    'Wind moves through broken windows somewhere above', 'A loose sign creaks on one bolt',
    'Water drips steadily out of sight', 'Far off, something metal falls and settles',
    'The silence has a weight to it', 'A crow calls once and goes quiet',
    'Plastic sheeting snaps somewhere in the wind', 'You can hear your own breathing',
    'A distant moan rides the wind — hard to say how far', 'Glass crunches under your boots',
    'Somewhere a door bangs open and shut, open and shut',
  ],
  smell: [
    'mildew and old smoke', 'rain on concrete', 'rot, faint but persistent',
    'rust and stagnant water', 'ash', 'diesel gone stale', 'wet cardboard',
    'something sweet and wrong beneath everything else',
  ],
  skyline: [
    'The tower blocks downtown stand like gravestones against the sky',
    'Smoke has not risen from the skyline in a long time',
    'A traffic light hangs dead over the intersection, swaying',
    'Antennae bristle from the rooftops, all of them listening to nothing',
    'The clouds move fast up there, indifferent',
  ],
  timeago: [
    'since before the fall', 'for months, maybe longer', 'since the evacuation',
    'since the last convoy left', 'longer than you’ve been counting',
  ],

  // ---- streets ----------------------------------------------------------
  street_open: [
    'The {streetname} runs {direction} here, four lanes of cracked asphalt with {debris} scattered along the median.',
    '{streetname} stretches away {direction}, its parked cars sitting on rotten tires beneath {decay} facades.',
    'This block of {streetname} is choked with {debris}. Faded lane markings disappear under silt and leaves.',
    'A stretch of {streetname}. The buildings lean over the road, {decay}, their windows dark.',
    'You follow {streetname} past {debris}. Grass is coming up through every seam in the pavement.',
  ],
  intersection_open: [
    'The intersection of {streetname} and {streetname2}. {skyline}. A tangle of {debris} blocks one corner.',
    'Two roads cross here — {streetname} and {streetname2}. Street signs still name them for nobody. {skyline}.',
    '{streetname} meets {streetname2} at a wide, empty crossing. Traffic died mid-turn here, leaving {debris} where the lanes tangle.',
  ],
  alley_open: [
    'A narrow alley squeezed between {decay} walls. Dumpsters line one side, lids frozen open. It smells of {smell}.',
    'The alley is barely wide enough for the fire escapes overhead. {debris} fills the far end.',
    'Back-of-house territory: loading doors, {debris}, a drain that has not drained {timeago}.',
  ],
  courtyard_open: [
    'A courtyard hemmed in by the backs of buildings. Someone strung tarps here once; they hang in ribbons now. It smells of {smell}.',
    'An interior courtyard, strangely quiet. Planters hold dead stalks. {sound}.',
  ],
  park_open: [
    'A pocket park gone feral. The grass is waist-high and moving in the wind. A bench sits under a tree that is doing fine without anybody.',
    'What used to be a playground. The swing chains are rusted solid. {sound}.',
  ],
  parking_open: [
    'A parking lot, half full {timeago}. Windshields are white with grime. {debris} between the rows.',
    'A pay lot behind a {decay} office block. The barrier arm is snapped off. {sound}.',
  ],
  plaza_open: [
    'A paved plaza with a dry fountain at its center. Pigeon bones and {debris} collect in the basin. {skyline}.',
  ],

  // ---- revisit / ambient -------------------------------------------------
  revisit: [
    'You know this place. Nothing has changed except the light.',
    'Familiar ground. Your earlier footprints are still there in the grime.',
    'You’ve passed through here before. It feels no safer the second time.',
    'Back again. The place is as you left it.',
  ],
  ambient_event: [
    'A sheet of newspaper cartwheels past you down the block.',
    'For a moment you think you hear an engine, far away. Then it’s gone.',
    'A window shutters somewhere above — just the wind, you tell yourself.',
    'Rats stream out of a drain and vanish under a car.',
    'You pause. Nothing. You keep moving.',
    'A dog barks twice, streets away. First one you’ve heard in days.',
  ],

  // ---- search -----------------------------------------------------------
  search_find: [
    'Under {searchspot} you turn up {itemlist}.',
    'You pry open {searchspot} and find {itemlist}.',
    'It takes a while, but {searchspot} gives up {itemlist}.',
    'Wedged behind {searchspot}: {itemlist}.',
    'Someone missed this — {itemlist}, tucked into {searchspot}.',
  ],
  search_empty: [
    'You go through {searchspot} twice. Nothing left but dust and mouse droppings.',
    'Picked clean. Whoever came before you was thorough.',
    'Nothing. Torn packaging and empty tins — the story of everywhere.',
    'You find a photograph of strangers at a lake, and nothing else worth carrying.',
    'Your hands come away grimy and empty.',
  ],
  searchspot: [
    'an overturned drawer', 'a jammed cabinet', 'a heap of collapsed shelving',
    'a coat left on a hook', 'a duffel bag someone dropped', 'the counter',
    'a floor vent', 'a desk with its lock already broken', 'stacked boxes gone soft with damp',
    'the back of a closet',
  ],

  // ---- zombies ----------------------------------------------------------
  zed_appear: [
    'Movement — a figure lurches out from behind {debris}, head lolling, and fixes on you.',
    'The smell hits first. Then the shape of it, dragging one ruined leg, coming your way.',
    'It was standing so still you took it for a post. Then its head turns, all at once, wrong.',
    'A wet, deliberate shuffle. One of the dead rounds the corner and sees you.',
    'It comes through the doorway shoulder-first, jaw working, eyes like spoiled milk.',
  ],
  zed_present: [
    'It is still here, between you and the way you came, swaying.',
    'The dead thing stumbles toward you, faster than it has any right to be.',
    'It drags itself closer. There is no reasoning in what’s left of its face.',
  ],
  flee_ok: [
    'You break for the gap and make it — lungs burning, boots skidding on grit.',
    'You feint left, go right, and are gone before it finishes turning.',
    'You vault {debris} and don’t look back until the sound of it fades.',
    'You slip away, heart slamming, its moan trailing after you.',
  ],
  zed_lost: [
    'You stop, chest heaving, and listen. Nothing. You’ve lost it.',
    'The moaning fades behind you, then the shuffling, then everything. It’s not following.',
    'You watch your backtrail for a long moment. Empty. Safe — for the word’s current value.',
    'No footsteps but your own. The dead have lost your scent.',
  ],
  zed_left: [
    'The dead thing has shambled off after some other sound. The way is clear.',
    'When you look again, it’s gone — drawn away by something you didn’t hear. You breathe.',
  ],
  flee_scratch: [
    'You wrench free but its nails rake your arm — a hot, ugly line. You run anyway.',
    'It catches your sleeve. You tear loose, losing skin, and sprint.',
    'A grab, a stumble, gravel chewing your palms — you’re up and running, bleeding.',
  ],

  // ---- rest & sleep ------------------------------------------------------
  sleep_rough: [
    'You wedge yourself out of the wind and let exhaustion take you. Sleep comes in gray, watchful pieces.',
    'You doze with your back to a wall and one hand closed around nothing in particular.',
  ],
  sleep_safe: [
    'For once you sleep like the world hasn’t ended — deep, black, dreamless.',
    'Somebody keeps watch, so you actually sleep. You’d forgotten what that was like.',
  ],
  dream: [
    'You dream of traffic noise and wake grateful, then ashamed of it.',
    'You dream of a kitchen, and bread, and someone laughing in the next room.',
    'In the dream the streets are full and nobody is running.',
    'You don’t remember the dream, only that you didn’t want to leave it.',
  ],
  wake: [
    'Dawn comes gray through the gaps. You stretch the cold out of your joints and take stock.',
    'You wake with a start, listen hard — nothing — and breathe again.',
    'Morning. Cold light, stiff back, another day on the count.',
  ],

  // ---- weather ----------------------------------------------------------
  wx_clear: ['The sky is hard and clear.', 'Thin sunlight, no warmth in it.', 'A rare blue sky over the ruins.'],
  wx_overcast: ['Low cloud presses down on the rooftops.', 'The overcast light makes everything the same color as the concrete.'],
  wx_rain: ['Rain hisses on the pavement and rattles the gutters.', 'A steady rain, cold as meltwater, finds every hole in your clothes.'],
  wx_snap: ['The cold has teeth today. Your breath hangs in front of you.', 'A killing frost silvers everything. The puddles are iron.'],
};

// Street naming ----------------------------------------------------------
export const STREET_FIRST = [
  'Ash', 'Birch', 'Cedar', 'Elm', 'Willow', 'Harbor', 'Foundry', 'Mercer',
  'Calder', 'Halsey', 'Vane', 'Crown', 'Orchard', 'Slate', 'Winter', 'Beacon',
  'Garrison', 'Milton', 'Rook', 'Ferris', 'Alder', 'Copper', 'Grange', 'Holt',
];
export const STREET_KIND_H = ['Street', 'Street', 'Road', 'Row', 'Way'];
export const STREET_KIND_V = ['Avenue', 'Avenue', 'Boulevard', 'Lane'];

export const DISTRICTS = {
  downtown: {
    label: 'Downtown',
    flavor: [
      'Glass towers, most of their glass on the sidewalk.',
      'The commercial heart of the city, stopped mid-beat.',
    ],
  },
  residential: {
    label: 'The Northside',
    flavor: [
      'Row houses and low apartment blocks, curtains still drawn in some windows.',
      'A neighborhood that emptied out fast — doors stand open all down the block.',
    ],
  },
  commercial: {
    label: 'The Market District',
    flavor: [
      'Shopfronts and awnings, every window a question already answered by someone with a brick.',
      'Delivery bays and shuttered stores, looted early and often.',
    ],
  },
  industrial: {
    label: 'The Works',
    flavor: [
      'Warehouses and rail spurs, chain-link sagging everywhere.',
      'The industrial end of town. Big spaces, big shadows.',
    ],
  },
  oldtown: {
    label: 'Old Town',
    flavor: [
      'Narrow brick streets from an older city that outlived the newer one.',
      'Cobbles underfoot, leaning brick facades overhead.',
    ],
  },
};

// Building catalog --------------------------------------------------------
// rooms: [roomType, ...] first entry is the entrance.
// loot: weighted item pools rolled on search.
export const BUILDINGS = {
  apartment: {
    label: 'apartment building', icon: 'door',
    namePat: ['{sfirst} Court Apartments', 'The {sfirst} Arms', '{sfirst} House flats'],
    exterior: [
      'A {decay} apartment block. Mailboxes hang open in the entry like pulled teeth.',
      'Four floors of homes over a dead intercom. Someone chalked names and arrows by the door, long since rained into ghosts.',
    ],
    rooms: ['stairwell', 'hallway', 'flat', 'flat', 'flat'],
    loot: [['canned_food', 3], ['cracker', 3], ['water', 2], ['soda', 1], ['matches', 2], ['jacket', 1], ['scarf', 1], ['pills', 1], ['key', 1], ['chocolate', 1]],
  },
  grocery: {
    label: 'grocery store', icon: 'canned_food',
    namePat: ['{sfirst} Market', 'Family Grocer', 'Quickstop Foods', '{sfirst} & Sons Provisions'],
    exterior: [
      'A grocery with its windows gone and its aisles visible from the street, shelves mostly bare.',
      'The sign still promises FRESH. The smell through the door disagrees.',
    ],
    rooms: ['salesfloor', 'stockroom', 'office'],
    loot: [['canned_food', 5], ['cracker', 4], ['water', 4], ['soda', 3], ['chocolate', 2], ['berries', 1], ['matches', 1]],
  },
  pharmacy: {
    label: 'pharmacy', icon: 'pills',
    namePat: ['{sfirst} Pharmacy', 'City Drug', 'Corner Chemist'],
    exterior: [
      'A pharmacy behind a half-lowered security shutter, bent enough to slip under.',
      'The green cross over the door hangs dead. Inside, toppled displays and scattered blister packs.',
    ],
    rooms: ['salesfloor', 'dispensary', 'stockroom'],
    loot: [['bandage', 4], ['pills', 4], ['medkit', 2], ['water', 1], ['soda', 1]],
  },
  clinic: {
    label: 'clinic', icon: 'medkit',
    namePat: ['{sfirst} Street Clinic', 'Eastgate Medical', 'Walk-In Clinic'],
    exterior: [
      'A walk-in clinic, doors wedged with a wheelchair. Triage tape is still strung across the lot.',
      'A small clinic. The waiting room chairs are all facing the door, as if mid-announcement.',
    ],
    rooms: ['waiting room', 'exam room', 'supply closet', 'office'],
    loot: [['bandage', 4], ['medkit', 3], ['pills', 3], ['water', 1]],
  },
  hardware: {
    label: 'hardware store', icon: 'crowbar',
    namePat: ['{sfirst} Hardware', 'True Value Tools', 'City Fix Hardware'],
    exterior: [
      'A hardware store, shelves toppled domino-fashion. Useful things may still be under the wreckage.',
      'HARDWARE in honest block letters. The padlock aisle was looted first, which tells you something.',
    ],
    rooms: ['salesfloor', 'tool aisle', 'stockroom', 'yard'],
    loot: [['crowbar', 3], ['rope', 3], ['flashlight', 2], ['battery', 3], ['matches', 2], ['knife', 1]],
  },
  office: {
    label: 'office building', icon: 'key',
    namePat: ['{sfirst} Plaza offices', 'The {sfirst} Building', '{sfirst} & Partners'],
    exterior: [
      'An office block, lobby turnstiles frozen mid-spin. Nobody looted spreadsheets.',
      'Glass doors, one starred with cracks. A directory lists firms that no longer exist anywhere.',
    ],
    rooms: ['lobby', 'open-plan floor', 'break room', 'corner office'],
    loot: [['cracker', 2], ['soda', 3], ['water', 2], ['battery', 1], ['flashlight', 1], ['key', 1], ['chocolate', 2]],
  },
  cafe: {
    label: 'café', icon: 'soda',
    namePat: ['Café {sfirst}', 'The Copper Cup', '{sfirst} Street Diner', 'Rise & Grind'],
    exterior: [
      'A café with chairs still stacked from a closing shift that never reopened.',
      'A diner. The specials board offers a soup you sometimes still think about.',
    ],
    rooms: ['dining room', 'kitchen', 'pantry'],
    loot: [['cracker', 3], ['canned_food', 2], ['water', 2], ['soda', 2], ['chocolate', 1], ['matches', 2], ['berries', 1]],
  },
  gasstation: {
    label: 'gas station', icon: 'fire',
    namePat: ['{sfirst} Fuel & Go', 'Octane Stop', 'The Last Pump'],
    exterior: [
      'A gas station canopy over dry pumps. The kiosk glass is a spiderweb held together by stickers.',
      'Fuel pumps with the hoses cut. The mini-mart behind them is dark.',
    ],
    rooms: ['kiosk', 'storeroom', 'garage bay'],
    loot: [['soda', 3], ['cracker', 3], ['chocolate', 2], ['matches', 2], ['battery', 2], ['rope', 1], ['crowbar', 1]],
  },
  police: {
    label: 'police substation', icon: 'danger',
    namePat: ['Precinct 9 substation', 'District Police Post'],
    exterior: [
      'A police substation behind sandbags. The barricade held; whatever it held against is gone.',
      'A squad car sits on its rims out front. The station door hangs by one hinge.',
    ],
    rooms: ['front desk', 'bullpen', 'holding cell', 'armory cage'],
    loot: [['flashlight', 3], ['battery', 2], ['bandage', 2], ['knife', 2], ['key', 2], ['radio', 1]],
  },
  school: {
    label: 'school', icon: 'map',
    namePat: ['{sfirst} Elementary', '{sfirst} Secondary School'],
    exterior: [
      'A school that was an evacuation point once — the routing signs are still zip-tied to the fence.',
      'Long brick school building. Paper snowflakes are still taped inside one window.',
    ],
    rooms: ['entrance hall', 'gymnasium', 'cafeteria kitchen', 'nurse’s office', 'classroom'],
    loot: [['canned_food', 2], ['cracker', 3], ['water', 3], ['bandage', 2], ['pills', 1], ['chocolate', 1], ['sleeping_bag', 1]],
  },
  warehouse: {
    label: 'warehouse', icon: 'backpack',
    namePat: ['Bay 7 Storage', '{sfirst} Freight & Storage', 'Interstate Logistics'],
    exterior: [
      'A warehouse with its roller door crowbarred halfway up, frozen mid-yawn.',
      'Pallet racks visible through a personnel door. Big, dark, echoing.',
    ],
    rooms: ['loading dock', 'rack floor', 'foreman’s office', 'back room'],
    loot: [['rope', 3], ['canned_food', 2], ['crowbar', 2], ['battery', 2], ['sleeping_bag', 2], ['flashlight', 1], ['water', 2]],
  },
  church: {
    label: 'church', icon: 'trust',
    namePat: ['St. {sfirst}’s', 'First Congregational', 'The Old Chapel'],
    exterior: [
      'A stone church, doors open. Churches were shelters, at the end. Some still are.',
      'A chapel with candle stubs melted onto the steps like something spilled.',
    ],
    rooms: ['nave', 'vestry', 'basement hall'],
    loot: [['matches', 3], ['water', 2], ['canned_food', 2], ['bandage', 1], ['sleeping_bag', 1], ['scarf', 1]],
  },
  laundromat: {
    label: 'laundromat', icon: 'jacket',
    namePat: ['Sudsy’s', '{sfirst} Wash & Fold', '24hr Coin Laundry'],
    exterior: [
      'A laundromat, machines standing open. Clothes nobody came back for sit in neat, moldering piles.',
    ],
    rooms: ['machine floor', 'back office'],
    loot: [['jacket', 3], ['scarf', 3], ['soda', 1], ['key', 1], ['chocolate', 1]],
  },
  bookshop: {
    label: 'bookshop', icon: 'map',
    namePat: ['{sfirst} Books', 'The Dog-Eared Page', 'Secondhand Prose'],
    exterior: [
      'A used bookshop. Paper is kindling now, which makes the place feel like a bank vault nobody robbed.',
    ],
    rooms: ['shop floor', 'reading nook', 'stock cellar'],
    loot: [['matches', 2], ['chocolate', 1], ['flashlight', 1], ['map_scrap', 2], ['cracker', 1]],
  },
};

// Room prose by room type -------------------------------------------------
export const ROOM_DESC = {
  default: [
    'A {decay} room. {sound}.',
    'Dust sheets every surface in here. It smells of {smell}.',
  ],
  stairwell: ['A concrete stairwell, tags overlapping tags. Every landing is a blind corner.', 'The stairwell echoes. A stroller is parked on the half-landing, empty.'],
  hallway: ['A hallway of numbered doors, some open, some kicked open — different things.', 'Carpet gone crunchy with damp. Doors stretch away into the dark.'],
  flat: ['Somebody’s home, left mid-thought: a mug on the table, a coat missing off its hook.', 'A small flat. The bed is made. That gets to you more than the mess ever does.', 'A ransacked flat — drawers out, cushions gutted. Maybe they missed something.'],
  salesfloor: ['Aisles in disarray, shelves stripped to the brackets in places.', 'The sales floor. Baskets abandoned mid-aisle mark the moment it all stopped.'],
  stockroom: ['A stockroom of steel shelving and collapsed cardboard.', 'The stockroom is dark and close. Boxes have been opened and cherry-picked.'],
  office: ['A back office: safe open and empty, paperwork everywhere like fallen leaves.', 'A cramped office. The chair faces the door.'],
  dispensary: ['Behind the counter, the pharmacy shelves — mostly swept clean, but pill bottles roll underfoot.'],
  'waiting room': ['Rows of bolted chairs and a reception desk with a sign-in sheet from the last day.'],
  'exam room': ['An exam table, paper roll half-pulled. A poster explains a heart in cross-section to nobody.'],
  'supply closet': ['A closet of labeled bins, lids askew — someone was here in a hurry.'],
  kitchen: ['A commercial kitchen, pans still on the range. The walk-in door is shut. You leave it shut.', 'A kitchen. Knives are gone from the block, of course.'],
  pantry: ['A pantry of empty tins and one shelf that might not be empty.'],
  lobby: ['A lobby of dead plants and a directory board with letters slid to anagram.'],
  'open-plan floor': ['A field of cubicles. Monitors stare with dead gray faces. Coats still hang on some chairs.'],
  'break room': ['A break room: vending machine face down like it was tackled, fridge best left as a sealed unit.'],
  'corner office': ['A corner office with a view of the quiet city. Liquor cabinet open, decanter dry.'],
  kiosk: ['The kiosk: lottery tickets everywhere, register drawer out, cigarette rack bare.'],
  storeroom: ['A storeroom of motor oil, washer fluid and maybe something edible.'],
  'garage bay': ['A single garage bay, car still on the lift, tools scattered where they dropped.'],
  'front desk': ['A duty desk behind ballistic glass, blotter still open to the last shift.'],
  bullpen: ['Desks pushed together into a raft, radios dead in their chargers.'],
  'holding cell': ['A holding cell, door open. Somebody scratched days into the paint — five, then six, then nothing.'],
  'armory cage': ['The armory cage, cut open and stripped. Lockbox keys hang labeled and useless.'],
  'entrance hall': ['An entrance hall lined with tiny coat hooks at knee height.'],
  gymnasium: ['A gymnasium of cots in rows — an evacuation shelter, emptied fast. Blankets still hold the shape of people.'],
  'cafeteria kitchen': ['A cafeteria kitchen, steel counters and enormous empty pots.'],
  'nurse’s office': ['A nurse’s office: eye chart, sticker jar, cot with paper sheet. Cabinets ajar.'],
  classroom: ['A classroom, chairs on desks. The date on the whiteboard is from another world.'],
  'loading dock': ['A loading dock, trailer still nosed in, doors padlocked or gaping by turns.'],
  'rack floor': ['Pallet racks to the ceiling. Most shrink-wrap is slashed, but the high shelves are hard to reach — and hard to loot.'],
  'foreman’s office': ['A glass-walled office overlooking the floor, clipboard hooks all full.'],
  'back room': ['A back room of odds and ends: tarps, drums, a couch that has clearly been slept on.'],
  nave: ['The nave. Pews shoved into barricade lines, then shoved back into rows by someone who cared.', 'Candle smoke ghosts on the ceiling. Light through broken glass moves across the floor.'],
  vestry: ['A vestry of robes and hymnals, and a kettle someone kept using long after the end.'],
  'basement hall': ['A church basement: folding tables, a coffee urn, cots along the wall. Shelter architecture.'],
  'machine floor': ['Ranks of washers with their mouths open. Coins glitter inside the change machine’s guts.'],
  'shop floor': ['Shelves of swollen paperbacks. The smell of old paper nearly covers everything else.'],
  'reading nook': ['Two armchairs and a cold reading lamp. A book waits open, face down, patient.'],
  'stock cellar': ['A cellar of boxed books and one high, dry shelf.'],
  yard: ['A fenced yard of lumber and pipe stock, gate chained but climbable.'],
  'tool aisle': ['The tool aisle, pegboard mostly bare. Heavy things remain — nobody loots what they can’t carry far.'],
};

export const LOCKED_DESC = [
  'The door is locked — solid, deliberate. A crowbar would open it.',
  'Locked. The frame might give to a crowbar.',
  'Someone secured this door before they left. Without a crowbar it stays shut.',
];
export const UNLOCK_DESC = [
  'You set the crowbar, lean, and the frame gives with a crack that echoes too far.',
  'The lock surrenders to the crowbar with a bang like a shot.',
];

// Survivors ---------------------------------------------------------------
export const SURVIVOR_FIRST = [
  'Mara', 'Theo', 'Ida', 'Ruben', 'Sana', 'Cole', 'Petra', 'Yusuf', 'Nadia',
  'Frank', 'June', 'Oskar', 'Lena', 'Dmitri', 'Rosa', 'Ellis',
];
export const SURVIVOR_TRAIT = [
  'quick-eyed and slow to speak', 'wrapped in three coats, all of them someone else’s',
  'with a laugh that seems out of place and welcome', 'who watches the door the whole time',
  'gray with tiredness but steady', 'young, and trying hard not to look it',
  'who keeps a hand near a wrench at all times', 'with a voice sanded down to a whisper',
];
export const SURVIVOR_ROLES = {
  medic: {
    label: 'medic', icon: 'medkit',
    intro: '{name} was a nurse, before. Their corner is neat: bandage rolls in tins, instruments boiled and lined up on a cloth.',
    tip: 'clinics and pharmacies — and check the school, there’s a nurse’s office',
    perk3: 'patches you up whenever you visit',
  },
  scavenger: {
    label: 'scavenger', icon: 'backpack',
    intro: '{name} knows every unlooted corner left in this city, and trades that knowledge carefully.',
    tip: 'high shelves in the warehouse district — nobody loots what they can’t reach',
    perk3: 'marks rich spots on your map',
  },
  cook: {
    label: 'cook', icon: 'hunger',
    intro: '{name} keeps a stockpot going over a can-fire. It smells better than anything has in months.',
    tip: 'café pantries and the school cafeteria — big kitchens hide big tins',
    perk3: 'feeds you a hot meal whenever you visit',
  },
  radio_op: {
    label: 'radio operator', icon: 'radio',
    intro: '{name} nurses a hand-crank radio, scanning static for voices. Sometimes, they say, there are voices.',
    tip: 'where the dead are drifting — they follow noise, so listen before you cross',
    perk3: 'warns you where the dead are thickest',
  },
  watchman: {
    label: 'watchman', icon: 'flashlight',
    intro: '{name} keeps watch from a high window with a flask of cold tea and endless patience.',
    tip: 'moving at dawn — the dead go torpid in the cold hours',
    perk3: 'lets you sleep under their watch, safe as it gets',
  },
  mechanic: {
    label: 'mechanic', icon: 'crowbar',
    intro: '{name} is halfway inside an engine that will never run again, out of habit or hope.',
    tip: 'garages and loading docks — toolboxes get overlooked',
    perk3: 'keeps your gear in good repair',
  },
};
export const SURVIVOR_MEET = [
  'A voice stops you cold: “Far enough. Hands where I can see them.” Then, seeing you’re alive: “…Okay. Okay. Sorry. Can’t be too careful.”',
  'You nearly walk past before you see them — still, quiet, watching you decide what you are.',
  'They step into view with empty hands raised. “Alive? Good. The other kind doesn’t knock.”',
];
export const SURVIVOR_TALK_T0 = [
  '“No offense, but I don’t know you. Times being what they are.” They keep their distance, but they don’t tell you to leave.',
  '“Passing through? Fine. Everybody’s passing through.” Their eyes flick to your pack and away.',
];
export const SURVIVOR_TALK_T1 = [
  '“You came back. Most don’t.” They almost smile.',
  'They nod you over. A little less distance this time.',
];
export const SURVIVOR_TALK_T2 = [
  '“Sit. Warm up. You’re one of the good ones — I keep a short list.”',
  'They hand you a tin mug of something hot without being asked.',
];
export const SURVIVOR_TALK_T3 = [
  '“You need a place, you come here. Day or night. That’s not a small thing, so don’t make me regret it.”',
  '“Family’s a strong word. But you’re on the right side of the door, far as I’m concerned.”',
];
export const SURVIVOR_THANKS = [
  'They take it with both hands, like it might evaporate. “I won’t forget this.”',
  'For a second their guard drops all the way. “…Thank you. Really.”',
  '“You didn’t have to. That’s the point, isn’t it? Nobody has to, anymore.”',
];
export const SURVIVOR_NEED_LINE = {
  canned_food: '“Food’s the thing. Anything canned. I can’t leave this spot long enough to look.”',
  water: '“Water. Clean water. I’m down to boiling puddles.”',
  bandage: '“Bandages, if you ever find spare. I’m using boiled shirts.”',
  medkit: '“Someone here is hurt worse than I can fix with what I’ve got. A real med kit would change things.”',
  pills: '“Meds. The kind in the little bottles. Doesn’t matter the label, I know how to read them.”',
  battery: '“Batteries. The radio eats them and the radio is the only thing keeping hope on life support.”',
  rope: '“Rope, believe it or not. Getting to the good floors means climbing now.”',
  matches: '“Fire. Matches, a lighter, anything. Cold’s a slower bite than the dead, but it bites.”',
};

// Misc lines --------------------------------------------------------------
export const EAT_LINES = [
  'You eat slowly, watching the door.',
  'It’s not good, exactly, but it’s food, exactly.',
  'You make yourself stop halfway and save the rest. Then you don’t.',
];
export const DRINK_LINES = ['You drink. Cold and metallic and perfect.', 'You ration it badly and don’t regret it.'];
export const TOO_TIRED = [
  'Your legs simply refuse. You need rest, or food, before anything else.',
  'The world grays at the edges. Not another step without rest.',
];
export const COLD_WARNING = [
  'Your fingers have gone clumsy with cold. Find warmth, soon.',
  'Shivering in waves now. The cold is winning.',
];
export const HUNGER_WARNING = [
  'Hunger has moved from ache to fact. You need to eat.',
  'Your stomach growls loud enough to worry about.',
];
export const DEATH_COLD = ['The cold stops hurting, which is how you know. You sit down, just for a minute.'];
export const DEATH_HUNGER = ['Your body has been spending what it doesn’t have for days. The ledger closes.'];
export const DEATH_ZED = ['The last thing is weight, and cold hands, and the pavement against your cheek.'];

// Fill {slots} in a template from TABLES (one level of recursion is enough
// for our data). extra: map of slot -> literal string.
export function fill(rng, template, extra = {}) {
  let out = template;
  for (let depth = 0; depth < 3; depth++) {
    if (!/\{(\w+)\}/.test(out)) break;
    out = out.replace(/\{(\w+)\}/g, (m, key) => {
      if (extra[key] !== undefined) return extra[key];
      const table = TABLES[key];
      if (table) return rng.pick(table);
      return m;
    });
  }
  return out;
}

export function pickFill(rng, tableName, extra = {}) {
  const t = TABLES[tableName];
  if (!t) return '';
  return fill(rng, rng.pick(t), extra);
}
