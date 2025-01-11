import { Movie, MovieDetails } from "@/types/movie"
import { Prisma } from "@prisma/client"
import prisma from "../lib/prisma"






export const addMovie = async (movieDetails: MovieDetails) => {
    try {
        const movieData: Movie = {
            title: movieDetails.title,
            description: movieDetails.description,
            director: movieDetails.director,
            posterUrl: movieDetails.posterUrl,
            ageRating: movieDetails.ageRating,
            genres: movieDetails.genres as unknown as Prisma.InputJsonValue,
            casts: movieDetails.cast as unknown as Prisma.InputJsonValue,
            language: movieDetails.language,
            duration: movieDetails.duration,
            releaseDate: movieDetails.releaseDate
        };

        const newMovie = await prisma.movie.create({
            data: movieData
        });

        const newShows = await Promise.all(
            movieDetails.showtimes.map(async (showtime) => {
                const existingShow = await prisma.show.findFirst({
                    where: {
                        screenId: showtime.screenId,
                        AND: [
                            {
                                showTime: {
                                    lte: showtime.showTime,
                                },
                            },
                            {
                                endDate: {
                                    gte: showtime.showTime,
                                },
                            },
                        ],
                    },
                });

                if (existingShow) {
                    throw new Error(`A show already exists on screen ${showtime.screenId} at this time.`);
                }

                const newShow = await prisma.show.create({
                    data: {
                        movieId: newMovie.id,
                        screenId: showtime.screenId,
                        showTime: showtime.showTime,
                        startDate: movieDetails.showStartDate,
                        endDate: movieDetails.showEndDate,
                    },
                });

                return newShow;
            })
        );

        for (const priceGroup of movieDetails.pricing) {
            const show = newShows.find((show) => show.screenId === priceGroup.screenId);
            if (show) {
                await Promise.all(
                    Object.entries(priceGroup.prices).map(([seatType, price]) => 
                        prisma.price.create({
                            data: {
                                showId: show.id,
                                screenId: priceGroup.screenId,
                                seatType,
                                price: Number(price),
                            },
                        })
                    )
                );
            }
        }

        return newMovie;
        
    } catch (error) {
        throw error;
    }
};
