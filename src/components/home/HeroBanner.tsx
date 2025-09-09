'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    image: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1200",
    cta: "Explore Collection",
    badge: "Trending Now",
    color: "from-blue-600 to-purple-600"
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
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
            <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].color} opacity-85`} />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl text-white">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30"
                >
                  <span className="text-sm font-bold tracking-wide">{heroSlides[currentSlide].badge}</span>
                </motion.div>

                {/* Subtitle */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl md:text-2xl font-bold tracking-wide opacity-90"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.h2>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-4xl md:text-6xl font-black leading-tight tracking-tight"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-lg md:text-xl opacity-95 max-w-2xl leading-relaxed"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="pt-4"
                >
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-red-50 font-bold px-8 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {heroSlides[currentSlide].cta}
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/25 backdrop-blur-sm hover:bg-white/40 rounded-full p-3 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/25 backdrop-blur-sm hover:bg-white/40 rounded-full p-3 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
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

      {/* Decorative Elements */}
      <div className="absolute top-8 right-8 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-white/80 text-right"
        >
          <div className="text-sm font-bold mb-1">TRUSTED SINCE</div>
          <div className="text-4xl font-black">1760</div>
          <div className="text-xs opacity-75">260+ YEARS OF MAGIC</div>
        </motion.div>
      </div>
    </section>
  );
}