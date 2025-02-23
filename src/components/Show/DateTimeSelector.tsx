'use client'
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import { cn, formatTime } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Show } from '@/types/movie';

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
    const bookedSeats = show.bookings?.reduce((acc, booking) => {
      return booking.showDate === selectedDateTimestamp 
        ? acc + booking.seatsBooked.length 
        : acc;
    }, 0) || 0;
    return totalSeats - bookedSeats;
  };

  const formatDateDisplay = (date: Date) => ({
    dayName: date.toLocaleString('default', { weekday: 'short' }),
    month: date.toLocaleString('default', { month: 'short' }),
    day: date.getDate()
  });

  return (
    <div className="space-y-6">
      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Select Date</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {dateRange.map((date, index) => {
              const { dayName, month, day } = formatDateDisplay(date.date);
              return (
                <button
                  key={index}
                  onClick={() => onDateSelect(date.date)}
                  className={cn(
                    "flex-shrink-0 p-3 rounded-xl transition-all duration-200",
                    "border-2 focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "hover:scale-105",
                    date.isSelected
                      ? "bg-primary text-white border-primary shadow-lg"
                      : date.isToday
                      ? "bg-white/70 border-primary/50 shadow-md"
                      : "bg-white/50 backdrop-blur-sm border-transparent hover:border-primary/30"
                  )}
                >
                  <div className="flex flex-col items-center min-w-[70px]">
                    <span className="text-xs font-medium">{dayName}</span>
                    <span className="text-xl font-bold my-1">{day}</span>
                    <span className="text-xs font-medium">{month}</span>
                    {date.isToday && (
                      <span className="text-[10px] mt-1 font-medium px-2 py-0.5 rounded-full bg-primary/20">
                        TODAY
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Select Time</h3>
          </div>
          {availableShows.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {availableShows.map((show) => {
                return (
                  <button
                    key={show.id}
                    onClick={() => onTimeSelect(show.showTime)}
                    className={cn(
                      "p-4 rounded-xl ring-1 ring-gray-500 transition-all duration-200",
                      "border-2 focus:outline-none focus:ring-2 focus:ring-primary/50",
                      "hover:scale-105",
                      selectedTime === show.showTime
                        ? "bg-primary text-white border-primary shadow-lg"
                        : "bg-white/50 backdrop-blur-sm border-transparent hover:border-primary/30"
                    )}
                  >
                    <div className="text-center">
                      <span className="block font-medium text-lg">
                        {formatTime(show.showTime)}
                      </span>
                      <span className="block text-xs mt-2 opacity-75">
                        {calculateAvailableSeats(show)} seats available
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) }
          {!selectedDate && (
            <Alert className="bg-blue-50/50 backdrop-blur-sm border-blue-200">
              <AlertDescription className="text-blue-700">
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
