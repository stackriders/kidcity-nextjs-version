'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const heroSlides = [
  {
    id: 1,
    title: "The World's Oldest Toy Store",
    subtitle: "Welcome to Hamleys",
    description: "Discover the magic of play with our incredible collection of toys, games and gifts for every age.",
    image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Shop Now",
    badge: "Since 1760",
    color: "from-red-600 via-red-700 to-red-800"
  },
  {
    id: 2,
    title: "New Arrivals Just Landed",
    subtitle: "Fresh & Exciting",
    description: "Be the first to discover our latest collection of amazing toys and games from top brands.",
    image: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Explore New",
    badge: "New Collection",
    color: "from-blue-600 via-purple-600 to-pink-600"
  },
  {
    id: 3,
    title: "Mega Sale Up to 50% Off",
    subtitle: "Limited Time Offer",
    description: "Don't miss out on incredible savings across thousands of toys and games.",
    image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Shop Sale",
    badge: "Save Big",
    color: "from-orange-500 via-red-500 to-pink-500"
  }
];

export default function HeroBanner() {
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
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority={currentSlide === 0}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].color} opacity-80`} />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="w-full max-w-2xl text-white">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-4 md:space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-2 border border-white/30"
                >
                  <Star className="w-4 h-4 mr-2 text-yellow-300" />
                  <span className="text-xs md:text-sm font-bold tracking-wide">{heroSlides[currentSlide].badge}</span>
                </motion.div>

                {/* Subtitle */}
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-base md:text-lg lg:text-xl font-bold tracking-wide opacity-90"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.h2>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-sm md:text-base lg:text-lg opacity-95 max-w-xl leading-relaxed"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="pt-2 md:pt-4"
                >
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-red-50 font-black px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    {heroSlides[currentSlide].cta}
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side Stats - Hamleys Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="hidden xl:block absolute top-8 right-8 text-white text-right"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/20">
                <div className="text-sm font-bold mb-2 opacity-80">TRUSTED SINCE</div>
                <div className="text-3xl lg:text-5xl font-black mb-1">1760</div>
                <div className="text-xs opacity-70 mb-4">260+ YEARS OF JOY</div>
                <div className="border-t border-white/20 pt-4">
                  <div className="text-xl lg:text-2xl font-bold">50M+</div>
                  <div className="text-xs opacity-70">Happy Customers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent z-5" />
    </section>
  );
}