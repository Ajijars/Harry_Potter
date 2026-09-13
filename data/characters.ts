export interface Character {
  id: number
  slug: string
  name: string
  fullName: string
  house: 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff' | 'dark' | 'none'
  role: string
  wand?: string
  patronus?: string
  actor: string
  bio: string
  shortBio: string
  traits: string[]
  icon: string
  accentColor: string
  image: string
  quotes: { text: string; book: string }[]
  keyMoments: string[]
}

export const characters: Character[] = [
  {
    id: 1,
    slug: 'harry-potter',
    name: 'Harry Potter',
    fullName: 'Harry James Potter',
    house: 'gryffindor',
    role: 'The Chosen One',
    wand: 'Holly, 11", phoenix feather core',
    patronus: 'Stag',
    actor: 'Daniel Radcliffe',
    image: '/harry.jpg',
    accentColor: '#d3a625',
    icon: '⚡',
    shortBio: 'The Boy Who Lived — orphaned at birth by Voldemort\'s curse, marked by a lightning-bolt scar, destined to end the Dark Lord\'s reign.',
    bio: `Born July 31st to James and Lily Potter, Harry survived the Killing Curse as an infant through the power of his mother's self-sacrificing love — a magic so ancient and profound that it rebounded the curse onto Voldemort himself. Raised by his muggle aunt and uncle in a cupboard under the stairs, Harry knew nothing of magic until Hagrid arrived on his eleventh birthday. At Hogwarts, sorted into Gryffindor, he became a Seeker of rare natural talent, forged the deepest friendships of his life, and gradually discovered the terrible truth: he and Voldemort are irrevocably bound together. His journey from frightened orphan to the saviour of the wizarding world is one of literature's greatest coming-of-age stories.`,
    traits: ['Courageous', 'Loyal', 'Self-sacrificing', 'Stubborn', 'Natural leader'],
    quotes: [
      { text: "I don't want to be a weapon. I want to be Harry.", book: "Deathly Hallows" },
      { text: "Voldemort himself created his worst enemy, as tyrants do!", book: "Order of the Phoenix" },
    ],
    keyMoments: [
      'Surviving Avada Kedavra as an infant',
      'First Quidditch match — catching the Snitch in his mouth',
      'Facing Voldemort in the graveyard',
      'Walking willingly to death in the Forbidden Forest',
      'The final duel — "Expelliarmus vs Avada Kedavra"',
    ],
  },
  {
    id: 2,
    slug: 'hermione-granger',
    name: 'Hermione Granger',
    fullName: 'Hermione Jean Granger',
    house: 'gryffindor',
    role: 'The Brightest Witch of Her Age',
    wand: 'Vine wood, 10¾", dragon heartstring',
    patronus: 'Otter',
    actor: 'Emma Watson',
    image: '/harry.jpg',
    accentColor: '#c9a227',
    icon: '📚',
    shortBio: 'Born to muggle parents, Hermione became the most gifted witch at Hogwarts — her intelligence, loyalty and courage proved as vital as any spell.',
    bio: `Hermione Granger arrived at Hogwarts already having read all their textbooks twice. The daughter of dentists, she approached magic with fierce academic discipline, quickly becoming the top student in virtually every class. Often dismissed as a know-it-all, Hermione's true character revealed itself in moments of extreme courage — destroying a Horcrux alone, slapping Draco Malfoy, facing the Battle of Hogwarts without flinching. Her logical mind solved puzzles that left Harry and Ron stumped, and her emotional intelligence grew enormously across the seven years. Without Hermione Granger, Lord Voldemort would never have been defeated.`,
    traits: ['Brilliant', 'Brave', 'Compassionate', 'Principled', 'Resilient'],
    quotes: [
      { text: "Books! And cleverness! There are more important things — friendship and bravery.", book: "Philosopher's Stone" },
      { text: "I hope you're pleased with yourselves. We could all have been killed — or worse, expelled.", book: "Philosopher's Stone" },
    ],
    keyMoments: [
      'Solving the logic puzzle in Book 1',
      'Using the Time Turner to save Sirius and Buckbeak',
      'Obliviating her own parents to keep them safe',
      'Destroying the Horcrux cup at Gringotts',
      'Standing firm at the Battle of Hogwarts',
    ],
  },
  {
    id: 3,
    slug: 'ron-weasley',
    name: 'Ron Weasley',
    fullName: 'Ronald Bilius Weasley',
    house: 'gryffindor',
    role: 'The Loyal Heart',
    wand: 'Willow, 14", unicorn hair',
    patronus: 'Jack Russell Terrier',
    actor: 'Rupert Grint',
    image: '/harry.jpg',
    accentColor: '#d3a625',
    icon: '♟️',
    shortBio: "Harry's best friend and the seventh Weasley child — Ron's bravery, humour, and chess mastery made him indispensable to the golden trio.",
    bio: `Ronald Weasley grew up in the warm chaos of the Burrow, the youngest of six brothers and chronically overshadowed — yet it is precisely this experience that forged his greatest strength: an enormous, selfless heart. Ron's chess skills saved Harry and Hermione in their first year; his courage in the face of his greatest fear (spiders) never went unacknowledged; and his moment of true greatness came when he returned to his friends after abandoning them, destroyed the locket Horcrux, and later led the charge to rescue house-elf Dobby's memory with a sincerity that moved everyone around him.`,
    traits: ['Loyal', 'Humorous', 'Strategic', 'Self-doubting', 'Deeply brave'],
    quotes: [
      { text: "When in doubt, go to the library.", book: "Chamber of Secrets" },
      { text: "We're with you whatever happens.", book: "Deathly Hallows" },
    ],
    keyMoments: [
      'Sacrificing himself in the Giant Chess game',
      'Facing his Boggart — a giant spider',
      'Leaving and returning during the Horcrux hunt',
      'Destroying the locket Horcrux',
      'Suggesting freeing the house-elves during the Battle',
    ],
  },
  {
    id: 4,
    slug: 'albus-dumbledore',
    name: 'Albus Dumbledore',
    fullName: 'Albus Percival Wulfric Brian Dumbledore',
    house: 'gryffindor',
    role: 'Headmaster of Hogwarts',
    wand: 'Elder Wand — the most powerful wand in existence',
    patronus: 'Phoenix',
    actor: 'Richard Harris / Michael Gambon',
    image: '/harry.jpg',
    accentColor: '#a0c8ff',
    icon: '🔮',
    shortBio: 'The greatest wizard of the age — brilliant, complex, and ultimately defined by love, regret, and unwavering sacrifice.',
    bio: `Albus Dumbledore is widely regarded as the greatest wizard of modern times. Headmaster of Hogwarts for decades, founder of the Order of the Phoenix, and the only wizard Voldemort ever feared. Yet Dumbledore's greatness was always shadowed by tragedy and moral complexity. His youthful friendship with Gellert Grindelwald, his guilt over his sister Ariana's death, and his carefully orchestrated manipulation of Harry's destiny reveal a man who bore enormous burdens in service of a greater good. His death — planned with Snape, accepted willingly — was the final act of a life defined by the power of love over power itself.`,
    traits: ['Omniscient', 'Manipulative', 'Compassionate', 'Whimsical', 'Profoundly wise'],
    quotes: [
      { text: "It is the unknown we fear when we look upon death and darkness, nothing more.", book: "Half-Blood Prince" },
      { text: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.", book: "Deathly Hallows" },
    ],
    keyMoments: [
      'Defeating Grindelwald in 1945',
      'Leaving Harry the Invisibility Cloak and Resurrection Stone',
      'The duel with Voldemort in the Ministry atrium',
      'Teaching Harry about Horcruxes through the Pensieve',
      'Meeting Harry in the limbo after his death',
    ],
  },
  {
    id: 5,
    slug: 'severus-snape',
    name: 'Severus Snape',
    fullName: 'Severus Snape',
    house: 'slytherin',
    role: 'The Half-Blood Prince',
    wand: 'Unknown wood, 13.5", unknown core',
    patronus: 'Doe (silver — identical to Lily Potter\'s)',
    actor: 'Alan Rickman',
    image: '/harry.jpg',
    accentColor: '#aac8b0',
    icon: '🖤',
    shortBio: "Literature's greatest anti-hero — a spy, a bully, a traitor, a protector, and ultimately the bravest man Harry ever knew.",
    bio: `Severus Snape is perhaps the most complex character in the entire saga. A half-blood wizard from a difficult childhood who fell in with the Death Eaters, only to become a double agent for Dumbledore — motivated entirely by his unrequited, undying love for Lily Evans, Harry's mother. For seven years at Hogwarts, Snape protected Harry while despising him, maintained his cover at mortal risk, and ultimately sacrificed his life at Voldemort's order. His final act was giving Harry his memories — memories that revealed everything, that redeemed everything. "Always." The single word that encapsulates the greatest arc of love in the series.`,
    traits: ['Calculating', 'Bitter', 'Profoundly loyal', 'Brilliant', 'Deeply loving'],
    quotes: [
      { text: "Always.", book: "Deathly Hallows" },
      { text: "You have your mother's eyes.", book: "Deathly Hallows" },
    ],
    keyMoments: [
      'Turning spy for Dumbledore out of love for Lily',
      'Teaching Harry Occlumency (and failing — intentionally?)',
      'Killing Dumbledore on Dumbledore\'s own orders',
      'Protecting the students as Headmaster from within',
      'Giving Harry his memories as he died',
    ],
  },
  {
    id: 6,
    slug: 'lord-voldemort',
    name: 'Lord Voldemort',
    fullName: 'Tom Marvolo Riddle',
    house: 'slytherin',
    role: 'The Dark Lord',
    wand: 'Yew, 13.5", phoenix feather (brother wand to Harry\'s)',
    patronus: 'None — incapable of love',
    actor: 'Ralph Fiennes',
    image: '/voldemort.jpg',
    accentColor: '#1a8a1a',
    icon: '🐍',
    shortBio: "Born from a loveless union, Tom Riddle split his soul across seven Horcruxes in his obsession with immortality — and was undone by the one magic he never understood: love.",
    bio: `Tom Marvolo Riddle was born in a muggle orphanage on December 31, 1926, to a witch mother who died in childbirth and a muggle father who had been enchanted with a love potion. Brilliant, charming, and utterly devoid of empathy, Riddle taught himself to control and terrorize before he ever set foot in Hogwarts. At school he gathered followers, discovered his heritage, and began his obsessive quest for immortality through the creation of Horcruxes. As Lord Voldemort he rose to terrorize the entire wizarding world — twice. His downfall came from the same source as his power: he could never comprehend love, and it was love that destroyed him.`,
    traits: ['Supremely powerful', 'Narcissistic', 'Incapable of love', 'Brilliant', 'Morally hollow'],
    quotes: [
      { text: "There is no good and evil, there is only power, and those too weak to seek it.", book: "Philosopher's Stone" },
      { text: "I have gone further than anybody along the path that leads to immortality.", book: "Goblet of Fire" },
    ],
    keyMoments: [
      'Creating the seven Horcruxes',
      'Killing James and Lily Potter — and failing to kill Harry',
      'Rebirth in the graveyard — "Flesh, blood and bone"',
      'The possession of Harry in the Ministry atrium',
      'The final duel — and his ultimate defeat',
    ],
  },
]

export const getCharacterBySlug = (slug: string) => characters.find(c => c.slug === slug)
