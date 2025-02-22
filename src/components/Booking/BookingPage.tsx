import React from 'react';
import { BookingDetails } from '@/types/movie';
import Link from 'next/link';
import { Calendar, MapPin, Ticket, CreditCard } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';

const BookingPage = ({ bookingDetails }: { bookingDetails: BookingDetails }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 flex w-full items-center">
      <div className="max-w-screen-2xl w-full mx-auto space-y-5">
        {/* Booking Header */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="border-b border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {bookingDetails.movieName}
                </h1>
                <div className="mt-1 flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <Ticket className="w-4 h-4" />
                  <span className="text-sm font-medium">Booking #{bookingDetails.id}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Show Details</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200">
                  {formatDate(bookingDetails.showDate)}
                  <br />
                  {formatTime(bookingDetails.time)}
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Venue</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200">
                  Hall {bookingDetails.hallNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Tickets</h2>
          <div className="space-y-4">
            {bookingDetails.tickets.map((ticket) => (
              <Link
                href={`/ticket/${ticket.ticketId}`}
                key={ticket.ticketId}
                className="block"
              >
                <div className="group relative border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-md p-2">
                        <Ticket className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          Ticket #{ticket.ticketId.slice(-6)}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {ticket.seatCategory} - {ticket.seatNumber}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        NPR {ticket.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="font-medium text-slate-900 dark:text-slate-100">
                Payment Summary
              </span>
            </div>
            <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              ₹{bookingDetails.totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;