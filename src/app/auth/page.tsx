import MovieAuth from '@/components/auth/AuthContainer'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sign In / Sign Up - Book Your Seat",
  description: "Sign in to your account or create a new account to book movie tickets. Secure authentication for a personalized movie booking experience.",
  keywords: ["sign in", "sign up", "login", "register", "authentication", "movie booking account"],
  authors: [{ name: "Book Your Seat" }],
  openGraph: {
    title: "Sign In / Sign Up - Book Your Seat",
    description: "Sign in to your account or create a new account to book movie tickets.",
    url: "/auth",
    siteName: "Book Your Seat",
    type: "website",
  },
  robots: {
    index: false, // Auth pages should not be indexed
    follow: false,
  },
};

const page = () => {
  return (
    <MovieAuth />
  )
}

export default page