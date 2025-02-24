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

const DashboardContent = () => {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, Admin</p>
        </div>
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
            <BellRing className="w-5 h-5" />
          </Button>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Movies */}
        <UpcomingMovies />

        {/* Recent Bookings */}
         <RecentBookings />
      </div>
    </div>
  );
};

export default DashboardContent;