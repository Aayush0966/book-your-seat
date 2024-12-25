'use client'

import useMovieStore from '@/store/store'
import React from 'react'
import MovieCard from './MovieCard'
import { Film } from 'lucide-react'

const NowShowingSection = () => {
  const items = useMovieStore((state) => state.items)

  return (
    <section className="bg-background dark:bg-dark-background py-12 px-6 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Film className="w-8 h-8 text-primary dark:text-dark-primary" />
          <h1 className="text-4xl font-bold text-dark-text dark:text-text tracking-tight">
            Now Showing
          </h1>
        </div>

        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {items.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="transform transition-all duration-300 hover:scale-105 animate-slide-up"
              >
                <MovieCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-text-secondary dark:text-dark-text-secondary">
            <Film className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-xl">No movies available</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default NowShowingSection