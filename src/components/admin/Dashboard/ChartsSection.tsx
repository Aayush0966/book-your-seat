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


const ChartsSection = () => {

    const revenueData = [
        { name: 'Jan', revenue: 45000 },
        { name: 'Feb', revenue: 52000 },
        { name: 'Mar', revenue: 48000 },
        { name: 'Apr', revenue: 61000 },
        { name: 'May', revenue: 55000 },
        { name: 'Jun', revenue: 67000 },
      ];
    
      const occupancyData = [
        { name: 'Mon', occupancy: 65 },
        { name: 'Tue', occupancy: 58 },
        { name: 'Wed', occupancy: 72 },
        { name: 'Thu', occupancy: 75 },
        { name: 'Fri', occupancy: 89 },
        { name: 'Sat', occupancy: 95 },
        { name: 'Sun', occupancy: 92 },
      ];
    
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