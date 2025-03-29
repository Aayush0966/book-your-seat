import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { 
    ResponsiveContainer,  
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    Tooltip,
    Legend,
    YAxis,
    CartesianGrid,  } from "recharts";
import { useShow } from "@/context/showContext";

const ChartsSection = () => {
    const { bookings } = useShow();

    // Calculate monthly revenue from bookings
    const calculateMonthlyRevenue = () => {
        if (!bookings || bookings.length === 0) return [];
        
        // Initialize monthly revenue data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyRevenue = months.map(name => ({ name, revenue: 0 }));
        
        // Aggregate revenue by month
        bookings.forEach(booking => {
            // Convert booking date from timestamp to Date object
            const date = new Date(booking.bookingDate);
            const month = date.getMonth(); // 0-11
            monthlyRevenue[month].revenue += booking.totalPrice;
        });
        
        return monthlyRevenue;
    };

    // Calculate daily occupancy
    const calculateDailyOccupancy = () => {
        if (!bookings || bookings.length === 0) return [];
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dailyBookings = days.map(name => ({ name, occupancy: 0 }));
        
        // Count bookings by day of week
        bookings.forEach(booking => {
            const date = new Date(booking.bookingDate);
            const day = date.getDay(); // 0-6 (Sunday-Saturday)
            dailyBookings[day].occupancy += booking.seatsCount;
        });
        
        return dailyBookings;
    };

    const revenueData = calculateMonthlyRevenue();
    const occupancyData = calculateDailyOccupancy();
    
    return (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="occupancy" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}

export default ChartsSection;