'use server'
import { fetchBookings as getFetchBookings, fetchMovies as getFetchMovies } from "@/database/shows/queries";

export const fetchMovies = async () => {
    const movies = await getFetchMovies();
    return movies ? movies : null;
}

export const fetchBookings = async () => {
    const bookings = await getFetchBookings();
    return bookings ?? null;
}