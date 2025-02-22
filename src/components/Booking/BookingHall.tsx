import { Cross } from "lucide-react";
import React, { useState } from "react";
import Seat from "./Seat";
import { Movie, Show } from "@/types/movie";
import { FC } from "react";
import { formatTime, getTotalPrice } from "@/lib/utils";
import { useBooking } from "@/context/bookingContext";

interface BookingHallProps {
  movie: Movie;
}

const BookingHall: FC<BookingHallProps> = ({ movie }) => {
  const {step, setStep, selectedShow, selectedSeats, setSelectedSeats} = useBooking();
  const requiredRows = Math.ceil((selectedShow?.screen?.totalSeats ?? 0) / 10);
  const seats = Array.from({ length: requiredRows }, (_, i) => String.fromCharCode(65 + i)); // Generate seat rows dynamically
  const totalRows = requiredRows;
  const middleStart = Math.floor(totalRows / 3); // Start of Platinum
  const middleEnd = Math.ceil((2 * totalRows) / 3); // End of Platinum
  const showPrices = selectedShow && selectedShow.pricing?.filter((price) => price.screenId === selectedShow.screenId)[0].prices

  const getSeatCategory = (rowIndex: number) => {
    if (rowIndex < middleStart) return "gold"; // Top rows
    if (rowIndex >= middleStart && rowIndex < middleEnd) return "platinum"; // Middle rows
    return "silver"; // Bottom rows
  };

  const handleSelectSeats = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const checkIsBooked = (seatNumber: string): boolean => {
    console.log(selectedShow?.bookings)
      return !!(selectedShow?.bookings && selectedShow?.bookings.find((booking) => booking.seatsBooked.some((seat) => seat.seat === seatNumber)));
  }



  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 py-6 relative">
        {/* Header with improved visual hierarchy */}
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Select Your Seats
            </h1>
            <p className="text-gray-400 text-lg">Choose your preferred seats for an optimal viewing experience</p>
          </div>
          <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 group">
            <Cross onClick={() => setStep('DateBook')} className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Enhanced screen visualization */}
        <div className="relative mb-24">
          <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mb-4 shadow-lg shadow-purple-500/20" />
          <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto p-6 text-center bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700 shadow-xl transform perspective-1000 rotateX-5">
            <h2 className="font-semibold text-2xl md:text-3xl text-gray-200 tracking-wide uppercase">Cinema Screen</h2>
          </div>
        </div>

        {/* Improved movie info sidebar */}
        <div className="fixed z-50 top-32 right-10 bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-2xl w-72 p-6 border border-gray-700">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Movie Details</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            
            <div className="space-y-3 mt-4">
              <p className="text-gray-200 font-medium">
                <span className="text-gray-400 text-sm block">Title</span>
                {movie.title}
              </p>
              <p className="text-gray-200 font-medium">
                <span className="text-gray-400 text-sm block">Show Time</span>
                {selectedShow ? formatTime(selectedShow.showTime) : 'N/A'}
              </p>
              <p className="text-gray-200 font-medium">
                <span className="text-gray-400 text-sm block">Duration</span>
                {movie.duration} mins
              </p>
              
              <div className="pt-3 border-t border-gray-700 mt-4">
                <p className="text-gray-400 text-sm mb-2">Selected Seats:</p>
                {selectedSeats.length > 0 ? (
                  <>
                    <p className="text-gray-400 text-sm mb-2">Total: {showPrices && getTotalPrice(selectedSeats, showPrices)}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <span key={seat} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-sm">{seat.split('/')[1]}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 italic text-sm">No seats selected</p>
                )}
              </div>
              
            </div>
            
            {selectedSeats.length > 0 && (
              <button onClick={() => setStep('Payment')} className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30 transform hover:scale-[1.02] duration-300">
                Continue to Payment
              </button>
            )}
          </div>
        </div>

        {/* Enhanced seating layout */}
        <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 mb-12 shadow-xl border border-gray-700/50 overflow-auto">
          <div className="grid grid-cols-10 gap-4 md:gap-6 justify-items-center">
            {seats.map((seat, rowIndex) => (
              <React.Fragment key={seat}>
                {Array.from({ length: 10 }, (_, index) => {
                  const seatCategory = getSeatCategory(rowIndex);
                  return (
                    <div className="relative group" key={`${seat}-${index + 1}`}>
                      {index === 0 && (
                        <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
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
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-gray-500 text-xs">
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

        {/* Improved legend */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 py-6 px-8 bg-gray-800/60 backdrop-blur-lg rounded-xl w-fit mx-auto border border-gray-700/50 shadow-lg">

            {/* Booked */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-gradient-to-r from-rose-400 to-rose-500 shadow-lg shadow-rose-500/30"></div>
              <span className="text-gray-300">Booked</span>
            </div>

            {/* Selected */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-500/30"></div>
              <span className="text-gray-300">Selected</span>
            </div>

            {/* Silver Category */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-gradient-to-r from-gray-400 to-gray-500 shadow-lg shadow-gray-500/30"></div>
              <span className="text-gray-300">Silver Class</span>
            </div>

            {/* Gold Category */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/30"></div>
              <span className="text-gray-300">Gold Class</span>
            </div>

            {/* Platinum Category */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg shadow-blue-500/30"></div>
              <span className="text-gray-300">Platinum Class</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHall;