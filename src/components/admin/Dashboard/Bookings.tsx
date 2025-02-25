import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from '@/lib/utils';
import { BookingStatus } from '@prisma/client';
import StatsCards from './StatsCards';
import { useShow } from '@/context/showContext';
import HeaderSection from './HeaderSection';

const Bookings = () => {
  const {bookings} = useShow()

  const getStatusBadge = (status: BookingStatus) => {
    const styles = {
      'CONFIRMED': 'bg-green-100 text-green-800',
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    };
    return <Badge className={styles[status as keyof typeof styles]}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <HeaderSection 
        title="Bookings Overview"
        subtitle="Monitor booking activities and analyze revenue metrics"
      />

      {/* Stats Cards */}
      <StatsCards />

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
              {bookings && bookings.map((booking) => (
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