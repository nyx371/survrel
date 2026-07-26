// Procedural prose. Templates contain {slot} references resolved from TABLES
// (recursively) with a deterministic rng, so every location reads differently
// but identically on every revisit of the same world seed.
//
// VOICE GUIDE (settled with the author — all new content must conform):
//   Style: lean pulp dread. Plain vocabulary; the unease comes from WHICH
//   details are described, never from HOW they are written.
//   - No personification of objects or weather ("signs name them for nobody").
//   - No poetic metaphor or simile ("the puddles are iron").
//   - Narrator nearly invisible: no feelings, opinions, or self-talk.
//     "You" appears only for plain perception and action.
//   - Horror is plain physical evidence, stated flatly and not lingered on:
//     stains, drag marks, damage, things secured from the wrong side.
//   - Sentences of ordinary length, even rhythm. No fragments, no run-ons.
//   Survivor dialogue is exempt: characters speak in their own voices.

export const TABLES = {
  // ---- generic atmosphere fragments -------------------------------------
  decay: [
    'rust-streaked', 'soot-stained', 'water-damaged', 'half-collapsed', 'boarded-up',
    'fire-gutted', 'mold-blackened', 'graffiti-covered', 'bullet-pocked', 'sagging',
    'ivy-choked', 'wind-scoured', 'subsiding', 'gutted',
  ],
  debris: [
    'burned-out cars', 'toppled vending machines', 'drifts of wet newspaper',
    'a spill of broken glass', 'abandoned luggage', 'a snarl of downed power lines',
    'shopping carts fused with rust', 'sandbags from an old barricade',
    'a mattress swollen with rain', 'single shoes', 'shell casings',
    'a child’s tricycle on its side', 'crates split open and picked clean',
    'a drift of gray office paper', 'a delivery van on flat tires',
    'a tangle of hospital gurneys', 'stained tarpaulins weighted with brick',
    'the remains of a furniture barricade', 'burst suitcases',
  ],
  sound: [
    'Wind moves through broken windows somewhere above', 'A loose sign creaks on one bolt',
    'Water drips steadily out of sight', 'Far off, something metal falls and settles',
    'There is no sound at all from any direction', 'A crow calls once and goes quiet',
    'Plastic sheeting snaps somewhere in the wind', 'You can hear your own breathing',
    'A moan carries from somewhere — several streets away, or closer', 'Glass crunches under your boots',
    'Somewhere a door bangs open and shut, open and shut',
    'Something shifts behind a wall and does not shift again',
    'A low mechanical hum starts somewhere below street level, then stops',
    'Pigeons burst from a window overhead',
  ],
  smell: [
    'mildew and old smoke', 'rain on concrete', 'rot, faint but persistent',
    'rust and stagnant water', 'ash', 'stale diesel', 'wet cardboard',
    'sweet rot beneath everything else', 'cold meat and copper', 'freshly turned earth',
  ],
  skyline: [
    'The tower blocks downtown stand dark against the sky',
    'No smoke has risen from the skyline in a long time',
    'A dead traffic light hangs over the crossing, swaying on its cable',
    'Every window in the towers above is dark',
    'The clouds move fast overhead',
  ],
  timeago: [
    'since before the fall', 'for months, maybe longer', 'since the evacuation',
    'since the last convoy left', 'longer than you have been counting',
  ],

  // ---- streets ----------------------------------------------------------
  street_open: [
    'The {streetname} runs {direction} here, four lanes of cracked asphalt with {debris} scattered along the median.',
    '{streetname} stretches away {direction}, its parked cars sitting on rotten tires beneath {decay} facades.',
    'This block of {streetname} is choked with {debris}. Faded lane markings disappear under silt and leaves.',
    'A stretch of {streetname}. The buildings on both sides are {decay}, and their windows are dark.',
    'You follow {streetname} past {debris}. Grass grows through every seam in the pavement.',
    '{streetname}, running {direction}. Doors stand open the whole length of the block.',
    'Down the center of {streetname} the sightlines are long and clear. {debris} crowds both gutters.',
    'A car sits in the middle of {streetname} with all four doors open and luggage still in the trunk.',
    'Something heavy was dragged along {streetname}. The marks run half the block and end at a storm drain.',
  ],
  intersection_open: [
    'The intersection of {streetname} and {streetname2}. {skyline}. A tangle of {debris} blocks one corner.',
    'Two roads cross here — {streetname} and {streetname2}. The signal boxes are dead, and {debris} rusts against the curb.',
    '{streetname} meets {streetname2} at a wide crossing. Cars stand where they stopped mid-turn, and {debris} fills the lanes between them.',
    'A four-way crossing, {streetname} and {streetname2}. From the center you can see three blocks in every direction, and nothing moves in any of them.',
  ],
  alley_open: [
    'A narrow alley squeezed between {decay} walls. Dumpsters line one side, lids frozen open. It smells of {smell}.',
    'The alley is barely wide enough for the fire escapes overhead. {debris} fills the far end.',
    'Back-of-house territory: loading doors, {debris}, a drain that has not drained {timeago}.',
    'Something heavy was dragged down this alley. The scrape marks are still in the grime, leading away from the street.',
    'A service alley, dark even at noon. Three doorways open off the left side, all of them unlit.',
  ],
  courtyard_open: [
    'A courtyard hemmed in by the backs of buildings. Torn tarps hang from lines strung {timeago}. It smells of {smell}.',
    'An interior courtyard. Planters hold dead stalks. {sound}.',
    'Washing lines cross the courtyard overhead, still hung with clothes gone stiff and gray.',
  ],
  park_open: [
    'A pocket park gone feral, the grass waist-high. A path has been flattened through it recently.',
    'What used to be a playground. The swing chains are rusted solid. {sound}.',
    'A small park under old trees. A collapsed tent stands near the fence with its guylines cut.',
  ],
  parking_open: [
    'A parking lot, half full {timeago}. Windshields are white with grime. {debris} lies between the rows.',
    'A pay lot behind a {decay} office block. The barrier arm is snapped off. {sound}.',
    'Ranks of cars with their doors hanging open. Between the rows you can see no farther than two cars in any direction.',
  ],
  plaza_open: [
    'A paved plaza with a dry fountain at its center. Pigeon bones and {debris} collect in the basin. {skyline}.',
    'A civic plaza. The message board by the fountain is layered with notices — names, photographs, phone numbers.',
  ],
  ruins_open: [
    'A building came down here and took its neighbors with it. The rubble is chest-high in places, spiked with rebar. Something small and quick moves in the gaps.',
    'A collapsed block. The floors lie pancaked at ankle height, and a smell rises between the slabs from whatever is sealed underneath.',
    'Ruins. A staircase climbs three steps out of the rubble and stops in the open air.',
  ],
  market_open: [
    'An open-air market, stalls stripped to their frames. Torn awning canvas hangs from the poles.',
    'The market square. Scales, crates, a till thrown open — and across the flagstones, a wide dark stain the rain has not lifted.',
  ],
  underpass_open: [
    'The road dips under the rail line here. Daylight shows at the far end of the underpass, and the middle of it is completely dark.',
    'Water drips inside the underpass. Every step echoes back from the dark ahead.',
  ],
  cemetery_open: [
    'An old cemetery behind bent iron railings. The headstones lean at angles, and the ground between some of them has sunk.',
    'Rows of graves under bare trees. Near the back wall, the earth over several plots has been freshly turned.',
  ],
  construction_open: [
    'A construction site, stopped mid-build. The crane cable creaks in the wind, and plastic sheeting snaps on the scaffolds.',
    'Half a building, bare concrete floors open to the wind. The tower crane hangs its hook over the street.',
  ],

  // ---- revisit / ambient -------------------------------------------------
  revisit: [
    'You know this place. Nothing has changed except the light.',
    'Familiar ground. Your earlier footprints are still there in the grime.',
    'You have been through here before.',
    'Back again. The place is as you left it.',
  ],
  ambient_event: [
    'A sheet of newspaper cartwheels past you down the block.',
    'For a moment there is an engine sound, far away. Then it is gone.',
    'A shutter bangs somewhere above — twice, then nothing.',
    'Rats stream out of a drain and vanish under a car.',
    'A dog barks twice, streets away, and is cut off mid-bark.',
    'Far behind you, glass breaks.',
    'Half a block ahead, a door closes.',
  ],

  // ---- search -----------------------------------------------------------
  search_find: [
    'Under {searchspot} you turn up {itemlist}.',
    'You pry open {searchspot} and find {itemlist}.',
    'It takes a while, but {searchspot} gives up {itemlist}.',
    'Wedged behind {searchspot}: {itemlist}.',
    'Someone hid this on purpose — {itemlist}, tucked into {searchspot}.',
    'Your fingers close on {itemlist}, buried in {searchspot}.',
  ],
  search_empty: [
    'You go through {searchspot} twice. Nothing left but dust and mouse droppings.',
    'Picked clean. Whoever came before you was thorough.',
    'Nothing. Torn packaging and empty tins.',
    'You find a photograph of strangers at a lake, and nothing else.',
    'Your hands come away grimy and empty.',
    'Nothing but a smell that gets worse the deeper you dig.',
    'Empty. Behind {searchspot}, someone has scratched a tally into the wall. It stops at nine.',
  ],
  searchspot: [
    'an overturned drawer', 'a jammed cabinet', 'a heap of collapsed shelving',
    'a coat left on a hook', 'a duffel bag someone dropped', 'the counter',
    'a floor vent', 'a desk with its lock already broken', 'stacked boxes gone soft with damp',
    'the back of a closet', 'a taped-shut chest freezer',
    'the space beneath the floorboards', 'a dismantled barricade',
  ],

  // ---- zombies ----------------------------------------------------------
  zed_appear: [
    'Movement behind {debris} — a figure straightens and turns toward you.',
    'The smell reaches you first. Then the shape of it, dragging one ruined leg, coming your way.',
    'It was standing so still you took it for a post. Its head turns all at once.',
    'A wet, dragging step. One of the dead comes around the corner and sees you.',
    'It comes through the doorway shoulder-first, jaw working. Its eyes are clouded white.',
    'It rises from behind {debris}, part of its face gone, and starts toward you.',
  ],
  zed_chase: [
    'It comes around the corner after you — the same one, head down, still coming.',
    'The drag of that ruined leg again. It followed you.',
    'It shoulders through after you, jaw working. It has not stopped since it saw you.',
    'The same dead face, the same torn coat. It tracked you here.',
  ],
  zed_present: [
    'It is still here, between you and the way you came.',
    'The dead thing comes toward you, faster than its ruined body should allow.',
    'It drags itself closer.',
  ],
  flee_ok: [
    'You break for the gap and make it, boots skidding on grit. It never touches you.',
    'You feint left, go right, and are gone before it finishes turning.',
    'You vault {debris} and keep running until the sound of it fades. Untouched.',
    'You slip away clean, its moan trailing after you.',
  ],
  zed_attack: [
    'It attacks — it lunges as you move, and its nails tear through your sleeve into the arm underneath.',
    'It attacks — a hand closes on your pack and drags you off balance, and teeth clamp on your shoulder through the cloth.',
    'It attacks — it slams into you and you go down under it, getting an arm up before the teeth find your throat. Its grip strips skin as you tear free.',
    'It attacks — you twist clear of the teeth, but its fingers rake your face and neck.',
  ],
  shove_ok: [
    'You drive your shoulder into it and it goes down hard on the pavement. You run before it can turn over.',
    'You plant both hands on its chest and throw your weight forward. It topples, limbs tangling, and you are gone.',
    'You swing it aside by its coat and it falls against the wall and slides down. It is still getting up when you reach the exit.',
  ],
  shove_fail: [
    'You shove — it grabs your arm as it falls and drags you down with it. Teeth score your forearm before you tear loose.',
    'The shove glances off. It gets a grip on your collar, and its nails open the back of your neck as you break free.',
  ],
  zed_lost: [
    'You stop, chest heaving, and listen. Nothing. You have lost it.',
    'The moaning fades behind you, then the shuffling, then everything. It is not following.',
    'You watch your backtrail for a long moment. Nothing comes.',
    'No footsteps but your own. It has lost your trail.',
  ],
  zed_left: [
    'The dead thing has shambled off after some other sound. The way is clear.',
    'When you look again, it is gone — drawn away by something out of earshot.',
  ],

  // ---- rest & sleep ------------------------------------------------------
  sleep_rough: [
    'You wedge yourself out of the wind and sleep in short, broken stretches.',
    'You doze sitting up, back to the wall, waking at every sound.',
  ],
  sleep_safe: [
    'For once you sleep deeply — black and dreamless.',
    'Somebody keeps watch, so you actually sleep.',
  ],
  dream: [
    'You dream of a kitchen, and bread, and someone laughing in the next room.',
    'In the dream the streets are full and nobody is running.',
    'In the dream someone knocks at a door, patiently, for hours. You wake before you open it.',
    'You dream of the city with its lights on. Every window has someone standing in it, not moving.',
  ],
  wake: [
    'Dawn comes gray through the gaps. You stretch the cold out of your joints and take stock.',
    'You wake with a start and listen hard. Nothing.',
    'Morning. Cold light, stiff back, another day on the count.',
    'You wake and lie still, listening, before you move.',
  ],

  // ---- weather ----------------------------------------------------------
  wx_clear: ['The sky is clear and the light is thin.', 'Thin sunlight with no warmth in it.'],
  wx_overcast: ['Low cloud presses down on the rooftops.', 'The overcast light makes everything the same color as the concrete.'],
  wx_rain: ['Rain hisses on the pavement and rattles the gutters.', 'A steady, cold rain finds every hole in your clothes.', 'The rain drowns out every other sound.'],
  wx_snap: ['There was a hard frost overnight. The puddles have frozen through.', 'The cold works through everything you are wearing. Your breath hangs in front of you.'],
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
      'Bank lobbies and office blocks, all of them dark.',
      'The streets between the towers stay in shadow most of the day, and stay cold.',
    ],
  },
  residential: {
    label: 'The Northside',
    flavor: [
      'Row houses and low apartment blocks, curtains still drawn in some windows.',
      'A neighborhood that emptied out fast — doors stand open all down the block.',
      'Family streets. Chalk hopscotch grids are still on the pavement, fading one rain at a time.',
    ],
  },
  commercial: {
    label: 'The Market District',
    flavor: [
      'Shopfronts and awnings, every window broken and every shelf swept clean.',
      'Delivery bays and shuttered stores, looted early and often.',
      'The district was barricaded once, street by street. The barricades all face the wrong ways now.',
    ],
  },
  industrial: {
    label: 'The Works',
    flavor: [
      'Warehouses and rail spurs, chain-link sagging everywhere.',
      'The industrial end of town. Big spaces, deep shadows.',
      'Everything here is oversized — doors built for machines, yards built for trucks, none of it lit.',
    ],
  },
  oldtown: {
    label: 'Old Town',
    flavor: [
      'Narrow brick streets from an older city that outlived the newer one.',
      'Cobbles underfoot, leaning brick facades overhead.',
      'The lanes are narrow here, and the buildings block most of the sky.',
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
      'A {decay} apartment block. The mailboxes in the entry hang open, all of them emptied.',
      'Four floors of homes over a dead intercom. Chalked names and arrows by the door have faded to smears.',
      'An apartment block with every window dark. On the third floor, one curtain is pulled back.',
    ],
    rooms: ['stairwell', 'hallway', 'flat', 'flat', 'flat'],
    loot: [['canned_food', 3], ['cracker', 3], ['water', 2], ['soda', 1], ['matches', 2], ['jacket', 1], ['scarf', 1], ['pills', 1], ['key', 1], ['chocolate', 1]],
  },
  grocery: {
    label: 'grocery store', icon: 'canned_food',
    namePat: ['{sfirst} Market', 'Family Grocer', 'Quickstop Foods', '{sfirst} & Sons Provisions'],
    exterior: [
      'A grocery with its windows gone and its aisles visible from the street, shelves mostly bare.',
      'The sign over the door still reads FRESH. The smell from inside is rot.',
    ],
    rooms: ['salesfloor', 'stockroom', 'office'],
    loot: [['canned_food', 5], ['cracker', 4], ['water', 4], ['soda', 3], ['chocolate', 2], ['berries', 1], ['matches', 1]],
  },
  pharmacy: {
    label: 'pharmacy', icon: 'pills',
    namePat: ['{sfirst} Pharmacy', 'City Drug', 'Corner Chemist'],
    exterior: [
      'A pharmacy behind a half-lowered security shutter, bent enough to slip under.',
      'The green cross over the door is dark. Inside, toppled displays and scattered blister packs.',
    ],
    rooms: ['salesfloor', 'dispensary', 'stockroom'],
    loot: [['bandage', 4], ['pills', 4], ['medkit', 2], ['water', 1], ['soda', 1]],
  },
  clinic: {
    label: 'clinic', icon: 'medkit',
    namePat: ['{sfirst} Street Clinic', 'Eastgate Medical', 'Walk-In Clinic'],
    exterior: [
      'A walk-in clinic, doors wedged with a wheelchair. Triage tape is still strung across the lot.',
      'A small clinic. The waiting room chairs all face the door.',
    ],
    rooms: ['waiting room', 'exam room', 'supply closet', 'office'],
    loot: [['bandage', 4], ['medkit', 3], ['pills', 3], ['water', 1]],
  },
  hardware: {
    label: 'hardware store', icon: 'crowbar',
    namePat: ['{sfirst} Hardware', 'True Value Tools', 'City Fix Hardware'],
    exterior: [
      'A hardware store, shelving toppled in rows. Useful things may still be under the wreckage.',
      'HARDWARE in block letters over a dark doorway. The padlock hangs cut.',
    ],
    rooms: ['salesfloor', 'tool aisle', 'stockroom', 'yard'],
    loot: [['crowbar', 3], ['rope', 3], ['flashlight', 2], ['battery', 3], ['matches', 2], ['knife', 1]],
  },
  office: {
    label: 'office building', icon: 'key',
    namePat: ['{sfirst} Plaza offices', 'The {sfirst} Building', '{sfirst} & Partners'],
    exterior: [
      'An office block, lobby turnstiles frozen mid-spin. The dark inside goes up ten floors.',
      'Glass doors, one starred with cracks. The directory lists firms that no longer exist.',
    ],
    rooms: ['lobby', 'open-plan floor', 'break room', 'corner office'],
    loot: [['cracker', 2], ['soda', 3], ['water', 2], ['battery', 1], ['flashlight', 1], ['key', 1], ['chocolate', 2]],
  },
  cafe: {
    label: 'café', icon: 'soda',
    namePat: ['Café {sfirst}', 'The Copper Cup', '{sfirst} Street Diner', 'Rise & Grind'],
    exterior: [
      'A café with chairs still stacked from a closing shift that never reopened.',
      'A diner. The specials board still lists the last day’s soup.',
    ],
    rooms: ['dining room', 'kitchen', 'pantry'],
    loot: [['cracker', 3], ['canned_food', 2], ['water', 2], ['soda', 2], ['chocolate', 1], ['matches', 2], ['berries', 1]],
  },
  gasstation: {
    label: 'gas station', icon: 'fire',
    namePat: ['{sfirst} Fuel & Go', 'Octane Stop', 'The Last Pump'],
    exterior: [
      'A gas station canopy over dry pumps. The kiosk glass is cracked white and held together by stickers.',
      'Fuel pumps with the hoses cut. The mini-mart behind them is dark.',
    ],
    rooms: ['kiosk', 'storeroom', 'garage bay'],
    loot: [['soda', 3], ['cracker', 3], ['chocolate', 2], ['matches', 2], ['battery', 2], ['rope', 1], ['crowbar', 1]],
  },
  police: {
    label: 'police substation', icon: 'danger',
    namePat: ['Precinct 9 substation', 'District Police Post'],
    exterior: [
      'A police substation behind sandbags. The barricade held. Whatever it held against is gone.',
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
      'A long brick school building. Paper snowflakes are still taped inside one window.',
    ],
    rooms: ['entrance hall', 'gymnasium', 'cafeteria kitchen', 'nurse’s office', 'classroom'],
    loot: [['canned_food', 2], ['cracker', 3], ['water', 3], ['bandage', 2], ['pills', 1], ['chocolate', 1], ['sleeping_bag', 1]],
  },
  warehouse: {
    label: 'warehouse', icon: 'backpack',
    namePat: ['Bay 7 Storage', '{sfirst} Freight & Storage', 'Interstate Logistics'],
    exterior: [
      'A warehouse with its roller door crowbarred half open and jammed.',
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
      'A chapel with candle stubs melted onto the steps.',
    ],
    rooms: ['nave', 'vestry', 'basement hall'],
    loot: [['matches', 3], ['water', 2], ['canned_food', 2], ['bandage', 1], ['sleeping_bag', 1], ['scarf', 1]],
  },
  laundromat: {
    label: 'laundromat', icon: 'jacket',
    namePat: ['Sudsy’s', '{sfirst} Wash & Fold', '24hr Coin Laundry'],
    exterior: [
      'A laundromat, machines standing open. Clothes nobody came back for sit in moldering piles.',
    ],
    rooms: ['machine floor', 'back office'],
    loot: [['jacket', 3], ['scarf', 3], ['soda', 1], ['key', 1], ['chocolate', 1]],
  },
  bookshop: {
    label: 'bookshop', icon: 'map',
    namePat: ['{sfirst} Books', 'The Dog-Eared Page', 'Secondhand Prose'],
    exterior: [
      'A used bookshop, shelves still full. Looters left it alone.',
    ],
    rooms: ['shop floor', 'reading nook', 'stock cellar'],
    loot: [['matches', 2], ['chocolate', 1], ['flashlight', 1], ['map_scrap', 2], ['cracker', 1]],
  },
  hotel: {
    label: 'hotel', icon: 'key',
    namePat: ['The {sfirst} Hotel', 'Hotel Meridian', '{sfirst} House Hotel'],
    exterior: [
      'A hotel with its awning collapsed across the steps. The revolving door is wedged with a luggage cart, from the inside.',
      'Six floors of guest rooms above a dark lobby. The fire doors on every floor stand open.',
    ],
    rooms: ['lobby', 'corridor', 'guest room', 'guest room', 'linen room'],
    loot: [['water', 3], ['soda', 2], ['chocolate', 2], ['key', 2], ['jacket', 1], ['pills', 1], ['sleeping_bag', 1]],
  },
  bar: {
    label: 'bar', icon: 'soda',
    namePat: ['The {sfirst} Tap', 'The Last Call', '{sfirst} Street Tavern'],
    exterior: [
      'A corner bar, door propped with a stool. Empty glasses still stand on the tables inside.',
      'A tavern with its window painted over from the inside, in broad, hurried strokes.',
    ],
    rooms: ['barroom', 'back room', 'cellar'],
    loot: [['soda', 3], ['bottle', 3], ['water', 2], ['matches', 2], ['knife', 1], ['key', 1], ['cracker', 1]],
  },
  theater: {
    label: 'theater', icon: 'flashlight',
    namePat: ['The {sfirst} Picture House', 'Rialto Theater', 'The Majestic'],
    exterior: [
      'An old cinema. The marquee still spells half a title, and the rest of the letters lie on the sidewalk below.',
      'A theater with its front doors chained shut — from the outside.',
    ],
    rooms: ['foyer', 'auditorium', 'backstage', 'projection room'],
    loot: [['flashlight', 2], ['battery', 3], ['soda', 2], ['chocolate', 2], ['rope', 1], ['map_scrap', 1]],
  },
  butcher: {
    label: 'butcher’s shop', icon: 'knife',
    namePat: ['{sfirst} & Son Butchers', 'City Meats', 'The Corner Butcher'],
    exterior: [
      'A butcher’s shop, white tile behind the broken window. The ceiling hooks are empty, all of them.',
      'The butcher’s. Sawdust on the floor, gone gray. The cold room door at the back is shut.',
    ],
    rooms: ['shopfront', 'cutting room', 'cold room'],
    loot: [['canned_food', 3], ['knife', 2], ['matches', 1], ['water', 1]],
  },
  bakery: {
    label: 'bakery', icon: 'cracker',
    namePat: ['{sfirst} Street Bakery', 'The Daily Loaf', 'Ovenhouse'],
    exterior: [
      'A bakery. The trays in the window still hold loaves, shrunken to dark stones.',
      'A corner bakery with its door ajar. Flour dust covers the floor inside, marked with tracks.',
    ],
    rooms: ['shopfront', 'bakehouse', 'flour store'],
    loot: [['cracker', 4], ['berries', 1], ['matches', 2], ['water', 1], ['canned_food', 1]],
  },
  funeral: {
    label: 'funeral home', icon: 'night',
    namePat: ['{sfirst} & Sons Funeral Home', 'Evergreen Funeral Services', 'The {sfirst} Chapel of Rest'],
    exterior: [
      'A funeral home with its curtains drawn. The front door is locked, and the side door stands open.',
      'A chapel of rest. The hearse in the drive has its back doors open, and has had for a long time.',
    ],
    rooms: ['parlor', 'chapel of rest', 'preparation room', 'casket store'],
    loot: [['matches', 2], ['scarf', 2], ['key', 1], ['pills', 1], ['flashlight', 1]],
  },
  subway: {
    label: 'subway entrance', icon: 'exit',
    namePat: ['{sfirst} Station', '{sfirst} Street Underground'],
    exterior: [
      'Steps descend to a subway station. A cold draft rises from the dark at the bottom.',
      'A subway entrance, half grated shut. Trains stopped running {timeago}. Sounds still come up from the platforms.',
    ],
    rooms: ['mezzanine', 'platform', 'service corridor'],
    loot: [['battery', 2], ['flashlight', 2], ['map_scrap', 2], ['soda', 2], ['water', 1], ['rope', 1]],
  },
};

