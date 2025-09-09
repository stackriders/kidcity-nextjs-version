'use client';

import React from 'react';
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
  'Best Seller': 'bg-red-600',
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            FEATURED PRODUCTS
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular toys and games, carefully selected for quality, fun and educational value.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 bg-white rounded-lg">
                <div className="relative">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-50">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    
                    {/* Badge */}
                    <div className={`absolute top-3 left-3 ${badgeColors[product.badge as keyof typeof badgeColors]} text-white px-2 py-1 rounded text-xs font-bold`}>
                      {product.badge}
                    </div>

                    {/* Wishlist Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                    >
                      <Heart className="w-4 h-4 text-gray-700 hover:text-red-600 transition-colors" />
                    </motion.button>

                    {/* Quick Add to Cart */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-3 right-3 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <CardContent className="p-4">
                    {/* Category */}
                    <p className="text-xs text-gray-500 mb-2 font-medium">{product.category}</p>
                    
                    {/* Product Name */}
                    <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
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
                        <span className="text-xl font-black text-red-600">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-green-600">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      ADD TO CART
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
            className="bg-gray-900 hover:bg-black text-white font-bold px-8 py-3 rounded-md transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            VIEW ALL PRODUCTS
          </Button>
        </motion.div>
      </div>
    </section>
  );
}