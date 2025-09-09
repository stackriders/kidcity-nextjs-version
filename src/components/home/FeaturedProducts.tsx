'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { getFeaturedProducts, Product } from '@/lib/firestore';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getFeaturedProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading featured products:', error);
        // Fallback products
        setProducts([
          {
            id: '1',
            name: 'Super Hero Action Figure',
            description: 'Amazing superhero figure with movable joints',
            price: 1299,
            originalPrice: 1599,
            image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
            images: [],
            category: 'Action Figures',
            featured: true,
            rating: 4.8,
            reviews: 124,
            inStock: true,
            badge: 'Best Seller',
            ageRange: '6-12 years'
          },
          {
            id: '2',
            name: 'Educational Building Blocks',
            description: 'Creative building blocks for learning',
            price: 899,
            originalPrice: 1199,
            image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
            images: [],
            category: 'Building Blocks',
            featured: true,
            rating: 4.9,
            reviews: 89,
            inStock: true,
            badge: 'New',
            ageRange: '3-8 years'
          },
          {
            id: '3',
            name: 'Princess Doll Set',
            description: 'Beautiful princess doll with accessories',
            price: 2199,
            originalPrice: 2799,
            image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
            images: [],
            category: 'Dolls',
            featured: true,
            rating: 4.7,
            reviews: 156,
            inStock: true,
            badge: 'Popular',
            ageRange: '4-10 years'
          },
          {
            id: '4',
            name: 'Remote Control Car',
            description: 'High-speed remote control racing car',
            price: 3499,
            originalPrice: 4299,
            image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
            images: [],
            category: 'Vehicles',
            featured: true,
            rating: 4.6,
            reviews: 203,
            inStock: true,
            badge: 'Sale',
            ageRange: '8+ years'
          },
          {
            id: '5',
            name: 'Art & Craft Kit',
            description: 'Complete art and craft supplies kit',
            price: 1599,
            originalPrice: 1999,
            image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
            images: [],
            category: 'Arts & Crafts',
            featured: true,
            rating: 4.8,
            reviews: 67,
            inStock: true,
            badge: 'Creative',
            ageRange: '5+ years'
          },
          {
            id: '6',
            name: 'Puzzle Adventure Game',
            description: '1000-piece challenging puzzle',
            price: 799,
            originalPrice: 999,
            image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
            images: [],
            category: 'Puzzles',
            featured: true,
            rating: 4.5,
            reviews: 91,
            inStock: true,
            badge: 'Educational',
            ageRange: '10+ years'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
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
    'Educational': 'bg-teal-500'
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-300 rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular toys and games, carefully selected for quality, fun and educational value.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-xl">
                <div className="relative">
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className={`absolute top-3 left-3 ${badgeColors[product.badge as keyof typeof badgeColors]} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        {product.badge}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
                      >
                        <Heart className="w-4 h-4 text-gray-700 hover:text-red-600 transition-colors" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-700 hover:text-blue-600 transition-colors" />
                      </motion.button>
                    </div>

                    {/* Quick Add to Cart */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-3 right-3 bg-red-600 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-red-700"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>

                    {/* Discount Badge */}
                    {product.originalPrice > product.price && (
                      <div className="absolute bottom-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    {/* Category & Age Range */}
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-gray-500 font-medium">{product.category}</p>
                      <p className="text-xs text-gray-400">{product.ageRange}</p>
                    </div>
                    
                    {/* Product Name */}
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4">
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
                        <span className="text-2xl font-bold text-red-600">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gray-900 hover:bg-black text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            VIEW ALL PRODUCTS
          </Button>
        </motion.div>
      </div>
    </section>
  );
}