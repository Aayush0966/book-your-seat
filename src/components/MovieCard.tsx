import React from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { imageUrl } from '@/lib/constants';


const MovieCard = ( movie: Movie) => {
  console.log(movie)
  const { title, posterUrl } = movie;

  return (
    <div className="group relative w-64 h-96 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <div className="relative w-full h-full">
        <Image
          src={posterUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 p-4 flex flex-col justify-end transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
        <div className="space-y-3">

          <h3 className="text-xl font-bold text-white line-clamp-2">{title}</h3>

          <button className="w-full py-2 mt-2 rounded-lg bg-primary text-white font-medium 
            transform hover:scale-95 active:scale-90 transition-all duration-200">
            Book Now
          </button>
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-700 transition-opacity">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] duration-1000 transition-transform bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
};

export default MovieCard;