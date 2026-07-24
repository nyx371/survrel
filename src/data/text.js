// Procedural prose. Templates contain {slot} references resolved from TABLES
// (recursively) with a deterministic rng, so every location reads differently
// but identically on every revisit of the same world seed.

export const TABLES = {
  // ---- generic atmosphere fragments -------------------------------------
  decay: [
    'rust-streaked', 'soot-stained', 'water-damaged', 'half-collapsed', 'boarded-up',
    'fire-gutted', 'mold-blackened', 'graffiti-covered', 'bullet-pocked', 'sagging',
    'ivy-choked', 'wind-scoured', 'salt-bleached', 'subsiding', 'gutted',
  ],
  debris: [
    'burned-out cars', 'toppled vending machines', 'drifts of wet newspaper',
    'a spill of broken glass', 'abandoned luggage', 'a snarl of downed power lines',
    'shopping carts fused with rust', 'sandbags from some forgotten barricade',
    'a mattress swollen with rain', 'shoes — always single shoes', 'shell casings',
    'a child’s tricycle on its side', 'crates split open and picked clean',
    'a drift of office paper gone gray', 'a delivery van on flat tires',
    'a tangle of hospital gurneys', 'stained tarpaulins weighted with brick',
    'a barricade of furniture that failed', 'suitcases burst along the curb',
  ],
  sound: [
    'Wind moves through broken windows somewhere above', 'A loose sign creaks on one bolt',
    'Water drips steadily out of sight', 'Far off, something metal falls and settles',
    'The silence has a weight to it', 'A crow calls once and goes quiet',
    'Plastic sheeting snaps somewhere in the wind', 'You can hear your own breathing',
    'A distant moan rides the wind — hard to say how far', 'Glass crunches under your boots',
    'Somewhere a door bangs open and shut, open and shut',
    'Something shifts behind a wall and does not shift again',
    'A low hum you can’t place stops the moment you notice it',
    'Pigeons burst from a window above and your heart goes with them',
  ],
  smell: [
    'mildew and old smoke', 'rain on concrete', 'rot, faint but persistent',
    'rust and stagnant water', 'ash', 'diesel gone stale', 'wet cardboard',
    'something sweet and wrong beneath everything else',
    'cold meat and copper', 'earth, turned recently',
  ],
  skyline: [
    'The tower blocks downtown stand like gravestones against the sky',
    'Smoke has not risen from the skyline in a long time',
    'A traffic light hangs dead over the intersection, swaying',
    'Antennae bristle from the rooftops, all of them listening to nothing',
    'The clouds move fast up there, indifferent',
    'Every window in every tower is a black socket watching the street',
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
    '{streetname}, {direction}. Doors stand open the whole length of the block, and nothing has closed them {timeago}.',
    'The middle of {streetname} is the only place with clear sightlines, so that is where you walk, exposed and quiet.',
    'On {streetname} the streetlights lean at odd angles, and {debris} makes islands of shadow you give a wide berth.',
  ],
  intersection_open: [
    'The intersection of {streetname} and {streetname2}. {skyline}. A tangle of {debris} blocks one corner.',
    'Two roads cross here — {streetname} and {streetname2}. Street signs still name them for nobody. {skyline}.',
    '{streetname} meets {streetname2} at a wide, empty crossing. Traffic died mid-turn here, leaving {debris} where the lanes tangle.',
    'A four-way crossing, {streetname} and {streetname2}. From here you can see three blocks in every direction, and every one of them is still.',
  ],
  alley_open: [
    'A narrow alley squeezed between {decay} walls. Dumpsters line one side, lids frozen open. It smells of {smell}.',
    'The alley is barely wide enough for the fire escapes overhead. {debris} fills the far end.',
    'Back-of-house territory: loading doors, {debris}, a drain that has not drained {timeago}.',
    'The walls pinch close here. Someone dragged something down this alley once — the scrape marks are still in the grime, heading away.',
    'A service alley, dark even at noon. Every doorway in it is a place something could stand and wait.',
  ],
  courtyard_open: [
    'A courtyard hemmed in by the backs of buildings. Someone strung tarps here once; they hang in ribbons now. It smells of {smell}.',
    'An interior courtyard, strangely quiet. Planters hold dead stalks. {sound}.',
    'Washing lines cross the courtyard overhead, still hung with clothes gone stiff and gray. Nobody came back for them.',
  ],
  park_open: [
    'A pocket park gone feral. The grass is waist-high and moving in the wind, and you cannot see what moves it.',
    'What used to be a playground. The swing chains are rusted solid. {sound}.',
    'A small park under old trees. The benches face a fountain full of black leaves. Something has flattened a path through the grass.',
  ],
  parking_open: [
    'A parking lot, half full {timeago}. Windshields are white with grime. {debris} between the rows.',
    'A pay lot behind a {decay} office block. The barrier arm is snapped off. {sound}.',
    'Ranks of cars with their doors hanging open, exactly as they were left. Between the rows the sightlines are short and bad.',
  ],
  plaza_open: [
    'A paved plaza with a dry fountain at its center. Pigeon bones and {debris} collect in the basin. {skyline}.',
    'A civic plaza. The message board by the fountain is layered with notices — names, photographs, phone numbers that ring nowhere.',
  ],
  ruins_open: [
    'A building came down here and took its neighbors with it. The rubble field is chest-high in places, spiked with rebar. Things move in the gaps below.',
    'A collapsed block. Floors lie pancaked at your feet, and the smell that seeps up between the slabs is one you have learned not to think about.',
    'Ruins. A staircase climbs three steps out of the rubble and stops in the open air.',
  ],
  market_open: [
    'An open-air market, stalls stripped to their frames. Awning canvas flaps somewhere out of sight, slow, like breathing.',
    'The market square. Scales, crates, a till thrown open — and across the flagstones, a long dark stain the rain has never quite lifted.',
  ],
  underpass_open: [
    'A road dips under the rail line here. The underpass is a throat of darkness with daylight small on the far side, and you cannot see the middle at all.',
    'The underpass drips. Every sound you make comes back doubled from the dark, half a beat late, as though something is repeating it.',
  ],
  cemetery_open: [
    'An old cemetery behind bent iron railings. The stones lean together like conspirators. Some of the ground is not level anymore.',
    'Rows of graves under bare trees. Near the back, earth has been turned in more than one place — coming up, or going down, you don’t look closely enough to say.',
  ],
  construction_open: [
    'A construction site, frozen mid-build. The crane above has been groaning in the wind {timeago}. Plastic sheeting on the scaffolds moves like something pacing.',
    'Half a building, all bones — bare concrete floors open to the wind. Anything could be standing on any of them, watching the street.',
  ],

  // ---- revisit / ambient -------------------------------------------------
  revisit: [
    'You know this place. Nothing has changed except the light.',
    'Familiar ground. Your earlier footprints are still there in the grime.',
    'You’ve passed through here before. It feels no safer the second time.',
    'Back again. The place is as you left it, and it watches you the same way.',
    'You have been here. You check the shadows you checked before, in the same order.',
  ],
  ambient_event: [
    'A sheet of newspaper cartwheels past you down the block.',
    'For a moment you think you hear an engine, far away. Then it’s gone.',
    'A shutter moves somewhere above — just the wind, you tell yourself, and walk faster.',
    'Rats stream out of a drain and vanish under a car. Something startled them.',
    'You stop mid-stride, certain you heard your name. You didn’t. You couldn’t have.',
    'A dog barks twice, streets away, and is cut off mid-bark.',
    'Far behind you, glass breaks. You do not turn around.',
    'The hair on your arms rises for no reason you can find. You change streets anyway.',
  ],

  // ---- search -----------------------------------------------------------
  search_find: [
    'Under {searchspot} you turn up {itemlist}.',
    'You pry open {searchspot} and find {itemlist}.',
    'It takes a while, but {searchspot} gives up {itemlist}.',
    'Wedged behind {searchspot}: {itemlist}.',
    'Someone hid this on purpose — {itemlist}, tucked into {searchspot}. You try not to wonder why they never came back.',
    'Your fingers close on {itemlist}, buried in {searchspot}.',
  ],
  search_empty: [
    'You go through {searchspot} twice. Nothing left but dust and mouse droppings.',
    'Picked clean. Whoever came before you was thorough.',
    'Nothing. Torn packaging and empty tins — the story of everywhere.',
    'You find a photograph of strangers at a lake, and nothing else. You put it back the way it was.',
    'Your hands come away grimy and empty.',
    'Nothing but a smell you disturb and then have to stand in.',
    'Empty. Behind {searchspot}, someone has written a tally on the wall. It stops at nine.',
  ],
  searchspot: [
    'an overturned drawer', 'a jammed cabinet', 'a heap of collapsed shelving',
    'a coat left on a hook', 'a duffel bag someone dropped', 'the counter',
    'a floor vent', 'a desk with its lock already broken', 'stacked boxes gone soft with damp',
    'the back of a closet', 'a chest freezer you open at arm’s length',
    'the space beneath the floorboards', 'a barricade pulled apart plank by plank',
  ],

  // ---- zombies ----------------------------------------------------------
  zed_appear: [
    'Movement — a figure lurches out from behind {debris}, head lolling, and fixes on you.',
    'The smell hits first. Then the shape of it, dragging one ruined leg, coming your way.',
    'It was standing so still you took it for a post. Then its head turns, all at once, wrong.',
    'A wet, deliberate shuffle. One of the dead rounds the corner and sees you.',
    'It comes through the doorway shoulder-first, jaw working, eyes like spoiled milk.',
    'You hear the breathing that isn’t breathing. It is already closer than it should be.',
    'It unfolds from the shadow of {debris} where it has been standing for who knows how long, waiting for exactly this.',
  ],
  zed_chase: [
    'It rounds the corner after you — the same one, head down, unhurried and certain.',
    'You hear the drag of that ruined leg before you see it. It followed. It is still following.',
    'It has not stopped. It shoulders through after you, jaw working, as if no time has passed at all.',
    'The same dead face. It tracked you here, patient as weather.',
    'You bought seconds, not distance. It comes on, exactly as fast as it was always coming.',
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
    'You run without choosing a direction. Your legs choose for you.',
  ],
  flee_scratch: [
    'You wrench free but its nails rake your arm — a hot, ugly line. You run anyway.',
    'It catches your sleeve. You tear loose, losing skin, and sprint.',
    'A grab, a stumble, gravel chewing your palms — you’re up and running, bleeding.',
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

  // ---- rest & sleep ------------------------------------------------------
  sleep_rough: [
    'You wedge yourself out of the wind and let exhaustion take you. Sleep comes in gray, watchful pieces.',
    'You doze with your back to a wall and one hand closed around nothing in particular.',
    'You sleep the way animals sleep now — in fragments, surfacing at every sound, sinking back because the body leaves you no choice.',
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
    'In the dream someone knocks at a door, patiently, for hours. You wake before you open it.',
    'You dream of the city with its lights on, and every window has someone standing in it, perfectly still.',
  ],
  wake: [
    'Dawn comes gray through the gaps. You stretch the cold out of your joints and take stock.',
    'You wake with a start, listen hard — nothing — and breathe again.',
    'Morning. Cold light, stiff back, another day on the count.',
    'You wake and lie still for a long minute, listening to the building settle around you, cataloguing every sound before you move.',
  ],

  // ---- weather ----------------------------------------------------------
  wx_clear: ['The sky is hard and clear.', 'Thin sunlight, no warmth in it.', 'A rare blue sky over the ruins, and you distrust it.'],
  wx_overcast: ['Low cloud presses down on the rooftops.', 'The overcast light makes everything the same color as the concrete.'],
  wx_rain: ['Rain hisses on the pavement and rattles the gutters.', 'A steady rain, cold as meltwater, finds every hole in your clothes.', 'The rain flattens every other sound, which means anything could be close.'],
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
      'The canyons between the towers hold their shadow all day, and the shadow holds its cold.',
    ],
  },
  residential: {
    label: 'The Northside',
    flavor: [
      'Row houses and low apartment blocks, curtains still drawn in some windows.',
      'A neighborhood that emptied out fast — doors stand open all down the block.',
      'Family streets. The chalk hopscotch grids are still on the pavement, fading one rain at a time.',
    ],
  },
  commercial: {
    label: 'The Market District',
    flavor: [
      'Shopfronts and awnings, every window already answered by someone with a brick.',
      'Delivery bays and shuttered stores, looted early and often.',
      'The district was barricaded once, street by street. The barricades all face the wrong ways now.',
    ],
  },
  industrial: {
    label: 'The Works',
    flavor: [
      'Warehouses and rail spurs, chain-link sagging everywhere.',
      'The industrial end of town. Big spaces, big shadows.',
      'Nothing here was built to human scale, and on foot, alone, you feel it.',
    ],
  },
  oldtown: {
    label: 'Old Town',
    flavor: [
      'Narrow brick streets from an older city that outlived the newer one.',
      'Cobbles underfoot, leaning brick facades overhead.',
      'The streets here were laid before cars, before lights — built narrow for a darkness they always expected back.',
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
      'Four floors of homes over a dead intercom. Chalked names and arrows by the door have rained into ghosts.',
      'An apartment block with every window dark. One curtain on the third floor is drawn back, and stays drawn back.',
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
      'A small clinic. The waiting room chairs all face the door, as if mid-announcement.',
    ],
    rooms: ['waiting room', 'exam room', 'supply closet', 'office'],
    loot: [['bandage', 4], ['medkit', 3], ['pills', 3], ['water', 1]],
  },
  hardware: {
    label: 'hardware store', icon: 'crowbar',
    namePat: ['{sfirst} Hardware', 'True Value Tools', 'City Fix Hardware'],
    exterior: [
      'A hardware store, shelves toppled domino-fashion. Useful things may still be under the wreckage.',
      'HARDWARE in honest block letters over a dark doorway. The lock hangs cut.',
    ],
    rooms: ['salesfloor', 'tool aisle', 'stockroom', 'yard'],
    loot: [['crowbar', 3], ['rope', 3], ['flashlight', 2], ['battery', 3], ['matches', 2], ['knife', 1]],
  },
  office: {
    label: 'office building', icon: 'key',
    namePat: ['{sfirst} Plaza offices', 'The {sfirst} Building', '{sfirst} & Partners'],
    exterior: [
      'An office block, lobby turnstiles frozen mid-spin. The dark inside it goes up ten floors.',
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
      'A used bookshop, untouched by looters. Whatever people came to take, it was never this.',
    ],
    rooms: ['shop floor', 'reading nook', 'stock cellar'],
    loot: [['matches', 2], ['chocolate', 1], ['flashlight', 1], ['map_scrap', 2], ['cracker', 1]],
  },
  hotel: {
    label: 'hotel', icon: 'key',
    namePat: ['The {sfirst} Hotel', 'Hotel Meridian', '{sfirst} House Hotel'],
    exterior: [
      'A hotel with its awning collapsed across the steps. The revolving door is wedged with a luggage cart, from the inside.',
      'Six floors of guest rooms, every door behind that entrance a separate unknown. The VACANCY sign has never been more honest.',
    ],
    rooms: ['lobby', 'corridor', 'guest room', 'guest room', 'linen room'],
    loot: [['water', 3], ['soda', 2], ['chocolate', 2], ['key', 2], ['jacket', 1], ['pills', 1], ['sleeping_bag', 1]],
  },
  bar: {
    label: 'bar', icon: 'soda',
    namePat: ['The {sfirst} Tap', 'The Last Call', '{sfirst} Street Tavern'],
    exterior: [
      'A corner bar, door propped with a stool. Whoever drank the last of it did so in the dark, and left the glasses where they stood.',
      'A tavern with its window painted over from inside — recently, in broad, hurried strokes.',
    ],
    rooms: ['barroom', 'back room', 'cellar'],
    loot: [['soda', 3], ['water', 2], ['matches', 2], ['knife', 1], ['key', 1], ['cracker', 1]],
  },
  theater: {
    label: 'theater', icon: 'flashlight',
    namePat: ['The {sfirst} Picture House', 'Rialto Theater', 'The Majestic'],
    exterior: [
      'An old cinema. The marquee still spells half a title, the rest of the letters in a drift on the sidewalk below.',
      'A theater with its doors chained — from the outside. Someone wanted whatever is in there kept in there.',
    ],
    rooms: ['foyer', 'auditorium', 'backstage', 'projection room'],
    loot: [['flashlight', 2], ['battery', 3], ['soda', 2], ['chocolate', 2], ['rope', 1], ['map_scrap', 1]],
  },
  butcher: {
    label: 'butcher’s shop', icon: 'knife',
    namePat: ['{sfirst} & Son Butchers', 'City Meats', 'The Corner Butcher'],
    exterior: [
      'A butcher’s shop, tiles white as teeth behind the broken window. The hooks in the ceiling are empty. All of them.',
      'The butcher’s. Sawdust still on the floor, gone gray. The cold room door at the back is shut, and the shop is very quiet.',
    ],
    rooms: ['shopfront', 'cutting room', 'cold room'],
    loot: [['canned_food', 3], ['knife', 2], ['matches', 1], ['water', 1]],
  },
  bakery: {
    label: 'bakery', icon: 'cracker',
    namePat: ['{sfirst} Street Bakery', 'The Daily Loaf', 'Ovenhouse'],
    exterior: [
      'A bakery. The smell of bread is long gone, but the shape of it haunts the doorway anyway.',
      'A corner bakery, trays still racked in the window, their contents shrunken to dark stones.',
    ],
    rooms: ['shopfront', 'bakehouse', 'flour store'],
    loot: [['cracker', 4], ['berries', 1], ['matches', 2], ['water', 1], ['canned_food', 1]],
  },
  funeral: {
    label: 'funeral home', icon: 'night',
    namePat: ['{sfirst} & Sons Funeral Home', 'Evergreen Funeral Services', 'The {sfirst} Chapel of Rest'],
    exterior: [
      'A funeral home, curtains drawn with professional neatness. Of every building on the street, this one alone looks ready for what happened.',
      'A chapel of rest. The hearse in the drive has its back doors open, and has had for a long time.',
    ],
    rooms: ['parlor', 'chapel of rest', 'preparation room', 'casket store'],
    loot: [['matches', 2], ['scarf', 2], ['key', 1], ['pills', 1], ['flashlight', 1]],
  },
  subway: {
    label: 'subway entrance', icon: 'exit',
    namePat: ['{sfirst} Station', '{sfirst} Street Underground'],
    exterior: [
      'Steps descend to a subway station. The dark down there is total, and the air that rises from it is cold and moves on its own.',
      'A subway entrance, half grated shut. Sounds come up from the platforms sometimes. Trains stopped running {timeago}.',
    ],
    rooms: ['mezzanine', 'platform', 'service corridor'],
    loot: [['battery', 2], ['flashlight', 2], ['map_scrap', 2], ['soda', 2], ['water', 1], ['rope', 1]],
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
  flat: ['Somebody’s home, left mid-thought: a mug on the table, a coat missing off its hook.', 'A small flat. The bed is made. That gets to you more than the mess ever does.', 'A ransacked flat — drawers out, cushions gutted. Maybe they missed something.', 'A flat where the table is set for two, plates furred with dust, chairs pushed back in a hurry.'],
  salesfloor: ['Aisles in disarray, shelves stripped to the brackets in places.', 'The sales floor. Baskets abandoned mid-aisle mark the moment it all stopped.'],
  stockroom: ['A stockroom of steel shelving and collapsed cardboard.', 'The stockroom is dark and close. Boxes have been opened and cherry-picked.'],
  office: ['A back office: safe open and empty, paperwork everywhere like fallen leaves.', 'A cramped office. The chair faces the door.'],
  dispensary: ['Behind the counter, the pharmacy shelves — mostly swept clean, but pill bottles roll underfoot.'],
  'waiting room': ['Rows of bolted chairs and a reception desk with a sign-in sheet from the last day.'],
  'exam room': ['An exam table, paper roll half-pulled. A poster explains a heart in cross-section to nobody.'],
  'supply closet': ['A closet of labeled bins, lids askew — someone was here in a hurry.'],
  kitchen: ['A commercial kitchen, pans still on the range. The walk-in door is shut. You leave it shut.', 'A kitchen. Knives are gone from the block, of course.'],
  pantry: ['A pantry of empty tins and one shelf that might not be empty.'],
  lobby: ['A lobby of dead plants and a directory board with half its letters gone.', 'The lobby holds the deep, furniture-and-dust silence of a place that has not heard a voice in a long time.'],
  'open-plan floor': ['A field of cubicles. Monitors stare with dead gray faces. Coats still hang on some chairs.'],
  'break room': ['A break room. The vending machine lies face down where it was dragged and forced. The fridge door is shut, and the smell around it says leave it shut.'],
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
  'rack floor': ['Pallet racks to the ceiling. Most shrink-wrap is slashed, but the high shelves are out of easy reach — for looters, and for you.'],
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
  corridor: ['A hotel corridor. Doors and doors and doors, and a service trolley abandoned halfway down, still stocked.', 'The corridor runs out of your light in both directions. Every third door stands open onto dark.'],
  'guest room': ['A guest room, bed still turned down. Someone’s reading glasses wait folded on the nightstand.', 'A guest room with the mattress dragged against the door. It didn’t hold. The room is empty now. Mostly you believe that.'],
  'linen room': ['Shelves of folded sheets gone yellow, and the good, clean smell of soap — the last room in the city that smells like before.'],
  barroom: ['The barroom. Glasses still on the tables, chairs where they were pushed back. The mirror behind the bar is broken outward.', 'A long bar in the dark, bottles glinting empty. Someone’s tab is still chalked on the board.'],
  cellar: ['A beer cellar, cold and low-ceilinged. The kegs ring hollow, every one. Something scratches behind the far wall, once.'],
  foyer: ['A cinema foyer. The concession glass is smashed, the popcorn machine furred gray inside.'],
  auditorium: ['Ranked seats descend into absolute dark. The screen hangs in ribbons. You cannot see the back rows, and the back rows may be able to see you.'],
  backstage: ['Backstage: ropes, sandbags, a costume rail. Painted scenery of a sunny street leans against real brick.'],
  'projection room': ['The projection booth. Film reels everywhere, and a small cot in the corner — someone lived up here, above it all, for a while.'],
  shopfront: ['The shopfront. The till stands open, and the daylight from the street doesn’t reach the back wall.'],
  'cutting room': ['The cutting room. The block table is scored deep by years of honest work, and by newer marks that are not the same.'],
  'cold room': ['The cold room. No power, no cold, just the dark and the hooks and a door that wants to swing shut behind you.'],
  bakehouse: ['The bakehouse. Great ovens with their doors open, cold as caves. Flour dust turns your footprints white behind you.'],
  'flour store': ['The flour store — sacks gnawed open at the corners, and droppings everywhere. Something eats well here.'],
  parlor: ['The parlor: heavy curtains, condolence cards still fanned on the sideboard, chairs arranged for a service that never let out.'],
  'chapel of rest': ['The chapel of rest. The candlesticks are dark. The casket at the front has its lid closed, and you leave that exactly as it is.'],
  'preparation room': ['The preparation room. Steel table, drains, instruments in their tray. Everything scrubbed clean, ready for the work that overtook the workers.'],
  'casket store': ['A room of caskets on racks, floor models with the sheen still on them. You count them and stop counting when one of the numbers feels wrong.'],
  mezzanine: ['The station mezzanine. Turnstiles, a dead departures board, and the stairwell down to the platform breathing its cold, moving air.'],
  platform: ['The platform. Your light finds the tunnel mouth at either end and dies in both. From down the line, sometimes, a sound like a door closing.'],
  'service corridor': ['A service corridor behind the platform, cables sagging along the wall. Workers chalked names and dates here. The dates stop together.'],
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
export const SMOKE_HINT = [
  'A thin rope of smoke rises from {bname}. Someone in there is keeping a fire alive.',
  'Light flickers behind a covered window of {bname} — firelight, tended. Someone lives here.',
  'From {bname}, faint but unmistakable: woodsmoke, and something cooking. The living leave signs too.',
];

// Misc lines --------------------------------------------------------------
export const EAT_LINES = [
  'You eat slowly, watching the door.',
  'You eat all of it, mechanically, because the body demands and the body wins.',
  'You make yourself stop halfway and save the rest. Then you don’t.',
];
export const DRINK_LINES = ['You drink. Cold and metallic and gone too fast.', 'You ration it badly and don’t regret it.'];
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