// Room prose by room type -------------------------------------------------
export const ROOM_DESC = {
  default: [
    'A {decay} room. {sound}.',
    'Dust covers every surface in here. It smells of {smell}.',
  ],
  stairwell: ['A concrete stairwell, tags overlapping tags. Every landing is a blind corner.', 'The stairwell echoes. A stroller is parked on the half-landing, empty.'],
  hallway: ['A hallway of numbered doors — some open, some kicked in.', 'Carpet gone stiff with damp. Doors stretch away into the dark.'],
  flat: ['Somebody’s home, left mid-task: a mug on the table, a coat gone from its hook.', 'A small flat. The bed is made and the dishes are washed and stacked.', 'A ransacked flat — drawers out, cushions cut open.', 'A flat where the table is set for two. The plates are furred with dust, and both chairs are knocked over.'],
  salesfloor: ['Aisles in disarray, shelves stripped to the brackets in places.', 'The sales floor. Baskets stand abandoned mid-aisle.'],
  stockroom: ['A stockroom of steel shelving and collapsed cardboard.', 'The stockroom is dark and close. The boxes have been opened and picked through.'],
  office: ['A back office. The safe is open and empty, and paperwork covers the floor.', 'A cramped office. The chair faces the door.'],
  dispensary: ['Behind the counter, the pharmacy shelves — mostly swept clean. Pill bottles roll underfoot.'],
  'waiting room': ['Rows of bolted chairs and a reception desk with a sign-in sheet from the last day.'],
  'exam room': ['An exam table, paper roll half-pulled. Dried blood marks the floor by the door.'],
  'supply closet': ['A closet of labeled bins, lids askew.'],
  kitchen: ['A commercial kitchen, pans still on the range. The walk-in door is shut.', 'A kitchen. The knife block is empty.'],
  pantry: ['A pantry of empty tins and one shelf that might not be empty.'],
  lobby: ['A lobby of dead plants and a directory board with half its letters missing.', 'Dust covers the lobby furniture in an even gray layer.'],
  'open-plan floor': ['A field of cubicles. The monitors are dead, and coats still hang on some of the chairs.'],
  'break room': ['A break room. The vending machine lies face down, forced open from the back. The fridge door is sealed shut with tape.'],
  'corner office': ['A corner office with a view of the quiet city. The liquor cabinet is open and empty.'],
  kiosk: ['The kiosk: lottery tickets everywhere, register drawer out, cigarette rack bare.'],
  storeroom: ['A storeroom of motor oil, washer fluid, and maybe something edible.'],
  'garage bay': ['A single garage bay, car still on the lift, tools scattered where they dropped.'],
  'front desk': ['A duty desk behind ballistic glass, blotter still open to the last shift.'],
  bullpen: ['Desks pushed together into a square, radios dead in their chargers.'],
  'holding cell': ['A holding cell, door open. Somebody scratched days into the paint — five, then six, then nothing.'],
  'armory cage': ['The armory cage, cut open and stripped. The lockbox keys hang labeled on their hooks.'],
  'entrance hall': ['An entrance hall lined with small coat hooks at knee height.'],
  gymnasium: ['A gymnasium of cots in rows — an evacuation shelter, emptied fast. The blankets still hold the shape of people.'],
  'cafeteria kitchen': ['A cafeteria kitchen, steel counters and enormous empty pots.'],
  'nurse’s office': ['A nurse’s office: eye chart, sticker jar, a cot with a paper sheet. The cabinets stand open.'],
  classroom: ['A classroom, chairs up on desks. The date on the whiteboard is months old.'],
  'loading dock': ['A loading dock, trailer still nosed in. Some of the doors are padlocked, and some are torn open.'],
  'rack floor': ['Pallet racks to the ceiling. The shrink-wrap is slashed at ground level, but the high shelves are out of easy reach.'],
  'foreman’s office': ['A glass-walled office overlooking the floor, clipboard hooks all full.'],
  'back room': ['A back room of tarps, drums, and a couch that has been slept on.'],
  nave: ['The nave. Pews were shoved into barricade lines, then dragged back into rows.', 'Candle smoke stains the ceiling. Light through the broken glass moves across the floor.'],
  vestry: ['A vestry of robes and hymnals, and a kettle someone kept using long after the end.'],
  'basement hall': ['A church basement: folding tables, a coffee urn, cots along the wall.'],
  'machine floor': ['Ranks of washers with their doors open. Coins are scattered inside the forced change machine.'],
  'shop floor': ['Shelves of swollen paperbacks. The smell of old paper nearly covers everything else.'],
  'reading nook': ['Two armchairs and a cold reading lamp. A book lies open, face down.'],
  'stock cellar': ['A cellar of boxed books and one high, dry shelf.'],
  yard: ['A fenced yard of lumber and pipe stock, gate chained but climbable.'],
  'tool aisle': ['The tool aisle, pegboard mostly bare. The heavy tools remain.'],
  corridor: ['A hotel corridor. Doors and doors, and a service trolley abandoned halfway down, still stocked.', 'The corridor runs past the reach of the light from the stairwell. Every third door stands open.'],
  'guest room': ['A guest room, bed still turned down. Reading glasses wait folded on the nightstand.', 'A guest room. The mattress was dragged against the door, and the door frame is splintered inward.'],
  'linen room': ['Shelves of folded sheets gone yellow. It still smells of soap in here.'],
  barroom: ['The barroom. Glasses on the tables, chairs pushed back. The mirror behind the bar is broken outward.', 'A long bar in the dark, bottles standing empty. A tab is still chalked on the board.'],
  cellar: ['A beer cellar, cold and low-ceilinged. The kegs ring hollow. Something scratches once behind the far wall.'],
  foyer: ['A cinema foyer. The concession glass is smashed, and the popcorn machine is furred gray inside.'],
  auditorium: ['Ranked seats descend into the dark. The screen hangs in ribbons, and the back rows are past the reach of any light.'],
  backstage: ['Backstage: ropes, sandbags, a costume rail. Painted scenery of a sunny street leans against the brick.'],
  'projection room': ['The projection booth. Film reels everywhere, and a small cot in the corner — someone lived up here for a while.'],
  shopfront: ['The shopfront. The till stands open, and the daylight from the street does not reach the back wall.'],
  'cutting room': ['The cutting room. The block table is scored deep by years of work, and by newer marks that cut across the grain.'],
  'cold room': ['The cold room. No power, no light. Empty hooks, and a dried dark stain around the floor drain. The door swings shut on its own weight.'],
  bakehouse: ['The bakehouse. Great ovens with their doors open. Flour dust turns your footprints white behind you.'],
  'flour store': ['The flour store — sacks gnawed open at the corners, droppings along the walls.'],
  parlor: ['The parlor: heavy curtains, condolence cards fanned on the sideboard, chairs arranged in rows.'],
  'chapel of rest': ['The chapel of rest. The candlesticks are dark. The casket at the front has its lid closed.'],
  'preparation room': ['The preparation room. Steel table, drains, instruments laid out in their tray. The last entry in the ledger is unfinished.'],
  'casket store': ['A room of caskets on racks. Two of the floor models have their lids off, and the lining of one is torn.'],
  mezzanine: ['The station mezzanine. Turnstiles, a dead departures board, and a cold draft from the stairs down to the platform.'],
  platform: ['The platform. Light dies a few meters into the tunnel at either end. From down the line comes a sound like a door closing.'],
  'service corridor': ['A service corridor behind the platform, cables sagging along the wall. Workers chalked names and dates here. The dates stop together.'],
};

