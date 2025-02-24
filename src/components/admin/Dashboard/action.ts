'use server'
import { fetchMoviesByStatus, getAllShows, fetchBookings as getFetchBookings, fetchMovies as getFetchMovies } from "@/database/shows/queries";
import { fetchAllUsers } from "@/database/user/queries";


export const fetchMovies = async () => {
    const movies = await getFetchMovies();
    return movies ? movies : null;
}

export const fetchBookings = async () => {
    const bookings = await getFetchBookings();
    return bookings ?? null;
}

export const fetchUpcomingMovies = async () => {
    const movies = await fetchMoviesByStatus('UPCOMING');
    return movies ?? null;
}

export const fetchUsers = async () => {
    const users = await fetchAllUsers();
    return users ?? null;
}

export const fetchShows = async () => {
    const shows = await getAllShows();
    return shows ?? null;
}

