import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBooking } from "@/context/bookingContext";
import { 
  Clock, 
  CalendarDays, 
  ChevronLeft, 
  Lock, 
  Shield, 
  CheckCircle,
  RefreshCw,
  Tag,
  X
} from "lucide-react";
import { formatCurrency, formatTime, getTotalPrice } from "@/lib/utils";
import { BookingRequest, Coupon, MovieWithShows, Price } from "@/types/movie";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Payment = ({ movie }: { movie: MovieWithShows }) => {
  const { selectedShow, selectedSeats, setStep, selectedDate } = useBooking();
  const [selectedMethod, setSelectedMethod] = useState<'ESEWA' | 'KHALTI' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  
  const seatPrices = Array.isArray(selectedShow?.pricing) 
    ? (selectedShow.pricing as Price[]).find((price: Price) => price.screenId === selectedShow.screenId)?.prices 
    : null;
  const originalAmount = seatPrices ? getTotalPrice(selectedSeats, seatPrices) : 0;
  const totalAmount = originalAmount - discount;
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCouponApply = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const response = await axios.get(`/api/admin/coupons?code=${couponCode}`)
      if (response.status == 200) {
        const discount  = response.data.discount;
        const discountAmount = Math.floor(originalAmount * (discount / 100));
        setDiscount(discountAmount)
        setAppliedCoupon(couponCode)
        toast.success("Coupon applied!");
      } else {
        toast.error("Invalid coupon code. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.error || "Error validating coupon. Please try again.");
      } else {
      toast.error("Internal Server Error. Please try again later.");
      }
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success("Coupon removed");
  };

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
        paymentMethod: selectedMethod,
        couponCode: appliedCoupon || undefined,
        discount: discount || undefined
      };

      const response = await axios.post('/api/booking', bookingDetails);
      if (response.status === 200) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Error processing payment");
      } else {
        toast.error("Internal Server Error. Please try again later.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 md:space-y-6 animate-fade-in pb-16 relative z-10 px-3 sm:px-4 md:px-6">
      
      {/* Enhanced Movie Details Card */}
      <Card className="bg-white/50 dark:bg-gray-800/50 border-0 shadow-lg overflow-hidden backdrop-blur-sm">
        <div className="h-1.5 sm:h-2 bg-gradient-to-r from-red-500 to-red-700"></div>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-2 p-3 sm:p-4 md:p-6">
          <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">{movie?.title}</CardTitle>
          <div className="px-2 sm:px-3 py-1 rounded-full bg-red-100/90 text-red-800 text-xs sm:text-sm font-semibold backdrop-blur-sm dark:bg-red-900/40 dark:text-red-200 self-start sm:self-auto">
            Booking in Progress
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6 pt-0 sm:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 pt-2">
            <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-800 dark:text-gray-100">
              <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-50/90 dark:bg-red-900/30 backdrop-blur-sm">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-300" />
              </div>
              <span className="font-semibold text-xs sm:text-sm">{selectedShow && formatTime(selectedShow?.showTime)}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-800 dark:text-gray-100">
              <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-50/90 dark:bg-red-900/30 backdrop-blur-sm">
                <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-300" />
              </div>
              <span className="font-semibold text-xs sm:text-sm">{selectedDate ? selectedDate.toDateString() : ''}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Order Summary Card */}
      <Card className="bg-white/50 dark:bg-gray-800/50 border-0 shadow-lg backdrop-blur-sm">
        <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4 md:p-6">
          <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span>Order Summary</span>
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
              ({selectedSeats.length} {selectedSeats.length === 1 ? 'ticket' : 'tickets'})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 md:space-y-4 p-3 sm:p-4 md:p-6 pt-0">
          {selectedSeats.map((seat) => {
            const [category, seatNumber] = seat.split('/');
            const seatPrice = seatPrices && seatPrices[category as keyof typeof seatPrices] || 0;

            return (
              <div key={seat} className="flex justify-between items-center p-2 sm:p-3 bg-gray-50/80 dark:bg-gray-700/60 rounded-lg backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-3 sm:items-center">
                  <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm sm:rounded-md text-xs font-bold w-fit
                    ${category === 'silver' ? 'bg-gray-200/90 text-gray-800 dark:bg-gray-600/90 dark:text-gray-100' : 
                      category === 'gold' ? 'bg-yellow-100/90 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' : 
                      'bg-blue-100/90 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'}`}>
                    {category.toUpperCase()}
                  </span>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-xs sm:text-sm md:text-base">Seat {seatNumber}</p>
                </div>
                <p className="font-semibold text-red-700 dark:text-red-300 text-xs sm:text-sm md:text-base">{formatCurrency(seatPrice)}</p>
              </div>
            );
          })}

          {/* Enhanced Coupon Code Section */}
          <div className="mt-3 sm:mt-4 md:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Apply Coupon</p>
            
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50/80 dark:bg-green-900/30 rounded-lg text-green-800 dark:text-green-200 border border-green-100 dark:border-green-900/50">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Tag className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm md:text-base">
                    {appliedCoupon.toUpperCase()} applied: {formatCurrency(discount)} off
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900/50"
                  onClick={removeCoupon}
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-white/70 dark:bg-gray-700/70 border-gray-200 dark:border-gray-600 text-xs sm:text-sm md:text-base h-8 sm:h-10"
                />
                <Button
                  variant="outline"
                  className="whitespace-nowrap border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 text-xs sm:text-sm md:text-base h-8 sm:h-10 px-2 sm:px-3"
                  onClick={handleCouponApply}
                  disabled={isApplyingCoupon || !couponCode.trim()}
                >
                  {isApplyingCoupon ? (
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin mr-1" />
                  ) : (
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  )}
                  Apply
                </Button>
              </div>
            )}
          </div>
      
          {/* Enhanced Total Amount Section */}
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4 mt-3 sm:mt-4 md:mt-6">
            {discount > 0 && (
              <div className="flex flex-col w-full mb-1 sm:mb-2 space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">Subtotal</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm md:text-base">{formatCurrency(originalAmount)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs sm:text-sm font-medium text-green-900 dark:text-green-100">Discount</p>
                  <p className="font-medium text-green-900 dark:text-green-100 text-xs sm:text-sm md:text-base">-{formatCurrency(discount)}</p>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center w-full">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">Total Amount</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-700 dark:text-red-300">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Payment Methods Card */}
      <Card className="bg-white/50 dark:bg-gray-800/50 border-0 shadow-lg backdrop-blur-sm">
        <CardHeader className="p-3 sm:p-4 md:p-6">
          <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            <button
              className={`h-16 sm:h-20 md:h-24 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-1 sm:gap-2 group backdrop-blur-sm active:scale-95 touch-manipulation
                ${selectedMethod === 'ESEWA' 
                  ? 'border-green-600 bg-green-50/90 dark:bg-green-900/40 dark:border-green-400' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600'}`}
              onClick={() => setSelectedMethod('ESEWA')}
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center">
                <Image 
                  src="/esewa.png"
                  alt="eSewa" 
                  width={32} 
                  height={32}
                  className="sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" 
                />
              </div>
              <p className={`font-semibold text-xs sm:text-sm md:text-base ${
                selectedMethod === 'ESEWA' 
                  ? 'text-green-700 dark:text-green-300' 
                  : 'text-gray-800 dark:text-gray-200'
              }`}>eSewa</p>
            </button>

            <button
              className={`h-16 sm:h-20 md:h-24 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-1 sm:gap-2 group backdrop-blur-sm active:scale-95 touch-manipulation
                ${selectedMethod === 'KHALTI' 
                  ? 'border-purple-600 bg-purple-50/90 dark:bg-purple-900/40 dark:border-purple-400' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600'}`}
              onClick={() => setSelectedMethod('KHALTI')}
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center">
                <Image 
                  src="/khalti.png"
                  alt="Khalti" 
                  width={32} 
                  height={32}
                  className="sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" 
                />
              </div>
              <p className={`font-semibold text-xs sm:text-sm md:text-base ${
                selectedMethod === 'KHALTI' 
                  ? 'text-purple-700 dark:text-purple-300' 
                  : 'text-gray-800 dark:text-gray-200'
              }`}>Khalti</p>
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4 pt-0 p-3 sm:p-4 md:p-6">
          <div className="w-full p-2 sm:p-3 bg-gray-50/80 dark:bg-gray-700/50 rounded-lg flex items-center gap-2 text-xs sm:text-sm text-gray-800 dark:text-gray-200 backdrop-blur-sm font-medium">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 dark:text-red-300 flex-shrink-0" />
            <span>Your payment information is encrypted and secure</span>
          </div>
          
          {selectedMethod && (
            <div className="w-full p-2 sm:p-3 bg-green-50/80 dark:bg-green-900/30 rounded-lg flex items-center gap-2 text-xs sm:text-sm text-green-800 dark:text-green-200 border border-green-100 dark:border-green-900/50 backdrop-blur-sm font-medium">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>{selectedMethod === 'ESEWA' ? 'eSewa' : 'Khalti'} selected as your payment method</span>
            </div>
          )}
        </CardFooter>
      </Card>

      {/* Enhanced Responsive Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 md:pt-6">
        <Button
          variant="outline"
          className="w-full sm:w-1/3 h-10 sm:h-11 md:h-12 flex items-center justify-center gap-1.5 sm:gap-2 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50/90 dark:hover:bg-gray-800/90 backdrop-blur-sm font-medium text-xs sm:text-sm md:text-base active:scale-95"
          onClick={() => setStep("SeatBook")}
          disabled={isProcessing}
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          Back
        </Button>
        <Button
          onClick={() => handleBooking()}
          className={`w-full sm:w-2/3 h-10 sm:h-11 md:h-12 flex items-center justify-center gap-1.5 sm:gap-2 transition-all backdrop-blur-sm font-medium text-xs sm:text-sm md:text-base touch-manipulation
            ${!selectedMethod 
              ? 'bg-gray-300/90 dark:bg-gray-700/90 cursor-not-allowed text-gray-600 dark:text-gray-300' 
              : isProcessing
                ? 'bg-green-600/95 dark:bg-green-700/95 text-white'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white active:scale-95'
            }`}
          disabled={!selectedMethod || isProcessing}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              <span className="hidden sm:inline">Processing...</span>
              <span className="sm:hidden">Processing</span>
            </>
          ) : (
            <>
              <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Pay {formatCurrency(totalAmount)}</span>
              <span className="sm:hidden">{formatCurrency(totalAmount)}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Payment;