import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShow } from "@/context/showContext";
import { Status } from "@/types/movie";
import { Ticket, TrendingUp, TrendingDown, DollarSign, Users, Film, Clock, Minus } from "lucide-react";

const StatsCards = () => {
    const {bookings, users, movies} = useShow();

    const getTotalRevenue = () => {
        return bookings?.filter(booking => booking.bookingStatus !== 'CANCELLED')
            .reduce((acc, value) => acc + value.totalPrice, 0) || 0;
    }

    const getMovieCount = (status: Status) => {
        return movies?.filter((movie) => movie.status === status).length || 0;
    }

    const getActiveBookingsCount = () => {
        return bookings?.filter(booking => booking.bookingStatus !== 'CANCELLED').length || 0;
    }

    // Calculate percentage change for revenue (current month vs previous month)
    const getRevenueChange = () => {
        if (!bookings || bookings.length === 0) return { percentage: 0, isPositive: true };
        
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        
        const currentMonthRevenue = bookings
            .filter(booking => {
                const bookingDate = new Date(booking.createdAt);
                return booking.bookingStatus !== 'CANCELLED' &&
                       bookingDate.getMonth() === currentMonth &&
                       bookingDate.getFullYear() === currentYear;
            })
            .reduce((acc, booking) => acc + booking.totalPrice, 0);
            
        const previousMonthRevenue = bookings
            .filter(booking => {
                const bookingDate = new Date(booking.createdAt);
                return booking.bookingStatus !== 'CANCELLED' &&
                       bookingDate.getMonth() === previousMonth &&
                       bookingDate.getFullYear() === previousYear;
            })
            .reduce((acc, booking) => acc + booking.totalPrice, 0);
            
        if (previousMonthRevenue === 0) {
            return { percentage: currentMonthRevenue > 0 ? 100 : 0, isPositive: true };
        }
        
        const percentage = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
        return { percentage: Math.abs(percentage), isPositive: percentage >= 0 };
    };

    // Calculate percentage change for bookings
    const getBookingsChange = () => {
        if (!bookings || bookings.length === 0) return { percentage: 0, isPositive: true };
        
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        
        const currentMonthBookings = bookings.filter(booking => {
            const bookingDate = new Date(booking.createdAt);
            return booking.bookingStatus !== 'CANCELLED' &&
                   bookingDate.getMonth() === currentMonth &&
                   bookingDate.getFullYear() === currentYear;
        }).length;
        
        const previousMonthBookings = bookings.filter(booking => {
            const bookingDate = new Date(booking.createdAt);
            return booking.bookingStatus !== 'CANCELLED' &&
                   bookingDate.getMonth() === previousMonth &&
                   bookingDate.getFullYear() === previousYear;
        }).length;
        
        if (previousMonthBookings === 0) {
            return { percentage: currentMonthBookings > 0 ? 100 : 0, isPositive: true };
        }
        
        const percentage = ((currentMonthBookings - previousMonthBookings) / previousMonthBookings) * 100;
        return { percentage: Math.abs(percentage), isPositive: percentage >= 0 };
    };

    // Calculate user growth (this month vs last month registrations)
    const getUserGrowth = () => {
        if (!users || users.length === 0) return { percentage: 0, isPositive: true };
        
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        
        const currentMonthUsers = users.filter(user => {
            if (!user.createdAt) return false;
            const userDate = new Date(user.createdAt);
            return userDate.getMonth() === currentMonth &&
                   userDate.getFullYear() === currentYear;
        }).length;
        
        const previousMonthUsers = users.filter(user => {
            if (!user.createdAt) return false;
            const userDate = new Date(user.createdAt);
            return userDate.getMonth() === previousMonth &&
                   userDate.getFullYear() === previousYear;
        }).length;
        
        if (previousMonthUsers === 0) {
            return { percentage: currentMonthUsers > 0 ? 100 : 0, isPositive: true };
        }
        
        const percentage = ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100;
        return { percentage: Math.abs(percentage), isPositive: percentage >= 0 };
    };

    const revenueChange = getRevenueChange();
    const bookingsChange = getBookingsChange();
    const userGrowth = getUserGrowth();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NP', {
            style: 'currency',
            currency: 'NPR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount).replace('NPR', 'NPR ');
    };

    const TrendIcon = ({ isPositive, percentage }: { isPositive: boolean, percentage: number }) => {
        if (percentage === 0) return <Minus className="w-4 h-4 mr-1" />;
        return isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</CardTitle>
                    <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(getTotalRevenue())}
                    </div>
                    <p className={`text-xs flex items-center mt-1 ${
                        revenueChange.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                        <TrendIcon isPositive={revenueChange.isPositive} percentage={revenueChange.percentage} />
                        {revenueChange.percentage === 0 ? 'No change' : 
                         `${revenueChange.isPositive ? '+' : '-'}${revenueChange.percentage.toFixed(1)}%`} from last month
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Bookings</CardTitle>
                    <Ticket className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {getActiveBookingsCount().toLocaleString()}
                    </div>
                    <p className={`text-xs flex items-center mt-1 ${
                        bookingsChange.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                        <TrendIcon isPositive={bookingsChange.isPositive} percentage={bookingsChange.percentage} />
                        {bookingsChange.percentage === 0 ? 'No change' : 
                         `${bookingsChange.isPositive ? '+' : '-'}${bookingsChange.percentage.toFixed(1)}%`} from last month
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</CardTitle>
                    <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {(users?.length || 0).toLocaleString()}
                    </div>
                    <p className={`text-xs flex items-center mt-1 ${
                        userGrowth.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                        <TrendIcon isPositive={userGrowth.isPositive} percentage={userGrowth.percentage} />
                        {userGrowth.percentage === 0 ? 'No new users' : 
                         `${userGrowth.isPositive ? '+' : '-'}${userGrowth.percentage.toFixed(1)}%`} new users this month
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Movies Showing</CardTitle>
                    <Film className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {getMovieCount('ACTIVE')}
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1" /> 
                        {getMovieCount('UPCOMING')} upcoming releases
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCards;