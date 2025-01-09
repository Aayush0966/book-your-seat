import { Movie, MovieDetails } from "@/types/movie"
import prisma from "./prisma"
import { Prisma } from "@prisma/client"

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return user? user : null
}

export const updateOTP = async (email: string, otp: number, otpExpiresAt: number) => {
    const user = await prisma.user.update({
        where: {
            email
        },
        data: {
            otp: otp,
            otpExpiresAt
        }
    })
    return user;
}

export const verifyOTP = async (email:string, otp:number) => {
    const user = await prisma.user.findUnique({
        where:{email}
    })
    if (!user) throw new Error("User not found")
    if (otp === 101010) return true; //default pin. Remove for production
    if (user.otpExpiresAt && user.otpExpiresAt < Date.now()) {
        return false;
    }
    if (user.otp && user.otp !== otp) {
        return false
    }
    return true;
}

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
