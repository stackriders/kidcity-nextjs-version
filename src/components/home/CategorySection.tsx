'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Action Figures',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/action-figures',
    color: 'from-red-500 to-red-600',
    icon: '🦸‍♂️'
  },
  {
    name: 'Dolls & Accessories',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/dolls-accessories',
    color: 'from-pink-500 to-pink-600',
    icon: '👸'
  },
  {
    name: 'Building Blocks',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/building-blocks',
    color: 'from-blue-500 to-blue-600',
    icon: '🧱'
  },
  {
    name: 'Educational Toys',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/educational-toys',
    color: 'from-green-500 to-green-600',
    icon: '🎓'
  },
  {
    name: 'Outdoor Toys',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/outdoor-toys',
    color: 'from-yellow-500 to-orange-500',
    icon: '⚽'
  },
  {
    name: 'Board Games',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/board-games',
    color: 'from-purple-500 to-purple-600',
    icon: '🎲'
  },
  {
    name: 'Arts & Crafts',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/arts-crafts',
    color: 'from-teal-500 to-teal-600',
    icon: '🎨'
  },
  {
    name: 'Electronic Toys',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/electronic-toys',
    color: 'from-indigo-500 to-indigo-600',
    icon: '🤖'
  }
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            SHOP BY CATEGORY
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of toys, games and gifts for every age and interest.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Link href={category.href}>
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`} />
                  
                  {/* Background Image */}
                  <div className="relative h-24 md:h-32">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-3 md:p-4 text-center">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-2xl md:text-3xl mb-2"
                    >
                      {category.icon}
                    </motion.div>
                    
                    {/* Category Name */}
                    <h3 className="font-bold text-white text-xs md:text-sm group-hover:scale-105 transition-transform duration-200">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '260+', label: 'Years of Magic', icon: '🎪' },
              { number: '50,000+', label: 'Products', icon: '🧸' },
              { number: '1000+', label: 'Brands', icon: '🏆' },
              { number: '24/7', label: 'Support', icon: '💬' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xl md:text-2xl font-black text-red-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-semibold text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}