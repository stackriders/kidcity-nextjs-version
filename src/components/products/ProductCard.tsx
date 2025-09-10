'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { addToWishlist, removeFromWishlist, isInWishlist } from '@/lib/wishlist';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [wishlistLoading, setWishlistLoading] = React.useState(false);

  React.useEffect(() => {
    const checkWishlistStatus = async () => {
      if (user) {
        const inWishlist = await isInWishlist(user.uid, product.id);
        setIsWishlisted(inWishlist);
      }
    };

    checkWishlistStatus();
  }, [user, product.id]);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }

    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        await removeFromWishlist(user.uid, product.id);
        setIsWishlisted(false);
      } else {
        await addToWishlist(
          user.uid,
          product.id,
          product.name,
          product.price,
          product.image,
          product.rating
        );
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  const badgeColors = {
    'Best Seller': 'bg-red-600',
    'New': 'bg-green-500',
    'Popular': 'bg-blue-500',
    'Sale': 'bg-orange-500',
    'Creative': 'bg-purple-500',
    'Educational': 'bg-teal-500',
    'Tech': 'bg-indigo-600',
    'Brain Teaser': 'bg-yellow-600',
    'Family Fun': 'bg-pink-500'
  };

  const discountPercentage = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group product-card"
    >
      <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-xl h-full">
        <div className="relative">
          {/* Product Image */}
          <Link href={`/product/${product.id}`}>
            <div className="relative h-64 overflow-hidden bg-gray-50 cursor-pointer">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              />
              
              {/* Badge */}
              {product.badge && (
                <div className={`absolute top-3 left-3 ${badgeColors[product.badge as keyof typeof badgeColors] || 'bg-gray-600'} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                  {product.badge}
                </div>
              )}

              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Out of Stock
                </div>
              )}

              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div className="absolute bottom-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors ${
                isWishlisted ? 'text-red-600' : 'text-gray-700'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>
            <Link href={`/product/${product.id}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4 text-gray-700 hover:text-blue-600 transition-colors" />
              </motion.button>
            </Link>
          </div>

          {/* Quick Add to Cart */}
          {product.inStock && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 bg-red-600 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-red-700"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          )}

          <CardContent className="p-6">
            {/* Category & Brand */}
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-gray-500 font-medium">{product.category}</p>
              <p className="text-xs text-gray-400">{product.brand}</p>
            </div>
            
            {/* Product Name */}
            <Link href={`/product/${product.id}`}>
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors cursor-pointer">
                {product.name}
              </h3>
            </Link>

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

            {/* Stock Info */}
            {product.inStock && product.stockCount <= 5 && (
              <p className="text-xs text-orange-600 mb-3 font-medium">
                Only {product.stockCount} left in stock!
              </p>
            )}

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              disabled={!product.inStock}
            >
              {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
            </Button>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}