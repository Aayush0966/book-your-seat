import {  MovieDetails, Pricing, Showtime } from "@/types/movie";
import prisma from "@/lib/prisma"; 
import { Prisma } from "@prisma/client";

export const createMovie = async (movieDetails: MovieDetails) => {
    const movieData = {
        title: movieDetails.title,
        description: movieDetails.description,
        director: movieDetails.director,
        posterUrl: movieDetails.posterUrl,
        ageRating: movieDetails.ageRating,
        genres: movieDetails.genres as unknown as Prisma.InputJsonValue,
        casts: movieDetails.cast as unknown as Prisma.InputJsonValue,
        language: movieDetails.language,
        duration: movieDetails.duration,
        releaseDate: movieDetails.releaseDate,
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

export const createShow = async (movieId: number, showtime: Showtime, showStartDate: number, showEndDate: number) => {
    try {
        if (!movieId || !showtime.screenId || !showtime.showTime || !showStartDate || !showEndDate) {
            throw new Error('Missing required fields for show creation');
        }

        const showData = {
            movieId,
            screenId: showtime.screenId,
            showTime: showtime.showTime ,
            startDate: showStartDate ,
            endDate: showEndDate,
        };


        const createdShow = await prisma.show.create({
            data: showData
        });
        return createdShow;

    } catch (error) {
        console.error("Error in createShow:", error);
        throw error;
    }
};

export const createPricing = async (showId: number, screenId: number, prices: Pricing) => {
    await Promise.all(
        Object.entries(prices).map(([seatType, price]) =>
            prisma.price.create({
                data: {
                    showId,
                    screenId,
                    seatType,
                    price: Number(price),
                },
            })
        )
    );
};