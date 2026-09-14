'use client'
import React from 'react'

export default function HagridMotorcycle({ width = 120 }: { width?: number }) {
  return (
    <svg width={width} height={width * 0.75} viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Headlight beam */}
      <path d="M90 45 L150 20 L150 70 Z" fill="url(#beamGrad)" opacity="0.6" />
      <defs>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,200,0.8)" />
          <stop offset="100%" stopColor="rgba(255,255,200,0)" />
        </linearGradient>
        <radialGradient id="bikeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,180,100,0.5)" />
          <stop offset="100%" stopColor="rgba(255,180,100,0)" />
        </radialGradient>
      </defs>
      
      {/* Exhaust trail (stars/sparks) */}
      <circle cx="15" cy="55" r="2" fill="#ffd700" opacity="0.8" />
      <circle cx="8" cy="58" r="1.5" fill="#ffa500" opacity="0.6" />
      <circle cx="2" cy="53" r="1" fill="#fff" opacity="0.4" />
      <circle cx="20" cy="52" r="1" fill="#ffd700" opacity="0.9" />

      {/* Sidecar body */}
      <path d="M40 55 Q55 65 70 55 L70 45 Q55 40 40 45 Z" fill="#2d3748" />
      <path d="M42 46 Q55 42 68 46 L68 53 Q55 62 42 53 Z" fill="#1a202c" />
      
      {/* Sidecar wheel */}
      <circle cx="65" cy="58" r="6" fill="#111" />
      <circle cx="65" cy="58" r="3" fill="#4a5568" />

      {/* Main Motorcycle Body */}
      <path d="M30 45 L85 45 Q90 45 92 48 L90 55 L28 55 Q25 50 30 45 Z" fill="#1a202c" />
      <path d="M40 38 L65 38 L70 45 L35 45 Z" fill="#2d3748" />
      
      {/* Wheels */}
      <circle cx="35" cy="55" r="12" fill="#111" />
      <circle cx="35" cy="55" r="6" fill="#718096" />
      <circle cx="85" cy="55" r="12" fill="#111" />
      <circle cx="85" cy="55" r="6" fill="#718096" />

      {/* Engine details */}
      <rect x="50" y="47" width="15" height="6" fill="#a0aec0" rx="2" />
      <rect x="52" y="45" width="11" height="2" fill="#718096" />
      <path d="M65 50 L20 50" stroke="#718096" strokeWidth="2" fill="none" />

      {/* Headlight */}
      <circle cx="95" cy="45" r="4" fill="#fffaf0" filter="url(#bikeGlow)" />
      <circle cx="95" cy="45" r="2" fill="#fff" />

      {/* Hagrid silhouette */}
      {/* Huge coat */}
      <path d="M45 42 Q40 25 55 20 Q70 25 70 42 Z" fill="#2d1a11" />
      {/* Head / Hair */}
      <circle cx="58" cy="18" r="8" fill="#1a110a" />
      <path d="M50 15 Q58 5 66 15 Q68 25 58 28 Q48 25 50 15 Z" fill="#1a110a" />
      {/* Arms holding handlebars */}
      <path d="M65 30 L80 35" stroke="#2d1a11" strokeWidth="5" strokeLinecap="round" />
      <path d="M80 32 L85 38" stroke="#cbd5e0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
