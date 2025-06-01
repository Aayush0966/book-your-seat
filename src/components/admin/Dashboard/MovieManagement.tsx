'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Plus
} from 'lucide-react';
import React, { useState } from 'react';
import MovieForm from '../MovieForm';
import MovieListing from "./MovieListing";
import StatsCards from "./StatsCards";
import HeaderSection from './HeaderSection';
import { useShow } from '@/context/showContext';
import AdminLoader from '../AdminLoader';

const MovieManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = useShow();

  const handleClose = () => {
    setIsOpen(false);
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <AdminLoader variant="stats" />
        <AdminLoader variant="table" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <HeaderSection 
        title="Movies Management"
        subtitle="Manage your movie listings and view performance metrics"
        action={{
          label: "Add New Movie",
          icon: <Plus className="h-4 w-4" />,
          onClick: () => setIsOpen(true)
        }}
      />
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent className="border-none sm:max-w-2xl">
            <DialogTitle>Fill all the input fields</DialogTitle>
            <MovieForm onSuccess={handleClose} />
          </DialogContent>
        </Dialog>
      {/* Stats Cards */}
      <StatsCards />

    
      {/* Movie Listing */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <MovieListing />
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm text-blue-600 dark:text-blue-400">
        <h3 className="font-semibold mb-2">Quick Tips:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Use the search bar to quickly find specific movies</li>
          <li>Filter movies by status to better organize your catalog</li>
          <li>Click on any movie to view detailed analytics and edit information</li>
        </ul>
      </div>
    </div>
  );
};

export default MovieManagement;