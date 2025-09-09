'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Action Figures',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/action-figures',
    color: 'from-red-400 to-pink-500',
    icon: '🦸‍♂️'
  },
  {
    name: 'Dolls & Accessories',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/dolls-accessories',
    color: 'from-pink-400 to-purple-500',
    icon: '👸'
  },
  {
    name: 'Building Blocks',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/building-blocks',
    color: 'from-blue-400 to-cyan-500',
    icon: '🧱'
  },
  {
    name: 'Educational Toys',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/educational-toys',
    color: 'from-green-400 to-teal-500',
    icon: '🎓'
  },
  {
    name: 'Outdoor Toys',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/outdoor-toys',
    color: 'from-yellow-400 to-orange-500',
    icon: '⚽'
  },
  {
    name: 'Board Games',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/board-games',
    color: 'from-purple-400 to-indigo-500',
    icon: '🎲'
  },
  {
    name: 'Arts & Crafts',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/arts-crafts',
    color: 'from-teal-400 to-blue-500',
    icon: '🎨'
  },
  {
    name: 'Electronic Toys',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/electronic-toys',
    color: 'from-indigo-400 to-purple-500',
    icon: '🤖'
  }
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🎪 Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our amazing collection of toys organized just for you! Find exactly what you're looking for.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link href={category.href}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border-2 border-gray-100 hover:border-transparent">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Background Image */}
                  <div className="relative h-32 md:h-40">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-4 text-center">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-4xl mb-2"
                    >
                      {category.icon}
                    </motion.div>
                    
                    {/* Category Name */}
                    <h3 className="font-bold text-white text-sm md:text-base group-hover:scale-105 transition-transform duration-200">
                      {category.name}
                    </h3>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '10,000+', label: 'Happy Kids', icon: '😊' },
            { number: '5,000+', label: 'Toys Available', icon: '🧸' },
            { number: '500+', label: 'Brands', icon: '🏆' },
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
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}