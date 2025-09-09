'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const featuredProducts = [
  {
    id: '1',
    name: 'Super Hero Action Figure',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    category: 'Action Figures'
  },
  {
    id: '2',
    name: 'Educational Building Blocks',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    reviews: 89,
    badge: 'New',
    category: 'Building Blocks'
  },
  {
    id: '3',
    name: 'Princess Doll Set',
    price: 2199,
    originalPrice: 2799,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    reviews: 156,
    badge: 'Popular',
    category: 'Dolls'
  },
  {
    id: '4',
    name: 'Remote Control Car',
    price: 3499,
    originalPrice: 4299,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    reviews: 203,
    badge: 'Sale',
    category: 'Electronic Toys'
  },
  {
    id: '5',
    name: 'Art & Craft Kit',
    price: 1599,
    originalPrice: 1999,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    reviews: 67,
    badge: 'Creative',
    category: 'Arts & Crafts'
  },
  {
    id: '6',
    name: 'Puzzle Adventure Game',
    price: 799,
    originalPrice: 999,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    reviews: 91,
    badge: 'Educational',
    category: 'Board Games'
  }
];

const badgeColors = {
  'Best Seller': 'bg-red-500',
  'New': 'bg-green-500',
  'Popular': 'bg-blue-500',
  'Sale': 'bg-orange-500',
  'Creative': 'bg-purple-500',
  'Educational': 'bg-teal-500'
};

export default function FeaturedProducts() {
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ✨ Featured Toys
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked favorites that kids absolutely love! From educational games to action-packed adventures.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                <div className="relative">
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Badge */}
                    <div className={`absolute top-3 left-3 ${badgeColors[product.badge as keyof typeof badgeColors]} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                      {product.badge}
                    </div>

                    {/* Wishlist Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </motion.button>

                    {/* Quick Add to Cart */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-3 right-3 bg-pink-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <CardContent className="p-4">
                    {/* Category */}
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    
                    {/* Product Name */}
                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-pink-600">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-200"
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}