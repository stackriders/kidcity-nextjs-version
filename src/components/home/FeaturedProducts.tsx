'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

const featuredProducts = [
  {
    id: '1',
    name: 'Super Hero Action Figure',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Educational Building Set',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'New'
  },
  {
    id: '3',
    name: 'Princess Doll Collection',
    price: 2199,
    originalPrice: 2799,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Popular'
  },
  {
    id: '4',
    name: 'Remote Control Car',
    price: 3499,
    originalPrice: 4299,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Sale'
  },
  {
    id: '5',
    name: 'Art & Craft Kit',
    price: 1599,
    originalPrice: 1999,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Creative'
  },
  {
    id: '6',
    name: 'Puzzle Adventure',
    price: 799,
    originalPrice: 999,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Brain Teaser'
  }
];

export default function FeaturedProducts() {
  const { addItem } = useCart();

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const badgeColors = {
    'Best Seller': 'bg-red-600',
    'New': 'bg-green-500',
    'Popular': 'bg-blue-500',
    'Sale': 'bg-orange-500',
    'Creative': 'bg-purple-500',
    'Brain Teaser': 'bg-yellow-600'
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Discover our most popular toys loved by children worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105 bg-white overflow-hidden">
                <div className="relative">
                  <div className="relative h-48 overflow-hidden rounded-xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.badge && (
                      <div className={`absolute top-2 left-2 ${badgeColors[product.badge as keyof typeof badgeColors]} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                        {product.badge}
                      </div>
                    )}
                    {product.originalPrice > product.price && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 font-['Poppins']">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl font-bold text-red-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full rounded-full px-6 py-3 bg-red-600 text-white shadow-md hover:bg-red-700 transition font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}