export const LOCKED_DESC = [
  'The door is locked — solid, deliberate. A crowbar would open it.',
  'Locked. The frame might give to a crowbar.',
  'Someone secured this door before they left. Without a crowbar it stays shut.',
];
export const UNLOCK_DESC = [
  'You set the crowbar, lean in, and the frame gives with a crack that carries.',
  'The lock breaks under the crowbar with a bang.',
];

// Survivors ---------------------------------------------------------------
export const SURVIVOR_FIRST = [
  'Mara', 'Theo', 'Ida', 'Ruben', 'Sana', 'Cole', 'Petra', 'Yusuf', 'Nadia',
  'Frank', 'June', 'Oskar', 'Lena', 'Dmitri', 'Rosa', 'Ellis',
];
export const SURVIVOR_TRAIT = [
  'quick-eyed and slow to speak', 'wrapped in three coats, all of them someone else’s',
  'with an easy laugh that comes rarely', 'who watches the door the whole time',
  'gray with tiredness but steady', 'young, and trying hard not to look it',
  'who keeps a hand near a wrench at all times', 'with a voice worn down to a whisper',
];
// look: what you see before they trust you with a name. intro: the
// introduction line once they give it (first conversation).
export const SURVIVOR_ROLES = {
  medic: {
    label: 'medic', icon: 'medkit',
    look: 'Their corner is kept neat: bandage rolls in tins, instruments boiled and laid out on a cloth.',
    intro: '“{name}. I was a nurse, before.”',
    tip: 'clinics and pharmacies — and check the school, there’s a nurse’s office',
    perk3: 'patches you up whenever you visit',
  },
  scavenger: {
    label: 'scavenger', icon: 'backpack',
    look: 'Their gear is ranked and ordered — salvage sorted into pouches, a street map folded to a worn crease.',
    intro: '“{name}. I find things. It’s a living, in a manner of speaking.”',
    tip: 'high shelves in the warehouse district — nobody loots what they can’t reach',
    perk3: 'marks rich spots on your map',
  },
  cook: {
    label: 'cook', icon: 'hunger',
    look: 'A stockpot steams over a can-fire. It smells better than anything has in months.',
    intro: '“{name}. I used to feed two hundred a night. Now it’s whoever makes it to the door.”',
    tip: 'café pantries and the school cafeteria — big kitchens hide big tins',
    perk3: 'feeds you a hot meal whenever you visit',
  },
  radio_op: {
    label: 'radio operator', icon: 'radio',
    look: 'A hand-crank radio sits on a crate, tuned between stations, hissing.',
    intro: '“{name}. I listen. Somebody has to be listening when it comes.”',
    tip: 'where the dead are drifting — they follow noise, so listen before you cross',
    perk3: 'warns you where the dead are thickest',
  },
  watchman: {
    label: 'watchman', icon: 'flashlight',
    look: 'They sit back from a high window with a flask of cold tea and a clear view of three streets.',
    intro: '“{name}. I keep watch. It needs doing.”',
    tip: 'moving at dawn — the dead go torpid in the cold hours',
    perk3: 'lets you sleep under their watch, safe as it gets',
  },
  mechanic: {
    label: 'mechanic', icon: 'crowbar',
    look: 'They are halfway inside an engine that will never run again, tools laid out in strict order.',
    intro: '“{name}. Things still break. That part hasn’t changed.”',
    tip: 'garages and loading docks — toolboxes get overlooked',
    perk3: 'keeps your gear in good repair',
  },
};
export const SURVIVOR_MEET = [
  'A voice stops you: “Far enough. Hands where I can see them.” Then, seeing you’re alive: “…Okay. Okay. Sorry. Can’t be too careful.”',
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
  'They take it with both hands. “I won’t forget this.”',
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
  'A thin line of smoke rises from {bname}. Someone in there is keeping a fire going.',
  'Light shows behind a covered window of {bname} — firelight, tended.',
  'From {bname}, faint but unmistakable: woodsmoke, and something cooking.',
];

