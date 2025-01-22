import {MovieDetails, Showtime } from "@/types/movie";
import * as showQueries from "@/database/shows/queries"


export const addMovieAndShow = async (movieDetails: MovieDetails) => {
    try {
        if (!movieDetails) {
            throw new Error('Movie details are required');
        }

        const newMovie = await showQueries.createMovie(movieDetails);

        if (!movieDetails.showtimes || movieDetails.showtimes.length === 0) {
            throw new Error('At least one showtime is required');
        }

        const newShows = await Promise.all(
            movieDetails.showtimes.map(async (showtime: Showtime) => {
                if (!showtime.screenId || !showtime.showTime) {
                    throw new Error('Invalid showtime data');
                }

                const newShow = await showQueries.createShow(
                    newMovie.id,
                    showtime,
                    movieDetails.showStartDate,
                    movieDetails.showEndDate
                );
                return newShow;
            })
        );

        if (movieDetails.pricing && movieDetails.pricing.length > 0) {
            for (const priceGroup of movieDetails.pricing) {
                const show = newShows.find((show) => show.screenId === priceGroup.screenId);
                if (show) {
                    await showQueries.createPricing(show.id, priceGroup.screenId, priceGroup.prices);
                }
            }
        }

        return newMovie;
    } catch (error) {
        throw error;
    }
};

export const fetchNowShowingShows = async () => {
    const shows = await showQueries.fetchShows('ACTIVE');
    if (!shows) return null;
    const moviesIds = shows.map((show) => show.movieId)
    const movies = await Promise.all(moviesIds.map(async (movieId) => {
        return await showQueries.fetchMoviesById(movieId);
    }));
    if (!movies) return null
    const showsWithMovies = shows.map((show) => {
        const movie = movies.find((movie) => movie?.id === show.movieId);
        return {
            ...show,
            movie,
        }
    })
    return showsWithMovies;
}