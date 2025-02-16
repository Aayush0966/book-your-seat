'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileType, Monitor } from 'lucide-react';
import ShowInfo from './showInfo';
import DateTimeSelector from './DateTimeSelector';
import { MovieWithShows } from '@/types/movie';
import { cn } from '@/lib/utils';
import BookingHall from '../Booking/BookingHall';

interface ShowDetailsProps {
  movie: MovieWithShows;
}

interface DateRange {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
}

interface ScreenType {
  screenId: number;
  type: string;
}

const SCREEN_TYPES: ScreenType[] = [
  { screenId: 1, type: "Standard" },
  { screenId: 2, type: "3D" },
  { screenId: 3, type: "IMAX" }
];

const ShowDetails: React.FC<ShowDetailsProps> = ({ movie }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRange[]>([]);
  const [availableShows, setAvailableShows] = useState<typeof movie.shows>([]);
  const [selectedTime, setSelectedTime] = useState<number>();
  const [selectedScreenType, setSelectedScreenType] = useState<string>('Standard');
  const [error, setError] = useState<string>('');
  const [showSeatLayout, setShowSeatLayout] = useState<boolean>(false);

  const generateDateRange = () => {
    const dates: DateRange[] = [];
    const startDate = new Date(Math.min(...movie.shows.map(show => show.startDate * 1000)));
    const endDate = new Date(Math.max(...movie.shows.map(show => show.endDate * 1000)));
    
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      dates.push({
        date: new Date(currentDate),
        isSelected: selectedDate ? (
          currentDate.getDate() === selectedDate.getDate() &&
          currentDate.getMonth() === selectedDate.getMonth()
        ) : false,
        isToday: currentDate.getDate() === new Date().getDate() &&
                 currentDate.getMonth() === new Date().getMonth()
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    setDateRange(dates);
  };

  const updateAvailableShows = (date: Date | null, screenType: string) => {
    if (!date) {
      setAvailableShows([]);
      return;
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    let filteredShows = movie.shows.filter(show => {
      return show.screen?.type === screenType;
    });

    filteredShows.sort((a, b) => a.showTime - b.showTime);
    
    setAvailableShows(filteredShows);
    
    if (filteredShows.length === 0) {
      setError(`No shows available for ${screenType} screen on selected date. Please try another date or screen type.`);
    } else {
      setError('');
    }
  };

  useEffect(() => {
    generateDateRange();
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      updateAvailableShows(selectedDate, selectedScreenType);
    }
  }, [selectedDate, selectedScreenType]);

  const handleScreenTypeChange = (screenType: string) => {
    setSelectedScreenType(screenType);
    setSelectedTime(undefined);
    if (selectedDate) {
      updateAvailableShows(selectedDate, screenType);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setError('');
    setSelectedTime(undefined);
    updateAvailableShows(date, selectedScreenType);
  };

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
    setError('');
  };

  const handleBook = () => {

  }

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
    {!showSeatLayout &&  <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8">
          <ShowInfo movie={movie} />
          
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Select Screen Type</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {SCREEN_TYPES.map((screen) => (
                    <button
                      key={screen.screenId}
                      onClick={() => handleScreenTypeChange(screen.type)}
                      className={cn(
                        "px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105",
                        "border-2 focus:outline-none focus:ring-2 focus:ring-primary/50",
                        selectedScreenType === screen.type
                          ? "bg-primary text-white border-primary shadow-lg"
                          : "bg-white/50 backdrop-blur-sm border-transparent hover:border-primary/30"
                      )}
                    >
                      {screen.type}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <DateTimeSelector
              dateRange={dateRange}
              availableShows={availableShows}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateSelect={handleDateSelect}
              onTimeSelect={handleTimeSelect}
            />

            {error && (
              <Alert className="bg-red-50/50 backdrop-blur-sm border-red-200">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {selectedTime && (
              <div className="flex justify-end">
                <Button
                onClick={() => setShowSeatLayout(true)}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Book Tickets
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>}
      {
          showSeatLayout &&
           <BookingHall
           
            />
        }
    </div>
  );
};

export default ShowDetails;