// Scouting ---------------------------------------------------------------
export const LISTEN_QUIET = [
  'Nothing moves behind the {room} door.',
  'Silence on the other side of the {room} door.',
];
export const LISTEN_ZED = [
  'A slow dragging sound behind the {room} door.',
  'Something bumps against the far side of the {room} door, and again.',
  'Behind the {room} door: a low, wet breathing that is not breathing.',
];
export const SCOUT_START = [
  'You find an angle with cover and study each approach in turn.',
  'You climb onto a hood, keep low, and glass the block the slow way.',
];
export const LISTEN_START = [
  'You put your ear to each door in turn and hold your breath.',
];

// Barricades --------------------------------------------------------------
export const BARRICADE_LINES = [
  'You wedge the frame with scrap, drag shelving against the door, and lash it down. This room will hold.',
  'You brace the door with everything movable and tie it off. Nothing gets in here without waking you.',
];

// Distraction -------------------------------------------------------------
export const BOTTLE_LINES = [
  'The bottle bursts somewhere down the block. The dead turn toward the sound and drag away after it.',
  'Glass shatters two streets over. Everything dead in earshot moves toward it, away from you.',
];

// Raiders -----------------------------------------------------------------
export const RAIDER_NAMES = ['the Foundry crew', 'Halsey’s people', 'the Tollmen', 'the Yard dogs', 'the Ninth Street lot'];
export const RAIDER_MEET = [
  'Figures step out ahead — three of them, spread across the road, unhurried. Living, and armed with pipe and bar.',
  'A short whistle from a rooftop. By the time you find the source, two more have stepped out of doorways behind you.',
  'They come out from behind a van like they were waiting, because they were. The living kind, armed.',
];
export const RAIDER_DEMAND = [
  '“Toll. {item}, and you walk on.”',
  '“You carry, we collect. {item}. Now.”',
  '“Simple trade. {item}, and nobody has a bad day.”',
];
export const RAIDER_PAY = [
  'They take it without thanks. “Smart. Walk on.” The road opens.',
  'The item disappears into a coat. They step aside, already scanning the street for the next one.',
];
export const RAIDER_WIN = [
  'You square up and do not step back. They read something in it, trade a look, and wave you past.',
  'You put a hand on the knife and let them do the math. The math comes out in your favor. They drift back into the doorways.',
];
export const RAIDER_LOSE = [
  'It goes badly. A pipe catches your ribs, hands go through your pack, and they leave you on the pavement with less than you had.',
  'Two of them hold you against the van while a third goes through your pack. Then a parting shove into the gutter.',
];
export const RAIDER_BACK = [
  'You back away slowly, hands visible, and they let you go.',
  'You retreat the way you came. A whistle follows you, mocking, but nothing else does.',
];
export const RAIDER_WARN = [
  '“Word of warning — {gang} work that part of the city. They take what they want. Stay wide of it. I’ll mark it for you.”',
];
export const RAIDER_PEACE_NOTE = 'They recognize you and wave you through. The toll holds, for now.';
export const SURVIVOR_VOUCH = [
  '“There’s someone you should meet. Good hands, fair dealer. I’ll mark where they hole up — tell them the description of me and you’ll do fine.”',
];

