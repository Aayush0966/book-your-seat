'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PaymentFailure = () => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(2);
  
  useEffect(() => {
    // Redirect after 2 seconds
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2000);
    
    // Countdown timer
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    
    // Clean up timers
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="flex flex-col items-center">
          {/* Error Icon */}
          <div className="rounded-full bg-red-100 p-3 mb-4">
            <svg className="h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-red-700 mb-2">Payment Failed</h2>
          
          <p className="text-gray-600 text-center mb-4">
            We couldn't process your payment. Please check your payment details and try again.
          </p>
          
          {/* Error details - optional, can be expanded based on specific error info */}
          <div className="bg-red-50 p-4 rounded-md border border-red-200 w-full mb-6">
            <p className="text-sm text-red-700">
              Your transaction was declined. Please contact your bank or try a different payment method.
            </p>
          </div>
          
          {/* Redirect countdown */}
          <div className="text-sm text-gray-500 flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Redirecting to home page in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;