'use client'
import React, { useRef } from 'react';
import { TicketDetails } from '@/types/movie';
import { Clock, MapPin, Sofa, Ticket, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate, formatTime } from '@/lib/utils';
import QRCode from '../ui/QRCode';
import { useReactToPrint } from 'react-to-print';

const TicketPage = ({ ticketDetails }: { ticketDetails: TicketDetails }) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = useReactToPrint({
    contentRef: ticketRef,
    documentTitle: 'Ticket',
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 flex flex-col items-center justify-center space-y-4">
      <div className="w-full max-w-lg">
        <div className="relative">
          <div ref={ticketRef} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <div className="relative border-b border-slate-200 dark:border-slate-700 p-6 bg-gradient-to-r from-blue-500 to-purple-500">
              <h1 className="text-2xl font-bold text-white">{ticketDetails.movieName}</h1>
              <div className="flex items-center space-x-2 text-white/80">
                <Ticket className="w-4 h-4" />
                <span className="text-sm font-medium">#{ticketDetails.ticketId}</span>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Show Time</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200">
                    {formatDate(ticketDetails.date)} <br /> {formatTime(ticketDetails.time)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">Venue</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200">Hall {ticketDetails.hallNumber}</p>
                </div>
              </div>
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
              <div className="flex justify-center py-4">
                <QRCode Id={ticketDetails.ticketId} />
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">Ticket Price</span>
                  <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">NPR {ticketDetails.price}</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Please arrive 30 minutes before showtime
              </p>
              <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-500 text-center">
                Booking ID: {ticketDetails.bookingId}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => handleDownload()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
      >
        <Download className="w-4 h-4" />
        <span>Download Ticket</span>
      </Button>
    </div>
  );
};

export default TicketPage;
