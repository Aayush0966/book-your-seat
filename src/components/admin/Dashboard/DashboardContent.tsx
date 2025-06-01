import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Film,
  Users,
  DollarSign,
  Ticket,
  TrendingUp,
  Clock,
  Calendar,
  Search,
  BellRing,
  Settings,
  ChevronDown,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCards from './StatsCards';
import ChartsSection from './ChartsSection';
import UpcomingMovies from './UpcomingMovies';
import RecentBookings from './RecentBookings';
import HeaderSection from './HeaderSection';

const DashboardContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <HeaderSection 
          title="Dashboard"
          subtitle="Welcome back, Admin"
        />
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>
          <Button variant="outline" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Section */}
      <ChartsSection />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Recent Bookings - Takes 2 columns */}
        <RecentBookings />
        
        {/* Upcoming Movies - Takes 1 column */}
        <UpcomingMovies />
      </div>
    </div>
  );
};

export default DashboardContent;