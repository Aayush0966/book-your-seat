import { MovieWithShows, MovieDetails, Pricing, Showtime, Status, Price } from "@/types/movie";
import prisma from "@/lib/prisma"; 
import { Prisma } from "@prisma/client";

export const createMovie = async (movieDetails: MovieDetails) => {
    const movieData = {
        title: movieDetails.title,
        description: movieDetails.description,
        director: movieDetails.director,
        posterUrl: movieDetails.posterUrl,
        ageRating: movieDetails.ageRating,
        backdropUrl: movieDetails.backdropUrl,
        genres: movieDetails.genres as unknown as Prisma.InputJsonValue,
        casts: movieDetails.cast as unknown as Prisma.InputJsonValue,
        language: movieDetails.language,
        duration: movieDetails.duration,
        releaseDate: movieDetails.releaseDate,
        status: movieDetails.status
    };

    return await prisma.movie.create({ data: movieData });
};

export const checkExistingShow = async (screenId: number, showTime: number) => {
    return await prisma.show.findFirst({
        where: {
            screenId,
            AND: [
                { showTime: { lte: showTime } },
                { endDate: { gte: showTime } },
            ],
        },
    });
};

export const createShow = async (movieId: number, prices: Price[], showtime: Showtime, showStartDate: number, showEndDate: number) => {
    try {
        console.log('createShow called with:', { movieId, prices, showtime, showStartDate, showEndDate });

        if (!movieId || !showtime.screenId || !showtime.showTime || !showStartDate || !showEndDate) {
            throw new Error('Missing required fields for show creation');
        }

        const showData = {
            movieId,
            screenId: showtime.screenId,
            showTime: showtime.showTime,
            startDate: showStartDate,
            endDate: showEndDate,
            pricing: prices as unknown as Prisma.InputJsonValue
        };

        console.log('showData:', showData);

        const createdShow = await prisma.show.create({
            data: showData
        });

        console.log('createdShow:', createdShow);

        return createdShow;

    } catch (error) {
        console.error("Error in createShow:", error);
        throw error;
    }
};

export const fetchShows = async (movieId: number) => {
    const shows = await prisma.show.findMany({
        where: {
            movieId
        }
    });
    return shows ? shows : null;
}

export const fetchMoviesByStatus = async (status: Status) => {
    const movie = await prisma.movie.findMany({
        where: {
            status: status
        },
        
    })
    return movie ? movie: null
}

export const fetchMovies = async () => {
    const movies = await prisma.movie.findMany();
    return movies ? movies : null;
}

export const fetchMovieById = async (movieId: number): Promise<MovieWithShows | null> => {
    const movie = await prisma.movie.findFirst({
        where: {
            id: movieId
        },
        include: {
            shows: {
                include: {
                    bookings: true,
                    screen: true,
                },
            },
        },
    });

    return movie ? (movie as MovieWithShows) : null;
}