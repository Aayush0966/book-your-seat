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
      (booking.seatsBooked as SeatWithPrice[]).some(seat => seat.seat === seatNumber)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Main Container with precise padding */}
      <div className="max-w-[1440px] mx-auto px-6 py-8 relative">
        {/* Refined Header */}
        <div className="flex justify-between items-center mb-16 sticky top-4 z-50 bg-gray-900/95 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg">
          <div className="space-y-1.5">
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {movie.title}
            </h1>
            <p className="text-sm md:text-base text-gray-400 font-medium">
              Select your preferred seating
            </p>
          </div>
          <button 
            onClick={() => setStep('DateBook')}
            className="group p-2.5 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
            aria-label="Close booking"
          >
            <X className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left Section: Screen and Seats */}
          <div className="flex-1 lg:max-w-[calc(100%-384px)]">
            {/* Refined Screen Visualization */}
            <div className="relative mb-20">
              <div className="w-full lg:w-3/4 mx-auto h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/20" />
              <div className="w-full lg:w-3/4 mx-auto mt-6 p-4 text-center bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl transform -skew-y-1">
                <span className="text-xl text-gray-300 tracking-[0.2em] font-light">SCREEN</span>
              </div>
            </div>

            {/* Enhanced Seating Layout */}
            <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700/50 overflow-auto mb-8">
              <div className="grid grid-cols-10 gap-3 justify-items-center min-w-[720px]">
                {seats.map((seat, rowIndex) => (
                  <React.Fragment key={seat}>
                    {Array.from({ length: 10 }, (_, index) => {
                      const seatCategory = getSeatCategory(rowIndex);
                      return (
                        <div className="relative group" key={`${seat}-${index + 1}`}>
                          {index === 0 && (
                            <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
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
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
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

            {/* Refined Legend */}
            <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { label: "Booked", gradient: "from-rose-400 to-rose-500", shadow: "shadow-rose-500/30" },
                  { label: "Selected", gradient: "from-green-400 to-green-500", shadow: "shadow-green-500/30" },
                  { label: "Silver", gradient: "from-gray-400 to-gray-500", shadow: "shadow-gray-500/30" },
                  { label: "Gold", gradient: "from-yellow-400 to-yellow-500", shadow: "shadow-yellow-500/30" },
                  { label: "Platinum", gradient: "from-blue-400 to-blue-500", shadow: "shadow-blue-500/30" }
                ].map(({ label, gradient, shadow }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-lg bg-gradient-to-r ${gradient} shadow-lg ${shadow}`} />
                    <span className="text-gray-300 text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section: Booking Details */}
          <div className="lg:w-96 mt-8 lg:mt-0">
            <div className="sticky top-32 bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50">
              {/* Movie Details Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    Booking Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 p-4 rounded-xl">
                      <span className="text-gray-400 text-sm block mb-1">Show Time</span>
                      <p className="text-white font-medium">
                        {selectedShow ? formatTime(selectedShow.showTime) : 'N/A'}
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/50 p-4 rounded-xl">
                      <span className="text-gray-400 text-sm block mb-1">Duration</span>
                      <p className="text-white font-medium">{movie.duration} minutes</p>
                    </div>
                  </div>
                </div>

                {/* Selected Seats Section */}
                <div className="border-t border-gray-700/50 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Selected Seats</h3>
                  {selectedSeats.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map(seat => (
                          <span key={seat} className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium">
                            {seat.split('/')[1]}
                          </span>
                        ))}
                      </div>
                      <div className="bg-gray-900/50 p-4 rounded-xl">
                        <span className="text-gray-400 text-sm block mb-1">Total Amount</span>
                        <p className="text-white text-xl font-semibold">
                          NPR {showPrices && getTotalPrice(selectedSeats, showPrices)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Please select your seats</p>
                  )}
                </div>

                {/* Payment Button */}
                {selectedSeats.length > 0 && (
                  <button 
                    onClick={() => setStep('Payment')} 
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg shadow-purple-500/25"
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