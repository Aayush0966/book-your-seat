'use client'
import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Edit,
  Ticket,
  Heart,
  Settings,
} from 'lucide-react';
import ProfileTab from './ProfileTab';
import BookingsTab from './BookingsTab';
import PreferencesTab from './PreferencesTab';
import SettingsTab from './SettingsTab';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/api/placeholder/150/150",
    membershipTier: "Gold",
    points: 2500,
  };

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
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'bookings' && <BookingsTab />}
          {activeTab === 'preferences' && <PreferencesTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
