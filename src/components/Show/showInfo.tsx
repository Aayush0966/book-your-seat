import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, Star, Calendar, Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MovieWithShows } from "@/types/movie";

const ShowInfo = ({ movie }: { movie: MovieWithShows }) => {
  return (
    <div className="w-full lg:col-span-4">
      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-[2/3] sm:aspect-[3/4] md:aspect-[2/3] relative overflow-hidden max-w-full">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <button className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 active:scale-95 touch-manipulation">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white hover:text-red-500 transition-colors duration-200" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-white">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 break-words">{movie.title}</h1>
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                {(movie.genres as string[])?.map((genre: String, index: number) => (
                  <Badge
                    key={index}
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 text-xs sm:text-sm flex-shrink-0"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div className="text-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all active:scale-95 touch-manipulation min-w-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 block truncate">{movie.duration}</span>
              </div>
              
              <div className="text-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all active:scale-95 touch-manipulation min-w-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 block truncate">
                  {new Date(movie.releaseDate * 1000).getFullYear()}
                </span>
              </div>

              <div className="text-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all active:scale-95 touch-manipulation min-w-0">
                <Film className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 block truncate">
                  {movie.language || 'N/A'}
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Synopsis</h3>
              <p className="text-gray-700 hover:text-gray-900 text-sm sm:text-base leading-relaxed bg-white/30 hover:bg-white/60 backdrop-blur-sm p-3 sm:p-4 rounded-lg transition-all break-words">
                {movie.description}
              </p>
            </div>

            {movie.director && (
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Director</h3>
                <Badge
                  variant="outline"
                  className="bg-white/50 backdrop-blur-sm border-primary/20 text-gray-700 text-xs sm:text-sm max-w-full truncate"
                >
                  {movie.director}
                </Badge>
              </div>
            )}

            {movie.casts && (
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Cast</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {(movie.casts as string[]).map((actor, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-white/50 backdrop-blur-sm border-primary/20 text-gray-700 hover:bg-white/60 transition-all text-xs sm:text-sm active:scale-95 touch-manipulation flex-shrink-0 max-w-full truncate"
                    >
                      {actor}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowInfo;