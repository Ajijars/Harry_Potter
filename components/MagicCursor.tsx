'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

// ── HP Cursor Symbols ──────────────────────────────────────────────
const CURSOR_STYLES = [
  {
    id: 'lightning',
    label: 'Lightning Bolt',
    emoji: '⚡',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <polygon points="20,2 10,18 16,18 12,30 22,14 16,14" fill="%23f5d76e" stroke="%23c9a227" stroke-width="1"/>
    </svg>`,
  },
  {
    id: 'wand',
    label: 'Magic Wand',
    emoji: '🪄',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <line x1="4" y1="28" x2="26" y2="6" stroke="%23c8a060" stroke-width="3" stroke-linecap="round"/>
      <circle cx="26" cy="6" r="3.5" fill="%23f5d76e" stroke="%23c9a227" stroke-width="1"/>
      <circle cx="10" cy="12" r="1.5" fill="%23fff" opacity="0.8"/>
      <circle cx="20" cy="20" r="1" fill="%23fff" opacity="0.6"/>
    </svg>`,
  },
  {
    id: 'glasses',
    label: "Harry's Glasses",
    emoji: '👓',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="28" viewBox="0 0 36 28">
      <circle cx="9" cy="14" r="7" fill="none" stroke="%23333" stroke-width="2.5"/>
      <circle cx="27" cy="14" r="7" fill="none" stroke="%23333" stroke-width="2.5"/>
      <line x1="16" y1="14" x2="20" y2="14" stroke="%23333" stroke-width="2"/>
      <line x1="2" y1="10" x2="2" y2="14" stroke="%23333" stroke-width="2" stroke-linecap="round"/>
      <line x1="34" y1="10" x2="34" y2="14" stroke="%23333" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'snitch',
    label: 'Golden Snitch',
    emoji: '🔮',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="28" viewBox="0 0 36 28">
      <ellipse cx="10" cy="14" rx="8" ry="4" fill="none" stroke="%23daa520" stroke-width="1.5" opacity="0.7"/>
      <ellipse cx="26" cy="14" rx="8" ry="4" fill="none" stroke="%23daa520" stroke-width="1.5" opacity="0.7"/>
      <circle cx="18" cy="14" r="6" fill="%23f5d76e" stroke="%23c9a227" stroke-width="1.5"/>
      <circle cx="18" cy="14" r="3" fill="%23e8c040"/>
      <circle cx="16" cy="12" r="1.2" fill="rgba(255,255,255,0.5)"/>
    </svg>`,
  },
  {
    id: 'deathly-hallows',
    label: 'Deathly Hallows',
    emoji: '△',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <polygon points="16,3 29,27 3,27" fill="none" stroke="%23e8e0d0" stroke-width="2"/>
      <circle cx="16" cy="18" r="7" fill="none" stroke="%23e8e0d0" stroke-width="2"/>
      <line x1="16" y1="3" x2="16" y2="27" stroke="%23e8e0d0" stroke-width="2"/>
    </svg>`,
  },
  {
    id: 'dark-mark',
    label: 'Dark Mark',
    emoji: '💀',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="13" r="8" fill="%2300cc44" opacity="0.9"/>
      <circle cx="16" cy="13" r="5" fill="%23004400"/>
      <circle cx="13" cy="11" r="2" fill="%2300cc44"/>
      <circle cx="19" cy="11" r="2" fill="%2300cc44"/>
      <path d="M13 16 Q16 19 19 16" fill="none" stroke="%2300cc44" stroke-width="1.5"/>
      <path d="M16 21 Q12 28 8 30 M16 21 Q20 28 24 30" stroke="%2300cc44" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M10 28 Q12 24 14 26" stroke="%2300cc44" stroke-width="1.5" fill="none"/>
    </svg>`,
  },
  {
    id: 'stag',
    label: 'Stag Patronus',
    emoji: '🦌',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32">
      <circle cx="18" cy="20" r="7" fill="rgba(160,200,255,0.85)"/>
      <line x1="18" y1="13" x2="14" y2="5" stroke="rgba(160,200,255,0.9)" stroke-width="2" stroke-linecap="round"/>
      <line x1="18" y1="13" x2="22" y2="5" stroke="rgba(160,200,255,0.9)" stroke-width="2" stroke-linecap="round"/>
      <line x1="14" y1="5" x2="10" y2="2" stroke="rgba(160,200,255,0.9)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="14" y1="5" x2="12" y2="1" stroke="rgba(160,200,255,0.9)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="22" y1="5" x2="26" y2="2" stroke="rgba(160,200,255,0.9)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="22" y1="5" x2="24" y2="1" stroke="rgba(160,200,255,0.9)" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'broom',
    label: 'Nimbus 2000',
    emoji: '🧹',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="20" viewBox="0 0 36 20">
      <line x1="4" y1="10" x2="28" y2="9" stroke="%23c8872a" stroke-width="3.5" stroke-linecap="round"/>
      <ellipse cx="7" cy="10" rx="5" ry="7" fill="%236b3a0a" opacity="0.9"/>
      <rect x="10" y="7" width="5" height="6" rx="2" fill="%23daa520"/>
      <line x1="3" y1="5" x2="7" y2="10" stroke="%235a2208" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="3" y1="15" x2="7" y2="10" stroke="%235a2208" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="30" cy="9" r="2.5" fill="%23803010"/>
    </svg>`,
  },
  {
    id: 'winged-key',
    label: 'Winged Key',
    emoji: '🗝️',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="28" viewBox="0 0 36 28">
      <circle cx="12" cy="12" r="6" fill="none" stroke="%23daa520" stroke-width="2.5"/>
      <circle cx="12" cy="12" r="3" fill="none" stroke="%23daa520" stroke-width="1.5"/>
      <line x1="18" y1="12" x2="30" y2="12" stroke="%23daa520" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="26" y1="12" x2="26" y2="16" stroke="%23daa520" stroke-width="2" stroke-linecap="round"/>
      <line x1="30" y1="12" x2="30" y2="16" stroke="%23daa520" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="10" cy="6" rx="7" ry="3" fill="none" stroke="%23daa520" stroke-width="1" opacity="0.7"/>
      <ellipse cx="10" cy="18" rx="7" ry="3" fill="none" stroke="%23daa520" stroke-width="1" opacity="0.7"/>
    </svg>`,
  },
  {
    id: 'sorting-hat',
    label: 'Sorting Hat',
    emoji: '🎩',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32">
      <ellipse cx="14" cy="28" rx="13" ry="4" fill="%23553300"/>
      <path d="M4 24 Q6 16 10 10 Q12 4 14 2 Q16 4 18 10 Q22 16 24 24 Z" fill="%23442200"/>
      <path d="M6 22 Q8 18 10 14 Q12 6 14 2 Q16 6 18 14 Q20 18 22 22 Q14 20 6 22Z" fill="%23553300"/>
      <ellipse cx="14" cy="22" rx="10" ry="3" fill="%23664400"/>
      <line x1="4" y1="22" x2="24" y2="22" stroke="%23885500" stroke-width="2"/>
    </svg>`,
  },
  {
    id: 'cauldron',
    label: 'Cauldron',
    emoji: '🧪',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <path d="M6 14 Q5 26 16 28 Q27 26 26 14 Z" fill="%23222" stroke="%23555" stroke-width="1.5"/>
      <ellipse cx="16" cy="14" rx="10" ry="4" fill="%23333" stroke="%23555" stroke-width="1.5"/>
      <line x1="4" y1="12" x2="28" y2="12" stroke="%23888" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="10" r="2" fill="%2300ee88" opacity="0.8"/>
      <circle cx="18" cy="8" r="1.5" fill="%2300ee88" opacity="0.6"/>
      <circle cx="22" cy="11" r="1" fill="%2300ee88" opacity="0.7"/>
    </svg>`,
  },
  {
    id: 'owl',
    label: 'Hedwig Owl',
    emoji: '🦉',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32">
      <ellipse cx="14" cy="20" rx="9" ry="11" fill="%23e8e0d0"/>
      <ellipse cx="14" cy="20" rx="7" ry="9" fill="%23f5f0e8"/>
      <circle cx="10" cy="16" r="4" fill="%23222"/>
      <circle cx="18" cy="16" r="4" fill="%23222"/>
      <circle cx="10" cy="16" r="2.5" fill="%23daa520"/>
      <circle cx="18" cy="16" r="2.5" fill="%23daa520"/>
      <circle cx="10" cy="16" r="1.2" fill="%23000"/>
      <circle cx="18" cy="16" r="1.2" fill="%23000"/>
      <polygon points="14,20 12,23 16,23" fill="%23daa520"/>
      <path d="M5 12 Q2 6 5 4 Q8 10 8 12" fill="%23e8e0d0"/>
      <path d="M23 12 Q26 6 23 4 Q20 10 20 12" fill="%23e8e0d0"/>
    </svg>`,
  },
]

