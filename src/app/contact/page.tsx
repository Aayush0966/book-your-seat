'use client'

import React from 'react'
import {  Phone, MapPin, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '@/assets/logo.png'

const page = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <div className="relative py-12 bg-gradient-to-b from-background via-background to-transparent dark:from-dark-primary/10 dark:via-dark-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 animate-zoom-in"
            >
              <Image
                src={logo}
                alt="Company Logo"
                width={400}
                height={200}
                className="mx-auto"
              />
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-dark-text dark:text-text mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
            >
              Have questions about booking? We&apos;re here to help 24/7.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contact Information Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Card 1 - Address */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-background-secondary/20 backdrop-blur-sm dark:bg-dark-background-secondary/30 rounded-xl p-6 shadow-lg border border-background-secondary/30 dark:border-dark-background-secondary/30 animate-fade-in"
          >
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-primary dark:text-primary/90" />
              <h3 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">
                Visit Us
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              123 Movie Street
              <br />
              Cinema District
              <br />
              Los Angeles, CA 90028
            </p>
          </motion.div>

          {/* Contact Card 2 - Contact */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-background-secondary/20 backdrop-blur-sm dark:bg-dark-background-secondary/30 rounded-xl p-6 shadow-lg border border-background-secondary/30 dark:border-dark-background-secondary/30 animate-fade-in"
          >
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 text-primary dark:text-primary/90" />
              <h3 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">
                Call Us
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Main: (555) 123-4567
              <br />
              Toll-free: 1-800-MOVIES
              <br />
              Support: (555) 987-6543
            </p>
          </motion.div>

          {/* Contact Card 3 - Hours */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-background-secondary/20 backdrop-blur-sm dark:bg-dark-background-secondary/30 rounded-xl p-6 shadow-lg border border-background-secondary/30 dark:border-dark-background-secondary/30 animate-fade-in"
          >
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-primary dark:text-primary/90" />
              <h3 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">
                Hours
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Monday - Friday: 9AM - 10PM
              <br />
              Saturday: 10AM - 11PM
              <br />
              Sunday: 10AM - 9PM
            </p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-background-secondary/10 dark:bg-dark-background-secondary/20 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-background-secondary/30 dark:border-dark-background-secondary/30 animate-slide-up"
        >
          <h2 className="text-2xl font-bold text-dark-text dark:text-text mb-6">
            Send us a message
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-background-secondary dark:border-dark-background-secondary bg-background/50 dark:bg-dark-background/50 text-dark-text dark:text-text focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
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
                className="w-full px-4 py-2 rounded-lg border border-background-secondary dark:border-dark-background-secondary bg-background/50 dark:bg-dark-background/50 text-dark-text dark:text-text focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-colors duration-200"
              />
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary transition-all duration-200 animate-fade-in"
              >
                Send Message
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-xl overflow-hidden shadow-lg h-[400px] bg-background-secondary/10 dark:bg-dark-background-secondary/20 border border-background-secondary/30 dark:border-dark-background-secondary/30 animate-fade-in"
        >
          {/* Replace this div with your actual map component */}
          <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            Map Component Goes Here
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default page