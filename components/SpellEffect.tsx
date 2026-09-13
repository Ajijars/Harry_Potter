'use client'
import { useEffect, useRef } from 'react'

interface SpellEffectProps {
  active: boolean
  type: 'patronum' | 'avada' | 'lumos' | 'expelliarmus' | 'default'
  x?: number
  y?: number
}

export default function SpellEffect({ active, type, x = 0, y = 0 }: SpellEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const colors = {
    patronum: ['#a0c8ff', '#c8e0ff', '#ffffff', '#80b0ff'],
    avada: ['#00ff44', '#44ff88', '#aaffcc', '#00cc44'],
    lumos: ['#ffffc0', '#ffff80', '#ffffff', '#ffeeaa'],
    expelliarmus: ['#ff6060', '#ff9090', '#ffcccc', '#ff4040'],
    default: ['#c9a227', '#f5d76e', '#ffffff', '#a07820'],
  }

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string }[] = []
    const palette = colors[type]

    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 6 + 2
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 2,
        life: 1,
        maxLife: 0.4 + Math.random() * 0.6,
        size: Math.random() * 8 + 2,
        color: palette[Math.floor(Math.random() * palette.length)],
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      particles.forEach(p => {
        if (p.life <= 0) return
        alive = true
        p.life -= 0.025
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15
        p.vx *= 0.98
        const alpha = p.life / p.maxLife
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
        // Glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life * 2, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(alpha * 80).toString(16).padStart(2, '0')
        ctx.fill()
      })
      if (alive) animId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animId)
  }, [active, type])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    />
  )
}
