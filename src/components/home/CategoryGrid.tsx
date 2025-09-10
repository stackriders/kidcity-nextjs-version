'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'Action Figures & Collectibles',
    slug: 'action-figures',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🦸‍♂️',
    color: 'from-red-500 to-red-600',
    productCount: 150
  },
  {
    id: '2',
    name: 'Arts, Crafts & DIY',
    slug: 'arts-crafts',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🎨',
    color: 'from-purple-500 to-purple-600',
    productCount: 200
  },
  {
    id: '3',
    name: 'Baby & Preschool',
    slug: 'baby-preschool',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🍼',
    color: 'from-pink-500 to-pink-600',
    productCount: 120
  },
  {
    id: '4',
    name: 'Building & Construction',
    slug: 'building-blocks',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🧱',
    color: 'from-blue-500 to-blue-600',
    productCount: 80
  },
  {
    id: '5',
    name: 'Dolls & Dollhouses',
    slug: 'dolls-accessories',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '👸',
    color: 'from-pink-400 to-pink-500',
    productCount: 90
  },
  {
    id: '6',
    name: 'Electronic Toys',
    slug: 'electronic-toys',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🤖',
    color: 'from-indigo-500 to-indigo-600',
    productCount: 110
  },
  {
    id: '7',
    name: 'Games & Puzzles',
    slug: 'board-games',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🧩',
    color: 'from-green-500 to-green-600',
    productCount: 75
  },
  {
    id: '8',
    name: 'Learning & Education',
    slug: 'educational-toys',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '📚',
    color: 'from-teal-500 to-teal-600',
    productCount: 95
  },
  {
    id: '9',
    name: 'Outdoor & Sports',
    slug: 'outdoor-toys',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '⚽',
    color: 'from-orange-500 to-orange-600',
    productCount: 65
  },
  {
    id: '10',
    name: 'Vehicles & Remote Control',
    slug: 'vehicles',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: '🚗',
    color: 'from-yellow-500 to-yellow-600',
    productCount: 85
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header - Hamleys Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            SHOP BY CATEGORY
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection across all categories - from classic toys to the latest innovations
          </p>
        </motion.div>

        {/* Categories Grid - Hamleys Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Link href={`/category/${category.slug}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                  {/* Background Image */}
                  <div className="relative h-32 sm:h-40 md:h-48">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-85`} />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-3 md:p-4 text-center bg-white">
                    <div className="text-2xl md:text-3xl mb-2">{category.icon}</div>
                    <h3 className="font-bold text-gray-900 text-xs md:text-sm mb-1 group-hover:text-red-600 transition-colors duration-200 leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-2 md:mb-3">
                      {category.productCount}+ products
                    </p>
                    
                    {/* Shop Now Button */}
                    <div className="flex items-center justify-center text-red-600 font-bold text-xs group-hover:text-red-700 transition-colors">
                      <span>Shop Now</span>
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Floating Action */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 text-red-600" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center space-x-2"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}