import { X } from "lucide-react";
import React from "react";
import Seat from "./Seat";
import { Movie, Price, SeatWithPrice } from "@/types/movie";
import { FC } from "react";
import { formatTime, getTotalPrice } from "@/lib/utils";
import { useBooking } from "@/context/bookingContext";

interface BookingHallProps {
  movie: Movie;
}

const BookingHall: FC<BookingHallProps> = ({ movie }) => {
  const { setStep, selectedShow, selectedSeats, setSelectedSeats, selectedDate } = useBooking();
  const requiredRows = Math.ceil((selectedShow?.screen?.totalSeats ?? 0) / 10);
  const seats = Array.from({ length: requiredRows }, (_, i) => String.fromCharCode(65 + i));
  const totalRows = requiredRows;
  const middleStart = Math.floor(totalRows / 3);
  const middleEnd = Math.ceil((2 * totalRows) / 3);
  const showPrices = selectedShow && (selectedShow.pricing as Price[])?.filter((price) => price.screenId === selectedShow.screenId)[0].prices;

  const getSeatCategory = (rowIndex: number) => {
    if (rowIndex < middleStart) return "gold";
    if (rowIndex >= middleStart && rowIndex < middleEnd) return "platinum";
    return "silver";
  };

  const handleSelectSeats = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const checkIsBooked = (seatNumber: string): boolean => {
    if (!selectedShow?.bookings || !selectedDate) return false;
    const selectedDateTimestamp = Math.floor(new Date(selectedDate).getTime() / 1000);
    return selectedShow.bookings.some(booking => 
      booking.showDate === selectedDateTimestamp && 
      booking.bookingStatus !== 'CANCELLED' &&
      (booking.seatsBooked as SeatWithPrice[]).some(seat => seat.seat === seatNumber)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Main Container with enhanced responsive padding */}
      <div className="max-w-[1440px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8 relative">
        {/* Enhanced Responsive Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-8 md:mb-12 lg:mb-16 sticky top-1 sm:top-2 md:top-4 z-50 bg-gray-900/95 backdrop-blur-xl p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-800 shadow-lg">
          <div className="space-y-0.5 sm:space-y-1 md:space-y-1.5">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {movie.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium">
              Select your preferred seating
            </p>
          </div>
          <button 
            onClick={() => setStep('DateBook')}
            className="group p-1.5 sm:p-2 md:p-2.5 rounded-md sm:rounded-lg md:rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 active:scale-95"
            aria-label="Close booking"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Enhanced Responsive Main Content Layout */}
        <div className="flex flex-col xl:flex-row xl:gap-6 lg:gap-8 space-y-4 sm:space-y-6 xl:space-y-0">
          {/* Left Section: Screen and Seats */}
          <div className="flex-1 xl:max-w-[calc(100%-384px)]">
            {/* Enhanced Responsive Screen Visualization */}
            <div className="relative mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/20" />
              <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto mt-2 sm:mt-4 md:mt-6 p-2 sm:p-3 md:p-4 text-center bg-gray-800/80 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-700/50 shadow-xl transform -skew-y-1">
                <span className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-300 tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.2em] font-light">SCREEN</span>
              </div>
            </div>

            {/* Enhanced Responsive Seating Layout */}
            <div className="bg-gray-800/40 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 shadow-xl border border-gray-700/50 mb-4 sm:mb-6 md:mb-8">
              {/* Mobile/Tablet Enhanced Horizontal Scroll Container */}
              <div className="overflow-x-auto xl:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                <div className="grid grid-cols-10 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 justify-items-center min-w-[280px] xs:min-w-[320px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-0">
                  {seats.map((seat, rowIndex) => (
                    <React.Fragment key={seat}>
                      {Array.from({ length: 10 }, (_, index) => {
                        const seatCategory = getSeatCategory(rowIndex);
                        return (
                          <div className="relative group" key={`${seat}-${index + 1}`}>
                            {index === 0 && (
                              <span className="absolute -left-3 sm:-left-4 md:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm font-medium">
                                {seat}
                              </span>
                            )}
                            <Seat
                              seatNumber={`${seatCategory}/${seat}-${index + 1}`}
                              handleSelectSeats={handleSelectSeats}
                              selectedSeats={selectedSeats}
                              isBooked={checkIsBooked(`${seatCategory}/${seat}-${index + 1}`)}
                              category={seatCategory}
                            />
                            {seat === seats[0] && (
                              <span className="absolute -top-4 sm:-top-5 md:-top-6 lg:-top-8 left-1/2 -translate-x-1/2 text-gray-400 text-xs sm:text-sm">
                                {index + 1}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {/* Enhanced mobile scroll hint */}
              <div className="xl:hidden mt-2 sm:mt-3 md:mt-4 text-center">
                <p className="text-xs text-gray-400 animate-pulse">← Scroll horizontally to view all seats →</p>
              </div>
            </div>

            {/* Enhanced Responsive Legend */}
            <div className="bg-gray-800/60 backdrop-blur-lg rounded-lg sm:rounded-xl border border-gray-700/50 shadow-lg p-3 sm:p-4 md:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                {[
                  { label: "Booked", gradient: "from-rose-400 to-rose-500", shadow: "shadow-rose-500/30" },
                  { label: "Selected", gradient: "from-green-400 to-green-500", shadow: "shadow-green-500/30" },
                  { label: "Silver", gradient: "from-gray-400 to-gray-500", shadow: "shadow-gray-500/30" },
                  { label: "Gold", gradient: "from-yellow-400 to-yellow-500", shadow: "shadow-yellow-500/30" },
                  { label: "Platinum", gradient: "from-blue-400 to-blue-500", shadow: "shadow-blue-500/30" }
                ].map(({ label, gradient, shadow }) => (
                  <div key={label} className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm sm:rounded-md md:rounded-lg bg-gradient-to-r ${gradient} shadow-lg ${shadow}`} />
                    <span className="text-gray-300 text-xs sm:text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section: Enhanced Responsive Booking Details */}
          <div className="xl:w-96 mt-4 sm:mt-6 xl:mt-0">
            <div className="xl:sticky xl:top-32 bg-gray-800/90 backdrop-blur-xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-700/50">
              {/* Movie Details Section */}
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3">
                    <div className="h-4 sm:h-5 md:h-6 w-0.5 sm:w-0.5 md:w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    Booking Details
                  </h2>
                  
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="bg-gray-900/50 p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg md:rounded-xl">
                      <span className="text-gray-400 text-xs sm:text-sm block mb-0.5 sm:mb-1">Show Time</span>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedShow ? formatTime(selectedShow.showTime) : 'N/A'}
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg md:rounded-xl">
                      <span className="text-gray-400 text-xs sm:text-sm block mb-0.5 sm:mb-1">Duration</span>
                      <p className="text-white font-medium text-sm sm:text-base">{movie.duration} minutes</p>
                    </div>
                  </div>
                </div>

                {/* Selected Seats Section */}
                <div className="border-t border-gray-700/50 pt-3 sm:pt-4 md:pt-6">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-white mb-2 sm:mb-3 md:mb-4">Selected Seats</h3>
                  {selectedSeats.length > 0 ? (
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                        {selectedSeats.map(seat => (
                          <span key={seat} className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 bg-blue-500/20 text-blue-300 rounded-sm sm:rounded-md md:rounded-lg text-xs sm:text-sm font-medium">
                            {seat.split('/')[1]}
                          </span>
                        ))}
                      </div>
                      <div className="bg-gray-900/50 p-2 sm:p-3 md:p-4 rounded-md sm:rounded-lg md:rounded-xl">
                        <span className="text-gray-400 text-xs sm:text-sm block mb-0.5 sm:mb-1">Total Amount</span>
                        <p className="text-white text-base sm:text-lg md:text-xl font-semibold">
                          NPR {showPrices && getTotalPrice(selectedSeats, showPrices)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-xs sm:text-sm">Please select your seats</p>
                  )}
                </div>

                {/* Enhanced Responsive Payment Button */}
                {selectedSeats.length > 0 && (
                  <button 
                    onClick={() => setStep('Payment')} 
                    className="w-full py-2.5 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-md sm:rounded-lg md:rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg shadow-purple-500/25 text-xs sm:text-sm md:text-base"
                  >
                    Proceed to Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHall;