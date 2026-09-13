'use client'
import React, { useState, useEffect } from 'react'

// ═══════════════════════════════════════════════════════
//  NIMBUS 2000 — Pure SVG, ZERO background, pixel-perfect
//  Based on actual prop reference: honey wood handle,
//  oval twig bristle bundle, gold brass rings, twig stirrups
// ═══════════════════════════════════════════════════════
const Nimbus2000 = ({ width = 500 }: { width?: number }) => {
  const h = Math.round(width * 0.38)
  const uid = `nb${width}`
  return (
    <svg width={width} height={h} viewBox="0 0 500 190" fill="none"
      xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
      <defs>
        {/* Honey wood grain — handle */}
        <linearGradient id={`${uid}wg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#b06318" />
          <stop offset="12%"  stopColor="#d4892e" />
          <stop offset="28%"  stopColor="#e8a040" />
          <stop offset="50%"  stopColor="#c97828" />
          <stop offset="72%"  stopColor="#a85a18" />
          <stop offset="88%"  stopColor="#d08030" />
          <stop offset="100%" stopColor="#8b4510" />
        </linearGradient>
        {/* Handle highlight shine */}
        <linearGradient id={`${uid}hs`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,200,120,0.7)" />
          <stop offset="40%"  stopColor="rgba(255,220,150,0.3)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        {/* Gold brass rings */}
        <linearGradient id={`${uid}gr`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f5d76e" />
          <stop offset="35%"  stopColor="#daa520" />
          <stop offset="65%"  stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        {/* Twig bristle bundle */}
        <radialGradient id={`${uid}tb`} cx="55%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#8b4513" />
          <stop offset="40%"  stopColor="#6b2f0a" />
          <stop offset="80%"  stopColor="#4a1f06" />
          <stop offset="100%" stopColor="#2d1004" />
        </radialGradient>
        {/* Twig surface detail */}
        <linearGradient id={`${uid}ts`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(180,90,30,0.6)" />
          <stop offset="50%"  stopColor="rgba(100,40,10,0)" />
          <stop offset="100%" stopColor="rgba(60,20,5,0.8)" />
        </linearGradient>
        {/* Glow */}
        <filter id={`${uid}gl`} x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Sparkle glow */}
        <filter id={`${uid}sg`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ══ BRISTLE BUNDLE — oval twig head ══ */}
      {/* Main oval body */}
      <ellipse cx="95" cy="95" rx="68" ry="42" fill={`url(#${uid}tb)`} />
      {/* Individual twig lines for texture */}
      {Array.from({ length: 40 }, (_, i) => {
        const t = i / 39
        const y = 60 + t * 70
        const xL = 95 - Math.sqrt(Math.max(0, 1 - Math.pow((y-95)/42, 2))) * 68
        const xR = 95 + Math.sqrt(Math.max(0, 1 - Math.pow((y-95)/42, 2))) * 68
        const mid = (xL + xR) / 2
        const wobble = Math.sin(i * 2.7) * 3
        return (
          <line key={i}
            x1={xL + 2} y1={y}
            x2={xR - 2} y2={y + wobble}
            stroke={i % 3 === 0 ? 'rgba(180,90,30,0.5)' : 'rgba(80,30,5,0.35)'}
            strokeWidth={0.8 + (i % 2) * 0.3}
          />
        )
      })}
      {/* Outer twig ends — left tip */}
      {Array.from({ length: 14 }, (_, i) => {
        const t = i / 13
        const angle = -60 + t * 120
        const rad = angle * Math.PI / 180
        const r = parseFloat((60 + Math.sin(t * Math.PI) * 6).toFixed(3))
        const cos = parseFloat(Math.cos(rad).toFixed(5))
        const sin = parseFloat(Math.sin(rad).toFixed(5))
        return (
          <line key={i}
            x1={parseFloat((27 + cos * r).toFixed(3))}
            y1={parseFloat((95 + sin * 40).toFixed(3))}
            x2={parseFloat((27 + cos * (r + 8 + i % 3 * 3)).toFixed(3))}
            y2={parseFloat((95 + sin * 46).toFixed(3))}
            stroke="#5a2208"
            strokeWidth={0.9}
            strokeLinecap="round"
          />
        )
      })}
      {/* Sheen on bristle bundle */}
      <ellipse cx="80" cy="78" rx="30" ry="15" fill="rgba(200,120,60,0.18)" />

      {/* ══ BINDING COLLAR — dark wood cylinder ══ */}
      <rect x="150" y="78" width="22" height="34" rx="4" fill="#3d1a06" />
      <rect x="151" y="79" width="20" height="32" rx="3"
        fill="none" stroke="rgba(180,90,30,0.3)" strokeWidth="1" />

      {/* ══ GOLD BRASS RINGS ══ */}
      {/* Ring 1 */}
      <rect x="148" y="80" width="26" height="9" rx="4.5" fill={`url(#${uid}gr)`} filter={`url(#${uid}gl)`} />
      <rect x="150" y="81" width="22" height="5" rx="2.5" fill="rgba(255,240,160,0.35)" />
      {/* Ring 2 */}
      <rect x="148" y="92" width="26" height="7" rx="3.5" fill={`url(#${uid}gr)`} filter={`url(#${uid}gl)`} />
      <rect x="150" y="93" width="22" height="3.5" rx="1.75" fill="rgba(255,240,160,0.25)" />
      {/* Ring 3 */}
      <rect x="148" y="102" width="26" height="8" rx="4" fill={`url(#${uid}gr)`} filter={`url(#${uid}gl)`} />
      <rect x="150" y="103" width="22" height="4" rx="2" fill="rgba(255,240,160,0.3)" />

      {/* ══ TWIG STIRRUPS / FOOT PEGS ══ */}
      {/* Upper stirrup */}
      <path d="M162 82 Q158 68 152 60 Q148 55 145 62 Q143 68 148 72"
        stroke="#7a3a10" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M162 82 Q158 68 152 60 Q148 55 145 62 Q143 68 148 72"
        stroke="rgba(200,120,50,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Lower stirrup */}
      <path d="M162 108 Q158 122 152 132 Q148 138 145 130 Q143 124 148 120"
        stroke="#7a3a10" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M162 108 Q158 122 152 132 Q148 138 145 130 Q143 124 148 120"
        stroke="rgba(200,120,50,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Stirrup tips — small round ends */}
      <circle cx="148" cy="72"  r="3.5" fill="#6b2f0a" />
      <circle cx="148" cy="120" r="3.5" fill="#6b2f0a" />

      {/* ══ HANDLE — honey wood, gently curved ══ */}
      {/* Main handle body */}
      <path
        d="M168 95 Q240 88 330 90 Q400 92 470 94 Q485 94.5 492 95"
        stroke={`url(#${uid}wg)`}
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
        filter={`url(#${uid}gl)`}
      />
      {/* Wood grain lines */}
      {[0, 1, 2, 3].map(i => (
        <path key={i}
          d={`M${170 + i*40} ${88 + i%2} Q${240 + i*20} ${85 + i} ${330 + i*10} ${88 + i*0.5}`}
          stroke={`rgba(${100+i*15},${50+i*8},${10+i*3},0.25)`}
          strokeWidth={0.7}
          fill="none"
        />
      ))}
      {/* Highlight shine strip along top */}
      <path
        d="M170 88 Q270 82 370 85 Q430 87 480 89"
        stroke={`url(#${uid}hs)`}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      {/* Shadow along bottom */}
      <path
        d="M170 103 Q270 97 370 99 Q430 101 480 103"
        stroke="rgba(50,15,0,0.4)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* ══ NAMEPLATE ══ */}
      <rect x="270" y="84" width="76" height="13" rx="3" fill={`url(#${uid}gr)`} opacity="0.92" />
      <rect x="271" y="85" width="74" height="11" rx="2.5" fill="none"
        stroke="rgba(255,240,160,0.5)" strokeWidth="0.7" />
      <text x="308" y="94.5" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="6.5" fontWeight="bold" fill="#2a1003" letterSpacing="1">
        NIMBUS 2000
      </text>

      {/* ══ GRIP TIP ══ */}
      <ellipse cx="493" cy="95" rx="8" ry="10" fill="#5a2208" />
      <ellipse cx="492" cy="94" rx="5"  ry="7"  fill="#8b4520" />
      <ellipse cx="491" cy="93" rx="2"  ry="3"  fill="rgba(220,140,70,0.4)" />

      {/* ══ GOLDEN SPARKLE TRAIL (behind bristles) ══ */}
      {[
        {x:10,y:90,r:4,o:1},  {x:22,y:75,r:3,o:0.85},
        {x:8, y:110,r:3,o:0.8},{x:30,y:60,r:2.5,o:0.65},
        {x:5, y:125,r:2,o:0.6},{x:18,y:140,r:3,o:0.7},
        {x:35,y:55,r:2,o:0.5}, {x:40,y:130,r:2,o:0.45},
      ].map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r}
          fill="#ffd700" opacity={p.o} filter={`url(#${uid}sg)`} />
      ))}
      {/* Star sparkles */}
      {[{x:15,y:85},{x:6,y:105},{x:25,y:65},{x:12,y:120}].map((p,i)=>(
        <g key={i} opacity={0.8-i*0.1} filter={`url(#${uid}sg)`}>
          <line x1={p.x-5} y1={p.y} x2={p.x+5} y2={p.y} stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1={p.x} y1={p.y-5} x2={p.x} y2={p.y+5} stroke="#ffd700" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1={p.x-3} y1={p.y-3} x2={p.x+3} y2={p.y+3} stroke="#ffd700" strokeWidth="1" strokeLinecap="round"/>
          <line x1={p.x+3} y1={p.y-3} x2={p.x-3} y2={p.y+3} stroke="#ffd700" strokeWidth="1" strokeLinecap="round"/>
        </g>
      ))}
    </svg>
  )
}

