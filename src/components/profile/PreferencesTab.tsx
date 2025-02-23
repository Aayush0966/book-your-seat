import React from 'react';

const PreferencesTab = () => {
  // Mock user preferences
  const user = {
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

  return (
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
  );
};

export default PreferencesTab; 