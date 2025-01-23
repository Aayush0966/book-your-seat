import { fetchMoviesWithShows } from "@/services/showServices";
import MovieCard from "./MovieCard";
import { Film, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie";

const UpcomingSection = async () => {
  const shows = await fetchMoviesWithShows('UPCOMING');

  return (
    <section className="bg-background dark:bg-dark-background py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
          <div className="flex items-center space-x-3 mb-6 sm:mb-0 animate-fadeIn">
            <div className="relative">
              <Film className="w-8 h-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-dark-text dark:text-text">
              Upcoming Movies
            </h2>
          </div>
          
          <Button 
            variant="outline" 
            className="group flex items-center space-x-2 hover:bg-primary hover:text-white transition-all duration-300"
          >
            <span>View All Shows</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Shows Grid */}
        {shows && shows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {shows.slice(0, 8).map((show, index) => (
              <div
                key={show.id}
                className="group relative transform hover:scale-105 transition-all duration-300 animate-fadeIn"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  opacity: 0,
                  animation: 'fadeIn 0.5s ease-out forwards'
                }}
              >
                <div className="rounded-xl" />
                <MovieCard {...show as Movie} />
               
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <Film className="w-16 h-16 mb-4 text-gray-400 animate-bounce" />
            <p className="text-xl text-gray-500 mb-4">No movies available</p>
            <Button variant="outline" className="hover:bg-primary hover:text-white">
              Check back later
            </Button>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-12 text-center sm:hidden">
          <Button 
            variant="outline" 
            className="w-full group flex items-center justify-center space-x-2 hover:bg-primary hover:text-white transition-all duration-300"
          >
            <span>View All Shows</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;