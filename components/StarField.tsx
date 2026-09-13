'use client'
import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
  twinkleSpeed: number
  twinkleOffset: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: Star[] = []
    let shootingStars: { x: number; y: number; len: number; speed: number; angle: number; opacity: number; active: boolean }[] = []
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateStars()
    }

    const generateStars = () => {
      stars = []
      const count = Math.floor((canvas.width * canvas.height) / 3000)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.2,
          opacity: Math.random() * 0.7 + 0.1,
          speed: Math.random() * 0.02 + 0.005,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.4,
        len: Math.random() * 150 + 80,
        speed: Math.random() * 8 + 5,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 1,
        active: true,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      // Draw stars
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset)
        const alpha = star.opacity * (0.6 + 0.4 * twinkle)
        const r = star.radius * (0.85 + 0.15 * twinkle)

        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, r * 3)
        gradient.addColorStop(0, `rgba(255, 240, 200, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(200, 180, 255, ${alpha * 0.5})`)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(star.x, star.y, r, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Shooting stars
      shootingStars.forEach((s, i) => {
        if (!s.active) return
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.opacity -= 0.018

        if (s.opacity <= 0 || s.x > canvas.width || s.y > canvas.height) {
          s.active = false
          return
        }

        const grad = ctx.createLinearGradient(
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len,
          s.x, s.y
        )
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(0.7, `rgba(200, 220, 255, ${s.opacity * 0.4})`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`)

        ctx.beginPath()
        ctx.moveTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      shootingStars = shootingStars.filter(s => s.active)

      // Spawn new shooting stars
      if (Math.random() < 0.004) spawnShootingStar()

      // Magical floating dust particles
      if (Math.random() < 0.05) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const colors = ['rgba(201, 162, 39, 0.4)', 'rgba(122, 77, 191, 0.3)', 'rgba(160, 200, 255, 0.3)']
        const color = colors[Math.floor(Math.random() * colors.length)]
        ctx.beginPath()
        ctx.arc(x, y, Math.random() * 2, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
