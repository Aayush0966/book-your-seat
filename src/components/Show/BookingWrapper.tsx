'use client'
import React, { useEffect } from 'react';

import { MovieWithShows } from '@/types/movie';
import BookingHall from '../Booking/BookingHall';
import Payment from '../Booking/Payment';
import DateSelection from '../Booking/DateSelection';
import { useBooking } from '@/context/bookingContext';

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
    <div 
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
    </div>
  );
};

export default BookingWrapper;