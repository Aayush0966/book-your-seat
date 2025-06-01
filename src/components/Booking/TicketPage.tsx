'use client'
import React, { useRef } from 'react';
import { TicketDetails } from '@/types/movie';
import { Clock, MapPin, Sofa, Ticket, Download, Check, AlertTriangle, X, CheckCircle } from 'lucide-react';
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

  // Define status configurations
  const statusConfig = {
    PENDING: {
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-orange-500',
      icon: <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-200" />,
      text: 'Pending',
      description: 'Payment being processed',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
      note: 'This ticket is pending payment confirmation. Please check your email for updates.'
    },
    VALID: {
      color: 'blue',
      bgGradient: 'from-blue-500 to-purple-500',
      icon: <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-200" />,
      text: 'Valid',
      description: 'Ready for use',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      note: 'Please arrive 30 minutes before showtime'
    },
    USED: {
      color: 'green',
      bgGradient: 'from-green-500 to-teal-500',
      icon: <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-200" />,
      text: 'Used',
      description: 'Ticket has been used',
      buttonColor: 'bg-green-500 hover:bg-green-600',
      note: 'This ticket has already been used. Keep for your records.'
    },
    CANCELLED: {
      color: 'red',
      bgGradient: 'from-red-500 to-pink-500',
      icon: <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-200" />,
      text: 'Cancelled',
      description: 'Ticket is cancelled',
      buttonColor: 'bg-slate-500 hover:bg-slate-600',
      note: 'This ticket has been cancelled. Please contact customer support for assistance.'
    }
  };

  // Default to VALID if status not provided
  const status = ticketDetails.status || 'VALID';
  const currentStatus = statusConfig[status as keyof typeof statusConfig];

  const getWatermarkStyles = () => {
    if (status === 'USED') {
      return 'after:content-["USED"] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-2xl sm:after:text-4xl md:after:text-6xl after:font-bold after:text-green-800/20 after:rotate-[-30deg] after:pointer-events-none';
    } else if (status === 'CANCELLED') {
      return 'after:content-["CANCELLED"] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-xl sm:after:text-3xl md:after:text-6xl after:font-bold after:text-red-800/20 after:rotate-[-30deg] after:pointer-events-none';
    }
    return '';
  };

  return (
    <div className="min-h-screen mt-6 sm:mt-8 md:mt-10 bg-slate-50 dark:bg-slate-900 p-2 sm:p-3 md:p-6 flex flex-col items-center justify-center space-y-2 sm:space-y-3 md:space-y-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg">
        <div className="relative">
          <div 
            ref={ticketRef} 
            className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-3 sm:p-4 md:p-6 relative ${getWatermarkStyles()} ${status === 'CANCELLED' ? 'opacity-75' : ''}`}
          >
            <div className={`relative border-b border-slate-200 dark:border-slate-700 p-3 sm:p-4 md:p-6 bg-gradient-to-r ${currentStatus.bgGradient}`}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
                <h1 className="text-base sm:text-lg md:text-2xl font-bold text-white pr-2">{ticketDetails.movieName}</h1>
                <div className="flex items-center justify-center rounded-full bg-white/20 p-1 self-start">
                  {currentStatus.icon}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-white/80">
                <Ticket className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                <span className="text-xs sm:text-sm font-medium">#{ticketDetails.ticketId}</span>
              </div>
              
              <div className="mt-2 inline-block px-2 py-1 rounded-md bg-white/20 text-white text-xs sm:text-sm font-medium">
                {currentStatus.text}
              </div>
            </div>
            
            <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-2">
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                    <span className="font-medium text-xs sm:text-sm md:text-base">Show Time</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm md:text-base">
                    {formatDate(ticketDetails.date)} <br /> {formatTime(ticketDetails.time)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-2">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                    <span className="font-medium text-xs sm:text-sm md:text-base">Venue</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm md:text-base">Hall {ticketDetails.hallNumber}</p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 mb-2">
                  <Sofa className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  <span className="font-medium text-xs sm:text-sm md:text-base">Seat Details</span>
                </div>
                <div className="inline-block bg-slate-100 dark:bg-slate-700 px-2 sm:px-3 md:px-4 py-2 rounded-md">
                  <span className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm md:text-base">
                    {ticketDetails.seatCategory} - {ticketDetails.seatNumber}
                  </span>
                </div>
              </div>
              
              {(status !== 'CANCELLED') && (
                <div className="flex justify-center py-2 sm:py-3 md:py-4">
                  <div className="scale-50 sm:scale-75 md:scale-100">
                    <QRCode Id={ticketDetails.ticketId} />
                  </div>
                </div>
              )}
              
              <div className={`border-t border-slate-200 dark:border-slate-700 pt-3 sm:pt-4 ${status === 'CANCELLED' ? 'opacity-50' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                  <span className="text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm md:text-base">Ticket Price</span>
                  <span className={`text-base sm:text-lg md:text-xl font-semibold text-${currentStatus.color}-600 dark:text-${currentStatus.color}-400`}>
                    NPR {ticketDetails.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className={`bg-${currentStatus.color}-50 dark:bg-${currentStatus.color}-900/20 border-t border-slate-200 dark:border-slate-700 p-2 sm:p-3 md:p-4`}>
              <p className={`text-xs sm:text-sm text-${currentStatus.color}-600 dark:text-${currentStatus.color}-400 text-center leading-relaxed`}>
                {currentStatus.note}
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
        className={`${currentStatus.buttonColor} text-white px-3 sm:px-4 py-2 rounded-md flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm md:text-base active:scale-95 transition-transform touch-manipulation ${status === 'CANCELLED' ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={status === 'CANCELLED'}
      >
        <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Download Ticket</span>
        <span className="sm:hidden">Download</span>
      </Button>
    </div>
  );
};

export default TicketPage;