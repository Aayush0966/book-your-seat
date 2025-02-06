'use client'
import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Settings,
  CreditCard,
  Bell,
  Film,
  Heart,
  Shield,
  Edit,
  LogOut,
  ChevronRight,
  Ticket,
  MessageSquare,
  HelpCircle,
  FileText
} from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/api/placeholder/150/150",
    memberSince: "January 2023",
    preferredLocation: "Downtown Cineplex",
    membershipTier: "Gold",
    points: 2500,
    preferences: {
      genres: ["Action", "Sci-Fi", "Drama"],
      seatingPreference: "Middle Center",
      notifications: {
        newReleases: true,
        specialOffers: true,
        bookingReminders: true
      }
    }
  };

  // Mock booking history
  const bookings = [
    {
      id: 1,
      movie: "Inception Returns",
      date: "2025-01-25",
      time: "19:30",
      screen: "IMAX",
      seats: ["G12", "G13"],
      amount: 600,
      status: "completed"
    },
    {
      id: 2,
      movie: "The Matrix Resurrections",
      date: "2025-02-10",
      time: "20:00",
      screen: "3D",
      seats: ["F7", "F8"],
      amount: 500,
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen pt-24 bg-background dark:bg-dark-background p-6">
      <div className="max-w-7xl relative mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6 mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-dark-text dark:text-text mb-2">
                {user.name}
              </h1>
              <div className="flex flex-col md:flex-row gap-4 text-text-secondary dark:text-dark-text-secondary">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {user.membershipTier} Member
                </span>
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                  {user.points} Points
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'bookings', icon: Ticket, label: 'Bookings' },
            { id: 'preferences', icon: Heart, label: 'Preferences' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-dark-background-secondary text-text-secondary dark:text-dark-text-secondary hover:bg-background-secondary'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Profile Information */}
          {activeTab === 'profile' && (
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
              <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6">
                <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Member Since</p>
                      <p className="text-dark-text dark:text-text">{user.memberSince}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Film className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Preferred Cinema</p>
                      <p className="text-dark-text dark:text-text">{user.preferredLocation}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6">
                <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
                  Membership Benefits
                </h2>
                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary">
                    <span className="text-lg">🎬</span>
                    Priority booking for new releases
                  </p>
                  <p className="flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary">
                    <span className="text-lg">🍿</span>
                    20% off on concessions
                  </p>
                  <p className="flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary">
                    <span className="text-lg">⭐</span>
                    Exclusive premiere invitations
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bookings History */}
          {activeTab === 'bookings' && (
            <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6 animate-fade-in">
              <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
                Booking History
              </h2>
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div
                    key={booking.id}
                    className="border-b border-background-secondary dark:border-dark-background last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-dark-text dark:text-text">{booking.movie}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-text-secondary dark:text-dark-text-secondary">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {booking.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Film className="w-4 h-4" />
                            {booking.screen}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === 'completed'
                            ? 'bg-success/10 text-success'
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <p className="mt-2 text-primary font-bold">₹{booking.amount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
              <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6">
                <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
                  Movie Preferences
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-2">
                      Favorite Genres
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.genres.map(genre => (
                        <span
                          key={genre}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-2">
                      Preferred Seating
                    </p>
                    <p className="text-dark-text dark:text-text">{user.preferences.seatingPreference}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6">
                <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
                  Notification Settings
                </h2>
                <div className="space-y-4">
                  {Object.entries(user.preferences.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-text-secondary dark:text-dark-text-secondary">
                        {key.split(/(?=[A-Z])/).join(' ')}
                      </span>
                      <button
                        className={`w-12 h-6 rounded-full transition-colors ${
                          value ? 'bg-primary' : 'bg-background-secondary'
                        }`}
                      >
                        <span
                          className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                            value ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
              <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6">
                <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
                  Account Settings
                </h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
                    <span className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-text-secondary dark:text-dark-text-secondary">
                        Privacy Settings
                      </span>
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
                    <span className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="text-text-secondary dark:text-dark-text-secondary">
                        Payment Methods
                      </span>
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
                    <span className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-primary" />
                      <span className="text-text-secondary dark:text-dark-text-secondary">
                        Notification Settings
                      </span>
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
                    <span className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="text-text-secondary dark:text-dark-text-secondary">
                        Terms & Conditions
                      </span>
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-background-secondary rounded-xl p-6">
                <h2 className="text-xl font-bold text-dark-text dark:text-text mb-4">
                  Help & Support
                </h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      <span className="text-text-secondary dark:text-dark-text-secondary">
                        FAQs & Help Center
                      </span>
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
                    <span className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <span className="text-text-secondary dark:text-dark-text-secondary">
                        Contact Support
                      </span>
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background-secondary dark:hover:bg-dark-background transition-colors">
                    <span className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <span className="text-text-secondary dark:text-dark-text-secondary">
                        About Us
                      </span>
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Logout Button */}
                <div className="mt-8">
                  <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;