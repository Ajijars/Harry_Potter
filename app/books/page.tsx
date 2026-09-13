import Link from 'next/link'
import { books } from '@/data/books'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Books & Films | Hogwarts Journey',
  description: 'Explore all 7 Harry Potter books and 8 films — synopsis, characters, spells, quotes and more.',
}

export default function BooksPage() {
  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <style>{`
        .book-card {
          display: block;
          text-decoration: none;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(201,162,39,0.15);
          background: rgba(13,0,32,0.8);
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
          backdrop-filter: blur(8px);
        }
        .book-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: rgba(201,162,39,0.5);
          box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(201,162,39,0.2);
        }
      `}</style>

      {/* Header */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 2rem 2rem',
        background: 'radial-gradient(ellipse at top, rgba(45,27,105,0.3) 0%, transparent 70%)',
      }}>
        <span style={{
          fontFamily: 'var(--font-subheading)',
          fontSize: '0.75rem',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          display: 'block',
          marginBottom: '1rem',
        }}>
          The Complete Saga
        </span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          color: 'var(--gold-light)',
          textShadow: '0 0 40px rgba(201,162,39,0.3)',
          marginBottom: '1.5rem',
        }}>
          Seven Books.<br />Eight Films.
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: '1.15rem',
          color: 'rgba(232,220,200,0.7)',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          "It is our choices that show what we truly are, far more than our abilities."
        </p>
        <div style={{ margin: '3rem auto', display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '400px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.5))' }} />
          <span style={{ color: 'var(--gold)', fontSize: '1.5rem', textShadow: '0 0 20px var(--gold)' }}>△○|</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,162,39,0.5))' }} />
        </div>
      </section>

      {/* Books Grid */}
      <section style={{ padding: '2rem 2rem 8rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2.5rem',
        }}>
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.slug}`}
              id={`books-page-card-${book.id}`}
              className="book-card"
            >
              {/* Book visual header */}
              <div style={{
                height: '220px',
                background: book.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <span style={{ fontSize: '5rem', filter: `drop-shadow(0 0 25px ${book.accentColor})` }}>
                  {book.icon}
                </span>
                <div style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  fontFamily: 'var(--font-heading)', fontSize: '4rem',
                  fontWeight: 900, color: 'rgba(255,255,255,0.08)', lineHeight: 1,
                }}>
                  {book.id}
                </div>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
                  background: 'linear-gradient(to top, rgba(13,0,32,1), transparent)',
                }} />
              </div>

              <div style={{ padding: '1.8rem' }}>
                <div style={{
                  height: '2px',
                  background: `linear-gradient(to right, ${book.accentColor}, transparent)`,
                  marginBottom: '1.2rem', borderRadius: '1px',
                }} />
                <p style={{
                  fontFamily: 'var(--font-subheading)', fontSize: '0.7rem',
                  letterSpacing: '0.35em', textTransform: 'uppercase',
                  color: book.accentColor, marginBottom: '0.5rem',
                }}>
                  Book {book.id === 8 ? '7 (Part 2)' : book.id} · {book.year} · Film {book.movieYear}
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.15rem',
                  color: 'var(--gold-light)', marginBottom: '0.4rem', lineHeight: 1.3,
                }}>
                  {book.title}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)', fontStyle: 'italic',
                  fontSize: '0.85rem', color: `${book.accentColor}99`, marginBottom: '1rem',
                }}>
                  "{book.subtitle}"
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  color: 'rgba(232,220,200,0.7)', lineHeight: 1.6, marginBottom: '1.5rem',
                }}>
                  {book.shortSynopsis}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {book.keyCharacters.slice(0, 4).map(char => (
                    <span key={char} style={{
                      fontFamily: 'var(--font-subheading)', fontSize: '0.65rem',
                      letterSpacing: '0.1em', padding: '0.2rem 0.6rem',
                      background: `${book.accentColor}18`,
                      border: `1px solid ${book.accentColor}40`,
                      borderRadius: '20px', color: `${book.accentColor}cc`,
                    }}>
                      {char}
                    </span>
                  ))}
                  {book.keyCharacters.length > 4 && (
                    <span style={{
                      fontFamily: 'var(--font-subheading)', fontSize: '0.65rem',
                      letterSpacing: '0.1em', padding: '0.2rem 0.6rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '20px', color: 'rgba(232,220,200,0.4)',
                    }}>
                      +{book.keyCharacters.length - 4} more
                    </span>
                  )}
                </div>
                <div style={{
                  fontFamily: 'var(--font-subheading)', fontSize: '0.8rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: book.accentColor, display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
