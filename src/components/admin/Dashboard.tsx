'use client'
import React from 'react';
import MovieManagement from './Dashboard/MovieManagement';
import DashboardContent from './Dashboard/DashboardContent'; // Assuming you have a Dashboard component or any other content
import Sidebar from './Sidebar';
import Bookings from './Dashboard/Bookings';
import Settings from './Dashboard/Settings';

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
      default:
        return <DashboardContent />; // Default case in case no valid activeItem is selected
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="flex-1  p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
