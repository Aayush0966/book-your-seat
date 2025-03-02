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
  
  const data = searchParams.get('data');
  const router = useRouter();

  useEffect(() => {
    const processPayment = async () => {
      if (!data) return;
      
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        
        const result = await axios.post('/api/payment', {
          data,
          paymentMethod
        });
        
        if (result.status === 201) {
          if (result.data.url) {
            router.push(result.data.url);
          } else {
            setSuccess(true);
          }
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while processing payment');
      } 
    };
    
    processPayment();
  }, [data, paymentMethod, router]);
  
  if (!data) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-gray-700">No payment data provided. Please return to checkout.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {loading && (
        <div className="flex flex-col items-center py-8">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-red-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
          </div>
          <p className="mt-4 text-red-700 font-medium">Processing your payment via {paymentMethod}...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Payment Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 p-4 rounded-md border border-green-200 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Payment Successful</h3>
              <p className="text-sm text-green-700 mt-1">
                Your payment has been processed successfully.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentProcessor;