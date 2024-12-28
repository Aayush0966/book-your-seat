import React from 'react';
import { Plus, Film, Ticket, Clock, DollarSignIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { StatCard } from './StatCard';
import MovieForm from './MovieForm';

const MovieManagement = () => {
  const [showForm, setShowForm ] = React.useState<boolean>(false)
  
  const stats = [
    { title: 'Total Movies', value: 45, Icon: Film },
    { title: 'Active Shows', value: 12, Icon: Clock },
    { title: "Today's Bookings", value: 156, Icon: Ticket },
    { title: 'Revenue Today', value: '$2,840', Icon: DollarSignIcon }
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Movies Management</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Movie
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            Icon={stat.Icon}
          />
        ))}
      </div>
      <div className='mt-4 p-2 rounded-xl'>
      {
        showForm && <MovieForm closeForm={() => setShowForm(false)} />
      }
      </div>
      
    </div>
  );
};

export default MovieManagement;