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
        // Responsive sizing: smaller on mobile, larger on desktop
        "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md transition-all duration-300 transform hover:scale-110 flex items-center justify-center text-xs font-medium shadow-lg",
        // Touch-friendly on mobile
        "active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-800",
        isBooked
          ? "bg-gradient-to-r from-rose-400 to-rose-500 shadow-rose-500/30 cursor-not-allowed focus:ring-rose-400"
          : isSelected
          ? "bg-gradient-to-r from-green-400 to-green-500 shadow-green-500/30 focus:ring-green-400"
          : `bg-gradient-to-r ${categoryColors[category]} hover:shadow-lg focus:ring-${category === 'silver' ? 'gray' : category === 'gold' ? 'yellow' : 'blue'}-400`
      )}
      title={`Seat ${seatNumber} (${category.toUpperCase()} ${isBooked ? " - Booked" : ""})`}
    >
      <span className="text-[10px] sm:text-xs md:text-sm font-medium">
        {seatNumber.split('/')[1].split('-')[1]}
      </span>
    </button>
  );
};

export default Seat;
