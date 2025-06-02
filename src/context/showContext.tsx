'use client'
import { fetchBookings, fetchMovies, fetchShows, fetchUsers } from '@/components/admin/Dashboard/action';
import { Booking, Movie, Show } from '@/types/movie';
import { UserType } from '@/types/user';
import React, { createContext, useState, ReactNode, useContext, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

interface ShowContextProps {
    bookings: Booking[] | null;
    shows: Show[] | null;
    movies: Movie[] | null;
    users: UserType[] | null;
    isLoading: boolean;
    error: string | null;
    isRefetching: boolean;
    refetchData: () => Promise<void>;
    refetchAll: () => Promise<void>;
}

const ShowContext = createContext<ShowContextProps | undefined>(undefined);

export const ShowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [bookings, setBookings] = useState<Booking[] | null>(null);
    const [shows, setShows] = useState<Show[] | null>(null);
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [users, setUsers] = useState<UserType[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRefetching, setIsRefetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllData = useCallback(async (showToast: boolean = false) => {
        const isInitialLoad = isLoading;
        
        if (isInitialLoad) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }
        
        setError(null);
        
        try {
            const [moviesData, usersData, bookingsData, showsData] = await Promise.all([
                fetchMovies(),
                fetchUsers(),
                fetchBookings(),
                fetchShows()
            ]);
            
            setMovies(moviesData);
            setUsers(usersData);
            setBookings(bookingsData);
            setShows(showsData);
            
            if (showToast && !isInitialLoad) {
                toast.success('Data refreshed successfully!');
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            const errorMessage = 'Failed to load data. Please try again.';
            setError(errorMessage);
            
            if (showToast && !isInitialLoad) {
                toast.error('Failed to refresh data');
            }
        } finally {
            setIsLoading(false);
            setIsRefetching(false);
        }
    }, [isLoading]);

    // Optimized refetch function for when data updates occur
    const refetchAll = useCallback(async () => {
        await fetchAllData(true);
    }, [fetchAllData]);

    // Silent refetch for backward compatibility
    const refetchData = useCallback(async () => {
        await fetchAllData(false);
    }, [fetchAllData]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    return (
        <ShowContext.Provider value={{ 
            movies, 
            shows, 
            bookings, 
            users, 
            isLoading, 
            isRefetching,
            error, 
            refetchData,
            refetchAll 
        }}>
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