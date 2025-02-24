'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Film, 
  Plus, 
  Search, 
  FilterX,
  TrendingUp,
  Users,
  Calendar,
  Star,
  SlidersHorizontal
} from 'lucide-react';
import React, { useState } from 'react';
import MovieForm from '../MovieForm';
import { DialogTitle } from "@radix-ui/react-dialog";
import MovieListing from "./MovieListing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatsCards from "./StatsCards";

const MovieManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleClose = () => {
    setIsOpen(false);
  };


  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400">
            Movies Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your movie listings and view performance metrics
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus className="h-4 w-4" />
              Add New Movie
            </Button>
          </DialogTrigger>
          <DialogContent className="border-none sm:max-w-2xl">
            <DialogTitle>Fill all the input fields</DialogTitle>
            <MovieForm onSuccess={handleClose} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Movies</SelectItem>
              <SelectItem value="now-showing">Now Showing</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('all');
            }}
            className="flex items-center gap-2"
          >
            <FilterX className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

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