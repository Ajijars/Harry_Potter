'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FloatingObjects from '@/components/FloatingObjects'
import SpellEffect from '@/components/SpellEffect'
import { books } from '@/data/books'
import { characters } from '@/data/characters'

// ── All iconic HP dialogues for the ticker + strips ──
const DIALOGUES = [
  { text: "You're a wizard, Harry.", char: "Rubeus Hagrid" },
  { text: "It does not do to dwell on dreams and forget to live.", char: "Albus Dumbledore" },
  { text: "It is our choices that show what we truly are, far more than our abilities.", char: "Albus Dumbledore" },
  { text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", char: "Albus Dumbledore" },
  { text: "Always.", char: "Severus Snape" },
  { text: "The ones that love us never really leave us.", char: "Sirius Black" },
  { text: "I solemnly swear that I am up to no good.", char: "The Marauder's Map" },
  { text: "Dobby is free.", char: "Dobby" },
  { text: "Not my daughter, you b*tch!", char: "Molly Weasley" },
  { text: "After all this time? — Always.", char: "Severus Snape" },
  { text: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.", char: "Albus Dumbledore" },
  { text: "We are only as strong as we are united, as weak as we are divided.", char: "Albus Dumbledore" },
  { text: "Things we lose have a way of coming back to us in the end.", char: "Luna Lovegood" },
  { text: "It's Wing-gar-dium Levi-O-sa, not Levio-SAH.", char: "Hermione Granger" },
  { text: "I am not worried, Harry. I am with you.", char: "Albus Dumbledore" },
  { text: "Of course it is happening inside your head, Harry, but why on earth should that mean it is not real?", char: "Albus Dumbledore" },
  { text: "Mischief managed.", char: "The Marauder's Map" },
  { text: "Do not pity the dead. Pity the living, and above all, those who live without love.", char: "Albus Dumbledore" },
  { text: "I open at the close.", char: "The Golden Snitch" },
  { text: "Wit beyond measure is man's greatest treasure.", char: "Ravenclaw Motto" },
]

// Dialogue strip quotes between sections
const STRIP_QUOTES = [
  { text: "It does not do to dwell on dreams and forget to live.", char: "Albus Dumbledore" },
  { text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", char: "Albus Dumbledore" },
  { text: "The ones that love us never really leave us.", char: "Sirius Black" },
  { text: "We are only as strong as we are united, as weak as we are divided.", char: "Albus Dumbledore" },
  { text: "Of course it is happening inside your head, Harry, but why on earth should that mean it is not real?", char: "Albus Dumbledore" },
]

// Fixed-position dialogue popups floating on the hero
const HERO_DIALOGUES = [
  { text: "You're a wizard, Harry.", char: "Hagrid", top: '22%', left: '3%', delay: '0s' },
  { text: "I solemnly swear that I am up to no good.", char: "Marauder's Map", top: '65%', right: '4%', delay: '2s' },
  { text: "Always.", char: "Severus Snape", top: '45%', left: '2%', delay: '4s' },
]

function QuoteTicker() {
  // Duplicate for seamless loop
  const all = [...DIALOGUES, ...DIALOGUES]
  return (
    <div className="quote-ticker" aria-hidden="true">
      <div className="quote-ticker-inner">
        {all.map((d, i) => (
          <span key={i} className="quote-ticker-item">
            <span style={{ color: 'rgba(201,162,39,0.4)' }}>⚡</span>
            <em>"{d.text}"</em>
            <span className="ticker-char">— {d.char}</span>
            {i < all.length - 1 && <span className="quote-ticker-sep">✦</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

function DialogueStrip({ quote }: { quote: { text: string; char: string } }) {
  return (
    <div className="dialogue-strip">
      <p className="dialogue-strip-quote">"{quote.text}"</p>
      <p className="dialogue-strip-attr">— {quote.char}</p>
    </div>
  )
}

const SPELLS = [
  { name: 'Expecto Patronum', latin: 'I await a guardian', icon: '🦌', desc: 'Conjures a Patronus — a guardian spirit made of happy memories — to repel Dementors. Harry\'s takes the form of a majestic silver stag, identical to his father\'s.', className: 'expecto', color: '#a0c8ff' },
  { name: 'Avada Kedavra', latin: 'Let the thing be destroyed', icon: '💀', desc: 'The Killing Curse — one of three Unforgivable Curses. A flash of green light, instant death. Rebounded off infant Harry due to the ancient magic of his mother\'s love.', className: 'avada', color: '#00cc44' },
  { name: 'Lumos', latin: 'Light', icon: '💡', desc: 'Produces a beam of light from the tip of the wand. The counterpart Nox extinguishes it. One of the first spells taught at Hogwarts.', className: 'lumos', color: '#ffffc0' },
  { name: 'Expelliarmus', latin: 'To expel a weapon', icon: '✨', desc: "Harry's signature spell — the Disarming Charm. It won him every duel that mattered, including the final battle against Voldemort himself.", className: 'expelliarmus', color: '#ff6060' },
  { name: 'Wingardium Leviosa', latin: 'Levitate', icon: '🪶', desc: 'The Levitation Charm. Hermione\'s perfect pronunciation saved Ron from a troll in their first year. "It\'s Wing-gar-dium Levi-O-sa."', className: 'wingardium', color: '#80ff80' },
  { name: 'Alohomora', latin: 'Friendly to thieves', icon: '🔓', desc: 'Unlocks doors. The first spell Harry, Ron and Hermione used to break rules — sneaking past Fluffy the three-headed dog in first year.', className: 'alohomora', color: '#ffaa44' },
]

const MAGICAL_OBJECTS = [
  { icon: '💎', name: "Philosopher's Stone" },
  { icon: '📔', name: "Tom Riddle's Diary" },
  { icon: '🗺️', name: "Marauder's Map" },
  { icon: '⌛', name: 'Time Turner' },
  { icon: '🏆', name: 'Triwizard Cup' },
  { icon: '🔮', name: 'Prophecy Orb' },
  { icon: '🐦', name: 'Elder Wand' },
  { icon: '💍', name: 'Resurrection Stone' },
  { icon: '🧥', name: 'Invisibility Cloak' },
  { icon: '🗡️', name: 'Sword of Gryffindor' },
  { icon: '🐍', name: "Slytherin's Locket" },
  { icon: '🏺', name: "Hufflepuff's Cup" },
]

const HOUSES = [
  {
    id: 'gryffindor',
    name: 'Gryffindor',
    crest: '🦁',
    colors: 'Scarlet & Gold',
    founder: 'Godric Gryffindor',
    motto: 'Their daring, nerve, and chivalry set Gryffindors apart',
    traits: ['Courage', 'Bravery', 'Nerve', 'Chivalry'],
    description: "The house of the lion, Gryffindor values courage above all. Its members have faced Basilisks, Dark Lords, and their own deepest fears — and come out the other side, not unscathed, but unbroken.",
    ghost: 'Nearly Headless Nick',
    element: 'Fire',
  },
  {
    id: 'slytherin',
    name: 'Slytherin',
    crest: '🐍',
    colors: 'Emerald & Silver',
    founder: 'Salazar Slytherin',
    motto: 'Those cunning folk use any means to achieve their ends',
    traits: ['Ambition', 'Cunning', 'Resourcefulness', 'Leadership'],
    description: "The house of the serpent is not evil — it is ambitious. Slytherin produces leaders, innovators, and survivors. And sometimes, the bravest hero of all: Severus Snape.",
    ghost: 'The Bloody Baron',
    element: 'Water',
  },
  {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    crest: '🦅',
    colors: 'Blue & Bronze',
    founder: 'Rowena Ravenclaw',
    motto: 'Wit beyond measure is man\'s greatest treasure',
    traits: ['Intelligence', 'Creativity', 'Wit', 'Wisdom'],
    description: "Where those of wit and learning will always find their kind. Ravenclaw minds built impossible things, asked impossible questions, and found beauty in the spaces between answers.",
    ghost: 'The Grey Lady',
    element: 'Air',
  },
  {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    crest: '🦡',
    colors: 'Yellow & Black',
    founder: 'Helga Hufflepuff',
    motto: 'She took the rest and taught them all she knew',
    traits: ['Loyalty', 'Patience', 'Hard work', 'Fair play'],
    description: "Often underestimated, never defeated. Hufflepuff stood up en masse during the Battle of Hogwarts. Nymphadora Tonks. Newt Scamander. Cedric Diggory. The measure of a house is its heart.",
    ghost: 'The Fat Friar',
    element: 'Earth',
  },
]

export default function HomePage() {
  const [activeSpell, setActiveSpell] = useState<string | null>(null)
  const [sortingResult, setSortingResult] = useState<string | null>(null)
  const [hoveredBook, setHoveredBook] = useState<number | null>(null)
  const [spellInput, setSpellInput]   = useState('')
  const [spellFired, setSpellFired]   = useState<{name:string,desc:string,color:string,emoji:string}|null>(null)
  const [mapRevealed, setMapRevealed] = useState(false)
  const [factIdx, setFactIdx]         = useState(0)
  const revealRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSpellClick = (spellName: string) => {
    setActiveSpell(spellName)
    setTimeout(() => setActiveSpell(null), 700)
  }

  const handleSorting = (house: string) => {
    setSortingResult(house)
  }

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="hero-section" id="hero">
        <div className="hero-bg" />
        <FloatingObjects />

        {/* ── Floating Dialogue Popups ── */}
        <div className="dialogue-popup" style={{ top: '22%', left: '3%', animationDelay: '0s' }} aria-hidden="true">
          <p className="dialogue-popup-text">"You're a wizard, Harry."</p>
          <p className="dialogue-popup-char">— Rubeus Hagrid</p>
        </div>
        <div className="dialogue-popup" style={{ top: '58%', right: '3%', left: 'auto', animationDelay: '2.5s' }} aria-hidden="true">
          <p className="dialogue-popup-text">"I solemnly swear that I am up to no good."</p>
          <p className="dialogue-popup-char">— The Marauder's Map</p>
        </div>
        <div className="dialogue-popup" style={{ top: '75%', left: '2%', animationDelay: '5s' }} aria-hidden="true">
          <p className="dialogue-popup-text">"Always."</p>
          <p className="dialogue-popup-char">— Severus Snape</p>
        </div>

        <div style={{
          position: 'relative', zIndex: 10,
          textAlign: 'center', padding: '2rem',
          maxWidth: '900px', margin: '0 auto',
        }}>
          <p className="hero-eyebrow">✦ The Wizarding World Awaits ✦</p>
          <h1 className="hero-title">Welcome to<br />Hogwarts</h1>
          <p className="hero-subtitle">A Magical Journey</p>
          <p className="hero-tagline">
            "I solemnly swear that I am up to no good" — 1991 to 1998, seven years, eight films, one extraordinary legacy.
          </p>
          <div className="hero-cta-group">
            <Link href="/books" className="btn-primary" id="begin-journey-btn">
              Begin Your Journey
            </Link>
            <Link href="/houses" className="btn-secondary" id="find-house-btn">
              Find Your House
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-mouse" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTRO STATS BAR
      ═══════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(to right, rgba(13,0,32,0.95), rgba(26,13,61,0.9), rgba(13,0,32,0.95))',
        borderTop: '1px solid rgba(201,162,39,0.2)',
        borderBottom: '1px solid rgba(201,162,39,0.2)',
        padding: '2rem',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {[
            { number: '7', label: 'Books' },
            { number: '8', label: 'Films' },
            { number: '700+', label: 'Spells' },
            { number: '4', label: 'Hogwarts Houses' },
            { number: '34', label: 'Main Characters' },
            { number: '£2.39B', label: 'Books Sold' },
          ].map((stat, i) => (
            <div key={i} className="reveal" style={{ '--reveal-delay': `${i * 0.1}s` } as React.CSSProperties}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: 'var(--gold-bright)',
                textShadow: 'var(--glow-gold)',
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}>
                {stat.number}
              </div>
              <div style={{
                fontFamily: 'var(--font-subheading)',
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(232,220,200,0.6)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dialogue Strip: Dumbledore ── */}
      <DialogueStrip quote={STRIP_QUOTES[0]} />

      {/* ═══════════════════════════════════════
          SORTING HAT SECTION
      ═══════════════════════════════════════ */}
      <section className="section sorting-section" id="sorting-hat">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <span className="section-label">The Ancient Ceremony</span>
          <h2 className="section-title reveal">The Sorting Hat</h2>
          <p className="section-description reveal" style={{ margin: '0 auto 2rem' }}>
            "There's nothing hidden in your head the Sorting Hat can't see." — 
            Every September 1st, new students are sorted into one of four houses. 
            Which house does your soul belong to?
          </p>

          <div className="sorting-hat-container reveal">
            <Image
              src="/sorting_hat.jpg"
              alt="The Sorting Hat"
              width={280}
              height={280}
              className="sorting-hat-img"
              onClick={() => {
                const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']
                handleSorting(houses[Math.floor(Math.random() * houses.length)])
              }}
              style={{ borderRadius: '12px', cursor: 'pointer' }}
            />
            <div className="sorting-hat-ring" />
          </div>

          {sortingResult && (
            <div style={{
              margin: '2rem auto',
              padding: '1.5rem 3rem',
              background: 'rgba(13,0,32,0.9)',
              border: `1px solid ${sortingResult === 'gryffindor' ? '#d3a625' : sortingResult === 'slytherin' ? '#aac8b0' : sortingResult === 'ravenclaw' ? '#b0c4e8' : '#ecb939'}`,
              borderRadius: '8px',
              display: 'inline-block',
              animation: 'fadeInUp 0.6s ease',
            }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                The Hat has spoken!
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: sortingResult === 'gryffindor' ? '#d3a625' : sortingResult === 'slytherin' ? '#aac8b0' : sortingResult === 'ravenclaw' ? '#b0c4e8' : '#ecb939', textShadow: '0 0 30px currentColor' }}>
                {sortingResult.charAt(0).toUpperCase() + sortingResult.slice(1)}!
              </div>
            </div>
          )}

          <div className="house-buttons reveal">
            {['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'].map(house => (
              <button
                key={house}
                className={`house-btn ${house}`}
                id={`sort-${house}-btn`}
                onClick={() => handleSorting(house)}
              >
                {house === 'gryffindor' ? '🦁' : house === 'slytherin' ? '🐍' : house === 'ravenclaw' ? '🦅' : '🦡'}
                {' '}{house.charAt(0).toUpperCase() + house.slice(1)}
              </button>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'rgba(201,162,39,0.5)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            Click the Hat to be sorted randomly, or choose your house above
          </p>
        </div>
      </section>

      {/* ── Dialogue Strip: Happiness ── */}
      <DialogueStrip quote={STRIP_QUOTES[1]} />

      {/* ═══════════════════════════════════════
          GREAT HALL SECTION
      ═══════════════════════════════════════ */}
      <section className="section great-hall-section" id="great-hall">
        <div className="great-hall-bg" />
        <div className="section-inner great-hall-content">
          <span className="section-label reveal">The Heart of Hogwarts</span>
          <h2 className="section-title reveal" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
            The Great Hall
          </h2>
          <div className="magical-divider reveal">
            <span className="magical-divider-symbol">✦</span>
          </div>
          <p className="section-description reveal" style={{ fontSize: '1.2rem' }}>
            A thousand candles float above four long tables. The enchanted ceiling mirrors the night sky outside — 
            stormy or star-bright, never still. Here, first-years are sorted into their houses. 
            Here, feasts appear by magic. Here, the entire Hogwarts community gathers in times of triumph and terror alike.
          </p>
          <p className="reveal" style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'rgba(201, 162, 39, 0.8)',
            marginBottom: '2rem',
          }}>
            "It's not real, the ceiling. It's bewitched to look like the sky outside. 
            I read about it in Hogwarts: A History." — Hermione Granger
          </p>
          <div className="reveal">
            <Image
              src="/great_hall.jpg"
              alt="The Great Hall at Hogwarts"
              width={900}
              height={506}
              style={{
                width: '100%',
                maxWidth: '900px',
                borderRadius: '8px',
                border: '1px solid rgba(201,162,39,0.3)',
                boxShadow: '0 20px 80px rgba(0,0,0,0.8), 0 0 60px rgba(201,162,39,0.1)',
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SPELLS SECTION
      ═══════════════════════════════════════ */}
      <section className="section spells-section" id="spells">
        <div className="section-inner">
          <span className="section-label">Ancient Incantations</span>
          <h2 className="section-title reveal">The Spells</h2>
          <p className="section-description reveal">
            Click any spell card to feel its power. Over 700 spells exist in the wizarding world — 
            from the simple Lumos to the terrible Avada Kedavra. Each one a word made into force.
          </p>

          <div className="spells-grid">
            {SPELLS.map((spell, i) => (
              <div
                key={spell.name}
                className={`spell-card ${spell.className} reveal reveal-delay-${(i % 6) + 1}`}
                id={`spell-${spell.className}-card`}
                onClick={() => handleSpellClick(spell.name)}
                style={{ position: 'relative' }}
              >
                {activeSpell === spell.name && (
                  <div
                    className="spell-effect-burst"
                    style={{ background: `radial-gradient(circle, ${spell.color}60 0%, transparent 70%)` }}
                  />
                )}
                <span className="spell-icon">{spell.icon}</span>
                <h3 className="spell-name">{spell.name}</h3>
                <p className="spell-latin">{spell.latin}</p>
                <p className="spell-description">{spell.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOOKS / MOVIES SECTION
      ═══════════════════════════════════════ */}
      <section className="section books-section" id="books">
        <div className="section-inner">
          <span className="section-label">The Complete Saga</span>
          <h2 className="section-title reveal">Seven Books. Eight Films.<br />One Legend.</h2>
          <p className="section-description reveal">
            From the wonder of Philosopher's Stone to the heartbreak of Deathly Hallows — 
            each chapter a world unto itself. Choose your journey.
          </p>

          <div className="books-grid">
            {books.map((book, i) => (
              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                className={`book-card reveal reveal-delay-${(i % 6) + 1}`}
                id={`book-card-${book.id}`}
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                {/* Accent top line per book color */}
                <div
                  className="book-accent-line"
                  style={{ background: `linear-gradient(to right, transparent, ${book.accentColor}, transparent)` }}
                />

                {/* Background color block */}
                <div style={{
                  width: '100%',
                  height: '220px',
                  background: book.gradient,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '5rem',
                  overflow: 'hidden',
                }}>
                  {/* Glowing icon */}
                  <span style={{
                    filter: `drop-shadow(0 0 20px ${book.accentColor})`,
                    animation: 'float 4s ease-in-out infinite',
                    animationDelay: `${i * 0.3}s`,
                    transition: 'transform 0.3s',
                    transform: hoveredBook === book.id ? 'scale(1.3)' : 'scale(1)',
                  }}>
                    {book.icon}
                  </span>
                  {/* Glow overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at center, ${book.glowColor} 0%, transparent 70%)`,
                    opacity: hoveredBook === book.id ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }} />
                </div>

                <div className="book-card-overlay" />
                <div className="book-card-content">
                  <p className="book-number">Book {book.id === 8 ? '7 Part 2' : book.id} · {book.movieYear}</p>
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-year">Directed by {book.director}</p>
                  <p className="book-excerpt">{book.shortSynopsis}</p>
                </div>
                <div className="book-card-glow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CHARACTERS SECTION
      ═══════════════════════════════════════ */}
      <section className="section characters-section" id="characters">
        <div className="section-inner">
          <span className="section-label">The Ones Who Made History</span>
          <h2 className="section-title reveal">Characters</h2>
          <p className="section-description reveal">
            Heroes, villains, mentors, traitors — the wizarding world is alive with 
            characters of extraordinary depth. Every soul has a story.
          </p>

          <div className="characters-carousel reveal">
            {characters.map((char, i) => (
              <Link
                key={char.id}
                href={`/characters/${char.slug}`}
                className="character-card"
                id={`character-card-${char.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="character-card-image-wrap">
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                  <div className="character-card-image-overlay" />
                </div>
                <div className="character-card-info">
                  <span className={`character-house-badge badge-${char.house}`}>
                    {char.house === 'dark' ? '🐍 Dark Arts' : char.house.charAt(0).toUpperCase() + char.house.slice(1)}
                  </span>
                  <h3 className="character-name">{char.name}</h3>
                  <p className="character-title">{char.role}</p>
                  <p className="character-bio">{char.shortBio}</p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }} className="reveal">
            <Link href="/characters" className="btn-secondary" id="all-characters-btn">
              View All Characters →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOUSES SECTION
      ═══════════════════════════════════════ */}
      <section className="section houses-section" id="houses">
        <div className="section-inner">
          <span className="section-label">Four Pillars of Hogwarts</span>
          <h2 className="section-title reveal">The Four Houses</h2>
          <p className="section-description reveal">
            Founded by the four greatest witches and wizards of the age, 
            each house carries its own values, history, and pride. 
            Which one beats in your chest?
          </p>

          <div className="houses-grid">
            {HOUSES.map((house, i) => (
              <Link
                key={house.id}
                href={`/houses/${house.id}`}
                className={`house-card ${house.id} reveal reveal-delay-${i + 1}`}
                id={`house-card-${house.id}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <span className="house-crest">{house.crest}</span>
                <h3 className="house-name">{house.name}</h3>
                <p className="house-motto" style={{ marginBottom: '0.75rem' }}>
                  <em>"{house.motto}"</em>
                </p>
                <div className="house-traits">
                  {house.traits.map(t => (
                    <span key={t} className="trait-pill">{t}</span>
                  ))}
                </div>
                <p className="house-description">{house.description}</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'rgba(232,220,200,0.45)', fontFamily: 'var(--font-subheading)', letterSpacing: '0.1em' }}>
                  <span>👻 {house.ghost}</span>
                  <span>🌿 {house.element}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MAGICAL OBJECTS SECTION
      ═══════════════════════════════════════ */}
      <section className="section objects-section" id="objects">
        <div className="section-inner">
          <span className="section-label">Artefacts of Legend</span>
          <h2 className="section-title reveal">Magical Objects</h2>
          <p className="section-description reveal">
            From the humble Time Turner to the terrible Deathly Hallows — 
            every magical object carries a story of power, sacrifice, or wonder.
          </p>

          <div className="objects-grid">
            {MAGICAL_OBJECTS.map((obj, i) => (
              <div
                key={obj.name}
                className={`object-card reveal reveal-delay-${(i % 6) + 1}`}
                id={`object-${obj.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
              >
                <span className="object-icon">{obj.icon}</span>
                <p className="object-name">{obj.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BROOMSTICK FEATURE SECTION
      ═══════════════════════════════════════ */}
      <section className="section" style={{ background: 'radial-gradient(ellipse at center, rgba(45,27,105,0.2) 0%, transparent 60%)' }} id="quidditch">
        <div className="section-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="reveal">
            <span className="section-label">The Sport of Wizards</span>
            <h2 className="section-title">Quidditch &<br />The Golden Snitch</h2>
            <div className="magical-divider">
              <span className="magical-divider-symbol">⚡</span>
            </div>
            <p className="section-description" style={{ marginBottom: '1.5rem' }}>
              Played on broomsticks 500 feet above ground, Quidditch is the most popular sport in the wizarding world. 
              Seven players per team. Three Chasers, two Beaters, one Keeper, and the Seeker — 
              whose sole mission is to catch the Golden Snitch and end the game.
            </p>
            <blockquote className="quote-card" style={{ maxWidth: '500px' }}>
              <p className="quote-text">"Get to the Snitch before Malfoy or die trying, Harry."</p>
              <p className="quote-attribution">— Oliver Wood, Gryffindor Quidditch Captain</p>
            </blockquote>
          </div>
          <div className="reveal reveal-delay-2">
            <Image
              src="/broomstick.jpg"
              alt="Firebolt broomstick flying over Hogwarts"
              width={600}
              height={338}
              style={{
                width: '100%',
                borderRadius: '12px',
                border: '1px solid rgba(201,162,39,0.25)',
                boxShadow: '0 20px 80px rgba(0,0,0,0.7), 0 0 40px rgba(201,162,39,0.1)',
              }}
            />
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Image
                src="/golden_snitch.jpg"
                alt="The Golden Snitch"
                width={300}
                height={200}
                style={{
                  width: '80%',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,215,0,0.3)',
                  boxShadow: '0 10px 40px rgba(255,215,0,0.2)',
                  animation: 'float 3s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL QUOTE SECTION
      ═══════════════════════════════════════ */}
      <section className="section" style={{
        textAlign: 'center',
        background: 'linear-gradient(to bottom, transparent, rgba(26,13,61,0.3), transparent)',
        padding: '8rem 2rem',
      }}>
        <div className="section-inner">
          <div className="reveal" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ fontSize: '3rem', marginBottom: '2rem', opacity: 0.6 }}>〝</div>
            <blockquote style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.3rem, 3vw, 2rem)',
              color: 'rgba(232, 220, 200, 0.9)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Of course it is happening inside your head, Harry,<br />
              but why on earth should that mean that it is not real?
            </blockquote>
            <div style={{ fontSize: '3rem', marginBottom: '2rem', opacity: 0.6 }}>〞</div>
            <p style={{
              fontFamily: 'var(--font-subheading)',
              fontSize: '0.85rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              — Albus Dumbledore, Harry Potter and the Deathly Hallows
            </p>
          </div>
        </div>
      </section>

      {/* ── Dialogue Strip: Sirius ── */}
      <DialogueStrip quote={STRIP_QUOTES[2]} />

      {/* ═══════════════════════════════════════
          SPELL CASTING — INTERACTIVE
      ═══════════════════════════════════════ */}
      {(() => {
        const SPELLS = [
          { name: 'Lumos',              desc: 'Illuminates the tip of your wand.',           color: '#fff9c4', emoji: '💡' },
          { name: 'Expelliarmus',       desc: 'Disarms your opponent instantly.',             color: '#ff6b6b', emoji: '⚡' },
          { name: 'Expecto Patronum',   desc: 'Conjures a Patronus to repel Dementors.',     color: '#a0c8ff', emoji: '🦌' },
          { name: 'Alohomora',          desc: 'Unlocks doors and sealed objects.',            color: '#ffd700', emoji: '🗝️' },
          { name: 'Wingardium Leviosa', desc: 'Makes objects levitate with grace.',           color: '#c8f5a0', emoji: '🪶' },
          { name: 'Accio',              desc: 'Summons an object directly to you.',           color: '#f5d76e', emoji: '✨' },
          { name: 'Avada Kedavra',      desc: 'The Killing Curse. Unforgivable.',             color: '#00ee44', emoji: '💀' },
          { name: 'Riddikulus',         desc: 'Transforms a Boggart into something comical.', color: '#ffaaff', emoji: '🤡' },
          { name: 'Stupefy',            desc: 'Stuns your target in their tracks.',           color: '#ff4444', emoji: '😵' },
          { name: 'Obliviate',          desc: 'Erases memories completely.',                  color: '#ccaaff', emoji: '🌀' },
        ]
        const matched = SPELLS.find(s => s.name.toLowerCase() === spellInput.trim().toLowerCase())
        const fireSpell = (spell: typeof SPELLS[0]) => {
          setSpellFired(spell)
          setSpellInput('')
          setTimeout(() => setSpellFired(null), 3500)
        }
        return (
          <section className="reveal" id="spell-cast" style={{
            padding: 'clamp(4rem,8vw,7rem) 2rem',
            background: 'linear-gradient(180deg,var(--void) 0%,rgba(10,0,25,0.95) 100%)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden' }} aria-hidden="true">
              {[...Array(20)].map((_,i) => (
                <div key={i} style={{
                  position:'absolute', left:`${(i*13.7+5)%98}%`, top:`${(i*17.3+8)%90}%`,
                  width:3+i%3, height:3+i%3, borderRadius:'50%',
                  background:i%3===0?'#f5d76e':i%3===1?'#a0c8ff':'#fff', opacity:0.4,
                  animation:`sparkleAnim ${2.5+(i%4)*1.2}s ease-in-out infinite`,
                  animationDelay:`${(i*0.4)%7}s`,
                }} />
              ))}
            </div>
            <div style={{ position:'relative', zIndex:2, maxWidth:700, margin:'0 auto' }}>
              <p style={{ fontFamily:'var(--font-subheading)', fontSize:'0.8rem', letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1rem' }}>✦ Interactive ✦</p>
              <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(2.5rem,6vw,4.5rem)', color:'transparent', background:'linear-gradient(135deg,var(--gold-glow),var(--gold-bright),var(--gold))', WebkitBackgroundClip:'text', backgroundClip:'text', marginBottom:'1.5rem' }}>Cast a Spell</h2>
              <p style={{ fontFamily:'var(--font-body)', color:'rgba(232,220,200,0.65)', marginBottom:'2.5rem', fontSize:'1.05rem' }}>Type a spell name and press Cast — or click a chip below</p>
              <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap', marginBottom:'1.5rem' }}>
                <input
                  type="text" value={spellInput}
                  onChange={e => setSpellInput(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && matched && fireSpell(matched)}
                  placeholder="e.g. Lumos, Expelliarmus…"
                  style={{
                    fontFamily:'var(--font-body)', fontSize:'1.1rem',
                    padding:'0.85rem 1.5rem', borderRadius:4,
                    background:'rgba(255,255,255,0.05)',
                    border:`1px solid ${matched?'rgba(201,162,39,0.7)':'rgba(201,162,39,0.25)'}`,
                    color:'#e8dcc8', outline:'none', width:280,
                    boxShadow:matched?'0 0 20px rgba(201,162,39,0.3)':'none',
                    transition:'all 0.2s',
                  }}
                />
                <button onClick={() => matched && fireSpell(matched)} disabled={!matched} style={{
                  fontFamily:'var(--font-subheading)', fontSize:'0.85rem', letterSpacing:'0.2em',
                  textTransform:'uppercase', padding:'0.85rem 2rem', borderRadius:4,
                  background:matched?'linear-gradient(135deg,var(--gold),var(--gold-bright))':'rgba(201,162,39,0.12)',
                  border:`1px solid ${matched?'var(--gold)':'rgba(201,162,39,0.2)'}`,
                  color:matched?'var(--void)':'rgba(201,162,39,0.4)',
                  cursor:matched?'pointer':'not-allowed', transition:'all 0.2s',
                }}>🪄 Cast!</button>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center', marginBottom:'2rem' }}>
                {SPELLS.map(s => (
                  <button key={s.name} onClick={() => fireSpell(s)} style={{
                    fontFamily:'var(--font-subheading)', fontSize:'0.7rem', letterSpacing:'0.08em',
                    padding:'0.4rem 0.85rem', borderRadius:20,
                    background:'rgba(255,255,255,0.05)', border:'1px solid rgba(201,162,39,0.2)',
                    color:'rgba(232,220,200,0.7)', cursor:'pointer', transition:'all 0.2s',
                  }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor='rgba(201,162,39,0.6)';(e.currentTarget as HTMLButtonElement).style.color='var(--gold)'}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.borderColor='rgba(201,162,39,0.2)';(e.currentTarget as HTMLButtonElement).style.color='rgba(232,220,200,0.7)'}}
                  >{s.emoji} {s.name}</button>
                ))}
              </div>
              {spellFired && (
                <div style={{
                  background:'linear-gradient(135deg,rgba(0,0,0,0.7),rgba(0,0,0,0.5))',
                  border:`1px solid ${spellFired.color}55`, borderRadius:12, padding:'1.5rem 2rem',
                  animation:'fadeInUp 0.4s ease', boxShadow:`0 0 40px ${spellFired.color}33`,
                }}>
                  <div style={{ fontSize:'3rem', marginBottom:'0.5rem' }}>{spellFired.emoji}</div>
                  <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'2.2rem', color:spellFired.color, marginBottom:'0.5rem', textShadow:`0 0 30px ${spellFired.color}` }}>{spellFired.name}!</h3>
                  <p style={{ fontFamily:'var(--font-body)', color:'rgba(232,220,200,0.8)', fontSize:'1.05rem' }}>{spellFired.desc}</p>
                </div>
              )}
            </div>
          </section>
        )
      })()}

      {/* ═══════════════════════════════════════
          DID YOU KNOW — HP FACTS
      ═══════════════════════════════════════ */}
      {(() => {
        const FACTS = [
          { fact: "J.K. Rowling conceived Harry Potter on a delayed train in 1990 and began writing immediately.", icon: '🚂' },
          { fact: "The word \"Muggle\" was officially added to the Oxford English Dictionary in 2003.", icon: '📖' },
          { fact: "Dementors were inspired by J.K. Rowling's personal experience with depression.", icon: '😔' },
          { fact: "Platform 9¾ is at London's King's Cross — a real brass plaque marks the exact spot.", icon: '🚉' },
          { fact: "\"Dumbledore\" is an Old English word meaning \"bumblebee.\"", icon: '🐝' },
          { fact: "The Hogwarts motto \"Draco dormiens nunquam titillandus\" means \"Never tickle a sleeping dragon.\"", icon: '🐉' },
          { fact: "Harry Potter books have been translated into 85 languages, reaching 500M+ copies sold.", icon: '🌍' },
          { fact: "Voldemort's name, Tom Marvolo Riddle, is a perfect anagram of \"I am Lord Voldemort.\"", icon: '💀' },
          { fact: "The Nimbus 2000 can reach 150 mph and fly to 9,000 feet — fastest broom of its era.", icon: '🧹' },
          { fact: "Hedwig the owl was played by multiple trained owls — the main one was named Gizmo.", icon: '🦉' },
        ]
        const f = FACTS[factIdx]
        return (
          <section className="reveal" id="hp-facts" style={{
            padding:'clamp(4rem,8vw,7rem) 2rem',
            background:'linear-gradient(180deg,rgba(10,0,25,0.95) 0%,rgba(3,0,8,1) 100%)',
            textAlign:'center',
          }}>
            <div style={{ maxWidth:750, margin:'0 auto' }}>
              <p style={{ fontFamily:'var(--font-subheading)', fontSize:'0.8rem', letterSpacing:'0.35em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1rem' }}>✦ Wizarding World ✦</p>
              <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(2rem,5vw,3.5rem)', color:'transparent', background:'linear-gradient(135deg,var(--gold-glow),var(--gold-bright),var(--gold))', WebkitBackgroundClip:'text', backgroundClip:'text', marginBottom:'3rem' }}>Did You Know?</h2>
              <div style={{
                background:'linear-gradient(135deg,rgba(201,162,39,0.08),rgba(255,255,255,0.03))',
                border:'1px solid rgba(201,162,39,0.2)', borderRadius:16, padding:'3rem 2.5rem',
                minHeight:200, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1.5rem',
              }}>
                <div style={{ fontSize:'3.5rem' }}>{f.icon}</div>
                <p style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'clamp(1.05rem,2.5vw,1.3rem)', color:'rgba(232,220,200,0.9)', lineHeight:1.7, maxWidth:580 }}>"{f.fact}"</p>
                <p style={{ fontFamily:'var(--font-subheading)', fontSize:'0.7rem', letterSpacing:'0.2em', color:'rgba(201,162,39,0.5)', textTransform:'uppercase' }}>{factIdx + 1} / {FACTS.length}</p>
                <div style={{ display:'flex', gap:'0.4rem' }}>
                  {FACTS.map((_,i) => (
                    <button key={i} onClick={() => setFactIdx(i)} style={{
                      width:i===factIdx?20:8, height:8, borderRadius:4, border:'none', padding:0,
                      background:i===factIdx?'var(--gold)':'rgba(201,162,39,0.25)',
                      cursor:'pointer', transition:'all 0.3s',
                    }} />
                  ))}
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'center', gap:'1rem', marginTop:'1.5rem' }}>
                {([['← Prev', () => setFactIdx(f => (f-1+FACTS.length)%FACTS.length)], ['Next →', () => setFactIdx(f => (f+1)%FACTS.length)]] as [string, ()=>void][]).map(([label, fn]) => (
                  <button key={label} onClick={fn} style={{
                    fontFamily:'var(--font-subheading)', fontSize:'0.8rem', letterSpacing:'0.2em',
                    textTransform:'uppercase', padding:'0.7rem 1.8rem', borderRadius:4,
                    background:'rgba(201,162,39,0.1)', border:'1px solid rgba(201,162,39,0.3)',
                    color:'var(--gold)', cursor:'pointer', transition:'all 0.2s',
                  }}
                    onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background='rgba(201,162,39,0.2)'}
                    onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background='rgba(201,162,39,0.1)'}
                  >{label}</button>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      {/* ═══════════════════════════════════════
          MARAUDER'S MAP EASTER EGG
      ═══════════════════════════════════════ */}
      <section className="reveal" id="marauders-map" style={{
        padding:'clamp(3rem,6vw,5rem) 2rem', textAlign:'center',
        background:'rgba(3,0,8,1)', borderTop:'1px solid rgba(201,162,39,0.08)',
      }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <button onClick={() => setMapRevealed(r => !r)} style={{
            fontFamily:'var(--font-subheading)', fontSize:'0.85rem', letterSpacing:'0.25em',
            textTransform:'uppercase', padding:'1rem 2.5rem', borderRadius:4,
            background:mapRevealed?'linear-gradient(135deg,rgba(201,162,39,0.2),rgba(26,13,61,0.8))':'rgba(255,255,255,0.04)',
            border:`1px solid ${mapRevealed?'rgba(201,162,39,0.6)':'rgba(255,255,255,0.12)'}`,
            color:mapRevealed?'var(--gold)':'rgba(232,220,200,0.5)',
            cursor:'pointer', transition:'all 0.4s',
            boxShadow:mapRevealed?'0 0 30px rgba(201,162,39,0.2)':'none',
          }}>
            👣 I solemnly swear that I am up to no good
          </button>
          {mapRevealed && (
            <div style={{
              marginTop:'2rem', animation:'fadeInUp 0.5s ease',
              background:'linear-gradient(135deg,rgba(201,162,39,0.06),rgba(0,0,0,0.3))',
              border:'1px solid rgba(201,162,39,0.25)', borderRadius:12,
              padding:'2.5rem', position:'relative', overflow:'hidden',
            }}>
              {[...Array(8)].map((_,i) => (
                <div key={i} style={{ position:'absolute', left:0, right:0, top:`${10+i*12}%`, height:1, background:'rgba(201,162,39,0.05)' }} />
              ))}
              <div style={{ position:'relative', zIndex:2 }}>
                <p style={{ fontFamily:'Georgia,serif', fontStyle:'italic', fontSize:'1.3rem', color:'rgba(201,162,39,0.9)', marginBottom:'0.5rem', textShadow:'0 0 20px rgba(201,162,39,0.4)' }}>
                  "Messrs. Moony, Wormtail, Padfoot and Prongs
                </p>
                <p style={{ fontFamily:'Georgia,serif', fontStyle:'italic', fontSize:'1.3rem', color:'rgba(201,162,39,0.9)', marginBottom:'2rem', textShadow:'0 0 20px rgba(201,162,39,0.4)' }}>
                  are proud to present the Marauder's Map."
                </p>
                <div style={{ display:'flex', justifyContent:'center', gap:'2rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
                  {[['🐺','Moony','Remus Lupin'],['🐀','Wormtail','Peter Pettigrew'],['🐕','Padfoot','Sirius Black'],['🦌','Prongs','James Potter']].map(([icon,code,name])=>(
                    <div key={name} style={{ textAlign:'center' }}>
                      <div style={{ fontSize:'2.2rem', marginBottom:'0.3rem' }}>{icon}</div>
                      <p style={{ fontFamily:'var(--font-heading)', fontSize:'1rem', color:'var(--gold)', marginBottom:'0.1rem' }}>{code}</p>
                      <p style={{ fontFamily:'var(--font-subheading)', fontSize:'0.62rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(232,220,200,0.5)' }}>{name}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setMapRevealed(false)} style={{
                  fontFamily:'var(--font-subheading)', fontSize:'0.75rem', letterSpacing:'0.2em',
                  textTransform:'uppercase', padding:'0.6rem 1.5rem', borderRadius:4,
                  background:'transparent', border:'1px solid rgba(201,162,39,0.25)',
                  color:'rgba(201,162,39,0.6)', cursor:'pointer',
                }}>Mischief Managed 🗺️</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="footer" id="footer" style={{ paddingBottom: '4rem' }}>
        <div className="footer-logo">⚡ Hogwarts</div>
        <p className="footer-quote">
          "Happiness can be found even in the darkest of times,<br />
          if one only remembers to turn on the light."
        </p>
        <nav className="footer-links">
          <Link href="/books">Books & Films</Link>
          <Link href="/characters">Characters</Link>
          <Link href="/houses">Houses</Link>
          <Link href="/spells">Spells</Link>
        </nav>
        <div className="footer-bottom">
          <p>⚯ △○| ⚯ &nbsp;&nbsp;·&nbsp;&nbsp; A fan tribute to J.K. Rowling's Harry Potter universe &nbsp;&nbsp;·&nbsp;&nbsp; Built with magic &nbsp;&nbsp;·&nbsp;&nbsp; Mischief Managed.</p>
        </div>
      </footer>

    </main>
  )
}
