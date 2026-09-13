import { books } from '@/data/books'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return books.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  return {
    title: book ? `${book.title} | Hogwarts Journey` : 'Book Not Found',
    description: book?.shortSynopsis ?? '',
  }
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  if (!book) notFound()

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative', zIndex: 1, padding: '120px 2rem 4rem' }}>
      <Link href="/books" style={{ color: 'var(--gold)', fontFamily: 'var(--font-subheading)', fontSize: '0.8rem', letterSpacing: '0.2em', textDecoration: 'none' }}>
        ← Back to All Books
      </Link>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 4rem)', color: book.accentColor, marginTop: '2rem', textShadow: `0 0 40px ${book.accentColor}60` }}>
        {book.icon} {book.title}
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'rgba(201,162,39,0.7)', fontSize: '1.1rem', marginBottom: '2rem' }}>
        "{book.subtitle}" — {book.year}
      </p>
      <div style={{ maxWidth: '900px' }}>
        <div style={{ height: '2px', background: `linear-gradient(to right, ${book.accentColor}, transparent)`, marginBottom: '2rem' }} />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(232,220,200,0.85)' }}>{book.synopsis}</p>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-light)', marginTop: '3rem', marginBottom: '1rem' }}>Memorable Quotes</h2>
        {book.quotes.map((q, i) => (
          <blockquote key={i} style={{ borderLeft: `3px solid ${book.accentColor}`, paddingLeft: '1.5rem', margin: '1.5rem 0' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(232,220,200,0.85)', marginBottom: '0.5rem' }}>"{q.text}"</p>
            <span style={{ fontFamily: 'var(--font-subheading)', fontSize: '0.8rem', letterSpacing: '0.15em', color: book.accentColor }}>— {q.character}</span>
          </blockquote>
        ))}
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-light)', marginTop: '3rem', marginBottom: '1rem' }}>Spells Featured</h2>
        {book.spells.map((s, i) => (
          <div key={i} style={{ padding: '1rem 1.5rem', background: 'rgba(13,0,32,0.7)', border: '1px solid rgba(201,162,39,0.15)', borderRadius: '6px', marginBottom: '1rem' }}>
            <strong style={{ fontFamily: 'var(--font-heading)', color: book.accentColor }}>{s.name}</strong>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(232,220,200,0.7)', marginTop: '0.3rem' }}>{s.effect}</p>
          </div>
        ))}
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-light)', marginTop: '3rem', marginBottom: '1rem' }}>Fun Facts</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {book.funFacts.map((f, i) => (
            <li key={i} style={{ fontFamily: 'var(--font-body)', color: 'rgba(232,220,200,0.75)', padding: '0.75rem 0', borderBottom: '1px solid rgba(201,162,39,0.08)', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: book.accentColor }}>✦</span> {f}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
