'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, Calendar, Eye, Ticket, Bell } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  if (!movie) return null;

  const { title, posterUrl, duration, releaseDate, genres, description } = movie;

  const calculateDaysUntil = (date: string): number => {
    const today = new Date();
    const release = new Date(date);
    const diffTime = release.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysUntil = calculateDaysUntil(new Date(releaseDate).toISOString());
  const isReleased = daysUntil <= 0;

  return (
    <motion.div
      className="relative w-full h-[450px] rounded-xl overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => router.push(`/show/${movie.id}`)}
    >
      {/* Poster Image with Gradient Overlay */}
      <div className="relative w-full h-full">
        <Image
          src={posterUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>


      {/* Days Until Release Badge */}
      {!isReleased && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm"
          >
            {daysUntil} days left
          </motion.div>
        </div>
      )}

      {/* Content Overlay */}
      <motion.div
        className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)' }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* Title */}
          <h3 className="text-2xl font-bold text-white line-clamp-2">{title}</h3>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2">
            {(genres as String[]).map((g, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Movie Info */}
          <div className="flex items-center space-x-4 text-white/80 text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{new Date(releaseDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                isReleased
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              }`}
            >
              {isReleased ? (
                <>
                  <Ticket className="w-4 h-4" />
                  <span>Book Now</span>
                </>
              ) : (
                <>
                  <Bell className="w-4 h-4" />
                  <span>Notify Me</span>
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20"
            >
              <Eye className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MovieCard;