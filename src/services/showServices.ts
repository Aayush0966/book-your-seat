import {MovieDetails, Showtime, Status } from "@/types/movie";
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

        console.log('New shows created:', newShows);

        if (movieDetails.pricing && movieDetails.pricing.length > 0) {
            for (const priceGroup of movieDetails.pricing) {
            const show = newShows.find((show) => show.screenId === priceGroup.screenId);
            if (show) {
                console.log('Creating pricing for show:', show.id, 'with price group:', priceGroup);
                await showQueries.createPricing(show.id, priceGroup.screenId, priceGroup.prices);
            } else {
                console.log('No matching show found for screenId:', priceGroup.screenId);
            }
            }
        } else {
            console.log('No pricing details provided');
        }

        console.log('New movie created:', newMovie);
        return newMovie;
    } catch (error) {
        throw error;
    }
};

// export const fetchShows = async (status: Status) => {
//     try {
//         const shows = await showQueries.fetchShows(status);
//         if (!shows) return null;

//         const movieIds = [...new Set(shows.map((show) => show.movieId))];
//         const movies = await Promise.all(
//             movieIds.map(async (movieId) => await showQueries.fetchMoviesById(movieId))
//         );
//         if (!movies) return null;

//         const moviesWithShows = movies.map((movie) => {
//             const movieShows = shows.filter((show) => show.movieId === movie?.id);
//             return {
//             ...movie,
//             shows: movieShows,
//             };
//         });
//         return moviesWithShows;
//     } catch (error) {
//         console.error('Error fetching shows:', error);
//         throw error;
//     }
// };


export const fetchShowsByMovieId = async (movieId: number) => {
    try {
        const movie = await showQueries.fetchMovieById(movieId)
        if (!movie) return null;
        return movie
       
    } catch (error) {
        console.log("Something went wrong: ", error)
    }
}

export const fetchMoviesWithShows = async (status: Status) => {
    try {
        const movies = await showQueries.fetchMovies(status);
        if (!movies) return null;

        // const movieIds = movies.map((movie) => movie.id);
        // const shows = await Promise.all(
        //     movieIds.map(async (movieId) => await showQueries.fetchShows(movieId))
        // ).then(results => results.flat());

        // if (!shows) return null;

        // const moviesWithShows = movies.map((movie) => {
        //     const movieShows = shows.filter((show) => show?.movieId === movie.id);
        //     return {
        //         ...movie,
        //         shows: movieShows,
        //     };
        // });
        return movies;
    } catch (error) {
        console.error('Error fetching movies with shows:', error);
        throw error;
    }
};