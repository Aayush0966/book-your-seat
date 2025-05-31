'use client'

import React, { useState } from 'react'
import { Phone, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import logo from '@/assets/logo.png'

const ContactPageClient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 py-16 px-4 mt-16 relative">
      {/* Decorative elements with white gradients */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-8">
            <Image
              src={logo}
              alt="Company Logo"
              width={300}
              height={150}
              className="mx-auto"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ff0000] to-primary">
            Contact Us
          </h1>
          <p className="text-gray-700 text-lg font-light">
            Have questions? Our team is here to help. Reach out to us using any of the methods below.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <MapPin className="w-6 h-6" />,
              title: "Location",
              content: "123 Movie Street\nCinema District\nLos Angeles, CA 90028"
            },
            {
              icon: <Phone className="w-6 h-6" />,
              title: "Contact",
              content: "Main: (555) 123-4567\nToll-free: 1-800-MOVIES\nSupport: (555) 987-6543"
            },
            {
              icon: <Clock className="w-6 h-6" />,
              title: "Business Hours",
              content: "Monday - Friday: 9AM - 10PM\nSaturday: 10AM - 11PM\nSunday: 10AM - 9PM"
            }
          ].map((card, index) => (
            <div
              key={index}
              className="bg-gray-200 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-300"
            >
              <div className="text-red-500 mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-light text-gray-800 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {card.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-gray-200 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-16 border border-gray-300">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-light text-gray-800 mb-2">
                Message Sent Successfully
              </h3>
              <p className="text-gray-700">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-gray-800 mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-700">
                  Fill out the form below and we'll respond promptly.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 transition-colors"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded bg-gradient-to-br from-red-800 to-red-900 text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Map Section */}
        <div className="bg-gray-200 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center h-[400px] flex items-center justify-center border border-gray-300">
          <p className="text-gray-700">
            Interactive Map Coming Soon
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactPageClient 