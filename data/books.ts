export interface Book {
  id: number
  slug: string
  title: string
  subtitle: string
  year: number
  movieYear: number
  accentColor: string
  accentColorRgb: string
  glowColor: string
  synopsis: string
  shortSynopsis: string
  director: string
  keyCharacters: string[]
  spells: { name: string; effect: string }[]
  quotes: { text: string; character: string }[]
  funFacts: string[]
  icon: string
  gradient: string
}

export const books: Book[] = [
  {
    id: 1,
    slug: 'philosophers-stone',
    title: "Harry Potter and the Philosopher's Stone",
    subtitle: "Where the Magic Begins",
    year: 1997,
    movieYear: 2001,
    accentColor: '#FFD700',
    accentColorRgb: '255, 215, 0',
    glowColor: 'rgba(255, 215, 0, 0.4)',
    gradient: 'linear-gradient(135deg, #7a5c0a, #c9a227, #f5d76e)',
    icon: '🪄',
    director: 'Chris Columbus',
    synopsis: `On his eleventh birthday, Harry Potter discovers he is a wizard and is invited to attend Hogwarts School of Witchcraft and Wizardry. Leaving behind his miserable life with the Dursleys, he enters a world of magic, friendship, and wonder — but also one of ancient secrets and lurking darkness. Together with his new friends Ron Weasley and Hermione Granger, Harry discovers a mysterious three-headed dog guarding a trapdoor, unravels the legend of the Philosopher's Stone, and faces the sinister Professor Quirrell, who harbors the evil Lord Voldemort beneath his turban. The final confrontation in the Mirror of Erised chamber is both thrilling and deeply moving — a battle not of strength, but of pure heart.`,
    shortSynopsis: "An orphan discovers he's a wizard and embarks on his first year at Hogwarts, uncovering a plot to steal the Philosopher's Stone.",
    keyCharacters: ['Harry Potter', 'Hermione Granger', 'Ron Weasley', 'Albus Dumbledore', 'Professor Quirrell', 'Rubeus Hagrid', 'Neville Longbottom', 'Lord Voldemort'],
    spells: [
      { name: 'Wingardium Leviosa', effect: 'Levitates objects into the air' },
      { name: 'Alohomora', effect: 'Unlocks doors and locks' },
      { name: 'Lumos', effect: 'Produces light from the wand tip' },
    ],
    quotes: [
      { text: "It does not do to dwell on dreams and forget to live.", character: "Albus Dumbledore" },
      { text: "There are all kinds of courage. It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.", character: "Albus Dumbledore" },
      { text: "You're a wizard, Harry.", character: "Rubeus Hagrid" },
    ],
    funFacts: [
      "J.K. Rowling wrote the first chapter of this book in a Manchester café.",
      "The book was rejected by 12 publishers before Bloomsbury accepted it.",
      "Rowling was a single mother on welfare when she wrote this book.",
      "The American title was changed to 'Sorcerer's Stone' by the publisher.",
    ],
  },
  {
    id: 2,
    slug: 'chamber-of-secrets',
    title: "Harry Potter and the Chamber of Secrets",
    subtitle: "The Heir of Slytherin Awakens",
    year: 1998,
    movieYear: 2002,
    accentColor: '#1A8A1A',
    accentColorRgb: '26, 138, 26',
    glowColor: 'rgba(26, 138, 26, 0.4)',
    gradient: 'linear-gradient(135deg, #0d4f0d, #1a8a1a, #52c452)',
    icon: '🐍',
    director: 'Chris Columbus',
    synopsis: `Harry's second year at Hogwarts begins with a sinister warning from a house-elf named Dobby and soon spirals into terror as students are found Petrified in the corridors. The Chamber of Secrets has been opened, and the monster within — a Basilisk — is controlled by the Heir of Slytherin. Harry discovers he is a Parselmouth, casting suspicion on himself. The trail leads to a fifty-year-old diary belonging to Tom Riddle, and ultimately to the Chamber itself, where Ginny Weasley's life hangs by a thread and a memory of the young Voldemort manipulates events from within the pages of his enchanted journal. Harry defeats the Basilisk with the sword of Gryffindor in a heart-pounding climax of courage and loyalty.`,
    shortSynopsis: "Harry's second year brings a deadly monster, whispered secrets, and a diary belonging to the young Tom Riddle.",
    keyCharacters: ['Harry Potter', 'Ron Weasley', 'Hermione Granger', 'Ginny Weasley', 'Tom Riddle', 'Dobby', 'Gilderoy Lockhart', 'Lucius Malfoy'],
    spells: [
      { name: 'Expelliarmus', effect: 'Disarms an opponent, sending their wand flying' },
      { name: 'Serpensortia', effect: 'Conjures a snake from the wand tip' },
      { name: 'Obliviate', effect: 'Erases memories' },
    ],
    quotes: [
      { text: "It is our choices, Harry, that show what we truly are, far more than our abilities.", character: "Albus Dumbledore" },
      { text: "Dobby has no master. Dobby is a free elf!", character: "Dobby" },
    ],
    funFacts: [
      "The flying Ford Anglia was a real car — a 1960 Ford Anglia used in filming.",
      "Dobby was one of the first fully CGI characters in the series.",
      "The Basilisk was over 60 feet long in the film adaptation.",
    ],
  },
  {
    id: 3,
    slug: 'prisoner-of-azkaban',
    title: "Harry Potter and the Prisoner of Azkaban",
    subtitle: "The Knight Bus, the Marauder, and Time",
    year: 1999,
    movieYear: 2004,
    accentColor: '#8B9DC3',
    accentColorRgb: '139, 157, 195',
    glowColor: 'rgba(139, 157, 195, 0.4)',
    gradient: 'linear-gradient(135deg, #2d3a5c, #5c6f9c, #8b9dc3)',
    icon: '🌙',
    director: 'Alfonso Cuarón',
    synopsis: `The dementor-guarded skies above Hogwarts herald a new era of darkness as the infamous Sirius Black escapes Azkaban prison. Harry learns that Black — believed to be Voldemort's right-hand man — is after him. New Defense teacher Professor Lupin teaches Harry to fight dementors with the Patronus Charm, while Hermione's time-turner keeps her impossibly busy. The truth, when it unravels, is more complex and heartbreaking than anyone imagined: Sirius is Harry's godfather, innocent of the crimes attributed to him. The real traitor is Peter Pettigrew, hiding for twelve years as Ron's pet rat, Scabbers. Time-travel and a hippogriff named Buckbeak add layers of beautiful complexity to this masterwork of plotting.`,
    shortSynopsis: "A escaped prisoner, time travel, werewolves, and the Patronus Charm make Harry's third year his most complex yet.",
    keyCharacters: ['Harry Potter', 'Sirius Black', 'Professor Lupin', 'Peter Pettigrew', 'Hermione Granger', 'Buckbeak', 'Dementors'],
    spells: [
      { name: 'Expecto Patronum', effect: 'Conjures a Patronus to repel Dementors' },
      { name: 'Riddikulus', effect: 'Turns a Boggart into something funny' },
      { name: 'Accio', effect: 'Summons an object to the caster' },
    ],
    quotes: [
      { text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", character: "Albus Dumbledore" },
      { text: "The ones that love us never really leave us.", character: "Sirius Black" },
    ],
    funFacts: [
      "Alfonso Cuarón asked the three leads to write essays about their characters — in character.",
      "The Marauder's Map was inspired by the London Underground map.",
      "This is the first film with a Quidditch match that Harry doesn't win.",
    ],
  },
  {
    id: 4,
    slug: 'goblet-of-fire',
    title: "Harry Potter and the Goblet of Fire",
    subtitle: "The Triwizard Tournament and the Dark Lord's Return",
    year: 2000,
    movieYear: 2005,
    accentColor: '#FF6B35',
    accentColorRgb: '255, 107, 53',
    glowColor: 'rgba(255, 107, 53, 0.4)',
    gradient: 'linear-gradient(135deg, #8b2500, #cc4a00, #ff6b35)',
    icon: '🔥',
    director: 'Mike Newell',
    synopsis: `The Triwizard Tournament arrives at Hogwarts, and against all odds, fourteen-year-old Harry Potter's name is spat from the Goblet of Fire as a fourth champion. The tournament's three deadly tasks — navigating dragons, rescuing loved ones from the Black Lake, and navigating a living maze — are interspersed with the growing weight of something far more sinister. The maze leads Harry to a graveyard where he witnesses the rebirth of Lord Voldemort in a terrifying ritual, and barely escapes with his life and Cedric Diggory's body. The wizarding world is forever changed. Voldemort has returned, the Death Eaters are gathering, and the golden age of Harry's school life is irrevocably over.`,
    shortSynopsis: "The Triwizard Tournament brings deadly challenges — and culminates in the terrifying rebirth of Lord Voldemort.",
    keyCharacters: ['Harry Potter', 'Cedric Diggory', 'Lord Voldemort', 'Bartemius Crouch Jr.', 'Alastor Moody', 'Viktor Krum', 'Fleur Delacour'],
    spells: [
      { name: 'Avada Kedavra', effect: 'The Killing Curse — one of three Unforgivable Curses' },
      { name: 'Crucio', effect: 'Inflicts unbearable pain on the victim' },
      { name: 'Priori Incantatem', effect: 'Forces a wand to re-echo its last spells' },
    ],
    quotes: [
      { text: "We are only as strong as we are united, as weak as we are divided.", character: "Albus Dumbledore" },
      { text: "Remember, if the time should come when you have to make a choice between what is right and what is easy.", character: "Albus Dumbledore" },
    ],
    funFacts: [
      "Robert Pattinson was cast as Cedric Diggory in the film adaptation.",
      "The Goblet of Fire is the first book in the series to feature a character death that hits the readers hard.",
      "This was the longest book in the series at the time of publication.",
    ],
  },
  {
    id: 5,
    slug: 'order-of-the-phoenix',
    title: "Harry Potter and the Order of the Phoenix",
    subtitle: "Dumbledore's Army and the Ministry's Lies",
    year: 2003,
    movieYear: 2007,
    accentColor: '#4A90D9',
    accentColorRgb: '74, 144, 217',
    glowColor: 'rgba(74, 144, 217, 0.4)',
    gradient: 'linear-gradient(135deg, #0f2a5c, #1e4d99, #4a90d9)',
    icon: '⚡',
    director: 'David Yates',
    synopsis: `A traumatized, isolated Harry returns to Hogwarts to find the Ministry of Magic in denial about Voldemort's return. Under the cruel regime of Dolores Umbridge, who takes control of the school, Harry forms Dumbledore's Army — a secret student resistance group trained in real defensive magic. Simultaneously, Harry is tormented by visions connected to Voldemort's mind. The finale erupts in the Department of Mysteries where Sirius Black falls through the veil, and Harry confronts Voldemort himself in the atrium of the Ministry, finally forcing the Ministry to acknowledge the Dark Lord's return. But the victory comes at tremendous personal cost.`,
    shortSynopsis: "Ministry denial, Umbridge's tyranny, and Dumbledore's Army — before a devastating battle in the Department of Mysteries.",
    keyCharacters: ['Harry Potter', 'Dolores Umbridge', 'Sirius Black', 'Luna Lovegood', 'Bellatrix Lestrange', 'Neville Longbottom', 'Lord Voldemort'],
    spells: [
      { name: 'Protego', effect: 'Shield charm that deflects spells' },
      { name: 'Stupefy', effect: 'Stunning spell that renders the target unconscious' },
      { name: 'Occlumency', effect: 'Mental defense against Legilimency' },
    ],
    quotes: [
      { text: "Things we lose have a way of coming back to us in the end, if not always in the way we expect.", character: "Luna Lovegood" },
      { text: "You're not going to lose me. I'm going to fight to the very end.", character: "Sirius Black" },
    ],
    funFacts: [
      "Order of the Phoenix is the longest book in the Harry Potter series at 766 pages.",
      "Luna Lovegood became an instant fan favourite from her very first scene.",
      "The Room of Requirement scenes were almost entirely cut in early drafts.",
    ],
  },
  {
    id: 6,
    slug: 'half-blood-prince',
    title: "Harry Potter and the Half-Blood Prince",
    subtitle: "Horcruxes, Potions, and Betrayal",
    year: 2005,
    movieYear: 2009,
    accentColor: '#CC2200',
    accentColorRgb: '204, 34, 0',
    glowColor: 'rgba(204, 34, 0, 0.4)',
    gradient: 'linear-gradient(135deg, #4a0000, #8b0000, #cc2200)',
    icon: '📖',
    director: 'David Yates',
    synopsis: `Dumbledore takes Harry on private lessons — journeys through memory and Pensieve — to uncover the origins of Tom Riddle and the terrible secret of the Horcruxes: seven objects into which Voldemort has split his soul to achieve immortality. Harry's social life is complicated by potions class, where a battered old textbook annotated by "The Half-Blood Prince" gives him extraordinary ability. Draco Malfoy's mysterious assignment for the Dark Lord darkens as the year progresses. The shattering climax on the Astronomy Tower, where Snape kills Dumbledore with Avada Kedavra, is one of the most devastating moments in literary history — and the revelation of Snape's true identity as the Half-Blood Prince redefines everything.`,
    shortSynopsis: "Horcruxes revealed, love blooms, and a devastating betrayal on the Astronomy Tower changes everything forever.",
    keyCharacters: ['Harry Potter', 'Albus Dumbledore', 'Severus Snape', 'Draco Malfoy', 'Horace Slughorn', 'Ginny Weasley', 'Tom Riddle'],
    spells: [
      { name: 'Sectumsempra', effect: 'Slashes the target as if with invisible sword — dark magic' },
      { name: 'Felix Felicis', effect: 'Liquid luck potion that grants extraordinary good fortune' },
      { name: 'Legilimens', effect: 'Allows caster to read another\'s mind' },
    ],
    quotes: [
      { text: "Do not pity the dead, Harry. Pity the living, and above all, those who live without love.", character: "Albus Dumbledore" },
      { text: "I am not worried, Harry. I am with you.", character: "Albus Dumbledore" },
    ],
    funFacts: [
      "This book contains the most complex backstory of any in the series, revealing Voldemort's entire history.",
      "The cave lake scene required Alan Rickman to lie in cold water for multiple takes.",
      "J.K. Rowling has said she cried while writing Dumbledore's death.",
    ],
  },
  {
    id: 7,
    slug: 'deathly-hallows-1',
    title: "Harry Potter and the Deathly Hallows",
    subtitle: "Part One — The Horcrux Hunt",
    year: 2007,
    movieYear: 2010,
    accentColor: '#8A8A8A',
    accentColorRgb: '138, 138, 138',
    glowColor: 'rgba(138, 138, 138, 0.3)',
    gradient: 'linear-gradient(135deg, #2a2a2a, #555555, #8a8a8a)',
    icon: '△',
    director: 'David Yates',
    synopsis: `The Ministry has fallen. Hogwarts is no longer safe. Harry, Ron, and Hermione abandon the magical world to hunt Voldemort's Horcruxes — fragments of his shattered soul hidden in objects of dark significance. Their journey is punishing: months of isolation in a tent, wearing the soul-draining locket Horcrux, with no map and precious few clues. Ron's temporary desertion under the Horcrux's influence, the devastating visit to Godric's Hollow, the theft of the sword of Gryffindor, and the harrowing capture at Malfoy Manor all build toward a devastating loss: the death of Dobby the free elf, one of the most heartbreaking moments of the entire saga. The Deathly Hallows — the Elder Wand, the Resurrection Stone, the Invisibility Cloak — enter the story as legend made terrifyingly real.`,
    shortSynopsis: "On the run from Voldemort's regime, the trio hunt Horcruxes while uncovering the legend of the Deathly Hallows.",
    keyCharacters: ['Harry Potter', 'Hermione Granger', 'Ron Weasley', 'Dobby', 'Xenophilius Lovegood', 'Bellatrix Lestrange', 'Lord Voldemort'],
    spells: [
      { name: 'Horcrux Magic', effect: 'Soul-splitting dark magic granting immortality' },
      { name: 'Deathly Hallows', effect: 'The three most powerful magical objects ever created' },
      { name: 'Taboo', effect: 'Voldemort\'s name triggers an alarm when spoken' },
    ],
    quotes: [
      { text: "Of course it is happening inside your head, Harry, but why on earth should that mean that it is not real?", character: "Albus Dumbledore" },
      { text: "Dobby is free.", character: "Dobby" },
    ],
    funFacts: [
      "Dobby's death scene caused many adult fans to cry in cinemas worldwide.",
      "The 'Tale of Three Brothers' animated sequence won a BAFTA award.",
      "This was the first Harry Potter film to receive a PG-13 rating in the US.",
    ],
  },
  {
    id: 8,
    slug: 'deathly-hallows-2',
    title: "Harry Potter and the Deathly Hallows",
    subtitle: "Part Two — The Final Battle",
    year: 2007,
    movieYear: 2011,
    accentColor: '#9B59B6',
    accentColorRgb: '155, 89, 182',
    glowColor: 'rgba(155, 89, 182, 0.5)',
    gradient: 'linear-gradient(135deg, #3d1a5c, #6c2fa0, #9b59b6)',
    icon: '⚔️',
    director: 'David Yates',
    synopsis: `The Battle of Hogwarts. The final confrontation between good and evil arrives as Voldemort's army descends upon Hogwarts. Harry discovers the final Horcruxes through the devastated landscape of Gringotts, the Room of Requirement, and the mind of Voldemort himself. The most shattering revelation: Harry himself is a Horcrux — he must die. He walks willingly to his death in the Forbidden Forest, and in the limbo between life and death, meets Dumbledore one last time. The resurrection stone brings back those he loves. He returns. Neville Longbottom beheads Nagini. Molly Weasley defeats Bellatrix. And in the courtyard of Hogwarts, Harry Potter and Lord Voldemort cast their final spells. "The Boy Who Lived" earns his name one last, eternal time.`,
    shortSynopsis: "The Battle of Hogwarts. Harry discovers he is a Horcrux, walks willingly to death, and faces Voldemort in the ultimate final duel.",
    keyCharacters: ['Harry Potter', 'Lord Voldemort', 'Severus Snape', 'Neville Longbottom', 'Molly Weasley', 'Bellatrix Lestrange', 'Minerva McGonagall'],
    spells: [
      { name: 'Expecto Patronum', effect: 'Harry\'s stag Patronus — symbol of hope and love' },
      { name: 'Protego Maxima', effect: 'Massive magical barrier protecting Hogwarts' },
      { name: 'Fiendfyre', effect: 'Cursed fire that seeks out and destroys its targets' },
    ],
    quotes: [
      { text: "Always.", character: "Severus Snape" },
      { text: "Not my daughter, you b*tch!", character: "Molly Weasley" },
      { text: "I open at the close.", character: "The Golden Snitch" },
    ],
    funFacts: [
      "'Always' is considered one of the greatest single lines in film history.",
      "The Battle of Hogwarts set used over 200 wand-armed extras.",
      "Alan Rickman knew Snape's full backstory from the very beginning, told personally by J.K. Rowling.",
      "The epilogue '19 Years Later' used aged make-up taking 5+ hours to apply.",
    ],
  },
]

export const getBookBySlug = (slug: string) => books.find(b => b.slug === slug)
