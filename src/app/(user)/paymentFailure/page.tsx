import React from 'react';
import { Metadata } from 'next';
import PaymentFailureClient from './PaymentFailureClient';

export const metadata: Metadata = {
  title: "Payment Failed - Book Your Seat",
  description: "Your payment could not be processed. Please try again or contact support for assistance with your movie ticket booking.",
  keywords: ["payment failed", "booking error", "payment issue", "movie tickets"],
  authors: [{ name: "Book Your Seat" }],
  openGraph: {
    title: "Payment Failed - Book Your Seat",
    description: "Your payment could not be processed. Please try again or contact support.",
    url: "/paymentFailure",
    siteName: "Book Your Seat",
    type: "website",
  },
  robots: {
    index: false, // Payment failure pages should not be indexed
    follow: false,
  },
};

const PaymentFailurePage = () => {
  return <PaymentFailureClient />;
};

export default PaymentFailurePage;