// Day cycle ---------------------------------------------------------------
export const ESCALATION_LINES = [
  'More of the dead in the streets today than yesterday. They come in from the edges at night.',
  'New silhouettes stand in the streets this morning, where yesterday there were none.',
  'The city is filling up again. Every day the count out there gets a little worse.',
];
export const NIGHTFALL_LINES = [
  'Dark. The dead move more at night.',
  'The light goes. Out in the streets, the shuffling picks up.',
];
export const DAWN_LINES = [
  'First light. The cold slows the dead to a stumble.',
  'Dawn. The streets are as quiet now as they ever get.',
];

// Fighting -----------------------------------------------------------------
export const FIGHT_KILL = [
  'You step inside its reach and put it down for good. It does not get up.',
  'The steel goes in where it needs to go. The body drops and stays down.',
  'You swing until it stops moving. Then you make sure it has stopped.',
  'It grabs, you turn, and the weight of the blow carries through. It folds onto the pavement.',
];
export const FIGHT_FAIL = [
  'Your swing goes wide and it is inside your guard — teeth and fingers, and you pay for the miss.',
  'The blow glances off its shoulder. It drags you close before you break loose, and it costs you.',
  'You misjudge the distance. It has your arm for one bad second.',
];
export const FIGHT_LAST_DOWN = [
  'Quiet again. Your hands are shaking. The street is yours.',
  'It is done. You wipe the steel clean on its coat and breathe.',
];

