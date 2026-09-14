import { books } from '@/data/books'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CinematicMovieClient from '@/components/CinematicMovieClient'

export async function generateStaticParams() {
  return books.map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  return {
    title: book ? `${book.title} | Hogwarts Cinematic Journey` : 'Movie Not Found',
    description: book?.shortSynopsis ?? '',
  }
}

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = books.find(b => b.slug === slug)
  
  if (!book) notFound()
  
  const movieIndex = books.findIndex(b => b.slug === slug)
  const nextMovie = movieIndex < books.length - 1 ? books[movieIndex + 1] : null

  return (
    <CinematicMovieClient 
      movie={book} 
      nextMovie={nextMovie}
      isFirstMovie={movieIndex === 0}
    />
  )
}
