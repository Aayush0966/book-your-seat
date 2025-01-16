import {MovieDetails, Showtime } from "@/types/movie";
import * as showQueries from "@/database/shows/queries"


export const addMovieAndShow = async (movieDetails: MovieDetails) => {
    try {
        if (!movieDetails) {
            throw new Error('Movie details are required');
        }

        console.debug("Starting addMovieAndShow with movieDetails:", movieDetails);

        const newMovie = await showQueries.createMovie(movieDetails);
        console.debug("Created new movie:", newMovie);

        if (!movieDetails.showtimes || movieDetails.showtimes.length === 0) {
            throw new Error('At least one showtime is required');
        }

        const newShows = await Promise.all(
            movieDetails.showtimes.map(async (showtime: Showtime) => {
                if (!showtime.screenId || !showtime.showTime) {
                    throw new Error('Invalid showtime data');
                }

                console.debug("Processing showtime:", showtime);
                const newShow = await showQueries.createShow(
                    newMovie.id,
                    showtime,
                    movieDetails.showStartDate,
                    movieDetails.showEndDate
                );
                console.debug("Created new show:", newShow);
                return newShow;
            })
        );

        if (movieDetails.pricing && movieDetails.pricing.length > 0) {
            for (const priceGroup of movieDetails.pricing) {
                console.debug("Processing price group:", priceGroup);

                const show = newShows.find((show) => show.screenId === priceGroup.screenId);
                if (show) {
                    await showQueries.createPricing(show.id, priceGroup.screenId, priceGroup.prices);
                    console.debug("Created pricing for show:", show.id);
                }
            }
        }

        console.debug("Successfully added movie and shows:", newMovie);
        return newMovie;
    } catch (error) {
        console.error("Error adding movie and show:", error);
        throw error;
    }
};