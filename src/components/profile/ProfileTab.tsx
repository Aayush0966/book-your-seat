import React from 'react';
import { Calendar, Film } from 'lucide-react';

const ProfileTab = () => {
  // Mock user data
  const user = {
    memberSince: "January 2023",
    preferredLocation: "Downtown Cineplex",
  };

  return (
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
  );
};

export default ProfileTab; 