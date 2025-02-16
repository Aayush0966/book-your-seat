import { Movie, Status } from "@/types/movie";
import React from "react";
import { fetchMovies } from "./action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Film } from "lucide-react";

const MovieListing = () => {
    const [movieList, setMovieList] = React.useState<Movie[]>([]);

    React.useEffect(() => {
        const getAllMovies = async () => {
            const movies = await fetchMovies()
            if (!movies) return;
            setMovieList(movies as Movie[]);
        }
        getAllMovies();
    }, [])

    console.log(movieList)

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Movie Listings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movieList ? movieList.map((movie) => (
                        <div key={movie.id} className="group relative bg-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="relative h-[400px] w-full">
                                <Image 
                                    src={movie.posterUrl} 
                                    alt={movie.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            
                            <div className="p-4">
                                <h3 className="text-lg font-semibold line-clamp-1">{movie.title}</h3>
                                
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span>{movie.duration} mins</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Film className="w-4 h-4" />
                                        <span>{(movie.genres).join(', ')}</span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <Badge variant={movie.status == "ACTIVE" as Status ? 'default' : 'secondary'}>
                                        {movie.status == "ACTIVE" as Status ? 'Now Showing' : 'Coming Soon'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="col-span-full text-center text-muted-foreground">No movies found</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default MovieListing;