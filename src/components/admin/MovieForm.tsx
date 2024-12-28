import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, Plus } from 'lucide-react';

interface MovieFormProps {
  closeForm: () => void;
}

const MovieForm = ({ closeForm }: MovieFormProps) => {
  return (
    <form className="mt-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Add New Movie</h2>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => closeForm()}
          className="hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="details">Movie Details</TabsTrigger>
            <TabsTrigger value="showtime">Showtimes</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {/* Image Upload Section */}
            

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Movie Title *</Label>
                <Input 
                  id="title" 
                  placeholder="Enter movie title"
                  className="focus-visible:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Input 
                  id="duration" 
                  type="number" 
                  placeholder="Enter duration"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                    <SelectItem value="scifi">Sci-Fi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="release">Release Date *</Label>
                <Input 
                  id="release" 
                  type="date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="director">Director</Label>
                <Input 
                  id="director" 
                  placeholder="Enter director name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cast">Cast</Label>
                <div className="flex flex-wrap gap-2">
                  <Input 
                    placeholder="Add cast member"
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Synopsis *</Label>
                <Textarea 
                  id="description"
                  placeholder="Enter movie synopsis"
                  rows={4}
                />
              </div>

            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <Button 
                onClick={() => closeForm()} 
                variant="outline"
                type="button"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save Details
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="showtime">
            {/* Showtime content to be implemented */}
            <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-gray-500">Showtime configuration coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="pricing">
            {/* Pricing content to be implemented */}
            <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-gray-500">Pricing configuration coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </form>
  );
};

export default MovieForm;