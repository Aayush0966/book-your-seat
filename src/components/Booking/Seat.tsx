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
        "w-12 h-12 rounded-md transition-all duration-300 transform hover:scale-110 flex items-center justify-center text-xs font-medium shadow-lg",
        isBooked
          ? "bg-gradient-to-r from-rose-400 to-rose-500 shadow-rose-500/30 cursor-not-allowed"
          : isSelected
          ? "bg-gradient-to-r from-green-400 to-green-500 shadow-green-500/30"
          : `bg-gradient-to-r ${categoryColors[category]} hover:shadow-lg`
      )}
      title={`Seat ${seatNumber} (${category.toUpperCase()} ${isBooked ? " - Booked" : ""})`}
    >
      <span className="p-4">{seatNumber.split('/')[1]}</span>
    </button>
  );
};

export default Seat;
