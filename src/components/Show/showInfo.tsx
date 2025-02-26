import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock, Star, Calendar, Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MovieWithShows } from "@/types/movie";

const ShowInfo = ({ movie }: { movie: MovieWithShows }) => {
  return (
    <div className="lg:col-span-4">
      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-[2/3] relative overflow-hidden">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200">
              <Heart className="w-6 h-6 text-white hover:text-red-500 transition-colors duration-200" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {(movie.genres as string[])?.map((genre: String, index: number) => (
                  <Badge
                    key={index}
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all">
                <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                <span className="text-sm font-medium text-gray-700">{movie.duration}</span>
              </div>
              
              <div className="text-center p-3 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  {new Date(movie.releaseDate * 1000).getFullYear()}
                </span>
              </div>


              <div className="text-center p-3 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-all">
                <Film className="w-5 h-5 mx-auto mb-1 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  {movie.language || 'N/A'}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
              <p className="text-gray-700 hover:text-gray-900 text-base leading-relaxed bg-white/30 hover:bg-white/60 backdrop-blur-sm p-4 rounded-lg">
                {movie.description}
              </p>
            </div>

            {movie.director && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <Badge
                  variant="outline"
                  className="bg-white/50 backdrop-blur-sm border-primary/20 text-gray-700 text-sm"
                >
                  {movie.director}
                </Badge>
              </div>
            )}

            {movie.casts && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {(movie.casts as string[]).map((actor, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-white/50 backdrop-blur-sm border-primary/20 text-gray-700 hover:bg-white/60 transition-all"
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