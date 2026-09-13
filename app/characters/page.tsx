import { characters } from '@/data/characters'
import Link from 'next/link'

export default function CharactersPage() {
  return (
    <main style={{ paddingTop: '120px', minHeight: '100vh', padding: '120px 2rem 4rem', position: 'relative', zIndex: 1 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--gold-light)', textAlign: 'center', marginBottom: '3rem' }}>Characters</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {characters.map(char => (
          <Link key={char.id} href={`/characters/${char.slug}`} style={{ textDecoration: 'none', display: 'block', padding: '2rem', background: 'rgba(13,0,32,0.8)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '8px', transition: 'all 0.3s ease' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>{char.icon}</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-light)', marginBottom: '0.3rem' }}>{char.name}</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{char.role}</p>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(232,220,200,0.7)', fontSize: '0.9rem', lineHeight: 1.6 }}>{char.shortBio}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
