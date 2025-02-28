'use client'
import React, { FC, useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Edit,
  Ticket,
  Heart,
  Settings,
  Camera,
  Calendar,
  MapPin,
  Star,
  Clock
} from 'lucide-react';
import ProfileTab from './ProfileTab';
import BookingsTab from './BookingsTab';
import PreferencesTab from './PreferencesTab';
import SettingsTab from './SettingsTab';
import { userDetails } from '@/types/user';

interface ProfilePageProps {
  userDetails: userDetails;
}

const ProfilePage: FC<ProfilePageProps> = ({ userDetails }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getTicketsCount = () => {
    return userDetails.bookings.reduce((acc, curr) => acc + curr.seatsCount, 0);
  };

  // Get membership level based on number of bookings
  const getMembershipTier = () => {
    const bookingsCount = userDetails.bookings.length;
    if (bookingsCount > 20) return "Platinum";
    if (bookingsCount > 10) return "Gold";
    if (bookingsCount > 5) return "Silver";
    return "Bronze";
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Hero Section with Red Theme */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={'https://img.icons8.com/officel/80/guest-male.png'}
                  alt={userDetails.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 transition">
                <Camera className="w-5 h-5 text-red-600" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">
                {userDetails.fullName}
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-6 text-white/80">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {userDetails.email}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {userDetails.contactNumber}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(userDetails?.createdAt!).toDateString()}
                </span>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="text-white font-medium">{getMembershipTier()} Member</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{getTicketsCount()} Tickets Purchased</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            {[
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'bookings', icon: Ticket, label: 'Bookings' },
              { id: 'preferences', icon: Heart, label: 'Preferences' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-red-500 hover:border-red-500'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          {activeTab === 'profile' && (
            <ProfileTab 
              memberSince={userDetails.createdAt!} 
              ticketsCount={() => getTicketsCount()} 
            />
          )}
          {activeTab === 'bookings' && <BookingsTab bookings={userDetails.bookings} />}
          {activeTab === 'preferences' && <PreferencesTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
        

      </div>
    </div>
  );
};

export default ProfilePage;