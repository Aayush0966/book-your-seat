import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  Ticket, 
  Clock, 
  Users,
  Search,
  FilterX,
  Download,
  Calendar
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Booking, Status } from '@/types/movie';
import { fetchBookings } from './action';
import { formatDate } from '@/lib/utils';
import { BookingStatus } from '@prisma/client';

const Bookings = () => {
  const [timeFilter, setTimeFilter] = useState('7days');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookings, setBookings] = useState<Booking[]>([]);

  const stats = [
    {
      title: "Total Bookings",
      value: "2,856",
      trend: "+12% from last month",
      icon: Ticket,
      color: "text-blue-600"
    },
    {
      title: "Revenue",
      value: "NPR 286.5K",
      trend: "+18% from last month",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Users",
      value: "1.2K",
      trend: "Monthly active users",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Avg. Response",
      value: "2.4h",
      trend: "Response time",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  const getStatusBadge = (status: BookingStatus) => {
    const styles = {
      'CONFIRMED': 'bg-green-100 text-green-800',
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    };
    return <Badge className={styles[status as keyof typeof styles]}>{status}</Badge>;
  };

  const getBookings = async () => {
    const bookings = await fetchBookings();
    if (bookings) {
      setBookings(bookings);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400">
            Bookings Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor booking activities and analyze revenue metrics
          </p>
        </div>
        <Button 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => {/* Handle export */}}
        >
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
        <div className="flex gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <FilterX className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setTimeFilter('7days');
            }}
            className="flex items-center gap-2"
          >
            <FilterX className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

      {/* Bookings Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.user?.fullName}</TableCell>
                  <TableCell>{formatDate(booking.showDate)}</TableCell>
                  <TableCell>NPR {booking.totalPrice}</TableCell>
                  <TableCell>{getStatusBadge(booking.bookingStatus)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-blue-600 dark:text-blue-400">
        <h3 className="font-semibold mb-2">Quick Tips:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Use the search bar to quickly find specific bookings</li>
          <li>Filter bookings by date range and status</li>
          <li>Export reports for detailed analysis</li>
          <li>Click on "View Details" to see complete booking information</li>
        </ul>
      </div>
    </div>
  );
};

export default Bookings;