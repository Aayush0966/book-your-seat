'use client'

import { Store } from '@/types/movie'; 
import useMovieStore from '@/store/store'; 
import Image from 'next/image'; 
import React, { useState, useEffect } from 'react';

const Hero = () => {
  const items = useMovieStore((state: Store) => state.items); 
  
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 10000); 

      return () => clearInterval(intervalId); 
    }
  }, [items.length]); 

  const currentMovie = items[currentMovieIndex];

  return (
    <div className="w-full mx-auto rounded-xl p-10 flex justify-center items-center">
      <div className="relative h-[600px] group overflow-hidden rounded-xl">
        {currentMovie && (
          <Image
            src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`} // Fetch poster from TMDB API
            width={1700}
            height={100}
            alt={currentMovie.title}
            className="rounded-xl object-fill transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
