import { Movie, Status } from "@/types/movie";
import React, { useState } from "react";
import { fetchMovies } from "./action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, Clock, Film, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useShow } from "@/context/showContext";
import Pagination from "@/components/ui/Pagination";

const getStatusLabel = (status: Status) => {
    switch (status) {
        case "ACTIVE":
            return "Now Showing";
        case "COMPLETED":
            return "Ended";
        case "UPCOMING":
            return "Coming Soon";
    }
};

const getStatusVariant = (status: Status) => {
    switch (status) {
        case "ACTIVE":
            return "default";
        case "COMPLETED":
            return "destructive";
        case "UPCOMING":
            return "secondary";
    }
};

const MovieListing = () => {
    const { movies } = useShow();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Show 8 movies per page (2x4 grid)

    // Calculate pagination
    const totalPages = Math.ceil((movies?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMovies = movies?.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleStatusChange = async (movieId: number, newStatus: Status) => {
        try {
            const response = await fetch(`/api/admin/movie/${movieId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                toast.success(`Movie status changed to ${getStatusLabel(newStatus)}`);
            }
        } catch (error) {
            console.error('Failed to update movie status:', error);
            toast({
                title: "Error",
                description: "Failed to update movie status",
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Movie Listings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentMovies ? currentMovies.map((movie) => (
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
                                        <span>{new Date(movie.releaseDate * 1000).toDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span>{movie.duration} mins</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Film className="w-4 h-4" />
                                        <span>{Array.isArray(movie.genres) ? movie.genres.join(', ') : 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <Badge variant={getStatusVariant(movie.status)}>
                                        {getStatusLabel(movie.status)}
                                    </Badge>
                                    
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {movie.status !== "ACTIVE" && (
                                                <DropdownMenuItem onClick={() => handleStatusChange(movie.id!, "ACTIVE")}>
                                                    Set as Now Showing
                                                </DropdownMenuItem>
                                            )}
                                            {movie.status !== "UPCOMING" && (
                                                <DropdownMenuItem onClick={() => handleStatusChange(movie.id!, "UPCOMING")}>
                                                    Set as Coming Soon
                                                </DropdownMenuItem>
                                            )}
                                            {movie.status !== "COMPLETED" && (
                                                <DropdownMenuItem onClick={() => handleStatusChange(movie.id!, "COMPLETED")}>
                                                    Set as Ended
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="col-span-full text-center text-muted-foreground">No movies found</p>
                    )}
                </div>

                {/* Add Pagination */}
                {movies && movies.length > itemsPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default MovieListing;