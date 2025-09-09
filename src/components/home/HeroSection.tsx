'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const heroSlides = [
  {
    id: 1,
    title: "The Finest Toy Shop in the World",
    subtitle: "Welcome to Hamleys",
    description: "Discover magical toys and games that spark imagination and create unforgettable memories.",
    image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Shop Now",
    badge: "Since 1760",
    color: "from-red-600 to-red-800"
  },
  {
    id: 2,
    title: "Toys That Inspire Wonder",
    subtitle: "Play. Learn. Grow.",
    description: "From classic teddy bears to the latest tech toys, find everything your child dreams of.",
    image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Explore Collection",
    badge: "Trending Now",
    color: "from-blue-600 to-purple-600"
  },
  {
    id: 3,
    title: "Adventure Awaits",
    subtitle: "Outdoor Fun & Games",
    description: "Bikes, scooters, sports equipment and outdoor toys for endless adventures.",
    image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Start Adventure",
    badge: "Outdoor Collection",
    color: "from-green-600 to-teal-600"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].color} opacity-85`} />
          
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-white space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center space-x-2 bg-white/25 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30"
                >
                  <span className="text-sm font-bold uppercase tracking-wide">{heroSlides[currentSlide].badge}</span>
                </motion.div>

                {/* Main Title */}
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-xl md:text-2xl font-bold mb-2 opacity-95 tracking-wide"
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.h2>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-3xl md:text-5xl font-black leading-tight tracking-tight"
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-lg md:text-xl opacity-95 max-w-lg leading-relaxed font-medium"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-red-50 font-bold px-10 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white"
                  >
                    {heroSlides[currentSlide].cta}
                  </Button>
                </motion.div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="hidden lg:block"
              >
                <div className="text-right">
                  <div className="text-white/80 text-sm font-medium mb-2">TRUSTED SINCE 1760</div>
                  <div className="text-white text-4xl font-black">260+</div>
                  <div className="text-white/90 text-sm">YEARS OF MAGIC</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/25 backdrop-blur-sm hover:bg-white/40 rounded-full p-3 transition-all duration-200 border border-white/30"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/25 backdrop-blur-sm hover:bg-white/40 rounded-full p-3 transition-all duration-200 border border-white/30"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/50 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}