// Barter --------------------------------------------------------------------
export const TRADE_LINES = [
  'Goods change hands. “Anytime,” they say, and mean it.',
  'A fair trade, by the current market. Both sides nod.',
  'They check the goods once, twice, then hand over their side of it.',
];

// Stashes -------------------------------------------------------------------
export const STASH_FIND = [
  'Beneath everything else: a steel lockbox, bolted to the floor. The lock wants a key.',
  'Behind a false panel, a strongbox with a heavy padlock. Someone prepared for this, and never came back for it.',
];
export const STASH_OPEN = [
  'The key turns. Inside, packed tight and dry: {itemlist}.',
  'The lock gives. Whoever filled this box knew what mattered: {itemlist}.',
];
export const STASH_LOCKED_NOTE = 'The lockbox is still here, still locked. It wants a key.';

// Grit --------------------------------------------------------------------
export const GRIT_LEVELS = [
  { name: 'Sure-footed', desc: 'moving costs less energy' },
  { name: 'Light hands', desc: 'searches are quieter and find more' },
  { name: 'Cool head', desc: 'harder to catch when you escape' },
  { name: 'Iron grip', desc: 'stronger shoves, harder to rob' },
  { name: 'Second wind', desc: 'rest and sleep restore more' },
];
export const GRIT_UP = 'This city is teaching you. You are getting better at this. ({name} — {desc})';