// ── Pure SVG Bird silhouette (no background) ──
const BirdSVG = ({ size = 40, opacity = 0.8 }: { size?: number; opacity?: number }) => (
  <svg
    width={size} height={size * 0.5}
    viewBox="0 0 80 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left wing */}
    <path
      d="M40 22 Q20 8 2 15 Q18 18 32 24Z"
      fill="rgba(200,220,255,0.85)"
    />
    {/* Right wing */}
    <path
      d="M40 22 Q60 8 78 15 Q62 18 48 24Z"
      fill="rgba(200,220,255,0.85)"
    />
    {/* Body */}
    <ellipse cx="40" cy="24" rx="7" ry="4" fill="rgba(180,200,240,0.9)" />
    {/* Head */}
    <circle cx="50" cy="21" r="4" fill="rgba(180,200,240,0.9)" />
    {/* Beak */}
    <path d="M54 21 L59 20 L54 23Z" fill="rgba(255,200,100,0.9)" />
    {/* Tail */}
    <path d="M33 24 Q26 28 22 32 Q30 27 36 26Z" fill="rgba(160,180,220,0.8)" />
  </svg>
)

// ── Candle (pure CSS/HTML — no image) ──
const Candle = ({ x, height, delay, duration, opacity }: {
  x: number; height: number; delay: number; duration: number; opacity: number
}) => (
  <div
    className="candle"
    style={{
      left: `${x}%`,
      bottom: '5%',
      '--float-duration': `${duration}s`,
      '--float-delay': `${delay}s`,
      '--candle-opacity': opacity,
      '--candle-height': `${height}px`,
    } as React.CSSProperties}
  >
    <div className="candle-glow" />
    <div className="candle-flame" />
    <div className="candle-body" />
  </div>
)

