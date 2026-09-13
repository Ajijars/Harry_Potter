import { characters } from '@/data/characters'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return characters.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const char = characters.find(c => c.slug === slug)
  return {
    title: char ? `${char.name} | Hogwarts Journey` : 'Character Not Found',
    description: char?.shortBio ?? '',
  }
}

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const char = characters.find(c => c.slug === slug)
  if (!char) notFound()
  return (
    <main style={{ paddingTop: '100px', padding: '120px 2rem 4rem', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Link href="/characters" style={{ color: 'var(--gold)', fontFamily: 'var(--font-subheading)', fontSize: '0.8rem', letterSpacing: '0.2em', textDecoration: 'none' }}>← All Characters</Link>
      <div style={{ maxWidth: '900px', marginTop: '2rem' }}>
        <span style={{ fontSize: '4rem' }}>{char.icon}</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--gold-light)', marginTop: '1rem' }}>{char.name}</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '2rem' }}>{char.role}</p>
        <div style={{ height: '1px', background: 'linear-gradient(to right, var(--gold), transparent)', marginBottom: '2rem' }} />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(232,220,200,0.85)', marginBottom: '2rem' }}>{char.bio}</p>
        {char.wand && <p style={{ fontFamily: 'var(--font-subheading)', fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>🪄 Wand: {char.wand}</p>}
        {char.patronus && <p style={{ fontFamily: 'var(--font-subheading)', fontSize: '0.85rem', color: 'var(--silver-glow)', letterSpacing: '0.1em', marginTop: '0.5rem' }}>🦌 Patronus: {char.patronus}</p>}
        <p style={{ fontFamily: 'var(--font-subheading)', fontSize: '0.85rem', color: 'rgba(232,220,200,0.5)', letterSpacing: '0.1em', marginTop: '0.5rem' }}>🎬 Portrayed by: {char.actor}</p>
      </div>
    </main>
  )
}
