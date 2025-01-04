import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';


const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Experience Cinema",
      subtitle: "Book your perfect movie night",
      image: "/api/placeholder/1200/800"
    },
    {
      title: "Premium Seats",
      subtitle: "Your comfort, our priority",
      image: "/api/placeholder/1200/800"
    },
    {
      title: "Latest Releases",
      subtitle: "Watch them first",
      image: "/api/placeholder/1200/800"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

 

  return (
    <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-purple-900">
        <motion.button
          className="absolute top-4 left-4 z-20 flex items-center space-x-2 text-white/80 hover:text-white"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to website</span>
        </motion.button>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent" />
        
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
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-20 left-20 z-20 text-white">
          <motion.h2
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            {slides[currentSlide].title}
          </motion.h2>
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-white/80"
          >
            {slides[currentSlide].subtitle}
          </motion.p>
        </div>

        <div className="absolute bottom-10 left-20 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-1 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
  )
}

export default SlideShow