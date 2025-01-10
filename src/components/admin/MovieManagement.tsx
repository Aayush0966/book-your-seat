import React from 'react';
import { Plus, Film, Ticket, Clock, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MovieForm from './MovieForm';

interface StatCardProps {
  title: string;
  value: number | string;
  Icon: React.ComponentType<{ className?: string }>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, Icon }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const MovieManagement = () => {
  const stats = [
    { title: 'Total Movies', value: 45, Icon: Film },
    { title: 'Active Shows', value: 12, Icon: Clock },
    { title: "Today's Bookings", value: 156, Icon: Ticket },
    { title: 'Revenue Today', value: '$2,840', Icon: DollarSign }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movies Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your movie listings and view performance metrics
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Movie
            </Button>
          </DialogTrigger>
          <DialogContent className=" border-none sm:max-w-2xl ">
            <MovieForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Movie Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-center py-8">
            Movie listing content will go here
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieManagement;