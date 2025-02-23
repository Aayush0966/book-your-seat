import React from 'react';
import { Calendar, Clock, Film } from 'lucide-react';
import { Booking } from '@/types/movie';
import { formatDate, formatTime, SCREEN_TYPES } from '@/lib/utils';
import Link from 'next/link';

const BookingsTab = ({bookings}: {bookings: Booking[]}) => {
  return (
    <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
        Booking History
      </h2>
      <div className="space-y-4">
        {bookings.map(booking => (
          <Link
            href={`/booking/${booking.id}`}
            key={booking.id}
            className="block border-b border-background-secondary dark:border-dark-background last:border-0 pb-4 last:pb-0 
              hover:bg-gray-50 dark:hover:bg-dark-background/50 transition-colors duration-200 rounded-lg p-3
              relative group"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="group-hover:translate-x-1 transition-transform duration-200">
                <h3 className="font-bold text-dark-text dark:text-text">{booking.show?.movie?.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-text-secondary dark:text-dark-text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(booking.showDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {booking.show?.showTime ? formatTime(booking.show.showTime) : 'N/A'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Film className="w-4 h-4" />
                    {SCREEN_TYPES.find(screen => screen.screenId === booking.show?.screenId)?.type || ''}
                  </span>
                </div>
              </div>
              <div className="text-right group-hover:translate-x-[-4px] transition-transform duration-200">
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  booking.bookingStatus === 'CONFIRMED'
                    ? 'bg-success/10 text-success'
                    : 'bg-warning/10 text-warning'
                }`}>
                  {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                </span>
                <p className="mt-2 text-primary font-bold">NPR {booking.totalPrice}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookingsTab;