'use client'
import React, { useEffect, useState } from 'react';

import { MovieWithShows } from '@/types/movie';
import BookingHall from '../Booking/BookingHall';
import Payment from '../Booking/Payment';
import DateSelection from '../Booking/DateSelection';
import { useBooking } from '@/context/bookingContext';
import LoadingSpinner from '../ui/loading-spinner';
import { motion } from 'framer-motion';

interface BookingWrapperProps {
  movie: MovieWithShows;
}

const BookingWrapper: React.FC<BookingWrapperProps> = ({ movie }) => {
  const { step } = useBooking();
  const [isInitializing, setIsInitializing] = useState(true);
  
  useEffect(() => {
    // Simulate initialization time for smooth transition from loading page
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  
  const renderStep = () => {
    switch (step) {
      case 'DateBook':
        return <DateSelection movie={movie} />;
      case 'SeatBook':
        return <BookingHall movie={movie} />;
      case 'Payment':
        return <Payment movie={movie} />;
      default:
        return null;
    }
  };

  if (isInitializing) {
    return (
      <div 
        className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${movie.backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backdropFilter: 'blur(10px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl animate-pulse"></div>
            <div className="relative p-6 bg-white/10 backdrop-blur-sm rounded-full">
              <LoadingSpinner size="lg" className="text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
            <p className="text-white/80">Setting up your booking experience...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-8 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${movie.backdropUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backdropFilter: 'blur(10px)',
      }}
    >
      {renderStep()}
    </motion.div>
  );
};

export default BookingWrapper;