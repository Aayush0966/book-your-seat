import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShow } from "@/context/showContext";
import { Status } from "@/types/movie";
import { Ticket, TrendingUp, DollarSign, Users, Film, Clock } from "lucide-react";

const StatsCards = () => {

    const {bookings, users, movies} = useShow();

    const getTotalRevenue = () => {
        return bookings?.reduce((acc, value) => acc + value.totalPrice, 0)
    }

    const getMovieCount = (status: Status) => {
        return movies?.filter((movie) => movie.status === status).length
    }

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">NPR {getTotalRevenue()}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +15.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
            <Ticket className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings?.length}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +8.7% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
            <Users className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length}</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +12.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Movies Showing</CardTitle>
            <Film className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getMovieCount('ACTIVE')}</div>
            <p className="text-xs text-blue-500 flex items-center mt-1">
              <Clock className="w-4 h-4 mr-1" /> {getMovieCount('UPCOMING')} upcoming releases
            </p>
          </CardContent>
        </Card>
      </div>
    )
}

export default StatsCards;