'use client'
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { cn, formatTime } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SeatWithPrice, Show } from '@/types/movie';

interface DateRange {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
}

interface DateTimeSelectorProps {
  dateRange: DateRange[];
  availableShows: Show[];
  selectedDate: Date | null;
  selectedTime?: number;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: number) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  dateRange,
  availableShows,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}) => {

  const calculateAvailableSeats = (show: Show): number => {
    if (!selectedDate) return show.screen?.totalSeats || 0;
    
    const totalSeats = show.screen?.totalSeats || 0;
    const selectedDateTimestamp = Math.floor(selectedDate.getTime() / 1000);
    
    // Filter out cancelled bookings when calculating booked seats
    const bookedSeats = show.bookings?.reduce((acc, booking) => {
      // Only count bookings that are not cancelled
      if (booking.showDate === selectedDateTimestamp && booking.bookingStatus !== 'CANCELLED') {
        return acc + (booking.seatsBooked ? (booking.seatsBooked as SeatWithPrice[]).length : 0);
      }
      return acc;
    }, 0) || 0;
    
    return totalSeats - bookedSeats;
  };

  const formatDateDisplay = (date: Date) => ({
    dayName: date.toLocaleString('default', { weekday: 'short' }),
    month: date.toLocaleString('default', { month: 'short' }),
    day: date.getDate()
  });

  return (
    <div className="w-full space-y-3 sm:space-y-4 md:space-y-6">
      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">Select Date</h3>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="flex gap-1.5 sm:gap-2 md:gap-3 pb-2 min-w-max">
              {dateRange.map((date, index) => {
                const { dayName, month, day } = formatDateDisplay(date.date);
                return (
                  <button
                    key={index}
                    onClick={() => onDateSelect(date.date)}
                    className={cn(
                      "flex-shrink-0 p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg md:rounded-xl transition-all duration-200",
                      "border-2 focus:outline-none focus:ring-2 focus:ring-primary/50",
                      "hover:scale-105 active:scale-95 touch-manipulation",
                      date.isSelected
                        ? "bg-primary text-white border-primary shadow-lg"
                        : date.isToday
                        ? "bg-white/70 border-primary/50 shadow-md"
                        : "bg-white/50 backdrop-blur-sm border-transparent hover:border-primary/30"
                    )}
                  >
                    <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px] md:min-w-[70px]">
                      <span className="text-xs font-medium truncate">{dayName}</span>
                      <span className="text-base sm:text-lg md:text-xl font-bold my-0.5 sm:my-1">{day}</span>
                      <span className="text-xs font-medium truncate">{month}</span>
                      {date.isToday && (
                        <span className="text-[9px] sm:text-[10px] mt-0.5 sm:mt-1 font-medium px-1 sm:px-1.5 md:px-2 py-0.5 rounded-full bg-primary/20 truncate">
                          TODAY
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Mobile scroll hint */}
          <div className="sm:hidden mt-2 text-center">
            <p className="text-xs text-gray-500 animate-pulse">← Scroll to see more dates →</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">Select Time</h3>
          </div>
          {availableShows.length > 0 && (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {availableShows.map((show) => {
                const availableSeats = calculateAvailableSeats(show);
                const isFullyBooked = availableSeats === 0;
                
                return (
                  <button
                    key={show.id}
                    onClick={() => !isFullyBooked && onTimeSelect(show.showTime)}
                    disabled={isFullyBooked}
                    className={cn(
                      "p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg md:rounded-xl ring-1 ring-gray-500 transition-all duration-200",
                      "border-2 focus:outline-none focus:ring-2 focus:ring-primary/50 min-w-0",
                      "active:scale-95 touch-manipulation",
                      isFullyBooked
                        ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300"
                        : selectedTime === show.showTime
                        ? "bg-primary text-white border-primary shadow-lg hover:scale-105"
                        : "bg-white/50 backdrop-blur-sm border-transparent hover:border-primary/30 hover:scale-105"
                    )}
                  >
                    <div className="text-center">
                      <span className="block font-medium text-sm sm:text-base md:text-lg truncate">
                        {formatTime(show.showTime)}
                      </span>
                      <span className={cn(
                        "block text-xs sm:text-sm mt-0.5 sm:mt-1 md:mt-2 opacity-75 truncate",
                        isFullyBooked ? "text-red-600 font-medium" : ""
                      )}>
                        {isFullyBooked ? "Fully Booked" : `${availableSeats} seats`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          {!selectedDate && (
            <Alert className="bg-blue-50/50 backdrop-blur-sm border-blue-200">
              <AlertDescription className="text-blue-700 text-xs sm:text-sm break-words">
                Please select a date to view available show times.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DateTimeSelector;
