import type { Metadata } from 'next';
import '@/app/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Roboto } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"

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
      <body
        className={`antialiased ${roboto.variable}`}
        suppressHydrationWarning
      >
        <SessionProvider>
        <Toaster position="top-right" />
        <Analytics />
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
