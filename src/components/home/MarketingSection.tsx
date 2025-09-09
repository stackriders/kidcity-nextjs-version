'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gift, Truck, Shield, Headphones } from 'lucide-react';

export default function MarketingSection() {
  const promotionalBanners = [
    {
      id: 1,
      title: 'Summer Sale',
      subtitle: 'Up to 50% Off',
      description: 'Amazing deals on selected toys and games',
      image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=600',
      ctaText: 'Shop Sale',
      ctaLink: '/sale',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 2,
      title: 'New Arrivals',
      subtitle: 'Latest Collection',
      description: 'Discover the newest toys and games',
      image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600',
      ctaText: 'Explore New',
      ctaLink: '/new-arrivals',
      color: 'from-blue-500 to-purple-500'
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders above ₹999',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: '100% secure payments',
      color: 'text-blue-600'
    },
    {
      icon: Gift,
      title: 'Gift Wrapping',
      description: 'Free gift wrapping service',
      color: 'text-purple-600'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Always here to help',
      color: 'text-red-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Promotional Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {promotionalBanners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-80`} />
                
                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-4xl font-bold mb-2"
                    >
                      {banner.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl md:text-2xl font-semibold mb-4"
                    >
                      {banner.subtitle}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg mb-6 opacity-90"
                    >
                      {banner.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => window.location.href = banner.ctaLink}
                      >
                        {banner.ctaText}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Hamleys?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the finest toy shopping with our premium services and commitment to quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Playing?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join millions of happy customers and discover the magic of Hamleys
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Shop All Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 font-bold px-8 py-3 rounded-lg"
              >
                Find a Store
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}