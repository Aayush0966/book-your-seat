import { AdminLogin } from '@/components/auth/AdminLogin'
import React from 'react'
import { cookies } from 'next/headers'
import Dashboard from '@/components/admin/Dashboard'
import { Metadata } from 'next'

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Admin Dashboard - Book Your Seat",
  description: "Admin panel for managing movies, bookings, users, and cinema operations. Secure access for authorized personnel only.",
  keywords: ["admin", "dashboard", "management", "cinema admin", "movie management"],
  authors: [{ name: "Book Your Seat" }],
  openGraph: {
    title: "Admin Dashboard - Book Your Seat",
    description: "Admin panel for managing cinema operations and bookings.",
    url: "/admin",
    siteName: "Book Your Seat",
    type: "website",
  },
  robots: {
    index: false, // Admin pages should not be indexed
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

const page = async () => {
    const cookieStore = await cookies()
    const loggedIn = cookieStore.get('loggedIn')

  return (
    <>
    {
        loggedIn && <Dashboard />
    }
    {
        !loggedIn && <AdminLogin />
    }
    </>
  )
}

export default page