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
      {/* Main Container with responsive padding */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 relative">
        {/* Responsive Header */}
        <div className="flex justify-between items-center mb-8 sm:mb-12 md:mb-16 sticky top-2 sm:top-4 z-50 bg-gray-900/95 backdrop-blur-xl p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-gray-800 shadow-lg">
          <div className="space-y-1 sm:space-y-1.5">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {movie.title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 font-medium">
              Select your preferred seating
            </p>
          </div>
          <button 
            onClick={() => setStep('DateBook')}
            className="group p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
            aria-label="Close booking"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Responsive Main Content Layout */}
        <div className="flex flex-col xl:flex-row xl:gap-8 space-y-6 xl:space-y-0">
          {/* Left Section: Screen and Seats */}
          <div className="flex-1 xl:max-w-[calc(100%-384px)]">
            {/* Responsive Screen Visualization */}
            <div className="relative mb-12 sm:mb-16 md:mb-20">
              <div className="w-full sm:w-4/5 md:w-3/4 mx-auto h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/20" />
              <div className="w-full sm:w-4/5 md:w-3/4 mx-auto mt-4 sm:mt-6 p-3 sm:p-4 text-center bg-gray-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-700/50 shadow-xl transform -skew-y-1">
                <span className="text-sm sm:text-lg md:text-xl text-gray-300 tracking-[0.1em] sm:tracking-[0.2em] font-light">SCREEN</span>
              </div>
            </div>

            {/* Enhanced Responsive Seating Layout */}
            <div className="bg-gray-800/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-xl border border-gray-700/50 mb-6 sm:mb-8">
              {/* Mobile/Tablet Horizontal Scroll Container */}
              <div className="overflow-x-auto xl:overflow-x-visible">
                <div className="grid grid-cols-10 gap-1.5 sm:gap-2 md:gap-3 justify-items-center min-w-[600px] sm:min-w-[650px] md:min-w-[720px] xl:min-w-0">
                  {seats.map((seat, rowIndex) => (
                    <React.Fragment key={seat}>
                      {Array.from({ length: 10 }, (_, index) => {
                        const seatCategory = getSeatCategory(rowIndex);
                        return (
                          <div className="relative group" key={`${seat}-${index + 1}`}>
                            {index === 0 && (
                              <span className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm font-medium">
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
                              <span className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 text-gray-400 text-xs sm:text-sm">
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
              
              {/* Mobile scroll hint */}
              <div className="xl:hidden mt-4 text-center">
                <p className="text-xs text-gray-400">← Scroll horizontally to view all seats →</p>
              </div>
            </div>

            {/* Responsive Legend */}
            <div className="bg-gray-800/60 backdrop-blur-lg rounded-lg sm:rounded-xl border border-gray-700/50 shadow-lg p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {[
                  { label: "Booked", gradient: "from-rose-400 to-rose-500", shadow: "shadow-rose-500/30" },
                  { label: "Selected", gradient: "from-green-400 to-green-500", shadow: "shadow-green-500/30" },
                  { label: "Silver", gradient: "from-gray-400 to-gray-500", shadow: "shadow-gray-500/30" },
                  { label: "Gold", gradient: "from-yellow-400 to-yellow-500", shadow: "shadow-yellow-500/30" },
                  { label: "Platinum", gradient: "from-blue-400 to-blue-500", shadow: "shadow-blue-500/30" }
                ].map(({ label, gradient, shadow }) => (
                  <div key={label} className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md sm:rounded-lg bg-gradient-to-r ${gradient} shadow-lg ${shadow}`} />
                    <span className="text-gray-300 text-xs sm:text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section: Responsive Booking Details */}
          <div className="xl:w-96 mt-6 xl:mt-0">
            <div className="xl:sticky xl:top-32 bg-gray-800/90 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-700/50">
              {/* Movie Details Section */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <div className="h-5 sm:h-6 w-0.5 sm:w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    Booking Details
                  </h2>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                      <span className="text-gray-400 text-xs sm:text-sm block mb-1">Show Time</span>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {selectedShow ? formatTime(selectedShow.showTime) : 'N/A'}
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                      <span className="text-gray-400 text-xs sm:text-sm block mb-1">Duration</span>
                      <p className="text-white font-medium text-sm sm:text-base">{movie.duration} minutes</p>
                    </div>
                  </div>
                </div>

                {/* Selected Seats Section */}
                <div className="border-t border-gray-700/50 pt-4 sm:pt-6">
                  <h3 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4">Selected Seats</h3>
                  {selectedSeats.length > 0 ? (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {selectedSeats.map(seat => (
                          <span key={seat} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-500/20 text-blue-300 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium">
                            {seat.split('/')[1]}
                          </span>
                        ))}
                      </div>
                      <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                        <span className="text-gray-400 text-xs sm:text-sm block mb-1">Total Amount</span>
                        <p className="text-white text-lg sm:text-xl font-semibold">
                          NPR {showPrices && getTotalPrice(selectedSeats, showPrices)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-xs sm:text-sm">Please select your seats</p>
                  )}
                </div>

                {/* Responsive Payment Button */}
                {selectedSeats.length > 0 && (
                  <button 
                    onClick={() => setStep('Payment')} 
                    className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg shadow-purple-500/25 text-sm sm:text-base"
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