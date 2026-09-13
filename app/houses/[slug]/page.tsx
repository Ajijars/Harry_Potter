import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const houses: Record<string, { name: string; crest: string; color: string; desc: string; founder: string; ghost: string; animal: string; element: string; traits: string[] }> = {
  gryffindor: {
    name: 'Gryffindor', crest: '🦁', color: '#d3a625',
    desc: 'The house of bravery, courage, nerve and chivalry. Founded by Godric Gryffindor. Home to Harry Potter, Hermione Granger, and Ron Weasley.',
    founder: 'Godric Gryffindor', ghost: 'Nearly Headless Nick', animal: 'Lion', element: 'Fire',
    traits: ['Bravery', 'Courage', 'Nerve', 'Chivalry'],
  },
  slytherin: {
    name: 'Slytherin', crest: '🐍', color: '#aac8b0',
    desc: 'The house of ambition, cunning, resourcefulness and leadership. Founded by Salazar Slytherin.',
    founder: 'Salazar Slytherin', ghost: 'The Bloody Baron', animal: 'Serpent', element: 'Water',
    traits: ['Ambition', 'Cunning', 'Resourcefulness', 'Leadership'],
  },
  ravenclaw: {
    name: 'Ravenclaw', crest: '🦅', color: '#b0c4e8',
    desc: 'The house of intelligence, creativity, wit and wisdom. Founded by Rowena Ravenclaw.',
    founder: 'Rowena Ravenclaw', ghost: 'The Grey Lady', animal: 'Eagle', element: 'Air',
    traits: ['Intelligence', 'Creativity', 'Wit', 'Wisdom'],
  },
  hufflepuff: {
    name: 'Hufflepuff', crest: '🦡', color: '#ecb939',
    desc: 'The house of loyalty, patience, hard work and fair play. Founded by Helga Hufflepuff.',
    founder: 'Helga Hufflepuff', ghost: 'The Fat Friar', animal: 'Badger', element: 'Earth',
    traits: ['Loyalty', 'Patience', 'Hard Work', 'Fair Play'],
  },
}

export async function generateStaticParams() {
  return Object.keys(houses).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const house = houses[slug]
  return {
    title: house ? `${house.name} | Hogwarts Journey` : 'House Not Found',
    description: house?.desc ?? '',
  }
}

export default async function HousePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const house = houses[slug]
  if (!house) notFound()
  return (
    <main style={{ paddingTop: '100px', padding: '120px 2rem 4rem', minHeight: '100vh', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <Link href="/houses" style={{ color: 'var(--gold)', fontFamily: 'var(--font-subheading)', fontSize: '0.8rem', letterSpacing: '0.2em', textDecoration: 'none' }}>← All Houses</Link>
      <div style={{ marginTop: '2rem' }}>
        <span style={{ fontSize: '6rem', display: 'block', marginBottom: '1rem', filter: `drop-shadow(0 0 30px ${house.color})` }}>{house.crest}</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: house.color, textShadow: `0 0 40px ${house.color}80` }}>{house.name}</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'rgba(232,220,200,0.8)', maxWidth: '600px', margin: '2rem auto', lineHeight: 1.8 }}>{house.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          {[['Founder', house.founder], ['Ghost', house.ghost], ['Animal', house.animal], ['Element', house.element]].map(([label, value]) => (
            <div key={label} style={{ background: 'rgba(13,0,32,0.7)', border: `1px solid ${house.color}40`, borderRadius: '8px', padding: '1rem 1.5rem', minWidth: 130 }}>
              <p style={{ fontFamily: 'var(--font-subheading)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: house.color, marginBottom: '0.3rem' }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--gold-light)' }}>{value}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          {house.traits.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-subheading)', fontSize: '0.75rem', letterSpacing: '0.1em', padding: '0.4rem 1rem', background: `${house.color}18`, border: `1px solid ${house.color}40`, borderRadius: '20px', color: house.color }}>{t}</span>
          ))}
        </div>
      </div>
    </main>
  )
}
