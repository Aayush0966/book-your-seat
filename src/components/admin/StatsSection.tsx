import { Clock, Film, Ticket, DollarSign } from "lucide-react";
import { Card, CardContent } from "../ui/card"


const StatsSection  = () => {
      const stats = [
        { title: 'Total Movies', value: 45, Icon: Film },
        { title: 'Active Shows', value: 12, Icon: Clock },
        { title: "Today's Bookings", value: 156, Icon: Ticket },
        { title: 'Revenue Today', value: '$2,840', Icon: DollarSign }
      ];

    return (
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
    )
}

export default StatsSection