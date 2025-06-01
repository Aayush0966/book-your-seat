'use client'
import React, { useRef, useState, useEffect } from 'react';
import { BookingDetails } from '@/types/movie';
import { Calendar, MapPin, Ticket, CreditCard, Download, Check, Clock, Share2, ChevronDown, AlertTriangle, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate, formatTime, isBookingExpired } from '@/lib/utils';
import QRCode from '../ui/QRCode';
import { useReactToPrint } from 'react-to-print';
import Link from 'next/link';
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import axios from 'axios';

const BookingPage = ({ bookingDetails }: { bookingDetails: BookingDetails }) => {
  const bookingRef = useRef<HTMLDivElement>(null);
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [isTicketsExpanded, setIsTicketsExpanded] = useState(true);
  const [ticketsSubtotal, setTicketsSubtotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [currentBookingStatus, setCurrentBookingStatus] = useState(bookingDetails.bookingStatus);
  const [showExpirationAlert, setShowExpirationAlert] = useState(false);
  
  // Calculate subtotal and discount on component mount
  useEffect(() => {
    const subtotal = bookingDetails.tickets.reduce((sum, ticket) => sum + ticket.price, 0);
    const discount = subtotal - bookingDetails.totalPrice;
    const percentage = subtotal > 0 ? Math.round((discount / subtotal) * 100) : 0;
    
    setTicketsSubtotal(subtotal);
    setDiscountAmount(discount);
    setDiscountPercentage(percentage);
  }, [bookingDetails]);

  // Check for expired bookings when component mounts
  useEffect(() => {
    const checkExpiredBookings = async () => {
      try {
        // Check if this booking was originally pending and might have expired
        const originalStatus = bookingDetails.bookingStatus;
        
        if (isBookingExpired(bookingDetails.bookingDate, originalStatus)) {
          // This booking should be expired, trigger cleanup
          await axios.post('/api/cleanup-expired-bookings');
          setCurrentBookingStatus('CANCELLED');
          setShowExpirationAlert(true);
          
          // Hide the alert after 10 seconds
          setTimeout(() => setShowExpirationAlert(false), 10000);
        }
      } catch (error) {
        console.error('Error checking expired bookings:', error);
      }
    };

    checkExpiredBookings();
  }, [bookingDetails.bookingStatus, bookingDetails.bookingDate]);
  
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

  // Status configuration for different booking statuses
  const statusConfig = {
    PENDING: {
      color: 'yellow',
      buttonColor: 'yellow-600',
      hoverButtonColor: 'yellow-700',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
      text: 'Pending',
      description: 'Your booking is being processed',
      headerBg: 'bg-yellow-100 dark:bg-yellow-900'
    },
    CONFIRMED: {
      color: 'green',
      buttonColor: 'green-600',
      hoverButtonColor: 'green-700',
      icon: <Check className="w-5 h-5 text-green-600 dark:text-green-400" />,
      text: 'Confirmed',
      description: 'Your booking is confirmed',
      headerBg: 'bg-green-100 dark:bg-green-900'
    },
    CANCELLED: {
      color: 'red',
      buttonColor: 'red-600',
      hoverButtonColor: 'red-700',
      icon: <X className="w-5 h-5 text-red-600 dark:text-red-400" />,
      text: 'Cancelled',
      description: 'This booking has been cancelled',
      headerBg: 'bg-red-100 dark:bg-red-900'
    }
  };

  const status = currentBookingStatus || 'CONFIRMED';
  const currentStatus = statusConfig[status as keyof typeof statusConfig];
 
  return (
    <div className="min-h-screen mt-16 sm:mt-20 flex flex-col items-center justify-center w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4">
      {showShareAlert && (
        <Alert className="fixed top-4 right-4 w-auto max-w-xs sm:max-w-sm bg-white dark:bg-gray-800 shadow-lg print:hidden z-50">
          <AlertDescription className="text-sm">
            Booking details copied to clipboard!
          </AlertDescription>
        </Alert>
      )}
      {showExpirationAlert && (
        <Alert className="fixed top-4 left-4 w-auto max-w-xs sm:max-w-md bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800 shadow-lg print:hidden z-50">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200 text-sm">
            This booking has been automatically cancelled because payment was not completed within 30 minutes.
          </AlertDescription>
        </Alert>
      )}
      <div className="max-w-3xl w-full space-y-2 sm:space-y-3">
        <div className="flex gap-2 print:hidden mb-2">
          <Button
            onClick={() => handleDownload()}
            className={`flex-1 bg-${currentStatus.buttonColor} hover:bg-${currentStatus.hoverButtonColor} text-white flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-all duration-200 hover:shadow-lg text-sm sm:text-base ${status === 'CANCELLED' ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={status === 'CANCELLED'}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">Download</span>
          </Button>
        </div>
        <div 
          ref={bookingRef} 
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 space-y-3 sm:space-y-4 transition-all duration-200 hover:shadow-xl ${status === 'CANCELLED' ? 'opacity-80' : ''}`}
        >
          <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-3">
            <div className={`inline-flex items-center justify-center ${currentStatus.headerBg} rounded-full p-1 mb-2`}>
              {currentStatus.icon}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{bookingDetails.movieName}</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
              <span className={`px-2 py-0.5 bg-${currentStatus.color}-100 dark:bg-${currentStatus.color}-900/50 text-${currentStatus.color}-700 dark:text-${currentStatus.color}-400 rounded-full text-sm font-medium`}>
                {currentStatus.text}
              </span>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">
                Booking #{bookingDetails.id}
              </span>
            </div>
            {status !== 'CONFIRMED' && (
              <p className={`mt-2 text-sm text-${currentStatus.color}-600 dark:text-${currentStatus.color}-400`}>
                {currentStatus.description}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3">
            <div className="text-center">
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                <span className="font-medium text-sm sm:text-base">Date</span>
                <p className="mt-0.5 text-sm sm:text-base">{formatDate(bookingDetails.showDate)}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                <span className="font-medium text-sm sm:text-base">Time</span>
                <p className="mt-0.5 text-sm sm:text-base">{formatTime(bookingDetails.time)}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                <span className="font-medium text-sm sm:text-base">Venue</span>
                <p className="mt-0.5 text-sm sm:text-base">Hall {bookingDetails.hallNumber}</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base sm:text-lg font-semibold">Tickets</h3>
              <button 
                onClick={() => setIsTicketsExpanded(!isTicketsExpanded)}
                className="print:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isTicketsExpanded ? 'transform rotate-180' : ''}`} />
              </button>
            </div>
            
            {isTicketsExpanded && (
              <div className="space-y-2">
                {bookingDetails.tickets.map((ticket) => (
                  <Link 
                    href={`/ticket/${ticket.ticketId}`} 
                    key={ticket.ticketId} 
                    className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 space-y-1 sm:space-y-0 ${status === 'CANCELLED' ? 'pointer-events-none' : ''}`}
                  >
                    <div>
                      <p className="font-medium text-sm sm:text-base">{ticket.seatCategory} - Seat {ticket.seatNumber}</p>
                      <p className="text-xs text-gray-500">ID: {ticket.ticketId.slice(-6)}</p>
                    </div>
                    <p className="font-semibold text-sm sm:text-base self-start sm:self-auto">NPR {ticket.price.toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {status !== 'CANCELLED' && (
            <div className="flex justify-center py-3">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-2 sm:p-3 rounded-lg">
                {bookingDetails.id && <QRCode Id={bookingDetails.id} />}
              </div>
            </div>
          )}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2 sm:space-y-3">
            {/* Subtotal section */}
            <div className="flex justify-between items-center p-2">
              <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Subtotal</span>
              <span className="font-medium text-sm sm:text-base">NPR {ticketsSubtotal.toLocaleString()}</span>
            </div>
            
            {/* Discount section - only show if there is a discount */}
            {discountAmount > 0 && (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg space-y-1 sm:space-y-0">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mr-2" />
                  <span className="font-medium text-indigo-600 dark:text-indigo-400 text-sm sm:text-base">
                    Discount Applied {discountPercentage > 0 && `(${discountPercentage}%)`}
                  </span>
                </div>
                <span className="font-medium text-indigo-600 dark:text-indigo-400 text-sm sm:text-base self-start sm:self-auto">
                  - NPR {discountAmount.toLocaleString()}
                </span>
              </div>
            )}
            
            {/* Total section */}
            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center bg-${currentStatus.color}-50 dark:bg-${currentStatus.color}-900/30 p-3 rounded-lg space-y-1 sm:space-y-0`}>
              <div className="flex items-center">
                <CreditCard className={`w-4 h-4 sm:w-5 sm:h-5 text-${currentStatus.color}-600 dark:text-${currentStatus.color}-400 mr-2`} />
                <span className="font-medium text-sm sm:text-base">Total Amount Paid</span>
              </div>
              <span className={`text-lg sm:text-xl font-bold text-${currentStatus.color}-600 dark:text-${currentStatus.color}-400 self-start sm:self-auto`}>
                NPR {bookingDetails.totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2 text-sm">
            {status === 'CONFIRMED' && (
              <>
                <p className="flex items-start sm:items-center text-gray-600 dark:text-gray-300">
                  <Clock className="w-4 h-4 mr-2 mt-0.5 sm:mt-0 flex-shrink-0" />
                  <span>Please arrive 30 minutes before show time</span>
                </p>
                <p className="flex items-start sm:items-center text-gray-600 dark:text-gray-300">
                  <Ticket className="w-4 h-4 mr-2 mt-0.5 sm:mt-0 flex-shrink-0" />
                  <span>Present this confirmation at the counter</span>
                </p>
                <p className="flex items-start sm:items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-4 h-4 mr-2 mt-0.5 sm:mt-0 flex-shrink-0" />
                  <span>Confirmation sent to your email</span>
                </p>
              </>
            )}
            {status === 'PENDING' && (
              <p className="flex items-start sm:items-center text-yellow-600 dark:text-yellow-400">
                <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 sm:mt-0 flex-shrink-0" />
                <span>Your payment is being processed. We'll email you once confirmed.</span>
              </p>
            )}
            {status === 'CANCELLED' && (
              <p className="flex items-start sm:items-center text-red-600 dark:text-red-400">
                <X className="w-4 h-4 mr-2 mt-0.5 sm:mt-0 flex-shrink-0" />
                <span>This booking has been cancelled. Please contact support for assistance.</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;