'use client'
import React, { useState } from 'react';
import { Star, Film, Clapperboard, Info } from 'lucide-react';

const TicketPricingPage = () => {
  const pricing = [
    {
      screenId: 1,
      type: "Standard",
      prices: { platinum: 300, gold: 200, silver: 150 },
      icon: Film,
      description: "Classic digital projection with crystal clear sound",
      features: [
        "2K Digital Projection",
        "Dolby Digital Sound",
        "Comfortable Seating",
        "Standard Concessions"
      ]
    },
    {
      screenId: 2,
      type: "3D",
      prices: { platinum: 400, gold: 300, silver: 250 },
      icon: Clapperboard,
      description: "Immersive 3D experience with depth-enhanced visuals",
      features: [
        "RealD 3D Technology",
        "Enhanced Brightness",
        "Premium 3D Glasses",
        "Surround Sound"
      ]
    },
    {
      screenId: 3,
      type: "IMAX",
      prices: { platinum: 600, gold: 400, silver: 300 },
      icon: Star,
      description: "Ultimate movie experience with massive screen and precision audio",
      features: [
        "IMAX Screen",
        "Dual 4K Projection",
        "IMAX Enhanced Sound",
        "Premium Seating"
      ]
    }
  ];

  const seatTiers = {
    platinum: {
      title: "Premium",
      features: [
        "Best viewing angle",
        "Extra leg room",
        "Premium service",
        "Priority entry"
      ]
    },
    gold: {
      title: "Preferred",
      features: [
        "Optimal distance",
        "Comfortable seating",
        "Great value",
        "Reserved seating"
      ]
    },
    silver: {
      title: "Standard",
      features: [
        "Standard view",
        "Regular seating",
        "Budget friendly",
        "Flexible seating"
      ]
    }
  };

  const [selectedScreen, setSelectedScreen] = useState(pricing[0]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Cinema Experience
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-light">
            Select your preferred viewing experience
          </p>
        </div>

        {/* Screen Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricing.map((screen) => {
            const Icon = screen.icon;
            return (
              <button
                key={screen.screenId}
                onClick={() => setSelectedScreen(screen)}
                className={`p-8 rounded-lg transition-all duration-300 ${
                  selectedScreen.screenId === screen.screenId
                    ? 'bg-gray-900 text-white shadow-xl'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:shadow-lg'
                }`}
              >
                <Icon className="w-6 h-6 mb-4" />
                <h3 className="text-xl font-light mb-3">{screen.type}</h3>
                <p className="text-sm opacity-80 mb-6">{screen.description}</p>
                <ul className="space-y-3 text-sm">
                  {screen.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-current" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(seatTiers).map(([tier, details]) => (
            <div
              key={tier}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-light text-center text-gray-900 dark:text-gray-100">
                  {details.title}
                </h3>
                <div className="text-center mt-4">
                  <div className="text-3xl font-light text-gray-900 dark:text-gray-100">
                    NPR {selectedScreen.prices[tier as keyof typeof selectedScreen.prices]}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  {details.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                  *Prices may vary based on show timing
                </p>
              
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-5 h-5 text-gray-400" />
            <h4 className="text-lg font-light text-gray-900 dark:text-gray-100">Additional Information</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-400">
            <p>All prices include applicable taxes</p>
            <p>Morning shows: 20% discount</p>
            <p>Student discount: 15% with valid ID</p>
            <p>Senior citizen discount: 25%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPricingPage;