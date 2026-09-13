'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/characters', label: 'Characters' },
  { href: '/houses', label: 'Houses' },
  { href: '/spells', label: 'Spells' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="navbar-logo">
        ⚡ Hogwarts
      </Link>

      <ul className="navbar-links">
        {navLinks.map(link => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'var(--gold)',
          fontSize: '1.5rem',
          cursor: 'pointer',
        }}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Deathly Hallows symbol */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '1.2rem',
        color: 'rgba(201, 162, 39, 0.3)',
        pointerEvents: 'none',
        letterSpacing: '0.1em',
      }}>
        △○|
      </div>
    </nav>
  )
}
