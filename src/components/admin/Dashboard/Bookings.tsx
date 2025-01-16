import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Users, Ticket, TrendingUp, ArrowUpRight, ArrowDownRight, Search, Clock, Film } from 'lucide-react';
import { StatCard } from "../StatCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Bookings = () => {
  const [timeFilter, setTimeFilter] = useState('7days');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: 'Total Movies', value: 45, Icon: Film },
    { title: 'Active Shows', value: 12, Icon: Clock },
    { title: "Today's Bookings", value: 156, Icon: Ticket },
    { title: 'Revenue Today', value: '$2,840', Icon: DollarSign }
  ];


  const recentBookings = [
    { id: 'BK001', customer: 'John Doe', service: 'Premium Package', date: '2024-01-16', status: 'confirmed', amount: '$120' },
    { id: 'BK002', customer: 'Jane Smith', service: 'Basic Package', date: '2024-01-16', status: 'pending', amount: '$80' },
    { id: 'BK003', customer: 'Mike Johnson', service: 'Deluxe Package', date: '2024-01-15', status: 'completed', amount: '$200' },
    { id: 'BK004', customer: 'Sarah Williams', service: 'Premium Package', date: '2024-01-15', status: 'cancelled', amount: '$120' },
  ];

  const getStatusBadge = (status: 'confirmed' | 'pending' | 'completed' | 'cancelled') => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return <Badge className={styles[status]}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings Overview</h1>
          <p className="text-muted-foreground mt-1">
            Monitor booking activities and revenue
          </p>
        </div>
        <div className="flex gap-4">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
                <stat.Icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.amount}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;