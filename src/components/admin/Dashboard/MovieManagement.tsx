import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { Clock, DollarSign, Film, Plus, Ticket } from 'lucide-react';
import React, { useState } from 'react';
import MovieForm from '../MovieForm';
import { StatCard } from "../StatCard";
import { DialogTitle } from "@radix-ui/react-dialog";


const MovieManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

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
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Movie
            </Button>
          </DialogTrigger>
          <DialogContent className=" border-none sm:max-w-2xl ">
            <DialogTitle>Fill all the input fields</DialogTitle>
            <MovieForm onSuccess={handleClose} />
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