'use client'
import React from 'react';
import MovieManagement from './Dashboard/MovieManagement';
import DashboardContent from './Dashboard/DashboardContent'; // Assuming you have a Dashboard component or any other content
import Sidebar from './Sidebar';
import Bookings from './Dashboard/Bookings';
import Settings from './Dashboard/Settings';
import Users from './Dashboard/Users';

const Dashboard = () => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');

  const renderComponent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <DashboardContent />;
      case 'movies':
        return <MovieManagement />;
      case 'bookings':
        return <Bookings />
      case 'settings':
        return <Settings />
      case 'users':
        return <Users />
      default:
        return <DashboardContent />; // Default case in case no valid activeItem is selected
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="flex-1 ml-64 transition-all duration-300 ease-in-out">
        <div className="p-4 min-h-screen">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
