import React from 'react'
import { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: "Contact Us - Book Your Seat",
  description: "Get in touch with Book Your Seat. Contact our support team for assistance with movie bookings, technical issues, or general inquiries. We're here to help!",
  keywords: ["contact", "support", "help", "customer service", "movie booking help", "cinema support"],
  authors: [{ name: "Book Your Seat" }],
  openGraph: {
    title: "Contact Us - Book Your Seat",
    description: "Get in touch with Book Your Seat. Contact our support team for assistance with movie bookings and inquiries.",
    url: "/contact",
    siteName: "Book Your Seat",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Book Your Seat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Book Your Seat",
    description: "Get in touch with Book Your Seat support team for assistance with movie bookings.",
    images: ["/og-contact.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const ContactPage = () => {
  return <ContactPageClient />
}

export default ContactPage