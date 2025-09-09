'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getCategories, Category } from '@/lib/firestore';

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
        // Fallback categories
        setCategories([
          {
            id: '1',
            name: 'Action Figures',
            slug: 'action-figures',
            image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
            icon: '🦸‍♂️',
            color: 'from-red-500 to-red-600',
            productCount: 150
          },
          {
            id: '2',
            name: 'Dolls & Accessories',
            slug: 'dolls-accessories',
            image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
            icon: '👸',
            color: 'from-pink-500 to-pink-600',
            productCount: 200
          },
          {
            id: '3',
            name: 'Building Blocks',
            slug: 'building-blocks',
            image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
            icon: '🧱',
            color: 'from-blue-500 to-blue-600',
            productCount: 120
          },
          {
            id: '4',
            name: 'Puzzles',
            slug: 'puzzles',
            image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
            icon: '🧩',
            color: 'from-green-500 to-green-600',
            productCount: 80
          },
          {
            id: '5',
            name: 'Board Games',
            slug: 'board-games',
            image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
            icon: '🎲',
            color: 'from-purple-500 to-purple-600',
            productCount: 90
          },
          {
            id: '6',
            name: 'Vehicles',
            slug: 'vehicles',
            image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
            icon: '🚗',
            color: 'from-yellow-500 to-orange-500',
            productCount: 110
          },
          {
            id: '7',
            name: 'Arts & Crafts',
            slug: 'arts-crafts',
            image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
            icon: '🎨',
            color: 'from-teal-500 to-teal-600',
            productCount: 75
          },
          {
            id: '8',
            name: 'Electronic Toys',
            slug: 'electronic-toys',
            image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
            icon: '🤖',
            color: 'from-indigo-500 to-indigo-600',
            productCount: 95
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-300 rounded-lg h-32 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of toys, games and gifts for every age and interest.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Link href={`/category/${category.slug}`}>
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                  {/* Background Image */}
                  <div className="relative h-32 md:h-40">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-4 text-center">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="font-bold text-white text-sm md:text-base mb-1 group-hover:scale-105 transition-transform duration-200">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-xs">
                      {category.productCount} products
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      Shop Now
                    </span>
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