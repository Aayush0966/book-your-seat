import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Experience Cinema",
      subtitle: "Book your perfect movie night",
      description: "Immerse yourself in stunning visuals and crystal-clear sound",
      image: "https://galalitescreens.com/wp-content/uploads/2024/01/Watching-a-3D-movie-in-cinema-800x533.webp"
    },
    {
      title: "Premium Seats",
      subtitle: "Your comfort, our priority",
      description: "Luxurious reclining seats with extra legroom",
      image: "https://images.stockcake.com/public/f/8/3/f83b2b8e-ad77-4388-b21e-a8c0386aa2d8_large/luxury-cinema-interior-stockcake.jpg"
    },
    {
      title: "Latest Releases",
      subtitle: "Stay up-to-date with the newest movies",
      description: "Watch the biggest blockbusters on release day",
      image: "https://www.themediaant.com/blog/wp-content/uploads/2022/11/Upcoming-movies-to-advertise-your-brand-in-theatres.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 rounded-2xl shadow-2xl">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-24 left-12 right-12 z-20 text-white">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="backdrop-blur-sm bg-black/30 p-8 rounded-2xl"
        >
          <motion.h2
            className="text-6xl font-black mb-4 drop-shadow-lg bg-gradient-to-r from-white via-white to-purple-200 bg-clip-text text-transparent"
          >
            {slides[currentSlide].title}
          </motion.h2>
          <motion.p
            className="text-2xl text-white/90 font-light tracking-wide drop-shadow-lg"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4 backdrop-blur-sm bg-black/20 rounded-full px-6 py-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-2 rounded-full transition-all duration-300 transform ${
              currentSlide === index 
                ? 'bg-white w-12' 
                : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;