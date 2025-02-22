import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/bookingContext";
import { CreditCard, Wallet, Clock, CalendarDays, ChevronLeft, Lock } from "lucide-react";
import { formatCurrency, formatTime, getTotalPrice } from "@/lib/utils";
import { Booking, BookingRequest, MovieWithShows } from "@/types/movie";
import axios from 'axios';
import { getSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Payment = ({ movie }: { movie: MovieWithShows }) => {
  const { selectedShow, selectedSeats, setStep, selectedDate } = useBooking();
  const [selectedMethod, setSelectedMethod] = useState<'esewa' | 'khalti' | null>(null);
  
  const seatPrices = selectedShow?.pricing?.find((price) => price.screenId === 1)?.prices  ;
  const totalAmount = seatPrices ? getTotalPrice(selectedSeats, seatPrices) : 0;
  const convenience = totalAmount * 0.02;
  const router = useRouter()

  const handleBooking = async () => {
    try {
      const seatsWithPrices = selectedSeats.map((seat) => {
        const [category, seatNumber] = seat.split('/');
        const seatPrice = seatPrices && seatPrices[category as keyof typeof seatPrices] || 0;
        return { seat, price: seatPrice };
      });
      

      const bookingDetails: BookingRequest = {
        showId: selectedShow!.id,
        seatsBooked: seatsWithPrices,
        showDate: Math.floor(selectedDate!.getTime() / 1000),
        bookingDate: Math.floor(Date.now() / 1000),
        totalPrice: totalAmount,
      };

      const response = await axios.post('/api/booking', bookingDetails);
      if (response.statusText == 'Created') {
        toast.success("Show booked successfully");
        console.log(response.data)
        setTimeout(() => {
          router.push(`/booking/${response.data.bookingId}`);
        }, 2000);
      } else {
        toast.error(`Something went wrong: ${response.data.error}`);
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Movie Details */}
      <Card className="bg-gradient-to-r from-dark-background to-dark-background-secondary text-text border border-dark-background-secondary">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{movie?.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <Clock className="h-4 w-4" />
            <span>{selectedShow && formatTime(selectedShow?.showTime)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <CalendarDays className="h-4 w-4" />
            <span>{selectedDate ? selectedDate.toDateString() : ''}</span>
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="bg-dark-background text-text border border-dark-background-secondary">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
          <p className="text-sm text-text-secondary">({selectedSeats.length} {selectedSeats.length === 1 ? 'ticket' : 'tickets'})</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedSeats.map((seat) => {
            const [category, seatNumber] = seat.split('/');
            const seatPrice = seatPrices && seatPrices[category as keyof typeof seatPrices] || 0;

            return (
              <div key={seat} className="flex justify-between items-center p-3 bg-dark-background-secondary rounded-lg">
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold 
                    ${category === 'silver' ? 'bg-gray-500 text-gray-100' : 
                      category === 'gold' ? 'bg-yellow-500 text-yellow-900' : 
                      'bg-blue-500 text-blue-900'}`}>
                    {category.toUpperCase()}
                  </span>
                  <p className="text-sm text-text-secondary">{seatNumber}</p>
                </div>
                <p className="font-medium">{formatCurrency(seatPrice)}</p>
              </div>
            );
          })}
          
          {/* Convenience Fee */}
          <div className="flex justify-between items-center border-t border-dark-background-secondary pt-3">
            <p className="text-sm text-text-secondary">Convenience Fee</p>
            <p className="font-medium">{formatCurrency(convenience)}</p>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center border-t border-dark-background-secondary pt-4">
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(totalAmount + convenience)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-dark-background text-text border border-dark-background-secondary">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`h-24 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 group
                ${selectedMethod === 'esewa' 
                  ? 'border-primary bg-dark-background-secondary' 
                  : 'border-dark-background-secondary hover:border-primary/50'}`}
              onClick={() => setSelectedMethod('esewa')}
            >
              <CreditCard className={`h-6 w-6 transition-all ${
                selectedMethod === 'esewa' ? 'text-primary' : 'text-text-secondary group-hover:text-primary/70'
              }`} />
              <p className="font-medium">Esewa</p>
            </button>

            <button
              className={`h-24 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 group
                ${selectedMethod === 'khalti' 
                  ? 'border-primary bg-dark-background-secondary' 
                  : 'border-dark-background-secondary hover:border-primary/50'}`}
              onClick={() => setSelectedMethod('khalti')}
            >
              <Wallet className={`h-6 w-6 transition-all ${
                selectedMethod === 'khalti' ? 'text-primary' : 'text-text-secondary group-hover:text-primary/70'
              }`} />
              <p className="font-medium">Khalti</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          className="w-1/3 h-12 flex items-center justify-center gap-2"
          onClick={() => setStep("SeatBook")}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
        onClick={() => handleBooking()}
          className={`w-2/3 h-12 flex items-center justify-center gap-2 transition-all
            ${selectedMethod 
              ? 'bg-gradient-to-r from-primary to-secondary hover:from-dark-primary hover:to-dark-secondary' 
              : 'bg-text-secondary cursor-not-allowed'}`}
          disabled={!selectedMethod}
        >
          <Lock className="h-4 w-4" />
          Pay {formatCurrency(totalAmount + convenience)}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
