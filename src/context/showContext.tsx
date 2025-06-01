'use client'
import { fetchBookings, fetchMovies, fetchShows, fetchUsers } from '@/components/admin/Dashboard/action';
import { Booking, Movie, Show } from '@/types/movie';
import { UserType } from '@/types/user';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface ShowContextProps {
    bookings: Booking[] | null;
    shows: Show[] | null;
    movies: Movie[] | null;
    users: UserType[] | null;
    isLoading: boolean;
    error: string | null;
    refetchData: () => Promise<void>;
}

const ShowContext = createContext<ShowContextProps | undefined>(undefined);

export const ShowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [bookings, setBookings] = useState<Booking[] | null>(null);
    const [shows, setShows] = useState<Show[] | null>(null);
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [users, setUsers] = useState<UserType[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [movies, users, bookings, shows] = await Promise.all([
                fetchMovies(),
                fetchUsers(),
                fetchBookings(),
                fetchShows()
            ]);
            setMovies(movies);
            setUsers(users);
            setBookings(bookings);
            setShows(shows);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setError('Failed to load data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <ShowContext.Provider value={{ movies, shows, bookings, users, isLoading, error, refetchData: fetchAllData }}>
            {children}
        </ShowContext.Provider>
    );
};

export const useShow = (): ShowContextProps => {
    const context = useContext(ShowContext);
    if (!context) {
        throw new Error('useShow must be used within a ShowProvider');
    }
    return context;
}; 