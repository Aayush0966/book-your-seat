'use client'
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight, AlertCircle, Clock, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { nowPlayingApiUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Movie } from "@/types/movie";
import { useShow } from "@/context/showContext";
import Link from "next/link";

const Hero = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const { shows } = useShow();
  const changeSlide = useCallback((direction: 'next' | 'prev') => {
    if (moviesData.length <= 1 || isTransitioning) return;

    setIsTransitioning(true);
    setIsImageLoading(true);
    setImageError(false);

    setCurrentMovieIndex(prev => {
      const newIndex = direction === 'next'
        ? (prev + 1) % moviesData.length
        : prev === 0 ? moviesData.length - 1 : prev - 1;

      if (moviesData[newIndex]) {
        const img = new window.Image();
        img.src = moviesData[newIndex].backdropUrl;
      }

      return newIndex;
    });

    setTimeout(() => setIsTransitioning(false), 500);
  }, [moviesData.length, isTransitioning]);

  useEffect(() => {
    if (moviesData.length > 1) {
      const intervalId = setInterval(() => changeSlide('next'), 10000);
      return () => clearInterval(intervalId);
    }
  }, [moviesData.length, changeSlide]);

  useEffect(() => {
    setCurrentMovieIndex(0);
    setIsImageLoading(true);
    setImageError(false);

    if (moviesData.length > 0) {
      const preloadImages = moviesData.slice(0, 3).map(movie => {
        const img = new window.Image();
        img.src = movie.backdropUrl;
        return img;
      });
    }
  }, [moviesData]);

  const currentMovie = moviesData[currentMovieIndex];
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoadingMovies(true);
        setFetchError(false);
        const response = await axios.get(nowPlayingApiUrl);
        setMoviesData(response.data.results);
      } catch (error) {
        console.log("Error while fetching movie data: ", error);
        setFetchError(true);
      } finally {
        setIsLoadingMovies(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoadingMovies) {
    return (
      <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mt-16">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 animate-pulse" />
        
        {/* Loading spinner and content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6">
            {/* Main loading spinner */}
            <div className="relative">
              <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-primary/20 rounded-full mx-auto animate-pulse" />
            </div>
            
            {/* Loading text */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Loading Movies</h2>
              <p className="text-gray-400">Fetching the latest movies for you...</p>
            </div>
            
            {/* Loading dots animation */}
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
        
        {/* Optional: Skeleton preview in background */}
        <div className="absolute inset-0 opacity-20">
          <div className="container mx-auto px-4 md:px-8 lg:px-20 h-full flex items-center">
            <div className="max-w-3xl space-y-6">
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-16 w-full max-w-2xl" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-4 pt-4">
                <Skeleton className="h-12 w-40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (fetchError || (!isLoadingMovies && !moviesData.length)) {
    return (
      <div className="relative w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-900 mt-16">
        <Alert variant="destructive" className="w-96">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {fetchError
              ? "Failed to load movies. Please check your connection and try refreshing the page."
              : "No movies available. Please try refreshing the page."
            }
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
            {(isImageLoading || imageError) && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <Skeleton className="w-full h-full opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
              </div>
            )}
            <Image
              src={currentMovie.backdropUrl}
              alt={currentMovie.title}
              fill
              priority={currentMovieIndex < 3}
              sizes="100vw"
              quality={85}
              className={cn(
                "object-cover object-center transform transition-all duration-700",
                "hover:scale-105",
                isImageLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
                imageError ? "hidden" : "block"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {!isImageLoading && !imageError && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              </>
            )}
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
              <div className={cn(
                "max-w-3xl space-y-6 transform transition-all duration-500",
                isTransitioning ? "opacity-80 translate-y-2" : "opacity-100 translate-y-0"
              )}>
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
                  <Link
                    href={`/show/${currentMovie.id}`}
                    className="w-full sm:w-auto px-8 py-3 bg-white text-primary hover:bg-white/90 rounded-full 
                      transition-all duration-300 ease-in-out flex items-center justify-center gap-2 
                      font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span>Book Tickets</span>
                    <ChevronRight className="w-4 h-4" strokeWidth={3} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {moviesData.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 animate-fade-in">
              <button
                onClick={() => changeSlide('prev')}
                disabled={isTransitioning}
                className="p-2 rounded-full bg-black/30 hover:bg-primary/80 backdrop-blur-sm 
                  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary
                  disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex gap-2" role="tablist">
                {moviesData.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning && index !== currentMovieIndex) {
                        setIsTransitioning(true);
                        setIsImageLoading(true);
                        setCurrentMovieIndex(index);
                        setTimeout(() => setIsTransitioning(false), 500);
                      }
                    }}
                    disabled={isTransitioning}
                    role="tab"
                    aria-selected={currentMovieIndex === index}
                    aria-label={`Go to slide ${index + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary",
                      "disabled:cursor-not-allowed",
                      currentMovieIndex === index
                        ? "w-8 bg-primary"
                        : "w-4 bg-white/30 hover:bg-white/50"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={() => changeSlide('next')}
                disabled={isTransitioning}
                className="p-2 rounded-full bg-black/30 hover:bg-primary/80 backdrop-blur-sm 
                  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary
                  disabled:opacity-50 disabled:cursor-not-allowed"
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
