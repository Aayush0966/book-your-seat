'use client'

import useMovieStore from "@/store/store";
import { useState } from "react";
import MovieCard from "./MovieCard";
import { Film } from "lucide-react";
import { Button } from "./ui/button";

const NowShowingSection = () => {
  const items = useMovieStore((state) => state.items);
  const [filter, setFilter] = useState('all');

  const filteredItems = items.slice(0, 8).filter(item => {
    if (filter === 'top') return item.vote_average >= 8;
    return true;
  });

  return (
    <section className="bg-background dark:bg-dark-background py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
          <div className="flex items-center space-x-3 mb-6 sm:mb-0 animate-fadeIn">
            <Film className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-dark-text dark:text-text">
              Now Showing
            </h2>
          </div>
          
          <div className="flex gap-4 animate-fadeIn animation-delay-100">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="rounded-full"
            >
              All Movies
            </Button>
            <Button
              variant={filter === 'top' ? 'default' : 'outline'}
              onClick={() => setFilter('top')}
              className="rounded-full"
            >
              Top Rated
            </Button>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="transform hover:scale-105 transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MovieCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <Film className="w-16 h-16 mb-4 text-gray-400 animate-pulse" />
            <p className="text-xl text-gray-500">No movies available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NowShowingSection