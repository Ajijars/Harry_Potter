import Link from 'next/link'

const houses = [
  { id: 'gryffindor', name: 'Gryffindor', crest: '🦁', color: '#d3a625', desc: 'Bravery, courage, nerve and chivalry.' },
  { id: 'slytherin', name: 'Slytherin', crest: '🐍', color: '#aac8b0', desc: 'Ambition, cunning, resourcefulness and leadership.' },
  { id: 'ravenclaw', name: 'Ravenclaw', crest: '🦅', color: '#b0c4e8', desc: 'Intelligence, creativity, wit and wisdom.' },
  { id: 'hufflepuff', name: 'Hufflepuff', crest: '🦡', color: '#ecb939', desc: 'Loyalty, patience, hard work and fair play.' },
]

export default function HousesPage() {
  return (
    <main style={{ paddingTop: '120px', padding: '120px 2rem 4rem', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--gold-light)', textAlign: 'center', marginBottom: '3rem' }}>The Four Houses</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        {houses.map(h => (
          <Link key={h.id} href={`/houses/${h.id}`} style={{ textDecoration: 'none', display: 'block', padding: '2.5rem', background: 'rgba(13,0,32,0.8)', border: `1px solid ${h.color}40`, borderRadius: '8px', textAlign: 'center', transition: 'all 0.3s ease' }}>
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>{h.crest}</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: h.color, marginBottom: '0.75rem' }}>{h.name}</h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(232,220,200,0.7)', fontSize: '0.95rem' }}>{h.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
