'use client'
import React from 'react';
import MovieManagement from './Dashboard/MovieManagement';
import DashboardContent from './Dashboard/DashboardContent'; // Assuming you have a Dashboard component or any other content
import Sidebar from './Sidebar';
import Bookings from './Dashboard/Bookings';
import Settings from './Dashboard/Settings';
import Users from './Dashboard/Users';
import { useShow } from '@/context/showContext';
import AdminLoader from './AdminLoader';

const Dashboard = () => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');
  const { isLoading, error } = useShow();

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

  // Show full page loader while initial data is loading
  if (isLoading) {
    return <AdminLoader variant="full" text="Loading admin dashboard..." />;
  }

  // Show error state if data loading failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">Error Loading Dashboard</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
