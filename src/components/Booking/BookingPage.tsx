'use client'
import React, { useRef, useState } from 'react';
import { BookingDetails } from '@/types/movie';
import { Calendar, MapPin, Ticket, CreditCard, Download, Check, Clock, Share2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate, formatTime } from '@/lib/utils';
import QRCode from '../ui/QRCode';
import { useReactToPrint } from 'react-to-print';
import Link from 'next/link';
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

const BookingPage = ({ bookingDetails }: { bookingDetails: BookingDetails }) => {
  const bookingRef = useRef<HTMLDivElement>(null);
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [isTicketsExpanded, setIsTicketsExpanded] = useState(true);

  const handleDownload = useReactToPrint({
    contentRef: bookingRef,
    documentTitle: 'Movie Ticket',
    pageStyle: `
      @page { 
        size: A4;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `
  });

 

  return (
    <div className="min-h-screen mt-20 flex flex-col items-center justify-center w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      {showShareAlert && (
        <Alert className="fixed top-4 right-4 w-auto bg-white dark:bg-gray-800 shadow-lg print:hidden">
          <AlertDescription>
            Booking details copied to clipboard!
          </AlertDescription>
        </Alert>
      )}

      <div className="max-w-3xl w-full space-y-2">
        <div className="flex gap-2 print:hidden mb-2">
          <Button
            onClick={() => handleDownload()}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </Button>
          

        </div>

        <div 
          ref={bookingRef} 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-4 transition-all duration-200 hover:shadow-xl"
        >
          <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-3">
            <div className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full p-1 mb-2">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{bookingDetails.movieName}</h2>
            <div className="flex items-center justify-center space-x-2">
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">
                Booking #{bookingDetails.id}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3">
            <div className="text-center">
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-5 h-5 mb-1" />
                <span className="font-medium">Date</span>
                <p className="mt-0.5">{formatDate(bookingDetails.showDate)}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                <Clock className="w-5 h-5 mb-1" />
                <span className="font-medium">Time</span>
                <p className="mt-0.5">{formatTime(bookingDetails.time)}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 mb-1" />
                <span className="font-medium">Theater</span>
                <p className="mt-0.5">Auditorium {bookingDetails.hallNumber}</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Tickets</h3>
              <button 
                onClick={() => setIsTicketsExpanded(!isTicketsExpanded)}
                className="print:hidden"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isTicketsExpanded ? 'transform rotate-180' : ''}`} />
              </button>
            </div>
            
            <div className="space-y-2">
              {bookingDetails.tickets.map((ticket) => (
                <Link 
                  href={`/ticket/${ticket.ticketId}`} 
                  key={ticket.ticketId} 
                  className="flex justify-between items-center p-2 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium">{ticket.seatCategory} - Seat {ticket.seatNumber}</p>
                    <p className="text-xs text-gray-500">ID: {ticket.ticketId.slice(-6)}</p>
                  </div>
                  <p className="font-semibold">NPR {ticket.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center py-3">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              {bookingDetails.id && <QRCode Id={bookingDetails.id} />}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="font-medium">Total Amount Paid</span>
              </div>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                NPR {bookingDetails.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-1 text-sm">
            <p className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 mr-2" />
              Please arrive 30 minutes before show time
            </p>
            <p className="flex items-center text-gray-600 dark:text-gray-300">
              <Ticket className="w-4 h-4 mr-2" />
              Present this confirmation at the counter
            </p>
            <p className="flex items-center text-gray-600 dark:text-gray-300">
              <Check className="w-4 h-4 mr-2" />
              Confirmation sent to your email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;