import type { Metadata } from 'next';
import '@/app/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Roboto } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"
import AdvancedPreloader from '@/components/AdvancedPreloader';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
  subsets: ['latin']
});

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
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#ff0000" />
      <body
        className={`antialiased ${roboto.variable}`}
        suppressHydrationWarning
      >
        <SessionProvider>
        <Toaster position="top-right" />
        <Analytics />
        <AdvancedPreloader />
        <ServiceWorkerRegistration />
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