// Bleeding ----------------------------------------------------------------
export const BLEED_START = [
  'The wound is deep, and it keeps bleeding.',
  'This one will not close on its own. Blood runs warm under your sleeve.',
];
export const BLEED_STOP = 'You wrap the wound tight. The bleeding stops.';
export const BLEED_WARN = [
  'You are still bleeding. It needs wrapping.',
  'Blood is soaking through the cloth. The dead can smell it.',
];

// Misc lines --------------------------------------------------------------
export const REST_LINES = [
  'You sit with your back to a wall and let your breathing slow.',
  'You rest. The ache in your legs fades to something you can carry.',
  'You stay still and quiet. Strength comes back a little at a time.',
  'You rub the stiffness out of your calves and roll your shoulders loose.',
  'You close your eyes for slow counts of ten, listening between each one.',
  'You flex your hands until the feeling comes back into your fingers.',
  'You find a dry patch of floor and stretch your legs out. The burn in them eases.',
  'You breathe until your heart stops working so hard.',
  'You lean into a corner and let your weight go for a while.',
  'You loosen your bootlaces, work your ankles, and tie them again.',
  'You rest until your hands are steady.',
  'You go still. The city stays quiet, and some strength comes back.',
  'You shift your pack off, sit on it, and give your shoulders a rest.',
  'You wait out the shaking in your legs. It passes.',
  'You sit and do nothing, which the body needed more than anything you could carry.',
  'You count the exits, settle on the floor, and let yourself stop.',
];
export const MED_LINES = [
  'You clean the wounds and wrap them tight.',
  'You dress the worst of it and flex the arm until the bandage sits right.',
  'You patch yourself up, working by feel where you can’t see.',
  'Antiseptic burns along the scrapes. You wrap them and move on.',
];
export const EAT_LINES = [
  'You eat slowly, watching the door.',
  'You eat all of it in one sitting.',
  'You eat half and pack the rest away, then eat the rest.',
  'You eat standing up, ready to move.',
  'You eat, and the hollow feeling pulls back a step.',
  'You make yourself chew slowly. It goes further that way.',
];
export const DRINK_LINES = [
  'You drink it down. Cold and metallic.',
  'You drink more of it than you meant to.',
  'You drink half, cap it, and drink the other half anyway.',
  'You rinse the dust from your mouth and swallow the rest.',
];
export const TOO_TIRED = [
  'Your legs refuse. You need rest, or food, before anything else.',
  'The edges of your vision gray out. Not another step without rest.',
];
export const COLD_WARNING = [
  'Your fingers have gone clumsy with cold. Find warmth, soon.',
  'You are shivering in waves now.',
];
export const HUNGER_WARNING = [
  'Hunger has moved from ache to fact. You need to eat.',
  'Your stomach cramps around nothing.',
];
export const DEATH_COLD = ['The cold stops hurting. You sit down against a wall and do not get up.'];
export const DEATH_BLEED = ['The wound wins. Your sight narrows, and the pavement comes up slowly.'];
export const DEATH_HUNGER = ['Your body has nothing left to spend. Your legs fold under you.'];
export const DEATH_ZED = ['Weight drives you down. Cold hands, and the pavement against your cheek.'];

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
