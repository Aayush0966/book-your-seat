import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Filter, Clock } from "lucide-react";
import { useShow } from "@/context/showContext";
import { formatDate } from "@/lib/utils";

const RecentBookings = () => {
    const {bookings} = useShow();

    // Sort bookings by creation date (newest first) and take only the first 3
    const recentBookings = bookings 
      ? [...bookings]
          .sort((a, b) => new Date(b.show?.createdAt).getTime() - new Date(a.show?.createdAt).getTime())
          .slice(0, 3)
      : [];

    return (
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <CardTitle>Recent Bookings</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings && recentBookings.length > 0 ? (
                recentBookings.map((booking, index) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{booking.show?.movie?.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{booking.user?.fullName}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Booked on {formatDate((booking.show?.createdAt).getTime())}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">NPR {booking.totalPrice}</p>
                      <p className={`text-sm font-medium ${
                        booking.bookingStatus == 'CONFIRMED' ? 'text-green-600 dark:text-green-400' : 
                        booking.bookingStatus == 'PENDING' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {booking.bookingStatus}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p className="text-lg font-medium">No recent bookings</p>
                  <p className="text-sm">New bookings will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
    )
}

export default RecentBookings;