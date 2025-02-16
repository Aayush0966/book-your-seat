import { Cross } from "lucide-react";
import Seat from "./Seat";

const BookingHall = () => {
  const totalSeats = 200;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-400 mt-2">Select your preferred seats for the show</p>
          </div>
          <Cross className="h-6 w-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
        </div>

        {/* Screen */}
        <div className="relative mb-16">
          <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-4" />
          <div className="w-2/3 mx-auto p-6 text-center bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
            <h2 className="font-semibold text-3xl text-gray-300">Screen</h2>
          </div>
        </div>

        {/* Seats Container */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-2 mb-8">
          <div className="flex flex-wrap gap-6 justify-items-center">
            {Array.from({ length: totalSeats }, (_, index) => (
              <Seat key={index} seatNumber={index + 1} isBooked={false} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 py-4 px-6 bg-gray-800/30 backdrop-blur-sm rounded-lg w-fit mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-md bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30"></div>
            <span className="text-gray-300">Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-md bg-gradient-to-r from-rose-400 to-rose-500 shadow-lg shadow-rose-500/30"></div>
            <span className="text-gray-300">Booked</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-md bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg shadow-blue-500/30"></div>
            <span className="text-gray-300">Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHall;