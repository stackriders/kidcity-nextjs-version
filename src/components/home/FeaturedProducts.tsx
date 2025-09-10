'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const featuredProducts = [
  {
    id: '1',
    name: 'LEGO Creator 3-in-1 Deep Sea Creatures',
    description: 'Build a shark, squid, or angler fish with this amazing 3-in-1 set',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Building & Construction',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    badge: 'Best Seller',
    ageRange: '7+ years',
    brand: 'LEGO'
  },
  {
    id: '2',
    name: 'Barbie Dreamhouse Adventures Playset',
    description: 'Three floors of fun with working elevator and pool slide',
    price: 8999,
    originalPrice: 10999,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dolls & Dollhouses',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    badge: 'New Arrival',
    ageRange: '3+ years',
    brand: 'Barbie'
  },
  {
    id: '3',
    name: 'Hot Wheels Ultimate Garage Playset',
    description: 'Multi-level garage with car wash, gas station and more',
    price: 5499,
    originalPrice: 6499,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Vehicles & Remote Control',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    badge: 'Popular',
    ageRange: '4+ years',
    brand: 'Hot Wheels'
  },
  {
    id: '4',
    name: 'Nerf Elite 2.0 Commander Blaster',
    description: 'Motorized blaster with 6-dart rotating drum',
    price: 3299,
    originalPrice: 3999,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Action Figures & Collectibles',
    rating: 4.6,
    reviews: 203,
    inStock: true,
    badge: 'Sale',
    ageRange: '8+ years',
    brand: 'Nerf'
  },
  {
    id: '5',
    name: 'Crayola Light-Up Tracing Pad',
    description: 'LED light pad for tracing and drawing activities',
    price: 1899,
    originalPrice: 2299,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Arts, Crafts & DIY',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    badge: 'Creative',
    ageRange: '6+ years',
    brand: 'Crayola'
  },
  {
    id: '6',
    name: 'Ravensburger 1000pc Puzzle Collection',
    description: 'Premium quality jigsaw puzzle with vibrant artwork',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Games & Puzzles',
    rating: 4.5,
    reviews: 91,
    inStock: true,
    badge: 'Brain Teaser',
    ageRange: '12+ years',
    brand: 'Ravensburger'
  },
  {
    id: '7',
    name: 'LeapFrog Learning Friends 100 Words Book',
    description: 'Interactive book that teaches first words in English and Spanish',
    price: 2199,
    originalPrice: 2599,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Learning & Education',
    rating: 4.9,
    reviews: 45,
    inStock: true,
    badge: 'Educational',
    ageRange: '18m+ years',
    brand: 'LeapFrog'
  },
  {
    id: '8',
    name: 'Pogo Stick for Kids with Foam Handles',
    description: 'Safe pogo stick with comfortable foam grips',
    price: 2799,
    originalPrice: 3299,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Outdoor & Sports',
    rating: 4.4,
    reviews: 78,
    inStock: false,
    badge: 'Active Play',
    ageRange: '5+ years',
    brand: 'Flybar'
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
    'New Arrival': 'bg-green-500',
    'Popular': 'bg-blue-500',
    'Sale': 'bg-orange-500',
    'Creative': 'bg-purple-500',
    'Educational': 'bg-teal-500',
    'Brain Teaser': 'bg-yellow-600',
    'Active Play': 'bg-pink-500'
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header - Hamleys Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Zap className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            FEATURED PRODUCTS
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular toys and games, loved by children and parents worldwide
          </p>
        </motion.div>

        {/* Products Grid - Hamleys Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl h-full">
                <div className="relative">
                  {/* Product Image */}
                  <Link href={`/product/${product.id}`}>
                    <div className="relative h-48 md:h-64 overflow-hidden bg-gray-50 cursor-pointer">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Badge */}
                      {product.badge && (
                        <div className={`absolute top-2 left-2 md:top-3 md:left-3 ${badgeColors[product.badge as keyof typeof badgeColors]} text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-bold shadow-lg`}>
                          {product.badge}
                        </div>
                      )}

                      {/* Stock Status */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {/* Discount Badge */}
                      {product.originalPrice > product.price && (
                        <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Quick Actions - Hamleys Style */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-1 md:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/95 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-xl hover:bg-white transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="w-5 h-5 text-gray-700 hover:text-red-600 transition-colors" />
                    </motion.button>
                    <Link href={`/product/${product.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/95 backdrop-blur-sm rounded-full p-2 md:p-3 shadow-xl hover:bg-white transition-colors"
                        aria-label="Quick view"
                      >
                        <Eye className="w-5 h-5 text-gray-700 hover:text-blue-600 transition-colors" />
                      </motion.button>
                    </Link>
                    {product.inStock && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddToCart(product)}
                        className="bg-red-600 text-white rounded-full p-2 md:p-3 shadow-xl hover:bg-red-700 transition-colors"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>

                  <CardContent className="p-4 md:p-6">
                    {/* Brand & Age */}
                    <div className="flex justify-between items-center mb-2 md:mb-3">
                      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        {product.brand}
                      </span>
                      className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-red-600 text-white rounded-full p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-red-700"
                        {product.ageRange}
                      </span>
                    </div>
                    
                    {/* Product Name */}
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors cursor-pointer leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 md:space-x-2 mb-3 md:mb-4">
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
                      <span className="text-xs md:text-sm text-gray-600 font-medium">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg md:text-2xl font-black text-red-600">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-xs md:text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      <p className="text-xs text-orange-600 mb-2 md:mb-3 font-medium">
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 md:py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button - Hamleys Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-black text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>VIEW ALL PRODUCTS</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}