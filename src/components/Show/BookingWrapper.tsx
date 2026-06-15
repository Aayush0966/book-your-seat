'use client'
import React from 'react';

import { MovieWithShows } from '@/types/movie';
import BookingHall from '../Booking/BookingHall';
import Payment from '../Booking/Payment';
import DateSelection from '../Booking/DateSelection';
import { useBooking } from '@/context/bookingContext';
import { motion } from 'framer-motion';

interface BookingWrapperProps {
  movie: MovieWithShows;
}

const BookingWrapper: React.FC<BookingWrapperProps> = ({ movie }) => {
  const { step } = useBooking();

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-8 px-3 sm:px-4 md:px-6 lg:px-8"
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