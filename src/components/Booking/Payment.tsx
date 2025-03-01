import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/bookingContext";
import { 
  CreditCard, 
  Wallet, 
  Clock, 
  CalendarDays, 
  ChevronLeft, 
  Lock, 
  Shield, 
  CheckCircle,
  Tag,
  RefreshCw
} from "lucide-react";
import { formatCurrency, formatTime, getTotalPrice } from "@/lib/utils";
import { BookingRequest, MovieWithShows, Price } from "@/types/movie";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Payment = ({ movie }: { movie: MovieWithShows }) => {
  const { selectedShow, selectedSeats, setStep, selectedDate } = useBooking();
  const [selectedMethod, setSelectedMethod] = useState<'esewa' | 'khalti' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const seatPrices = Array.isArray(selectedShow?.pricing) 
    ? (selectedShow.pricing as Price[]).find((price: Price) => price.screenId === 1)?.prices 
    : null;
  const totalAmount = seatPrices ? getTotalPrice(selectedSeats, seatPrices) : 0;
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBooking = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    try {
      const seatsWithPrices = selectedSeats.map((seat) => {
        const [category, seatNumber] = seat.split('/');
        const seatPrice = seatPrices && seatPrices[category as keyof typeof seatPrices] || 0;
        return { seat, price: seatPrice };
      });
      
      const bookingDetails: BookingRequest = {
        showId: selectedShow!.id,
        selectedTime: selectedShow?.showTime!,
        seatsBooked: seatsWithPrices,
        showDate: Math.floor(selectedDate!.getTime() / 1000),
        bookingDate: Math.floor(Date.now() / 1000),
        totalPrice: totalAmount,
      };

      const response = await axios.post('/api/booking', bookingDetails);
      if (response.status === 200) {
        console.log('redirecting....')
        window.open(response.data.paymentUrl, '_blank')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Error processing payment");
      } else {
        toast.error("Internal Server Error. Please try again later.");
      }
      // setTimeout(() => {
      //   router.push("/home");
      // }, 2000);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-16">
      {/* Movie Details with Red Theme */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-red-500 to-red-700"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{movie?.title}</CardTitle>
          <div className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
            Booking in Progress
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20">
                <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <span>{selectedShow && formatTime(selectedShow?.showTime)}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20">
                <CalendarDays className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <span>{selectedDate ? selectedDate.toDateString() : ''}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Summary with Red Theme */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Order Summary
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({selectedSeats.length} {selectedSeats.length === 1 ? 'ticket' : 'tickets'})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedSeats.map((seat) => {
            const [category, seatNumber] = seat.split('/');
            const seatPrice = seatPrices && seatPrices[category as keyof typeof seatPrices] || 0;

            return (
              <div key={seat} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex gap-3 items-center">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold 
                    ${category === 'silver' ? 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200' : 
                      category === 'gold' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                    {category.toUpperCase()}
                  </span>
                  <p className="font-medium">Seat {seatNumber}</p>
                </div>
                <p className="font-medium text-red-600 dark:text-red-400">{formatCurrency(seatPrice)}</p>
              </div>
            );
          })}
      

          {/* Total Amount */}
          <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">Total Amount</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(totalAmount)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods with Red Theme */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`h-24 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 group
                ${selectedMethod === 'esewa' 
                  ? 'border-red-600 bg-red-50 dark:bg-red-900/20 dark:border-red-500' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700'}`}
              onClick={() => setSelectedMethod('esewa')}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                selectedMethod === 'esewa' 
                  ? 'bg-red-100 dark:bg-red-900/30' 
                  : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-red-50 dark:group-hover:bg-red-900/10'
              }`}>
                <CreditCard className={`h-6 w-6 transition-all ${
                  selectedMethod === 'esewa' 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400'
                }`} />
              </div>
              <p className={`font-medium ${
                selectedMethod === 'esewa' 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}>eSewa</p>
            </button>

            <button
              className={`h-24 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 group
                ${selectedMethod === 'khalti' 
                  ? 'border-red-600 bg-red-50 dark:bg-red-900/20 dark:border-red-500' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700'}`}
              onClick={() => setSelectedMethod('khalti')}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                selectedMethod === 'khalti' 
                  ? 'bg-red-100 dark:bg-red-900/30' 
                  : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-red-50 dark:group-hover:bg-red-900/10'
              }`}>
                <Wallet className={`h-6 w-6 transition-all ${
                  selectedMethod === 'khalti' 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400'
                }`} />
              </div>
              <p className={`font-medium ${
                selectedMethod === 'khalti' 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}>Khalti</p>
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-0">
          <div className="w-full p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span>Your payment information is encrypted and secure</span>
          </div>
          
          {selectedMethod && (
            <div className="w-full p-3 bg-red-50 dark:bg-red-900/10 rounded-lg flex items-center gap-2 text-sm text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/30">
              <CheckCircle className="h-4 w-4" />
              <span>{selectedMethod === 'esewa' ? 'eSewa' : 'Khalti'} selected as your payment method</span>
            </div>
          )}
        </CardFooter>
      </Card>

      {/* Action Buttons with Red Theme */}
      <div className="flex gap-4 pt-6">
        <Button
          variant="outline"
          className="w-1/3 h-12 flex items-center justify-center gap-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={() => setStep("SeatBook")}
          disabled={isProcessing}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={() => handleBooking()}
          className={`w-2/3 h-12 flex items-center justify-center gap-2 transition-all
            ${!selectedMethod 
              ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400' 
              : isProcessing
                ? 'bg-red-600 dark:bg-red-700 text-white'
                : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
            }`}
          disabled={!selectedMethod || isProcessing}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Pay {formatCurrency(totalAmount)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Payment;