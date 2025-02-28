'use client'
import React, { useState } from 'react';
import { Star, Film, Clapperboard, Info } from 'lucide-react';
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 text-gray-800 py-16 px-4 mt-16 relative">
      {/* Decorative elements with white gradients */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center gap-2 mb-2 justify-center">
            <Star className="text-red-500 w-8 h-8" />
            <h2 className="text-lg font-semibold uppercase tracking-wider text-red-500">Select Your Experience</h2>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ff0000] to-primary">
            Cinema Experience
          </h1>
          <p className="text-gray-700 text-xl font-light">
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
                    ? 'bg-gradient-to-br from-red-800 to-red-900 text-white shadow-xl'
                    : 'bg-gray-200 backdrop-blur-sm text-gray-800 hover:shadow-lg hover:bg-gray-300'
                }`}
              >
                <Icon className={`w-6 h-6 mb-4 ${selectedScreen.screenId === screen.screenId ? 'text-white' : 'text-red-500'}`} />
                <h3 className="text-xl font-light mb-3">{screen.type}</h3>
                <p className="text-sm opacity-80 mb-6">{screen.description}</p>
                <ul className="space-y-3 text-sm">
                  {screen.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-red-500" />
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
              className="bg-gray-200 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-300"
            >
              <div className="p-6 border-b border-gray-300">
                <h3 className="text-xl font-light text-center text-gray-800">
                  {details.title}
                </h3>
                <div className="text-center mt-4">
                  <div className="text-3xl font-light bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                    NPR {selectedScreen.prices[tier as keyof typeof selectedScreen.prices]}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-700">
                  {details.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-red-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-600 italic">
                  *Prices may vary based on show timing
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gray-200 backdrop-blur-sm rounded-lg p-8 border border-gray-300">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-5 h-5 text-red-500" />
            <h4 className="text-lg font-light text-gray-800">Additional Information</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
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