export default function FloatingObjects() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const candles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: 2 + i * 4.1,
    height: 28 + (i % 5) * 9,
    delay: i * 0.35,
    duration: 5 + (i % 4),
    opacity: 0.45 + (i % 3) * 0.2,
  }))

  // Brooms — all fly LEFT to RIGHT only (one consistent direction)
  const brooms = [
    { id: 1, topPct: 12, duration: 24, delay: 0,    width: 520, opacity: 0.95 },
    { id: 2, topPct: 48, duration: 32, delay: -13,  width: 380, opacity: 0.75 },
    { id: 3, topPct: 28, duration: 40, delay: -24,  width: 280, opacity: 0.55 },
    { id: 4, topPct: 70, duration: 28, delay: -8,   width: 200, opacity: 0.4  },
  ]

  // Birds — all fly LEFT to RIGHT only, staggered heights
  const birds = [
    { id: 1, topPct: 10, duration: 28, delay: 0,   size: 50, opacity: 0.75 },
    { id: 2, topPct: 22, duration: 34, delay: -14,  size: 38, opacity: 0.55 },
    { id: 3, topPct: 40, duration: 40, delay: -8,   size: 44, opacity: 0.65 },
    { id: 4, topPct: 60, duration: 24, delay: -20,  size: 32, opacity: 0.45 },
    { id: 5, topPct: 18, duration: 45, delay: -30,  size: 28, opacity: 0.35 },
  ]

  // Floating hat positions
  const hats = [
    { id: 1, left: '6%',  top: '58%', size: 70, delay: 0   },
    { id: 2, left: '88%', top: '22%', size: 55, delay: 2.5 },
  ]

  // Sparkle positions
  const sparkles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${(i * 13.7 + 5) % 98}%`,
    top:  `${(i * 17.3 + 8) % 90}%`,
    delay:  `${(i * 0.4) % 7}s`,
    dur:    `${2.5 + (i % 4) * 1.2}s`,
    color:  i % 3 === 0 ? '#f5d76e' : i % 3 === 1 ? '#a0c8ff' : '#fff',
    size:   3 + (i % 3),
  }))

  return (
    <div className="floating-objects-layer" aria-hidden="true">

      {/* ── Floating Candles (pure CSS) ── */}
      {candles.map(c => (
        <Candle key={`c-${c.id}`} x={c.x} height={c.height} delay={c.delay} duration={c.duration} opacity={c.opacity} />
      ))}

      {/* ── NIMBUS 2000 Broomsticks — LEFT TO RIGHT only ── */}
      {brooms.map(b => (
        <div
          key={`broom-${b.id}`}
          style={{
            position: 'absolute',
            top: `${b.topPct}%`,
            opacity: b.opacity,
            animation: `broomFlyLTR ${b.duration}s linear infinite`,
            animationDelay: `${b.delay}s`,
            // ← filter is on outer wrapper (no mix-blend-mode here) — this is correct!
            filter: 'drop-shadow(0 0 14px rgba(201,162,39,0.55))',
            zIndex: 2,
          }}
        >
          <Nimbus2000 width={b.width} />
        </div>
      ))}

      {/* ── SVG Birds — ALL left to right, no reversal ── */}
      {birds.map(b => (
        <div
          key={`bird-${b.id}`}
          style={{
            position: 'absolute',
            top: `${b.topPct}%`,
            opacity: b.opacity,
            animation: `birdFlyLTR ${b.duration}s linear infinite`,
            animationDelay: `${b.delay}s`,
            filter: 'drop-shadow(0 0 6px rgba(160,200,255,0.4))',
            zIndex: 2,
          }}
        >
          <BirdSVG size={b.size} />
        </div>
      ))}

      {/* ── Sorting Hat SVG (simplified) ── */}
      {hats.map(h => (
        <div
          key={`hat-${h.id}`}
          style={{
            position: 'absolute',
            left: h.left,
            top: h.top,
            animation: `hatFloat ${6 + h.id}s ease-in-out infinite`,
            animationDelay: `${h.delay}s`,
            zIndex: 2,
            opacity: 0.5,
            filter: 'drop-shadow(0 0 12px rgba(201,162,39,0.4))',
          }}
        >
          <svg width={h.size} height={h.size * 1.3} viewBox="0 0 60 78" fill="none">
            <defs>
              <linearGradient id={`hatG-${h.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5a3a0a" />
                <stop offset="100%" stopColor="#2a1a05" />
              </linearGradient>
            </defs>
            {/* Brim */}
            <ellipse cx="30" cy="68" rx="28" ry="8" fill={`url(#hatG-${h.id})`} />
            {/* Hat body */}
            <path d="M15 68 Q12 45 25 20 Q30 5 35 20 Q48 45 45 68Z"
              fill={`url(#hatG-${h.id})`} />
            {/* Crease / fold */}
            <path d="M20 55 Q30 48 40 55" stroke="#8B6520" strokeWidth="1.5" fill="none" opacity="0.6"/>
            {/* Tip curl */}
            <path d="M33 8 Q38 2 35 -2 Q30 2 33 8Z" fill="#3a2205" />
            {/* Band */}
            <rect x="14" y="60" width="32" height="5" rx="2" fill="#c9a227" opacity="0.7" />
            {/* Glow eyes */}
            <ellipse cx="24" cy="52" rx="4" ry="3" fill="rgba(255,180,0,0.3)" />
            <ellipse cx="36" cy="52" rx="4" ry="3" fill="rgba(255,180,0,0.3)" />
          </svg>
        </div>
      ))}

      {/* ── Golden Snitch SVG ── */}
      <div style={{
        position: 'absolute', top: '28%', right: '10%',
        animation: 'snitchFly 14s ease-in-out infinite',
        zIndex: 3,
        filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.9))',
        cursor: 'pointer',
      }}>
        <svg width="80" height="55" viewBox="0 0 80 55" fill="none">
          <defs>
            <radialGradient id="snitchGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff5aa" />
              <stop offset="40%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#b8860b" />
            </radialGradient>
          </defs>
          {/* Left wing */}
          <path d="M34 28 Q18 10 2 18 Q16 22 30 30Z"
            fill="rgba(255,245,200,0.85)" stroke="rgba(201,162,39,0.4)" strokeWidth="0.5" />
          {/* Right wing */}
          <path d="M46 28 Q62 10 78 18 Q64 22 50 30Z"
            fill="rgba(255,245,200,0.85)" stroke="rgba(201,162,39,0.4)" strokeWidth="0.5" />
          {/* Wing veins */}
          <path d="M34 28 Q22 18 10 20" stroke="rgba(201,162,39,0.3)" strokeWidth="0.8" fill="none"/>
          <path d="M46 28 Q58 18 70 20" stroke="rgba(201,162,39,0.3)" strokeWidth="0.8" fill="none"/>
          {/* Ball body */}
          <circle cx="40" cy="28" r="9" fill="url(#snitchGold)" />
          {/* Detail lines on ball */}
          <path d="M33 25 Q40 22 47 25" stroke="rgba(139,90,0,0.4)" strokeWidth="1" fill="none"/>
          <path d="M33 31 Q40 34 47 31" stroke="rgba(139,90,0,0.4)" strokeWidth="1" fill="none"/>
          <circle cx="40" cy="28" r="9" fill="none" stroke="rgba(255,230,100,0.3)" strokeWidth="1"/>
          {/* Shine */}
          <circle cx="37" cy="24" r="2.5" fill="rgba(255,255,255,0.5)" />
        </svg>
      </div>

      {/* ── Magical Sparkles ── */}
      {sparkles.map(s => (
        <div
          key={`sp-${s.id}`}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            animation: `sparkleAnim ${s.dur} ease-in-out infinite`,
            animationDelay: s.delay,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Lightning bolts ── */}
      {[
        { left: '18%', height: '38%', interval: '12s', delay: '0s'  },
        { left: '63%', height: '44%', interval: '18s', delay: '5s'  },
        { left: '82%', height: '52%', interval: '24s', delay: '11s' },
      ].map((bolt, i) => (
        <div
          key={`bolt-${i}`}
          className="lightning-bolt"
          style={{
            left: bolt.left,
            top: 0,
            height: bolt.height,
            '--lightning-interval': bolt.interval,
            '--lightning-delay':   bolt.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
