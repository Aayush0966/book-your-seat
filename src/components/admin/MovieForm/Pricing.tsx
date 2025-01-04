import React from 'react';
import { DollarSign, Plus } from 'lucide-react';
import { StepProps } from '@/types/movie';

export const PricingStep = ({ formData, handleChange, handlePriceChange } : StepProps) => {
  const [selectedScreens, setSelectedScreens] = React.useState<string[]>([]);
  const screenTypes = ['Standard', '3D', 'IMAX'];


  const toggleScreen = (screen: string) => {
    setSelectedScreens(prev => 
      prev.includes(screen)
        ? prev.filter(s => s !== screen)
        : [...prev, screen]
    );
  };

  const getPrice = (screenType: string, seatType: string) => {
    return formData.pricing.find(price => price.type === screenType)?.prices[seatType.toLowerCase()] || '';
  }


  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <DollarSign className="w-6 h-6" />
        Pricing
      </h2>

      <div>
        <label className="block text-sm font-medium mb-2">Select Screen Types</label>
        <div className="flex flex-wrap gap-2 mb-6">
          {screenTypes.map(screen => (
            <button
              key={screen}
              onClick={() => toggleScreen(screen)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedScreens.includes(screen)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {screen}
            </button>
          ))}
        </div>
      </div>
      
      {selectedScreens.map((screenType, index) => (
        <div key={screenType} className="p-4 border rounded-lg space-y-4" data-screen={screenType}>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{screenType} Screen</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['Platinum', 'Gold', 'Silver'].map(seatType => (
                <div key={seatType} className="space-y-2">
                <label className="block text-sm font-medium">{seatType}</label>
                <input
                  type="number"
                  value={getPrice(screenType, seatType)}
                  name='Price'
                  data-screen={screenType}
                  data-seat={seatType}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Price"
                  onChange={handlePriceChange}
                />
                </div>
            ))}
          </div>
        </div>
      ))}

      {selectedScreens.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed rounded-lg text-gray-500">
          Please select at least one screen type to set pricing
        </div>
      )}
    </div>
  );
};