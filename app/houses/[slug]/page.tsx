import Link from 'next/link'
import { notFound } from 'next/navigation'

const houses: Record<string, { name: string; crest: string; color: string; desc: string }> = {
  gryffindor: { name: 'Gryffindor', crest: '🦁', color: '#d3a625', desc: 'The house of bravery, courage, nerve and chivalry. Founded by Godric Gryffindor.' },
  slytherin: { name: 'Slytherin', crest: '🐍', color: '#aac8b0', desc: 'The house of ambition, cunning, resourcefulness and leadership. Founded by Salazar Slytherin.' },
  ravenclaw: { name: 'Ravenclaw', crest: '🦅', color: '#b0c4e8', desc: 'The house of intelligence, creativity, wit and wisdom. Founded by Rowena Ravenclaw.' },
  hufflepuff: { name: 'Hufflepuff', crest: '🦡', color: '#ecb939', desc: 'The house of loyalty, patience, hard work and fair play. Founded by Helga Hufflepuff.' },
}

export default function HousePage({ params }: { params: { slug: string } }) {
  const house = houses[params.slug]
  if (!house) notFound()
  return (
    <main style={{ paddingTop: '100px', padding: '120px 2rem 4rem', minHeight: '100vh', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <Link href="/houses" style={{ color: 'var(--gold)', fontFamily: 'var(--font-subheading)', fontSize: '0.8rem', letterSpacing: '0.2em', textDecoration: 'none' }}>← All Houses</Link>
      <div style={{ marginTop: '2rem' }}>
        <span style={{ fontSize: '6rem', display: 'block', marginBottom: '1rem', filter: `drop-shadow(0 0 30px ${house.color})` }}>{house.crest}</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: house.color, textShadow: `0 0 40px ${house.color}80` }}>{house.name}</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'rgba(232,220,200,0.8)', maxWidth: '600px', margin: '2rem auto', lineHeight: 1.8 }}>{house.desc}</p>
      </div>
    </main>
  )
}
