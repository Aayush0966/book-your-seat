'use client'

import { nowPlayingApiUrl } from '@/lib/constants';
import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';

const  Hero = () => {
    const [moviesList, setMoviesList] = useState<Movie[]>([])

    const fetchBanners = async() => {
        const api_key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await axios.get(`${nowPlayingApiUrl}?api_key=${api_key}`);
        const data = response.data.results;
        setMoviesList(data)
    }

    useEffect(() => {
        fetchBanners();
    }, []);

    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % moviesList.length); // Cycle through the movies
    }, 10000); 

    return () => clearInterval(intervalId); 
  }, [moviesList.length]);

  const currentMovie = moviesList[currentMovieIndex];

  return (
    <div className="w-full mx-auto rounded-xl p-10 flex justify-center items-center">
      <div className="relative h-96 group overflow-hidden rounded-xl">
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
