import { FC } from "react";
import clsx from "clsx";

interface SeatProps {
  seatNumber: string;
  isBooked: boolean;
  selectedSeats: string[];
  handleSelectSeats: (seatNumber: string) => void;
  category: "silver" | "gold" | "platinum";
}

const Seat: FC<SeatProps> = ({
  seatNumber,
  category,
  isBooked,
  handleSelectSeats,
  selectedSeats,
}) => {
  const isSelected = selectedSeats.includes(seatNumber);

  // Define seat colors based on category
  const categoryColors = {
    silver: "from-gray-400 to-gray-500 shadow-gray-500/30",
    gold: "from-yellow-400 to-yellow-500 shadow-yellow-500/30",
    platinum: "from-blue-400 to-blue-500 shadow-blue-500/30",
  };

  return (
    <button
      disabled={isBooked}
      onClick={() => !isBooked && handleSelectSeats(`${seatNumber}`)}
      className={clsx(
        // Enhanced responsive sizing: better mobile touch targets
        "w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-sm sm:rounded-md md:rounded-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center text-xs font-medium shadow-lg",
        // Enhanced touch-friendly interactions
        "active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-800 touch-manipulation",
        // Improved mobile tap area
        "relative before:absolute before:inset-[-2px] before:rounded-md before:content-[''] before:z-[-1]",
        isBooked
          ? "bg-gradient-to-r from-rose-400 to-rose-500 shadow-rose-500/30 cursor-not-allowed focus:ring-rose-400 opacity-80"
          : isSelected
          ? "bg-gradient-to-r from-green-400 to-green-500 shadow-green-500/30 focus:ring-green-400 ring-2 ring-green-400/50"
          : `bg-gradient-to-r ${categoryColors[category]} hover:shadow-lg focus:ring-${category === 'silver' ? 'gray' : category === 'gold' ? 'yellow' : 'blue'}-400 hover:brightness-110`
      )}
      title={`Seat ${seatNumber} (${category.toUpperCase()}${isBooked ? " - Booked" : ""})`}
      aria-label={`Seat ${seatNumber.split('/')[1]} in ${category} section${isBooked ? " - unavailable" : isSelected ? " - selected" : " - available"}`}
    >
      <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium leading-none">
        {seatNumber.split('/')[1].split('-')[1]}
      </span>
    </button>
  );
};

export default Seat;
