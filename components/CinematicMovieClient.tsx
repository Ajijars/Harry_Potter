'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import HagridMotorcycle from './HagridMotorcycle'

interface MovieData {
  slug: string
  title: string
  subtitle: string
  year: number
  movieYear: number
  accentColor: string
  synopsis: string
  keyCharacters: string[]
  spells: { name: string; effect: string }[]
  funFacts: string[]
}

export default function CinematicMovieClient({
  movie,
  nextMovie,
  isFirstMovie
}: {
  movie: MovieData
  nextMovie: MovieData | null
  isFirstMovie: boolean
}) {
  const router = useRouter()
  const [showHagrid, setShowHagrid] = useState(isFirstMovie)
  const [fadeTitle, setFadeTitle] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Reveal animation for scrolling elements
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

  useEffect(() => {
    // If it's the first movie, we wait for Hagrid to fly by, then fade in the title
    if (isFirstMovie) {
      // Play audio automatically
      const audioBtn = document.getElementById('audio-toggle-btn')
      if (audioBtn && audioBtn.title.includes('Play')) {
        audioBtn.click()
      }

      // Hide hagrid after animation completes (12s)
      const t1 = setTimeout(() => {
        setShowHagrid(false)
      }, 12500)

      // Fade title in slowly as Hagrid finishes
      const t2 = setTimeout(() => {
        setFadeTitle(true)
      }, 3000)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    } else {
      setFadeTitle(true)
    }
  }, [isFirstMovie])

  const goToNextMovie = (e: React.MouseEvent) => {
    e.preventDefault()
    setTransitioning(true)
    setTimeout(() => {
      if (nextMovie) {
        router.push(`/movies/${nextMovie.slug}`)
      }
    }, 1500)
  }

  return (
    <main
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor: 'var(--void)',
        minHeight: '100vh',
        overflowX: 'hidden',
        color: '#e8dcc8',
        fontFamily: 'var(--font-body)',
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 1.5s ease-in-out'
      }}
    >
      {/* ── CINEMATIC INTRO HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
        background: `radial-gradient(circle at center, rgba(30,20,50,0.8) 0%, var(--void) 70%)`
      }}>
        {/* Hagrid Animation overlay */}
        {showHagrid && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 10, overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              animation: 'hagridFly 12s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
            }}>
              <HagridMotorcycle width={250} />
            </div>
          </div>
        )}

        <div style={{
          opacity: fadeTitle ? 1 : 0,
          transform: fadeTitle ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 2s ease-out',
          zIndex: 5
        }}>
          <p style={{
            fontFamily: 'var(--font-subheading)',
            fontSize: '1rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: movie.accentColor,
            marginBottom: '1rem'
          }}>
            Year {isFirstMovie ? 'One' : movie.year} • {movie.movieYear}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            color: '#fff',
            textShadow: `0 0 30px ${movie.accentColor}80, 0 4px 10px rgba(0,0,0,0.8)`,
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            {movie.title}
          </h1>
          <p style={{
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: 'rgba(232, 220, 200, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            "{movie.subtitle}"
          </p>
        </div>
        
        {/* Scroll down indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          opacity: fadeTitle ? 1 : 0,
          transition: 'opacity 1s ease 2s',
          animation: 'float 3s ease-in-out infinite'
        }}>
          <span style={{ fontSize: '2rem', color: movie.accentColor }}>↓</span>
        </div>
      </section>

      {/* ── THE STORY UNFOLDS ── */}
      <section className="reveal" style={{ padding: '6rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: movie.accentColor, marginBottom: '2rem', textAlign: 'center' }}>
          The Story Unfolds
        </h2>
        <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${movie.accentColor}, transparent)`, marginBottom: '3rem' }} />
        <p style={{ fontSize: '1.2rem', lineHeight: 2, textAlign: 'justify' }}>
          {movie.synopsis}
        </p>
      </section>

      {/* ── KEY ELEMENTS ── */}
      <section style={{ background: 'rgba(20,10,35,0.4)', padding: '6rem 2rem' }}>
        <div className="reveal" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          
          <div>
            <h3 style={{ fontFamily: 'var(--font-subheading)', fontSize: '1.5rem', color: movie.accentColor, marginBottom: '1.5rem', borderBottom: `1px solid ${movie.accentColor}40`, paddingBottom: '0.5rem' }}>
              Key Characters
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {movie.keyCharacters.map((char, i) => (
                <li key={i} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: `2px solid ${movie.accentColor}` }}>
                  {char}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-subheading)', fontSize: '1.5rem', color: movie.accentColor, marginBottom: '1.5rem', borderBottom: `1px solid ${movie.accentColor}40`, paddingBottom: '0.5rem' }}>
              Iconic Spells
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {movie.spells.map((s, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '4px' }}>
                  <strong style={{ color: '#fff', letterSpacing: '0.05em' }}>{s.name}</strong>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(232, 220, 200, 0.6)', marginTop: '0.2rem' }}>{s.effect}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── FUN FACTS ── */}
      <section className="reveal" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: movie.accentColor, marginBottom: '2rem', textAlign: 'center' }}>
          Behind the Magic
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {movie.funFacts.map((fact, i) => (
            <div key={i} style={{ position: 'relative', paddingLeft: '2.5rem' }}>
              <span style={{ position: 'absolute', left: 0, top: '-5px', fontSize: '1.5rem', color: movie.accentColor }}>✦</span>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>{fact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE TRANSITION (NEXT MOVIE) ── */}
      <section className="reveal" style={{ 
        padding: '10rem 2rem 6rem', 
        textAlign: 'center',
        background: 'linear-gradient(to bottom, transparent, rgba(13,0,32,0.9))' 
      }}>
        {nextMovie ? (
          <div>
            <p style={{ fontFamily: 'var(--font-subheading)', color: 'rgba(232,220,200,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              The Journey Continues...
            </p>
            <a 
              href={`/movies/${nextMovie.slug}`} 
              onClick={goToNextMovie}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: nextMovie.accentColor,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.textShadow = `0 0 30px ${nextMovie.accentColor}80`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.textShadow = 'none'
              }}
            >
              Enter {nextMovie.title} →
            </a>
          </div>
        ) : (
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'var(--gold)' }}>
              Mischief Managed.
            </h2>
            <Link href="/" style={{ color: 'rgba(232,220,200,0.6)', marginTop: '2rem', display: 'inline-block', textDecoration: 'none' }}>
              Return to Hogwarts
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
