'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

interface HeroProps {
  activeShows: Movie[];
}

const Hero = ({ activeShows }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (activeShows && activeShows.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % activeShows.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeShows?.length]);

  if (!activeShows || !activeShows.length) {
    return (
      <div className="relative w-full h-[calc(100vh-4rem)] bg-gray-900 mt-16 flex items-center justify-center">
        <p className="text-white">No active shows available</p>
      </div>
    );
  }

  const currentShow = activeShows[currentIndex];

  if (!currentShow) {
    return (
      <div className="relative w-full h-[calc(100vh-4rem)] bg-gray-900 mt-16 flex items-center justify-center">
        <p className="text-white">No active shows available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden mt-16">
      {/* Background Image */}
      <Image
        src={currentShow.backdropUrl}
        alt={currentShow.title}
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">{currentShow.title}</h1>
            <p className="text-lg mb-6 line-clamp-3">{currentShow.description}</p>
            <Link
              href={`/show/${currentShow.id}`}
              className="inline-block px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Book Tickets
            </Link>
          </div>
        </div>
      </div>
      
      {/* Simple dots indicator */}
      {activeShows.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {activeShows.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
