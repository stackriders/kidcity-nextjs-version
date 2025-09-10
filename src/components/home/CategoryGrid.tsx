'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    name: 'Action Figures',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/action-figures',
    icon: '🦸‍♂️'
  },
  {
    id: 2,
    name: 'Dolls & Accessories',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/dolls-accessories',
    icon: '👸'
  },
  {
    id: 3,
    name: 'Building Blocks',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/building-blocks',
    icon: '🧱'
  },
  {
    id: 4,
    name: 'Educational Toys',
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/educational-toys',
    icon: '🎓'
  },
  {
    id: 5,
    name: 'Board Games',
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    href: '/category/board-games',
    icon: '🎲'
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Discover our amazing collection of toys for every interest
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Link href={category.href}>
                <div className="rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105 bg-white overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <h3 className="font-bold text-sm font-['Poppins']">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}