'use client'
import React, { useState } from 'react';
import { Star, Film, Clapperboard, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const TicketPricingPage = () => {
  const pricing = [
    {
      screenId: 1,
      type: "Standard",
      prices: { platinum: 300, gold: 200, silver: 150 },
      icon: Film,
      emoji: "🎬",
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
      emoji: "🔮",
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
      emoji: "✨",
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
      emoji: "👑",
      features: [
        "Best viewing angle",
        "Extra leg room",
        "Premium service",
        "Priority entry"
      ]
    },
    gold: {
      emoji: "⭐",
      features: [
        "Optimal distance",
        "Comfortable seating",
        "Great value",
        "Reserved seating"
      ]
    },
    silver: {
      emoji: "🎫",
      features: [
        "Standard view",
        "Regular seating",
        "Budget friendly",
        "Flexible seating"
      ]
    }
  };

  const [selectedScreen, setSelectedScreen] = useState(pricing[0]);
  const [showTooltip, setShowTooltip] = useState('');

  return (
    <div className="min-h-screen mt-20 bg-background dark:bg-dark-background p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-dark-text dark:text-text mb-4">
            Movie Ticket Pricing
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary text-lg">
            Choose your preferred screen type and seating tier
          </p>
        </motion.div>

        {/* Screen Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pricing.map((screen, index) => {
            const Icon = screen.icon;
            return (
              <motion.button
                key={screen.screenId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
                <div className="mt-4 pt-4 border-t border-white/20">
                  <ul className="text-sm space-y-2">
                    {screen.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.button>
            )}
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(seatTiers).map(([tier, details], index) => (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-dark-background-secondary rounded-xl overflow-hidden shadow-lg relative group"
              onMouseEnter={() => setShowTooltip(tier)}
              onMouseLeave={() => setShowTooltip('')}
            >
              <div className={`p-4 ${
                tier === 'platinum' ? 'bg-primary/10' :
                tier === 'gold' ? 'bg-secondary/10' :
                'bg-accent/10'
              }`}>
                <div className="text-center mb-2 text-3xl">{details.emoji}</div>
                <h3 className={`text-xl font-bold text-center ${
                  tier === 'platinum' ? 'text-primary' :
                  tier === 'gold' ? 'text-secondary' :
                  'text-accent'
                }`}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </h3>
              </div>
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-dark-text dark:text-text">
                    NPR {selectedScreen.prices[tier as keyof typeof selectedScreen.prices]}
                  </div>
                  <p className="text-text-secondary dark:text-dark-text-secondary mt-2">
                    {tier === 'platinum' ? 'Premium Seating' :
                     tier === 'gold' ? 'Mid-tier Seating' :
                     'Standard Seating'}
                  </p>
                </div>
                <ul className="text-text-secondary dark:text-dark-text-secondary space-y-2">
                  {details.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        tier === 'platinum' ? 'bg-primary' :
                        tier === 'gold' ? 'bg-secondary' :
                        'bg-accent'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`mt-6 w-full py-2 rounded-lg font-medium transition-all duration-200 ${
                  tier === 'platinum' ? 'bg-primary text-white hover:bg-primary/90' :
                  tier === 'gold' ? 'bg-secondary text-white hover:bg-secondary/90' :
                  'bg-accent text-white hover:bg-accent/90'
                }`}>
                  Book Now
                </button>
              </div>
              {showTooltip === tier && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm py-1 px-3 rounded shadow-lg z-10">
                  Click to book
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white dark:bg-dark-background-secondary rounded-xl p-6"
        >
          <div className="flex items-center gap-2 text-dark-text dark:text-text mb-4">
            <Info className="w-5 h-5" />
            <h4 className="font-bold">Important Information</h4>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-secondary dark:text-dark-text-secondary">
            <li className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              Prices include all applicable taxes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">☀️</span>
              Special rates for morning shows (20% off)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">📚</span>
              Student discounts available (15% off with ID)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">👴</span>
              Senior citizen discounts (25% off)
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default TicketPricingPage;