// Build CSS cursor data URI from SVG string
function makeCursorUri(svgStr: string, w = 32, h = 32) {
  return `url("data:image/svg+xml,${svgStr}") ${Math.floor(w/2)} ${Math.floor(h/2)}, auto`
}

// ── Main MagicCursor + Picker component ──────────────────────────
export default function MagicCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const ringRef    = useRef<HTMLDivElement>(null)
  const labelRef   = useRef<HTMLDivElement>(null)
  const [clicking, setClicking] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [cursorId, setCursorId] = useState('lightning')
  const pos       = useRef({ x: 0, y: 0 })
  const ringPos   = useRef({ x: 0, y: 0 })
  const animRef   = useRef<number>(0)
  const SPARK_COLORS = ['#f5d76e','#c9a227','#e8c040','#ffffff','#a0c8ff','#ffaa44']

  const selected = CURSOR_STYLES.find(c => c.id === cursorId) ?? CURSOR_STYLES[0]

  // Apply cursor to whole page
  useEffect(() => {
    const saved = localStorage.getItem('hp-cursor')
    if (saved) setCursorId(saved)
  }, [])

  const selectCursor = useCallback((id: string) => {
    setCursorId(id)
    localStorage.setItem('hp-cursor', id)
    setPickerOpen(false)
  }, [])

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top  = `${e.clientY}px`
      }
      if (Math.random() < 0.25) createSpark(e.clientX, e.clientY)
    }

    const smoothRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top  = `${ringPos.current.y}px`
      }
      animRef.current = requestAnimationFrame(smoothRing)
    }

    const createSpark = (x: number, y: number) => {
      const spark = document.createElement('div')
      spark.className = 'spark-particle'
      const color    = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)]
      const size     = Math.random() * 5 + 2
      const angle    = Math.random() * 360
      const distance = Math.random() * 40 + 10
      spark.style.cssText = `
        position:fixed;pointer-events:none;z-index:99999;border-radius:50%;
        left:${x}px;top:${y}px;width:${size}px;height:${size}px;
        background:${color};box-shadow:0 0 ${size*2}px ${color};
        transform:translate(-50%,-50%);
      `
      document.body.appendChild(spark)
      const kf = [
        { transform: `translate(-50%,-50%) scale(1)`, opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle)*distance}px),calc(-50% + ${Math.sin(angle)*distance}px)) scale(0)`, opacity: 0 }
      ]
      spark.animate(kf, { duration: 600 + Math.random()*400, easing:'ease-out' }).onfinish = () => spark.remove()
    }

    const handleMouseDown  = () => setClicking(true)
    const handleMouseUp    = () => setClicking(false)
    const handleClick      = (e: MouseEvent) => { for (let i=0;i<12;i++) createSpark(e.clientX,e.clientY) }

    window.addEventListener('mousemove',  moveCursor)
    window.addEventListener('mousedown',  handleMouseDown)
    window.addEventListener('mouseup',    handleMouseUp)
    window.addEventListener('click',      handleClick)
    animRef.current = requestAnimationFrame(smoothRing)

    return () => {
      window.removeEventListener('mousemove',  moveCursor)
      window.removeEventListener('mousedown',  handleMouseDown)
      window.removeEventListener('mouseup',    handleMouseUp)
      window.removeEventListener('click',      handleClick)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <>
      {/* ── Custom cursor dot (SVG symbol) ── */}
      <div
        ref={cursorRef}
        className={`magic-cursor ${clicking ? 'clicking' : ''}`}
        style={{ display:'flex', alignItems:'center', justifyContent:'center' }}
        dangerouslySetInnerHTML={{ __html: selected.svg.replace(/%23/g,'#') }}
      />
      <div ref={ringRef} className="magic-cursor-ring" />

      {/* ── Cursor Picker Button ── */}
      <button
        id="cursor-picker-btn"
        onClick={() => setPickerOpen(o => !o)}
        aria-label="Change cursor style"
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          right: '2rem',
          zIndex: 600,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: pickerOpen
            ? 'linear-gradient(135deg,rgba(201,162,39,0.4),rgba(26,13,61,0.95))'
            : 'rgba(13,0,32,0.9)',
          border: `1px solid ${pickerOpen ? 'rgba(201,162,39,0.8)' : 'rgba(201,162,39,0.4)'}`,
          cursor: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem',
          transition: 'all 0.3s ease',
          boxShadow: pickerOpen
            ? '0 0 30px rgba(201,162,39,0.5)'
            : '0 4px 20px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <span style={{ filter: 'drop-shadow(0 0 6px rgba(201,162,39,0.8))' }}>
          {selected.emoji}
        </span>
      </button>

      {/* ── Picker Panel ── */}
      {pickerOpen && (
        <div
          id="cursor-picker-panel"
          style={{
            position: 'fixed',
            bottom: '8.5rem',
            right: '1.5rem',
            zIndex: 601,
            background: 'linear-gradient(135deg,rgba(7,0,15,0.97),rgba(26,13,61,0.95))',
            border: '1px solid rgba(201,162,39,0.3)',
            borderRadius: 12,
            padding: '1rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7),0 0 40px rgba(201,162,39,0.1)',
            animation: 'fadeInUp 0.25s ease',
            width: 260,
          }}
        >
          {/* Header */}
          <div style={{
            fontFamily:'var(--font-subheading)',
            fontSize:'0.65rem',
            letterSpacing:'0.3em',
            textTransform:'uppercase',
            color:'var(--gold)',
            marginBottom:'0.75rem',
            textAlign:'center',
            borderBottom:'1px solid rgba(201,162,39,0.15)',
            paddingBottom:'0.5rem',
          }}>
            ✦ Choose Your Cursor ✦
          </div>

          {/* Grid of symbols */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(4,1fr)',
            gap:'0.5rem',
          }}>
            {CURSOR_STYLES.map(cs => (
              <button
                key={cs.id}
                onClick={() => selectCursor(cs.id)}
                title={cs.label}
                style={{
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  justifyContent:'center',
                  gap:'0.2rem',
                  padding:'0.5rem 0.25rem',
                  background: cs.id === cursorId
                    ? 'linear-gradient(135deg,rgba(201,162,39,0.3),rgba(26,13,61,0.5))'
                    : 'rgba(255,255,255,0.04)',
                  border: cs.id === cursorId
                    ? '1px solid rgba(201,162,39,0.7)'
                    : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8,
                  cursor:'none',
                  transition:'all 0.2s ease',
                  boxShadow: cs.id === cursorId
                    ? '0 0 12px rgba(201,162,39,0.3)'
                    : 'none',
                }}
                onMouseEnter={e => {
                  if (cs.id !== cursorId) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,162,39,0.1)'
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,162,39,0.4)'
                  }
                }}
                onMouseLeave={e => {
                  if (cs.id !== cursorId) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'
                    ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'
                  }
                }}
              >
                <span style={{ fontSize:'1.4rem', lineHeight:1 }}>{cs.emoji}</span>
                <span style={{
                  fontFamily:'var(--font-subheading)',
                  fontSize:'0.48rem',
                  letterSpacing:'0.05em',
                  textTransform:'uppercase',
                  color: cs.id === cursorId ? 'var(--gold)' : 'rgba(232,220,200,0.55)',
                  textAlign:'center',
                  lineHeight:1.2,
                }}>
                  {cs.label}
                </span>
              </button>
            ))}
          </div>

          {/* Current selection label */}
          <div style={{
            marginTop:'0.75rem',
            textAlign:'center',
            fontFamily:'var(--font-body)',
            fontStyle:'italic',
            fontSize:'0.75rem',
            color:'rgba(201,162,39,0.7)',
            borderTop:'1px solid rgba(201,162,39,0.1)',
            paddingTop:'0.5rem',
          }}>
            {selected.emoji} {selected.label}
          </div>
        </div>
      )}

      {/* Close picker on outside click */}
      {pickerOpen && (
        <div
          onClick={() => setPickerOpen(false)}
          style={{
            position:'fixed',inset:0,zIndex:599,
            background:'transparent',cursor:'none',
          }}
        />
      )}
    </>
  )
}
