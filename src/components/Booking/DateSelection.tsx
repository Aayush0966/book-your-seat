import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Monitor, Timer } from 'lucide-react';
import DateTimeSelector from '../Show/DateTimeSelector';
import ShowInfo from '../Show/showInfo';
import React, { useEffect, useState } from 'react';
import { cn, SCREEN_TYPES, getScreenTypeDisplayName } from '@/lib/utils';
import { useBooking } from '@/context/bookingContext';
import {  MovieWithShows, Show, ScreenType } from '@/types/movie';

interface DateRange {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
}

const DateSelection = ({movie}: {movie: MovieWithShows}) => {
    console.log('🎬 DEBUG: DateSelection component initialized with movie:', {
        movieId: movie?.id,
        movieTitle: movie?.title,
        showsCount: movie?.shows?.length,
        shows: movie?.shows?.map(show => ({
            id: show.id,
            showTime: show.showTime,
            showDateTime: new Date(show.showTime * 1000).toString(),
            screenType: show.screen?.type,
            screenId: show.screenId
        }))
    });

    const {step, setStep, setSelectedShow, selectedDate, setSelectedDate} = useBooking();
    const [dateRange, setDateRange] = useState<DateRange[]>([]);
    const [availableShows, setAvailableShows] = useState<Show[]>([]);
    const [selectedTime, setSelectedTime] = useState<number>();
    const [selectedScreenType, setSelectedScreenType] = useState<string>('STANDARD');
    const [error, setError] = useState<string>('');
    const [availableScreenTypes, setAvailableScreenTypes] = useState<ScreenType[]>([]);

    const generateDateRange = () => {
        const dates: DateRange[] = [];
        if (movie && movie.shows.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Get all available dates based on show start and end dates
            const availableDates = new Set<string>();
            
            movie.shows.forEach(show => {
                const startDate = new Date(show.startDate * 1000);
                const endDate = new Date(show.endDate * 1000);
                
                // Set to start of day for proper comparison
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);
                
                // Generate all dates from startDate to endDate for this show
                const currentDate = new Date(Math.max(startDate.getTime(), today.getTime()));
                
                while (currentDate <= endDate) {
                    availableDates.add(currentDate.toISOString());
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            });
            
            // Convert back to Date objects and sort
            const uniqueDates = Array.from(availableDates)
                .map(dateStr => new Date(dateStr))
                .sort((a, b) => a.getTime() - b.getTime());
            
            console.log('📅 DEBUG: Date range generation:', {
                today: today.toDateString(),
                totalShows: movie.shows.length,
                uniqueDatesCount: uniqueDates.length,
                uniqueDates: uniqueDates.map(date => date.toDateString()),
                showDetails: movie.shows.map(show => ({
                    id: show.id,
                    showTime: show.showTime,
                    showDateTime: new Date(show.showTime * 1000).toString(),
                    startDate: show.startDate,
                    startDateTime: new Date(show.startDate * 1000).toString(),
                    endDate: show.endDate,
                    endDateTime: new Date(show.endDate * 1000).toString()
                }))
            });

            // Create date range entries for each unique date
            uniqueDates.forEach(date => {
                dates.push({
                    date: new Date(date),
                    isSelected: selectedDate
                        ? date.getDate() === selectedDate.getDate() &&
                          date.getMonth() === selectedDate.getMonth() &&
                          date.getFullYear() === selectedDate.getFullYear()
                        : false,
                    isToday: date.getTime() === today.getTime()
                });
            });
            
            setDateRange(dates);
        }
    };

    const getAvailableScreenTypes = () => {
        if (!movie) return [];
        
        // Get unique screen types that have shows for this movie
        const screenTypes = [...new Set(movie.shows.map(show => show.screen?.type).filter(Boolean))] as ScreenType[];
        console.log('🎬 DEBUG: Available screen types for movie:', screenTypes);
        
        setAvailableScreenTypes(screenTypes);
        
        // Auto-select the first available screen type if current selection is not available
        if (screenTypes.length > 0 && !screenTypes.includes(selectedScreenType as ScreenType)) {
            console.log(`🔄 DEBUG: Auto-selecting screen type ${screenTypes[0]} as ${selectedScreenType} is not available`);
            setSelectedScreenType(screenTypes[0]);
        }
        
        return screenTypes;
    };

    const updateAvailableShows = (date: Date | null, screenType: string) => {
        console.log('🔍 DEBUG: updateAvailableShows called with:', {
            date: date?.toDateString(),
            screenType,
            movieId: movie?.id,
            totalShows: movie?.shows?.length
        });

        if (!date || !movie) {
            console.log('❌ DEBUG: Early return - no date or movie');
            setAvailableShows([]);
            return;
        }

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        
        const startOfDayTimestamp = Math.floor(startOfDay.getTime() / 1000);
        const endOfDayTimestamp = Math.floor(endOfDay.getTime() / 1000);
        const currentTimestamp = Math.floor(Date.now() / 1000);

        console.log('📅 DEBUG: Date range:', {
            selectedDate: date.toDateString(),
            startOfDayTimestamp,
            endOfDayTimestamp,
            currentTimestamp,
            isToday: startOfDay.toDateString() === new Date().toDateString()
        });

        console.log('🎬 DEBUG: All shows for this movie:', movie.shows.map(show => ({
            id: show.id,
            showTime: show.showTime,
            showDateTime: new Date(show.showTime * 1000).toString(),
            screenType: show.screen?.type,
            screenId: show.screenId,
            startDate: show.startDate,
            endDate: show.endDate
        })));

        let filteredShows = movie.shows.filter(show => {
            console.log(`🎯 DEBUG: Checking show ${show.id}:`, {
                showTime: show.showTime,
                showDateTime: new Date(show.showTime * 1000).toString(),
                startDate: show.startDate,
                startDateTime: new Date(show.startDate * 1000).toString(),
                endDate: show.endDate,
                endDateTime: new Date(show.endDate * 1000).toString(),
                screenType: show.screen?.type,
                requestedScreenType: screenType,
                screenMatch: show.screen?.type === screenType
            });

            // Check if screen type matches
            if (show.screen?.type !== screenType) {
                console.log(`❌ DEBUG: Show ${show.id} filtered out - screen type mismatch`);
                return false;
            }
            
            // Check if the selected date is within the show's run period
            const selectedDateTimestamp = Math.floor(date.getTime() / 1000);
            const showStartDate = Math.floor(new Date(show.startDate * 1000).setHours(0, 0, 0, 0) / 1000);
            const showEndDate = Math.floor(new Date(show.endDate * 1000).setHours(23, 59, 59, 999) / 1000);
            
            const isWithinShowPeriod = selectedDateTimestamp >= showStartDate && selectedDateTimestamp <= showEndDate;
            
            console.log(`📅 DEBUG: Show ${show.id} date period check:`, {
                selectedDate: date.toDateString(),
                selectedDateTimestamp,
                showStartDate,
                showStartDateTime: new Date(showStartDate * 1000).toString(),
                showEndDate,
                showEndDateTime: new Date(showEndDate * 1000).toString(),
                isWithinShowPeriod
            });
            
            if (!isWithinShowPeriod) {
                console.log(`❌ DEBUG: Show ${show.id} filtered out - not within show period`);
                return false;
            }
            
            // Calculate the actual show time for the selected date
            const originalShowTime = new Date(show.showTime * 1000);
            const showTimeOnSelectedDate = new Date(date);
            showTimeOnSelectedDate.setHours(originalShowTime.getHours(), originalShowTime.getMinutes(), 0, 0);
            const showTimeTimestamp = Math.floor(showTimeOnSelectedDate.getTime() / 1000);
            
            // If it's today, only show future shows; otherwise show all shows for the date
            const isToday = startOfDay.toDateString() === new Date().toDateString();
            const isFutureShow = isToday ? showTimeTimestamp > currentTimestamp : true;
            
            console.log(`⏰ DEBUG: Show ${show.id} time check:`, {
                isToday,
                originalShowTime: originalShowTime.toString(),
                showTimeOnSelectedDate: showTimeOnSelectedDate.toString(),
                showTimeTimestamp,
                currentTimestamp,
                isFutureShow
            });
            
            const shouldInclude = isFutureShow;
            console.log(`✅ DEBUG: Show ${show.id} final result:`, shouldInclude);
            
            return shouldInclude;
        });

        // Update the filtered shows with the calculated show times for the selected date
        const showsWithUpdatedTimes = filteredShows.map(show => {
            const originalShowTime = new Date(show.showTime * 1000);
            const showTimeOnSelectedDate = new Date(date);
            showTimeOnSelectedDate.setHours(originalShowTime.getHours(), originalShowTime.getMinutes(), 0, 0);
            
            return {
                ...show,
                showTime: Math.floor(showTimeOnSelectedDate.getTime() / 1000)
            };
        });
        
        showsWithUpdatedTimes.sort((a, b) => a.showTime - b.showTime);
        
        console.log('🎯 DEBUG: Final filtered shows with updated times:', {
            count: showsWithUpdatedTimes.length,
            shows: showsWithUpdatedTimes.map(show => ({
                id: show.id,
                showTime: show.showTime,
                showDateTime: new Date(show.showTime * 1000).toString(),
                screenType: show.screen?.type
            }))
        });
        
        setAvailableShows(showsWithUpdatedTimes);
        
        if (showsWithUpdatedTimes.length === 0) {
            console.log('❌ DEBUG: No shows found, setting error message');
            setError(`No shows available for ${getScreenTypeDisplayName(screenType)} screen on selected date. Please try another date or screen type.`);
        } else {
            console.log('✅ DEBUG: Shows found, clearing error');
            setError('');
        }
    };

    useEffect(() => {
        console.log('🔄 DEBUG: generateDateRange useEffect triggered, selectedDate:', selectedDate?.toDateString());
        generateDateRange();
    }, [selectedDate]);

    useEffect(() => {
        console.log('🔄 DEBUG: getAvailableScreenTypes useEffect triggered');
        getAvailableScreenTypes();
    }, [movie, selectedScreenType]);

    useEffect(() => {
        console.log('🔄 DEBUG: updateAvailableShows useEffect triggered:', {
            selectedDate: selectedDate?.toDateString(),
            selectedScreenType,
            hasSelectedDate: !!selectedDate
        });
        if (selectedDate) {
            updateAvailableShows(selectedDate, selectedScreenType);
        } else {
            console.log('❌ DEBUG: No selectedDate, skipping updateAvailableShows');
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
        console.log('🎬 DEBUG: Screen type changed:', {
            from: selectedScreenType,
            to: screenType,
            selectedDate: selectedDate?.toDateString()
        });
        setSelectedScreenType(screenType);
        setSelectedTime(undefined);
        if (selectedDate) {
            updateAvailableShows(selectedDate, screenType);
        } else {
            console.log('❌ DEBUG: No selectedDate when screen type changed');
        }
    };

    const handleDateSelect = (date: Date) => {
        console.log('📅 DEBUG: Date selected:', {
            date: date.toDateString(),
            screenType: selectedScreenType
        });
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
                                {availableScreenTypes.length > 0 ? (
                                    SCREEN_TYPES.filter(screen => availableScreenTypes.includes(screen.type as ScreenType)).map((screen) => (
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
                                            {screen.displayName}
                                        </button>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-4 text-gray-500 text-sm">
                                        No screen types available for this movie
                                    </div>
                                )}
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