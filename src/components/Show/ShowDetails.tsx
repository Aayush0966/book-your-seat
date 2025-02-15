'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Clock, Monitor } from 'lucide-react';
import ShowInfo from './showInfo';
import { MovieWithShows } from '@/types/movie';

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<DateRange[]>([]);
  const [availableShows, setAvailableShows] = useState<typeof movie.shows>([]);
  const [selectedTime, setSelectedTime] = useState<number>();
  const [selectedScreenType, setSelectedScreenType] = useState<string>('All');

  const generateDateRange = () => {
    const dates: DateRange[] = [];
    const startDate = new Date(Math.min(...movie.shows.map(show => show.startDate * 1000)));
    const endDate = new Date(Math.max(...movie.shows.map(show => show.endDate * 1000)));
    
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      dates.push({
        date: new Date(currentDate),
        isSelected: currentDate.getDate() === selectedDate.getDate() &&
                   currentDate.getMonth() === selectedDate.getMonth(),
        isToday: currentDate.getDate() === new Date().getDate() &&
                 currentDate.getMonth() === new Date().getMonth()
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    setDateRange(dates);
  };

  
  const updateAvailableShows = (date: Date, screenType: string = selectedScreenType) => {
    let shows = movie.shows.filter(show => {
      const showStart = new Date(show.startDate * 1000);
      const showEnd = new Date(show.endDate * 1000);
      return showStart <= date && showEnd >= date;
    });

    if (screenType !== 'All') {
      shows = shows.filter(show => show.screen?.type === screenType);
    }
    
    setAvailableShows(shows);
    setSelectedTime(undefined);
  };

  useEffect(() => {
    generateDateRange();
    updateAvailableShows(selectedDate);
  }, []);

  useEffect(() => {
    updateAvailableShows(selectedDate, selectedScreenType);
  }, [selectedDate, selectedScreenType]);

  const formatTime = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(timestamp * 1000));
  };

  const formatDateDisplay = (date: Date) => {
    return {
      dayName: date.toLocaleString('default', { weekday: 'short' }),
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate()
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <ShowInfo movie={movie} />
            
            <div className="lg:col-span-8">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    Select Show Date & Time
                  </h2>

                  <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
                    {dateRange.map((dateItem, i) => {
                      const formattedDate = formatDateDisplay(dateItem.date);
                      
                      return (
                        <button
                          onClick={() => setSelectedDate(dateItem.date)}
                          key={i}
                          className={`
                            flex flex-col items-center min-w-[100px] p-4 rounded-lg
                            transition-all duration-200 
                            ${dateItem.isSelected 
                              ? 'bg-blue-600 text-white shadow-lg scale-105' 
                              : 'bg-white border border-gray-200 hover:border-blue-400'}
                            ${dateItem.isToday ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
                          `}
                        >
                          <span className="text-sm font-medium">{formattedDate.dayName}</span>
                          <span className="text-2xl font-bold my-1">{formattedDate.day}</span>
                          <span className="text-sm">{formattedDate.month}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Monitor className="w-5 h-5" />
                      Select Screen Type
                    </h3>
                    <div className="flex gap-3 flex-wrap">
                      <Button
                        onClick={() => setSelectedScreenType('All')}
                        variant={selectedScreenType === 'All' ? 'default' : 'outline'}
                        className={`
                          py-6 px-6
                          ${selectedScreenType === 'All' 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'hover:border-blue-400'}
                        `}
                      >
                        All Screens
                      </Button>
                      {SCREEN_TYPES.map((screen) => (
                        <Button
                          key={screen.screenId}
                          onClick={() => setSelectedScreenType(screen.type)}
                          variant={selectedScreenType === screen.type ? 'default' : 'outline'}
                          className={`
                            py-6 px-6 relative
                            ${selectedScreenType === screen.type 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'hover:border-blue-400'}
                          `}
                        >
                          {screen.type}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Available Shows {selectedScreenType !== 'All' && `(${selectedScreenType})`}
                    </h3>
                    
                    {availableShows.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {availableShows.map((show) => (
                          <Button
                            onClick={() => setSelectedTime(show.showTime)}
                            key={show.id}
                            variant="outline"
                            className={`
                              h-16 text-lg transition-all relative group
                              ${selectedTime === show.showTime 
                                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700" 
                                : "hover:border-blue-400 hover:bg-blue-50"}
                            `}
                          >
                            {formatTime(show.showTime)}
                            {show && (
                              <>
                                <span className={`
                                  absolute -top-2 -right-2 text-xs px-2 py-1 rounded-full
                                  ${selectedTime === show.showTime 
                                    ? 'bg-white text-blue-600' 
                                    : 'bg-blue-100 text-blue-800'}
                                `}>
                                  {show.screen?.totalSeats} seats
                                </span>
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs">
                                  {show.screen?.type}
                                </span>
                              </>
                            )}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertDescription className="text-amber-700">
                          No {selectedScreenType !== 'All' ? `${selectedScreenType} ` : ''}shows available for this date. Please select another date or screen type.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  {selectedTime && (
                    <Alert className="mt-6 bg-green-50 border-green-500">
                      <AlertDescription className="text-green-700 font-medium">
                        Selected: {formatTime(selectedTime)} on {formatDateDisplay(selectedDate).month} {selectedDate.getDate()}
                        {selectedScreenType !== 'All' && ` (${selectedScreenType})`}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="mt-8 flex justify-end">
                    <Button 
                      className={`
                        text-lg px-8 py-6 transition-all duration-200
                        ${selectedTime 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                      `}
                      disabled={!selectedTime}
                    >
                      Continue to Booking
                    </Button>
                  </div> 
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;