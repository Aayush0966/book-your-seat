'use server'
import * as showQueries from "@/database/shows/queries";

export const fetchMovies = async () => {
    const movies = await showQueries.fetchMovies();
    return movies ? movies : null;
}