import { fetchMoviesWithShows } from "@/services/showServices";
import MovieCard from "./MovieCard";
import { Film, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie";

const NowShowingSection = async () => {
  const shows = await fetchMoviesWithShows('ACTIVE');
  
  return (
    <section className="bg-gradient-to-b from-background to-background/80 dark:from-dark-background dark:to-dark-background/90 py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16">
          <div className="flex items-center space-x-4 mb-8 sm:mb-0 animate-fadeIn">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-75" />
              <div className="relative">
                <Film className="w-10 h-10 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-dark-text to-primary dark:from-text dark:to-primary bg-clip-text text-transparent">
              Now Showing
            </h2>
          </div>
        </div>

        {/* Shows Grid */}
        {shows && shows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {shows.slice(0, 8).map((show, index) => (
              <div
                key={show.id}
                className="group relative transform hover:scale-105 transition-all duration-300 animate-fadeIn hover:z-10"
                style={{
                  animationDelay: `${index * 150}ms`,
                  opacity: 0,
                  animation: 'fadeIn 0.5s ease-out forwards'
                }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative rounded-xl bg-background/50 dark:bg-dark-background/50 backdrop-blur-sm hover:shadow-primary/20 transition-all duration-300">
                  <MovieCard movie={show as Movie} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 bg-background/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-primary/10 shadow-xl">
            <Film className="w-20 h-20 mb-6 text-primary/60 animate-bounce" />
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">No movies available</p>
            <Button 
              variant="outline"
              className="bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary hover:bg-primary/90 hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/25"
            >
              Check back later
            </Button>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-16 text-center sm:hidden">
          <Button
            variant="outline"
            className="w-full group bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary flex items-center justify-center space-x-3 hover:bg-primary/90 hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/25"
          >
            <span className="font-medium">View All Shows</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NowShowingSection;