import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import DetailForm from './DetailForm';
import ShowtimeForm from './ShowTimeForm';
import PricingForm from './PricingForm';

interface MovieFormProps {
  closeForm: () => void;
}

const MovieForm = ({ closeForm }: MovieFormProps) => {
  return (
    <form className="mt-6 bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Add New Movie</h2>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={closeForm}
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

          <TabsContent value="details">
            <DetailForm />
            <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
            </div>
          </TabsContent>


          <TabsContent value="showtime">
            <ShowtimeForm />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingForm />
           
          </TabsContent>
        </Tabs>
        <div className="flex justify-end space-x-3 pt-6 mt-6">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Add Movie</Button>
            </div>
      </div>

    </form>
  );
};

export default MovieForm;