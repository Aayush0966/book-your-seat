import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Monitor, Timer } from 'lucide-react';
import DateTimeSelector from '../Show/DateTimeSelector';
import ShowInfo from '../Show/showInfo';
import React, { useEffect, useState } from 'react';
import { cn, SCREEN_TYPES } from '@/lib/utils';
import { useBooking } from '@/context/bookingContext';
import {  MovieWithShows, Show } from '@/types/movie';

interface DateRange {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
}

const DateSelection = ({movie}: {movie: MovieWithShows}) => {
    const {step, setStep, setSelectedShow, selectedDate, setSelectedDate} = useBooking();
    const [dateRange, setDateRange] = useState<DateRange[]>([]);
    const [availableShows, setAvailableShows] = useState<Show[]>([]);
    const [selectedTime, setSelectedTime] = useState<number>();
    const [selectedScreenType, setSelectedScreenType] = useState<string>('Standard');
    const [error, setError] = useState<string>('');

    const generateDateRange = () => {
        const dates: DateRange[] = [];
        if (movie) {
            const actualStart = new Date(Math.min(...movie.shows.map(show => show.startDate * 1000)));
            const endDate = new Date(Math.max(...movie.shows.map(show => show.endDate * 1000)));
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startDate = today > actualStart ? today : actualStart;
            const currentDate = new Date(startDate);
          
            while (currentDate <= endDate) {
                dates.push({
                    date: new Date(currentDate),
                    isSelected: selectedDate
                        ? currentDate.getDate() === selectedDate.getDate() &&
                          currentDate.getMonth() === selectedDate.getMonth()
                        : false,
                    isToday: currentDate.getTime() === today.getTime()
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }
            
            setDateRange(dates);
        }
    };

    const updateAvailableShows = (date: Date | null, screenType: string) => {
        if (!date || !movie) {
            setAvailableShows([]);
            return;
        }

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        let filteredShows = movie.shows.filter(show => {
            const showDate = new Date(show.showTime * 1000).toTimeString();
            return show.screen?.type === screenType && showDate >= new Date().toTimeString();
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

    if (!movie) {
        return (
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    <div className="lg:col-span-8 space-y-3 sm:space-y-4 md:space-y-6">
                        <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
                            <CardContent className="p-3 sm:p-4 md:p-6">
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                    <Monitor className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" />
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold">No movie selected</h3>
                                </div>
                                <p className="text-xs sm:text-sm md:text-base">Please select a movie to proceed with booking.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

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
        const show = movie.shows.find((show) => show.screen?.type === selectedScreenType && show.showTime === selectedTime)
        if (show) {
            setSelectedShow(show)
        }
        
        setStep('SeatBook');
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                <ShowInfo movie={movie} />
                
                { movie.status === 'ACTIVE' && <div className="w-full lg:col-span-8 space-y-3 sm:space-y-4 md:space-y-6">
                    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
                        <CardContent className="p-3 sm:p-4 md:p-6">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
                                <Monitor className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold">Select Screen Type</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                {SCREEN_TYPES.map((screen) => (
                                    <button
                                        key={screen.screenId}
                                        onClick={() => handleScreenTypeChange(screen.type)}
                                        className={cn(
                                            "px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-md sm:rounded-lg md:rounded-xl transition-all duration-200 hover:scale-105",
                                            "border-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs sm:text-sm md:text-base",
                                            "active:scale-95 touch-manipulation min-w-0 truncate", // Enhanced touch feedback for mobile
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
                            <AlertDescription className="text-red-700 text-xs sm:text-sm md:text-base break-words">
                                {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    {selectedTime && (
                        <div className="flex justify-center sm:justify-end">
                            <Button
                                onClick={() => handleBook()}
                                size="lg"
                                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 touch-manipulation"
                            >
                                Book Tickets
                            </Button>
                        </div>
                    )}
                </div>}
                {
                    movie.status === 'UPCOMING' && <div className="w-full lg:col-span-8 space-y-3 sm:space-y-4 md:space-y-6">
                    <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
                    <CardContent className="p-3 sm:p-4 md:p-6">
                    <div className="flex items-center gap-2 justify-center">
                        <Timer className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mt-1 sm:mt-2 md:mt-4 text-primary flex-shrink-0" />
                        <h3 className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2 md:mt-4 font-semibold">Movie is coming soon</h3>
                    </div>            
                    </CardContent>
                    </Card>
                    </div>
                }
            </div>
        </div>
    )
}

export default DateSelection;