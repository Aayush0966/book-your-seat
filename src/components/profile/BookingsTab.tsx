import React from 'react';
import { Calendar, Clock, Film } from 'lucide-react';

const BookingsTab = () => {
  // Mock booking history
  const bookings = [
    {
      id: 1,
      movie: "Inception Returns",
      date: "2025-01-25",
      time: "19:30",
      screen: "IMAX",
      seats: ["G12", "G13"],
      amount: 600,
      status: "completed"
    },
    {
      id: 2,
      movie: "The Matrix Resurrections",
      date: "2025-02-10",
      time: "20:00",
      screen: "3D",
      seats: ["F7", "F8"],
      amount: 500,
      status: "upcoming"
    }
  ];

  return (
    <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
        Booking History
      </h2>
      <div className="space-y-4">
        {bookings.map(booking => (
          <div
            key={booking.id}
            className="border-b border-background-secondary dark:border-dark-background last:border-0 pb-4 last:pb-0"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h3 className="font-bold text-dark-text dark:text-text">{booking.movie}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-text-secondary dark:text-dark-text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {booking.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {booking.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Film className="w-4 h-4" />
                    {booking.screen}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'completed'
                    ? 'bg-success/10 text-success'
                    : 'bg-warning/10 text-warning'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <p className="mt-2 text-primary font-bold">₹{booking.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsTab; 