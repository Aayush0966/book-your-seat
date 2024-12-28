'use client'
import React from 'react';
import Sidebar from './Sidebar';
import MovieManagement from './MovieManagement';
import DashboardContent from './DashboardContent'; // Assuming you have a Dashboard component or any other content

const Dashboard = () => {
  const [activeItem, setActiveItem] = React.useState<string>('dashboard');

  const renderComponent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <DashboardContent />;
      case 'movies':
        return <MovieManagement />;
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
