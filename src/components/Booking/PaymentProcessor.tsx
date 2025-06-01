'use client'

import { PaymentMethod } from '@/types/movie';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PaymentProcessor = ({ paymentMethod }: { paymentMethod: PaymentMethod }) => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    const processPayment = async () => {

      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        let paymentData;

        if (paymentMethod === 'ESEWA') {
          const token = searchParams.get('data');
          paymentData = { data:token, paymentMethod };
        } else if (paymentMethod === 'KHALTI') {
          const pidx = searchParams.get('pidx');
          const purchaseOrderId = searchParams.get('purchase_order_id');
          paymentData = { data: {pidx, purchaseOrderId}, paymentMethod };
        }
        
        const result = await axios.post('/api/payment', paymentData);
        
        if (result.status === 201) {
          if (result.data.url) {
            router.push(result.data.url);
          } else {
            setSuccess(true);
          }
        }
      } catch (err: any) {
        setLoading(false)
        setError(err.message || 'An error occurred while processing payment');
        // router.push("/home")
      } 
    };
    
    processPayment();
  }, [ paymentMethod, router, searchParams]);
  
  // if (!) {
  //   return (
  //     <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
  //       <div className="flex">
  //         <div className="flex-shrink-0">
  //           <svg className="h-5 w-5 text-yellow-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  //             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  //           </svg>
  //         </div>
  //         <div className="ml-3">
  //           <p className="text-gray-700">No payment data provided. Please return to checkout.</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md mx-auto">
        {loading && (
          <div className="flex flex-col items-center py-6 sm:py-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 dark:border-gray-600 rounded-full"></div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-red-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
            </div>
            <p className="mt-4 text-red-700 dark:text-red-400 font-medium text-center text-sm sm:text-base">
              Processing your payment via {paymentMethod}...
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center">
              Please do not close this window
            </p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 sm:p-6 rounded-lg border border-red-200 dark:border-red-800 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-start">
              <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-3">
                <svg className="h-5 w-5 text-red-700 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-medium text-red-800 dark:text-red-200">Payment Error</h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1 leading-relaxed">{error}</p>
                <button 
                  onClick={() => router.push('/home')}
                  className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors duration-200 active:scale-95"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 sm:p-6 rounded-lg border border-green-200 dark:border-green-800 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-start">
              <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-3">
                <svg className="h-5 w-5 text-green-700 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-medium text-green-800 dark:text-green-200">Payment Successful</h3>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1 leading-relaxed">
                  Your payment has been processed successfully.
                </p>
                <button 
                  onClick={() => router.push('/bookings')}
                  className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors duration-200 active:scale-95"
                >
                  View Bookings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentProcessor;