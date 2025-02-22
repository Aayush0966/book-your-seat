import React from 'react';
import { TicketDetails } from '@/types/movie';
import { Clock, MapPin, Sofa, Ticket } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';

const TicketPage = ({ ticketDetails }: { ticketDetails: TicketDetails }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="relative">
          {/* Main Ticket Container */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Ticket Header */}
            <div className="border-b border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {ticketDetails.movieName}
                </h1>
              </div>
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <Ticket className="w-4 h-4" />
                <span className="text-sm font-medium">#{ticketDetails.ticketId}</span>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-6 space-y-6">
              {/* Date and Hall Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Show Time</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200">
                    {formatDate(ticketDetails.date)}
                    <br />
                    {formatTime(ticketDetails.time)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">Venue</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200">
                    Hall {ticketDetails.hallNumber}
                  </p>
                </div>
              </div>

              {/* Seat Details */}
              <div>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-2">
                  <Sofa className="w-4 h-4" />
                  <span className="font-medium">Seat Details</span>
                </div>
                <div className="inline-block bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-md">
                  <span className="text-slate-700 dark:text-slate-200">
                    {ticketDetails.seatCategory} - {ticketDetails.seatNumber}
                  </span>
                </div>
              </div>

              {/* Price Information */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    Ticket Price
                  </span>
                  <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    NPR {ticketDetails.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4">
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Please arrive 30 minutes before showtime
                </p>
                <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-500">
                  Booking ID: {ticketDetails.bookingId}
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Edge Decorations */}
          <div className="absolute -left-2 top-1/2 w-4 h-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full transform -translate-y-1/2" />
          <div className="absolute -right-2 top-1/2 w-4 h-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full transform -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

export default TicketPage;