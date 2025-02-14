import { Card, CardContent } from "@/components/ui/card";
import { Heart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Movie, MovieWithShows } from "@/types/movie";

const ShowInfo = ({ movie }: { movie: MovieWithShows }) => {


    return (
        <div className="lg:col-span-4">
            <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                    <div className="aspect-[2/3] relative overflow-hidden rounded-lg mb-6">
                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">{movie.title}</h1>
                            <Heart className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {movie.genres?.map((genre: String, index: number) => (
                                <Badge
                                    key={index}
                                    className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                                >
                                    {genre}
                                </Badge>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                                <span className="text-sm text-gray-600">{movie.duration}</span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            {movie.description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};

export default ShowInfo;