import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/bookingContext";
import { CreditCard, Wallet, Clock, CalendarDays, ChevronLeft, Lock } from "lucide-react";
import { formatCurrency, formatTime } from "@/lib/utils";
import { MovieWithShows } from "@/types/movie";

const Payment = ({ movie }: { movie: MovieWithShows }) => {
  const { selectedShow, selectedSeats, setStep } = useBooking();
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'wallet' | null>(null);
  const basePrice = 150;
  const totalAmount = selectedSeats.length * basePrice;
  const convenience = totalAmount * 0.02; 

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Movie Details Banner */}
      <div className="bg-gradient-to-r from-dark-background to-dark-background-secondary p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-primary">{movie?.title}</h2>
            <div className="flex gap-4 mt-2 text-sm text-text-secondary">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{selectedShow && formatTime(selectedShow?.showTime)}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{selectedShow && formatTime(selectedShow?.showTime)}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-secondary">Booking ID</p>
            <p className="font-mono text-primary">#BK{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <Card className="bg-dark-background text-text border-2 border-dark-background-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Order Summary
            <div className="text-sm font-normal text-text-secondary">
              ({selectedSeats.length} {selectedSeats.length === 1 ? 'ticket' : 'tickets'})
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-start p-4 bg-dark-background-secondary rounded-lg">
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Screen {selectedShow?.screenId}</p>
              <div className="space-y-1">
                <p className="text-sm text-text-secondary">Selected Seats</p>
                <p className="font-medium">{selectedSeats.join(", ")}</p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div>
                <p className="text-sm text-text-secondary">Ticket Price</p>
                <p className="font-medium">{formatCurrency(basePrice)} × {selectedSeats.length}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Convenience Fee</p>
                <p className="font-medium">{formatCurrency(convenience)}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-dark-background-secondary pt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Total Amount</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(totalAmount + convenience)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-dark-background text-text border-2 border-dark-background-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              className={`h-28 rounded-lg border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group
                ${selectedMethod === 'card' 
                  ? 'border-primary bg-dark-background-secondary' 
                  : 'border-dark-background-secondary hover:border-primary/50'}`}
              onClick={() => setSelectedMethod('card')}
            >
              <CreditCard className={`h-6 w-6 transition-colors duration-300 ${
                selectedMethod === 'card' ? 'text-primary' : 'text-text-secondary group-hover:text-primary/70'
              }`} />
              <div className="text-center">
                <p className="font-medium">Credit/Debit Card</p>
                <p className="text-sm text-text-secondary">All major cards accepted</p>
              </div>
            </button>

            <button
              className={`h-28 rounded-lg border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 group
                ${selectedMethod === 'wallet' 
                  ? 'border-primary bg-dark-background-secondary' 
                  : 'border-dark-background-secondary hover:border-primary/50'}`}
              onClick={() => setSelectedMethod('wallet')}
            >
              <Wallet className={`h-6 w-6 transition-colors duration-300 ${
                selectedMethod === 'wallet' ? 'text-primary' : 'text-text-secondary group-hover:text-primary/70'
              }`} />
              <div className="text-center">
                <p className="font-medium">Digital Wallet</p>
                <p className="text-sm text-text-secondary">Quick & secure payment</p>
              </div>
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
          className={`w-2/3 h-12 flex items-center justify-center gap-2 transition-all duration-300
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