'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBanners, Banner } from '@/lib/firestore';

export default function HeroBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const fetchedBanners = await getBanners();
        setBanners(fetchedBanners);
      } catch (error) {
        console.error('Error loading banners:', error);
        // Fallback banners
        setBanners([
          {
            id: '1',
            title: 'The Finest Toy Shop in the World',
            subtitle: 'Welcome to Hamleys',
            description: 'Discover magical toys and games that spark imagination and create unforgettable memories.',
            image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1200',
            ctaText: 'Shop Now',
            ctaLink: '/products',
            order: 1,
            active: true
          },
          {
            id: '2',
            title: 'New Arrivals Collection',
            subtitle: 'Latest & Greatest',
            description: 'Explore our newest collection of toys, games, and educational products for all ages.',
            image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1200',
            ctaText: 'Explore Collection',
            ctaLink: '/new-arrivals',
            order: 2,
            active: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (loading) {
    return (
      <section className="relative h-96 md:h-[500px] bg-gray-100 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400" />
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Hamleys</h1>
          <p className="text-xl">The Finest Toy Shop in the World</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={banners[currentSlide].image}
              alt={banners[currentSlide].title}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-lg md:text-xl font-semibold text-red-300">
                  {banners[currentSlide].subtitle}
                </h2>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  {banners[currentSlide].title}
                </h1>
                <p className="text-lg md:text-xl opacity-90 max-w-lg">
                  {banners[currentSlide].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3"
                    onClick={() => window.location.href = banners[currentSlide].ctaLink}
                  >
                    {banners[currentSlide].ctaText}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-900"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}