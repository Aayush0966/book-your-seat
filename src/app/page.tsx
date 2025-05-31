import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Book Your Seat - Premium Movie Ticket Booking",
  description: "Book movie tickets online with ease. Choose from the latest movies, select your preferred seats, and enjoy a seamless booking experience.",
  keywords: ["movie tickets", "cinema booking", "online booking", "movie theater", "film tickets"],
  authors: [{ name: "Book Your Seat" }],
  openGraph: {
    title: "Book Your Seat - Premium Movie Ticket Booking",
    description: "Book movie tickets online with ease. Choose from the latest movies and select your preferred seats.",
    url: "/",
    siteName: "Book Your Seat",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  redirect('/home')
}