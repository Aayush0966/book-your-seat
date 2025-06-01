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
    CartesianGrid,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { useShow } from "@/context/showContext";
import { SeatWithPrice } from "@/types/movie";

const ChartsSection = () => {
    const { bookings, movies } = useShow();

    // Calculate monthly revenue from bookings using createdAt
    const calculateMonthlyRevenue = () => {
        if (!bookings || bookings.length === 0) return [];
        
        const currentYear = new Date().getFullYear();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyRevenue = months.map(name => ({ name, revenue: 0, bookings: 0 }));
        
        // Aggregate revenue by month for current year
        bookings.forEach(booking => {
            if (booking.bookingStatus !== 'CANCELLED') {
                const date = new Date(booking.createdAt);
                if (date.getFullYear() === currentYear) {
                    const month = date.getMonth(); // 0-11
                    monthlyRevenue[month].revenue += booking.totalPrice;
                    monthlyRevenue[month].bookings += 1;
                }
            }
        });
        
        return monthlyRevenue;
    };

    // Calculate daily occupancy based on actual seat bookings
    const calculateDailyOccupancy = () => {
        if (!bookings || bookings.length === 0) return [];
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dailyData = days.map(name => ({ name, totalSeats: 0, bookedSeats: 0, occupancyRate: 0 }));
        
        // Count bookings by day of week for the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        bookings.forEach(booking => {
            if (booking.bookingStatus !== 'CANCELLED') {
                const showDate = new Date(booking.showDate * 1000);
                if (showDate >= thirtyDaysAgo) {
                    const day = showDate.getDay(); // 0-6 (Sunday-Saturday)
                    const seatsBooked = booking.seatsBooked as SeatWithPrice[];
                    const seatCount = Array.isArray(seatsBooked) ? seatsBooked.length : booking.seatsCount;
                    
                    dailyData[day].bookedSeats += seatCount;
                    // Estimate total seats based on screen capacity (assuming 100 seats per show as default)
                    dailyData[day].totalSeats += booking.show?.screen?.totalSeats || 100;
                }
            }
        });
        
        // Calculate occupancy rate as percentage
        dailyData.forEach(day => {
            day.occupancyRate = day.totalSeats > 0 ? Math.round((day.bookedSeats / day.totalSeats) * 100) : 0;
        });
        
        return dailyData;
    };

    // Calculate movie status distribution
    const calculateMovieStatusDistribution = () => {
        if (!movies || movies.length === 0) return [];
        
        const statusCount = {
            ACTIVE: 0,
            UPCOMING: 0,
            COMPLETED: 0
        };
        
        movies.forEach(movie => {
            statusCount[movie.status]++;
        });
        
        return [
            { name: 'Now Showing', value: statusCount.ACTIVE, color: '#10B981' },
            { name: 'Coming Soon', value: statusCount.UPCOMING, color: '#3B82F6' },
            { name: 'Ended', value: statusCount.COMPLETED, color: '#6B7280' }
        ].filter(item => item.value > 0);
    };

    // Calculate booking status distribution
    const calculateBookingStatusDistribution = () => {
        if (!bookings || bookings.length === 0) return [];
        
        const statusCount = {
            CONFIRMED: 0,
            PENDING: 0,
            CANCELLED: 0
        };
        
        bookings.forEach(booking => {
            statusCount[booking.bookingStatus]++;
        });
        
        return [
            { name: 'Confirmed', value: statusCount.CONFIRMED, color: '#10B981' },
            { name: 'Pending', value: statusCount.PENDING, color: '#F59E0B' },
            { name: 'Cancelled', value: statusCount.CANCELLED, color: '#EF4444' }
        ].filter(item => item.value > 0);
    };

    const revenueData = calculateMonthlyRevenue();
    const occupancyData = calculateDailyOccupancy();
    const movieStatusData = calculateMovieStatusDistribution();
    const bookingStatusData = calculateBookingStatusDistribution();

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                    <p className="font-medium">{`${label}`}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }}>
                            {`${entry.dataKey === 'revenue' ? 'Revenue: NPR ' : 
                               entry.dataKey === 'occupancyRate' ? 'Occupancy: ' : 
                               entry.dataKey + ': '}${entry.value}${entry.dataKey === 'occupancyRate' ? '%' : ''}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Trend Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        Monthly Revenue Trend ({new Date().getFullYear()})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                <XAxis 
                                    dataKey="name" 
                                    tick={{ fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                />
                                <YAxis 
                                    tick={{ fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickFormatter={(value) => `NPR ${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#3B82F6" 
                                    strokeWidth={3}
                                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Weekly Occupancy Rate Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        Weekly Occupancy Rate (Last 30 Days)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={occupancyData}>
                                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                <XAxis 
                                    dataKey="name" 
                                    tick={{ fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                />
                                <YAxis 
                                    tick={{ fontSize: 12 }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickFormatter={(value) => `${value}%`}
                                    domain={[0, 100]}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar 
                                    dataKey="occupancyRate" 
                                    fill="#10B981"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Movie Status Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        Movie Status Distribution
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={movieStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {movieStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Booking Status Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        Booking Status Distribution
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={bookingStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {bookingStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ChartsSection;