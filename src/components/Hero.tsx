'use client'

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {  Play, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import {  nowPlayingApiUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Movie } from "@/types/movie";

const Hero = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [moviesData, setMoviesData] = useState<Movie[]>([]);

  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    if (moviesData.length <= 1) return;
    
    setIsTransitioning(true);
    setIsImageLoading(true);
    setCurrentMovieIndex(prev => {
      if (direction === 'next') return (prev + 1) % moviesData.length;
      return prev === 0 ? moviesData.length - 1 : prev - 1;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  }, [moviesData.length]);

  useEffect(() => {
    if (moviesData.length > 1) {
      const intervalId = setInterval(() => changeSlide('next'), 10000);
      return () => clearInterval(intervalId);
    }
  }, [moviesData.length, changeSlide]);

  // Reset states when moviesData change
  useEffect(() => {
    setCurrentMovieIndex(0);
    setIsImageLoading(true);
    setImageError(false);
  }, [moviesData]);

  const currentMovie = moviesData[currentMovieIndex];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(nowPlayingApiUrl);
        setMoviesData(response.data.results);
      } catch (error) {
        console.log("Error while fetching movie data: ", error);
        setImageError(true);
      }
    };

    fetchMovies();
  }, []);

  if (!moviesData.length) {
    return (
      <div className="relative w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-900 mt-16">
        <Alert variant="destructive" className="w-96">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No movies available. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageError(true);
  };

  const convertUnixToMonthDay = (unixTime: number) => {
    const date = new Date(unixTime * 1000);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    return `${month} ${day}`;
  };
  

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-black mt-16">
      {currentMovie && (
        <>
          <div className={cn(
            "absolute inset-0",
            "transition-opacity duration-700",
            isTransitioning ? "opacity-50" : "opacity-100"
          )}>
            {isImageLoading && (
              <Skeleton className="w-full h-full" />
            )}
            
            <Image
              src={currentMovie.posterUrl}
              alt={currentMovie.title}
              fill
              priority
              className={cn(
                "object-cover object-center transform transition-all duration-1000",
                "hover:scale-110",
                isImageLoading ? "opacity-0" : "opacity-100",
                imageError ? "hidden" : "block"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            {!isImageLoading && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
              </>
            )}
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
              <div className="max-w-3xl space-y-6 transform translate-y-0 translate-x-0">
                <div className="flex items-center gap-4 text-primary/80 font-medium animate-fade-in">
                  <span className="px-4 py-1 border border-primary/20 rounded-full backdrop-blur-sm hover:border-primary/40 transition-colors">
                    {convertUnixToMonthDay(currentMovie.releaseDate)}
                  </span>
                  
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight animate-slide-up">
                  {currentMovie.title}
                </h1>

                <p className="text-base sm:text-lg text-gray-300 line-clamp-3 animate-slide-up animation-delay-200">
                  {currentMovie.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-slide-up animation-delay-300">
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 rounded-full 
                      group relative overflow-hidden transition-all duration-300 ease-in-out"
                  >
                    <span className="absolute inset-0 bg-white/20 transform -translate-x-full 
                      group-hover:translate-x-0 transition-transform duration-300" />
                    <Play className="w-5 h-5 mr-2" fill="currentColor" /> Watch Trailer
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 rounded-full 
                      backdrop-blur-sm border-none transition-all duration-300 ease-in-out"
                  >
                    Book Tickets
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {moviesData.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 animate-fade-in">
              <button 
                onClick={() => changeSlide('prev')}
                className="p-2 rounded-full bg-black/30 hover:bg-primary/80 backdrop-blur-sm 
                  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex gap-2" role="tablist">
                {moviesData.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMovieIndex(index)}
                    role="tab"
                    aria-selected={currentMovieIndex === index}
                    aria-label={`Go to slide ${index + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary",
                      currentMovieIndex === index 
                        ? "w-8 bg-primary" 
                        : "w-4 bg-white/30 hover:bg-white/50"
                    )}
                  />
                ))}
              </div>
              <button 
                onClick={() => changeSlide('next')}
                className="p-2 rounded-full bg-black/30 hover:bg-primary/80 backdrop-blur-sm 
                  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Hero;