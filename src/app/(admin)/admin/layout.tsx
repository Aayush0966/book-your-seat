
import type { Metadata } from 'next';
import '@/app/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { ShowProvider } from '@/context/showContext';


// const roboto = Roboto({
//   variable: '--font-roboto',
//   weight: '500'
// });

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <SessionProvider>
        <ShowProvider>
        {children}
        </ShowProvider>
        </SessionProvider>

  );
}
