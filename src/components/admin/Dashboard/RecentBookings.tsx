import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useShow } from "@/context/showContext";

const RecentBookings = () => {
    const {bookings} = useShow();

    return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings && bookings.length > 0 ? (
                bookings.slice(0,3).map((booking, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{booking.show?.movie?.title}</p>
                      <p className="text-sm text-gray-500">{booking.user?.fullName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.totalPrice}</p>
                      <p className={`text-sm ${
                        booking.bookingStatus == 'CONFIRMED' ? 'text-green-500' : 'text-yellow-500'
                      }`}>
                        {booking.bookingStatus}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No recent bookings available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
    )
}

export default RecentBookings;