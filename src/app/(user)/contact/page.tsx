'use client'

import React, { useState } from 'react'
import { Phone, MapPin, Clock, ArrowRight, CheckCircle, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '@/assets/logo.png'

const ContactPage = () => {
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
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 dark:from-dark-background dark:via-dark-background/95 dark:to-dark-primary/10">
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12"
          >
            <Image
              src={logo}
              alt="Company Logo"
              width={400}
              height={200}
              className="mx-auto filter drop-shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 dark:from-dark-primary dark:to-purple-400 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto leading-relaxed">
              Have questions? We're here to help 24/7. Reach out to our friendly team.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Updated Contact Cards */}
          {[
            {
              icon: <MapPin className="w-8 h-8" />,
              title: "Visit Us",
              content: "123 Movie Street\nCinema District\nLos Angeles, CA 90028",
              gradient: "from-blue-500 to-cyan-400"
            },
            {
              icon: <Phone className="w-8 h-8" />,
              title: "Call Us",
              content: "Main: (555) 123-4567\nToll-free: 1-800-MOVIES\nSupport: (555) 987-6543",
              gradient: "from-purple-500 to-pink-400"
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Hours",
              content: "Monday - Friday: 9AM - 10PM\nSaturday: 10AM - 11PM\nSunday: 10AM - 9PM",
              gradient: "from-amber-500 to-orange-400"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03, translateY: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
              ></div>
              <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl p-8 shadow-xl border border-white/20 dark:border-white/10 h-full">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${card.gradient} text-white mb-6`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {card.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 dark:from-dark-primary/20 dark:to-purple-400/20 rounded-xl blur-2xl"></div>
          <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-white/10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 1 }}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                  Message Sent Successfully!
                </h3>
                <p className="text-lg text-text-secondary dark:text-dark-text-secondary">
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 dark:from-dark-primary dark:to-purple-400 bg-clip-text text-transparent mb-4">
                    Send us a message
                  </h2>
                  <p className="text-text-secondary dark:text-dark-text-secondary">
                    We'd love to hear from you. Fill out the form below.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-background-secondary dark:border-dark-background-secondary bg-background/50 dark:bg-dark-background/50 text-dark-text dark:text-text focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-background-secondary dark:border-dark-background-secondary bg-background/50 dark:bg-dark-background/50 text-dark-text dark:text-text focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-colors duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-background-secondary dark:border-dark-background-secondary bg-background/50 dark:bg-dark-background/50 text-dark-text dark:text-text focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-colors duration-200"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary transition-all duration-200 animate-fade-in ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">Sending...</span>
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 rounded-xl overflow-hidden shadow-2xl h-[500px] relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 dark:from-dark-primary/20 dark:to-purple-400/20 group-hover:opacity-75 transition-opacity duration-300"></div>
          <div className="relative w-full h-full flex items-center justify-center bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10">
            <p className="text-xl text-gray-500 dark:text-gray-400">Interactive Map Coming Soon</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactPage