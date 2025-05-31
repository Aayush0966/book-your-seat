import React from 'react';
import { Metadata } from 'next';
import TicketPricingPageClient from './TicketPricingPageClient';

export const metadata: Metadata = {
  title: "Ticket Rates & Pricing - Book Your Seat",
  description: "View our competitive ticket prices for Standard, 3D, and IMAX movie experiences. Choose from Premium, Preferred, or Standard seating options with transparent pricing.",
  keywords: ["ticket prices", "movie rates", "cinema pricing", "IMAX prices", "3D movie tickets", "seat pricing", "movie theater rates"],
  authors: [{ name: "Book Your Seat" }],
  openGraph: {
    title: "Ticket Rates & Pricing - Book Your Seat",
    description: "View our competitive ticket prices for Standard, 3D, and IMAX movie experiences with transparent pricing.",
    url: "/ticket-rate",
    siteName: "Book Your Seat",
    images: [
      {
        url: "/og-pricing.jpg",
        width: 1200,
        height: 630,
        alt: "Movie Ticket Pricing - Book Your Seat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ticket Rates & Pricing - Book Your Seat",
    description: "View our competitive ticket prices for Standard, 3D, and IMAX movie experiences.",
    images: ["/og-pricing.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const TicketRatePage = () => {
  return <TicketPricingPageClient />;
};

export default TicketRatePage;