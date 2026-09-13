import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import MagicCursor from '@/components/MagicCursor'
import StarField from '@/components/StarField'
import FloatingObjects from '@/components/FloatingObjects'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata: Metadata = {
  title: 'Welcome to Hogwarts | The Harry Potter Universe',
  description: 'Journey through all 7 books and 8 movies of the Harry Potter saga. Experience the magic of Hogwarts, explore every spell, character, and house in cinematic detail.',
  keywords: 'Harry Potter, Hogwarts, magic, wizards, spells, Gryffindor, Slytherin, Ravenclaw, Hufflepuff',
  openGraph: {
    title: 'Welcome to Hogwarts | The Harry Potter Universe',
    description: 'A cinematic journey through the entire Harry Potter saga',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700;900&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MagicCursor />
        <StarField />
        <Navbar />
        {children}
        <AudioPlayer />
      </body>
    </html>
  )
}
