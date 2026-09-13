'use client'
import { useState, useEffect, useRef } from 'react'

export default function AudioPlayer() {
  const [playing, setPlaying]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [volume, setVolume]     = useState(0.4)
  const [showVol, setShowVol]   = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef  = useRef<HTMLAudioElement | null>(null)
  const fadeRef   = useRef<number | null>(null)
  const progRef   = useRef<number | null>(null)

  // Init audio element once
  useEffect(() => {
    const audio = new Audio('/hedwigs-theme.mp3')
    audio.loop   = true
    audio.volume = 0
    audio.preload = 'auto'
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => setLoading(false))
    audio.addEventListener('waiting',        () => setLoading(true))

    // Progress tracker
    const tick = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
      progRef.current = requestAnimationFrame(tick)
    }
    progRef.current = requestAnimationFrame(tick)

    return () => {
      audio.pause()
      audio.src = ''
      if (progRef.current) cancelAnimationFrame(progRef.current)
    }
  }, [])

  // Sync volume slider to audio
  useEffect(() => {
    if (!audioRef.current) return
    if (playing) audioRef.current.volume = volume
  }, [volume, playing])

  const fadeIn = (targetVol: number) => {
    if (!audioRef.current) return
    let v = 0
    audioRef.current.volume = 0
    clearInterval(fadeRef.current ?? undefined)
    fadeRef.current = window.setInterval(() => {
      if (!audioRef.current) return
      v = Math.min(v + 0.02, targetVol)
      audioRef.current.volume = v
      if (v >= targetVol) clearInterval(fadeRef.current ?? undefined)
    }, 50)
  }

  const fadeOut = (cb?: () => void) => {
    if (!audioRef.current) return
    let v = audioRef.current.volume
    clearInterval(fadeRef.current ?? undefined)
    fadeRef.current = window.setInterval(() => {
      if (!audioRef.current) return
      v = Math.max(v - 0.02, 0)
      audioRef.current.volume = v
      if (v <= 0) {
        clearInterval(fadeRef.current ?? undefined)
        cb?.()
      }
    }, 50)
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      fadeOut(() => audio.pause())
      setPlaying(false)
    } else {
      setLoading(true)
      try {
        await audio.play()
        setPlaying(true)
        fadeIn(volume)
      } catch (e) {
        console.warn('Audio play error:', e)
      } finally {
        setLoading(false)
      }
    }
  }

  const pct = Math.round(progress * 100)

  return (
    <div
      id="audio-player"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem',
      }}
    >
      {/* Volume Slider — appears above button */}
      {showVol && (
        <div style={{
          background: 'rgba(7,0,15,0.95)',
          border: '1px solid rgba(201,162,39,0.3)',
          borderRadius: 10,
          padding: '0.75rem',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          animation: 'fadeInUp 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          minWidth: 140,
        }}>
          <span style={{
            fontFamily: 'var(--font-subheading)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>
            🔊 Volume
          </span>

          {/* Progress bar */}
          <div style={{
            width: '100%',
            height: 3,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            overflow: 'hidden',
            marginBottom: '0.25rem',
          }}>
            <div style={{
              width: `${pct}%`,
              height: '100%',
              background: 'linear-gradient(to right,rgba(201,162,39,0.5),var(--gold))',
              borderRadius: 2,
              transition: 'width 0.3s linear',
            }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            color: 'rgba(232,220,200,0.4)',
            marginBottom: '0.2rem',
          }}>
            Hedwig's Theme ♫
          </span>

          <input
            type="range"
            min={0} max={1} step={0.01}
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#c9a227',
              cursor: 'pointer',
              height: 4,
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <span style={{ fontSize: '0.6rem', color: 'rgba(232,220,200,0.4)' }}>0</span>
            <span style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>
              {Math.round(volume * 100)}%
            </span>
            <span style={{ fontSize: '0.6rem', color: 'rgba(232,220,200,0.4)' }}>100</span>
          </div>
        </div>
      )}

      {/* Main Play/Pause Button */}
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {/* Volume toggle */}
        <button
          onClick={() => setShowVol(v => !v)}
          title="Volume"
          style={{
            width: 42, height: 42,
            borderRadius: '50%',
            background: showVol
              ? 'rgba(201,162,39,0.2)'
              : 'rgba(13,0,32,0.9)',
            border: `1px solid ${showVol ? 'rgba(201,162,39,0.7)' : 'rgba(201,162,39,0.3)'}`,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            color: 'rgba(232,220,200,0.8)',
          }}
        >
          {volume === 0 ? '🔇' : volume < 0.4 ? '🔉' : '🔊'}
        </button>

        {/* Play/Pause */}
        <button
          id="audio-toggle-btn"
          onClick={toggle}
          title={playing ? 'Pause Hedwig\'s Theme' : 'Play Hedwig\'s Theme'}
          style={{
            width: 50, height: 50,
            borderRadius: '50%',
            background: playing
              ? 'linear-gradient(135deg,rgba(201,162,39,0.4),rgba(26,13,61,0.95))'
              : 'rgba(13,0,32,0.9)',
            border: `1px solid ${playing ? 'rgba(201,162,39,0.7)' : 'rgba(201,162,39,0.35)'}`,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: playing
              ? '0 0 30px rgba(201,162,39,0.4), 0 4px 20px rgba(0,0,0,0.5)'
              : '0 4px 20px rgba(0,0,0,0.5)',
            animation: playing ? 'pulseGold 2s ease-in-out infinite' : 'none',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Circular progress ring */}
          {playing && (
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
              viewBox="0 0 50 50"
            >
              <circle
                cx="25" cy="25" r="23"
                fill="none"
                stroke="rgba(201,162,39,0.35)"
                strokeWidth="2"
                strokeDasharray={`${pct * 1.445} 144.5`}
                strokeLinecap="round"
              />
            </svg>
          )}

          {loading
            ? <span style={{ animation: 'spin 1s linear infinite', display: 'block' }}>⚡</span>
            : playing ? '⏸' : '▶'
          }
        </button>
      </div>

      <style>{`
        @keyframes pulseGold {
          0%,100% { box-shadow: 0 0 20px rgba(201,162,39,0.3), 0 4px 20px rgba(0,0,0,0.5); }
          50%      { box-shadow: 0 0 40px rgba(201,162,39,0.6), 0 4px 30px rgba(0,0,0,0.6); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        #audio-toggle-btn:hover {
          transform: scale(1.08);
          border-color: rgba(201,162,39,0.8) !important;
        }
      `}</style>
    </div>
  )
}
