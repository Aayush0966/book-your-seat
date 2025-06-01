
import type { Metadata } from 'next';
import '@/app/globals.css';
import Navigation from '@/components/Navigation';
import {SessionProvider } from 'next-auth/react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import Footer from '@/components/Footer';


// const roboto = Roboto({
//   variable: '--font-roboto',
//   weight: '500'
// });

export const metadata: Metadata = {
  title: 'Book Your Seat',
  description: 'Book your seat - Reserve your spot easily',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <SessionProvider>
        <TooltipProvider>
        <Navigation />
        {children}
        <Footer />
        </TooltipProvider>
        </SessionProvider>
  );
}
