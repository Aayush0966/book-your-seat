import { FC } from 'react';

interface SeatProps {
  seatNumber: string;
  isBooked: boolean;
  selectedSeats: string[];
  handleSelectSeats: (seatNumber: string) => void;
}
const Seat: FC<SeatProps> = ({ seatNumber, isBooked, handleSelectSeats, selectedSeats }) => {

  const isSelected = selectedSeats.find((seat) =>  seat === seatNumber)
  console.log(selectedSeats)
  return (
    <button
      disabled={isBooked}
      onClick={() => !isBooked && handleSelectSeats(seatNumber)}
      className={`
        w-12 h-12 rounded-md transition-all duration-300 transform hover:scale-110
        flex items-center justify-center text-xs font-medium
        ${isBooked 
          ? 'bg-gradient-to-r from-rose-400 to-rose-500 shadow-lg shadow-rose-500/30 cursor-not-allowed' 
          : isSelected
          ? 'bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg shadow-blue-500/30'
          : 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50'
        }
      `}
      title={`Seat ${seatNumber}`}
    >
      <span className="p-4">{seatNumber}</span>
    </button>
  );
};

export default Seat;