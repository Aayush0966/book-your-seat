'use client'
import React, { useState } from 'react';
import { Star, Film, Clapperboard } from 'lucide-react';

const TicketPricingPage = () => {
  const pricing = [
    {
      screenId: 1,
      type: "Standard",
      prices: { platinum: 150, gold: 200, silver: 300 },
      icon: Film,
      emoji: "🎬",
      description: "Classic digital projection with crystal clear sound"
    },
    {
      screenId: 2,
      type: "3D",
      prices: { platinum: 250, gold: 300, silver: 400 },
      icon: Clapperboard,
      emoji: "🔮",
      description: "Immersive 3D experience with depth-enhanced visuals"
    },
    {
      screenId: 3,
      type: "IMAX",
      prices: { platinum: 300, gold: 400, silver: 600 },
      icon: Star,
      emoji: "✨",
      description: "Ultimate movie experience with massive screen and precision audio"
    }
  ];

  const seatTiers = {
    platinum: {
      emoji: "👑",
      features: [
        "Best viewing angle",
        "Extra leg room",
        "Premium service"
      ]
    },
    gold: {
      emoji: "⭐",
      features: [
        "Optimal distance",
        "Comfortable seating",
        "Great value"
      ]
    },
    silver: {
      emoji: "🎫",
      features: [
        "Standard view",
        "Regular seating",
        "Budget friendly"
      ]
    }
  };

  const [selectedScreen, setSelectedScreen] = useState(pricing[0]);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-dark-text dark:text-text mb-4">
            Movie Ticket Pricing
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary text-lg">
            Choose your preferred screen type
          </p>
        </div>

        {/* Screen Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pricing.map((screen) => {
            const Icon = screen.icon;
            return (
              <button
                key={screen.screenId}
                onClick={() => setSelectedScreen(screen)}
                className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedScreen.screenId === screen.screenId
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-dark-background-secondary hover:bg-background-secondary dark:hover:bg-dark-background text-dark-text dark:text-text'
                }`}
              >
                <div className="text-3xl mb-4">{screen.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{screen.type}</h3>
                <p className="text-sm opacity-80">{screen.description}</p>
              </button>
            )}
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Platinum */}
          <div className="bg-white dark:bg-dark-background-secondary rounded-xl overflow-hidden shadow-lg animate-slide-up">
            <div className="bg-primary/10 p-4">
              <div className="text-center mb-2 text-3xl">{seatTiers.platinum.emoji}</div>
              <h3 className="text-xl font-bold text-center text-primary">Platinum</h3>
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-dark-text dark:text-text">
                  ₹{selectedScreen.prices.platinum}
                </div>
                <p className="text-text-secondary dark:text-dark-text-secondary mt-2">Premium Seating</p>
              </div>
              <ul className="text-text-secondary dark:text-dark-text-secondary space-y-2">
                {seatTiers.platinum.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gold */}
          <div className="bg-white dark:bg-dark-background-secondary rounded-xl overflow-hidden shadow-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-secondary/10 p-4">
              <div className="text-center mb-2 text-3xl">{seatTiers.gold.emoji}</div>
              <h3 className="text-xl font-bold text-center text-secondary">Gold</h3>
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-dark-text dark:text-text">
                  ₹{selectedScreen.prices.gold}
                </div>
                <p className="text-text-secondary dark:text-dark-text-secondary mt-2">Mid-tier Seating</p>
              </div>
              <ul className="text-text-secondary dark:text-dark-text-secondary space-y-2">
                {seatTiers.gold.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Silver */}
          <div className="bg-white dark:bg-dark-background-secondary rounded-xl overflow-hidden shadow-lg animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-accent/10 p-4">
              <div className="text-center mb-2 text-3xl">{seatTiers.silver.emoji}</div>
              <h3 className="text-xl font-bold text-center text-accent">Silver</h3>
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-dark-text dark:text-text">
                  ₹{selectedScreen.prices.silver}
                </div>
                <p className="text-text-secondary dark:text-dark-text-secondary mt-2">Standard Seating</p>
              </div>
              <ul className="text-text-secondary dark:text-dark-text-secondary space-y-2">
                {seatTiers.silver.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white dark:bg-dark-background-secondary rounded-xl p-6 animate-fade-in">
          <h4 className="font-bold text-dark-text dark:text-text mb-4">Important Information</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-secondary dark:text-dark-text-secondary">
            <li className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              Prices include all applicable taxes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">☀️</span>
              Special rates for morning shows
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">📚</span>
              Student discounts available
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">👴</span>
              Senior citizen discounts applicable
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TicketPricingPage;