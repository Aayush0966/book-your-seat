import {Booking, BookingRequest, MovieDetails, Showtime, Status } from "@/types/movie";
import * as showQueries from "@/database/shows/queries"
import { auth } from "@/auth";


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
                    movieDetails.pricing,
                    showtime,
                    movieDetails.showStartDate,
                    movieDetails.showEndDate
                );
                return newShow;
            })
        );

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
        const movie = await showQueries.fetchMovieWithShowsById(movieId)
        if (!movie) return null;
        return movie
    } catch (error) {
        console.log("Something went wrong: ", error)
    }
}



export const fetchMovies = async (status: Status) => {
    try {
        const movies = await showQueries.fetchMoviesByStatus(status);
        if (!movies) return null;
        return movies;
    } catch (error) {
        console.error('Error fetching movies with shows:', error);
        throw error;
    }
};

export const bookShow = async (bookingDetails: BookingRequest) => {
    const session = await auth();
    const seatsCount = bookingDetails.seatsBooked.length;
    const bookingDetail:Booking = {
        ...bookingDetails,
        userId: session?.user?.id ? parseInt(session.user.id) : 0,
        bookingStatus: "CONFIRMED",
        seatsCount,
    }
    const newBooking = await showQueries.createBooking(bookingDetail)
    return newBooking ?? null;
}