"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Theater Enthusiast",
    quote: "The booking experience was seamless, and the show exceeded all my expectations. I'll definitely be coming back!",
    avatar: "/api/placeholder/64/64",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Regular Patron",
    quote: "I've been using this platform for all my bookings. The selection is excellent and the service is top-notch.",
    avatar: "/api/placeholder/64/64",
    rating: 4
  },
  {
    id: 3,
    name: "Emma Williams",
    position: "First-time Visitor",
    quote: "As someone new to theater, this site made it easy to find the perfect show. The recommendations were spot on!",
    avatar: "/api/placeholder/64/64",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 ">
      <div className="relative py-16">
        {/* Decorative quotes with enhanced styling */}
        <Quote className="absolute text-primary/5 w-40 h-40 -top-10 -left-10 transform -rotate-12" />
        <Quote className="absolute text-secondary/5 w-32 h-32 -bottom-10 -right-10 transform rotate-180" />
        
        {/* Updated Card container with brown-focused scheme */}
        <div className="relative backdrop-blur-sm rounded-2xl overflow-hidden bg-gradient-to-br from-[#8B5D33]/20 via-[#8B5D33]/10 to-[#8B5D33]/5">
          <div className="relative h-[400px] md:h-[450px]">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  index === activeIndex
                    ? "opacity-100 z-10 translate-y-0"
                    : "opacity-0 z-0 translate-y-4"
                }`}
              >
                <CardContent className="p-8 md:p-12 h-full flex flex-col justify-between items-center">
                  {/* Rating stars with animation */}
                  <div className="flex justify-center mb-4 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 transition-all duration-300 ${
                          i < (testimonial.rating || 5)
                            ? "text-yellow-400 fill-yellow-400 scale-110"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Quote with improved typography and styling */}
                  <blockquote className="text-xl md:text-2xl font-light italic text-center mb-8 leading-relaxed max-w-3xl">
                    <span className="text-primary text-3xl font-serif">"</span>
                    {testimonial.quote}
                    <span className="text-primary text-3xl font-serif">"</span>
                  </blockquote>
                  
                  {/* Profile section with enhanced styling */}
                  <div className="flex flex-col items-center">
                    <div className="text-center">
                      <h4 className="font-bold text-lg text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-primary/10 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-primary/10 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
        
        {/* Indicator dots with animation */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full  transition-all transform duration-300 ${
                index === activeIndex
                  ? "bg-primary scale-125 w-8"
                  : "bg-primary/20 hover:bg-primary/50"
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}