import Link from 'next/link'

export default function SpellsPage() {
  return (
    <main style={{ paddingTop: '120px', padding: '120px 2rem 4rem', minHeight: '100vh', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--gold-light)', marginBottom: '1rem' }}>Spells & Incantations</h1>
      <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(232,220,200,0.6)', marginBottom: '3rem' }}>Coming soon — visit the landing page to see all spells in action!</p>
      <Link href="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', fontFamily: 'var(--font-subheading)', fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '1rem 2.5rem', background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 50%, var(--gold) 100%)', color: 'var(--void)', borderRadius: '2px' }}>← Back to Hogwarts</Link>
    </main>
  )
}
