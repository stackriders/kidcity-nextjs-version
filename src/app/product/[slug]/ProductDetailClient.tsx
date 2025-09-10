'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Share2, Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, ZoomIn as Zoom, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Product, getRelatedProducts } from '@/lib/products';
import ProductCard from '@/components/products/ProductCard';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // All product images (main + additional)
  const allImages = [product.image, ...product.images];

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        const related = await getRelatedProducts(product.categorySlug, product.id, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error loading related products:', error);
      }
    };

    loadRelatedProducts();
  }, [product.categorySlug, product.id]);

  // Generate structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": allImages,
      "description": product.description,
      "sku": product.id,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "category": product.category,
      "offers": {
        "@type": "Offer",
        "url": `${window.location.origin}/product/${product.slug || product.id}`,
        "priceCurrency": "INR",
        "price": product.price,
        "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        "itemCondition": "https://schema.org/NewCondition",
        "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Hamleys"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.reviews,
        "bestRating": 5,
        "worstRating": 1
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [product, allImages]);

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        });
      }
      setLoading(false);
    }, 500);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const discountPercentage = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-red-600 transition-colors">Products</Link>
            <span>/</span>
            <Link href={`/products/${product.categorySlug}`} className="hover:text-red-600 transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-lg group cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={allImages[selectedImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Zoom className="w-5 h-5 text-gray-700" />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.badge && (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {product.badge}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {discountPercentage}% OFF
                  </span>
                )}
                {!product.inStock && (
                  <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    Out of Stock
                  </span>
                )}
              </div>
            </motion.div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? 'border-red-600 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-700">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-black text-red-600">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-medium">
                      In Stock
                      {product.stockCount <= 5 && (
                        <span className="text-orange-600 ml-2">
                          (Only {product.stockCount} left!)
                        </span>
                      )}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Age Range</h4>
                <p className="text-gray-700">{product.ageRange}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Category</h4>
                <p className="text-gray-700">{product.category}</p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            {product.inStock && (
              <div className="space-y-6">
                {/* Quantity Selector */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Quantity</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-100 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 py-3 font-bold text-lg min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                        className="p-3 hover:bg-gray-100 transition-colors"
                        disabled={quantity >= product.stockCount}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-gray-600">
                      Total: ₹{(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Adding to Cart...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>ADD TO CART</span>
                    </div>
                  )}
                </Button>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹999' },
                { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
                { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-100 rounded-xl">
                  <feature.icon className="w-6 h-6 text-red-600" />
                  <div>
                    <h5 className="font-bold text-sm text-gray-900">{feature.title}</h5>
                    <p className="text-xs text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[selectedImageIndex]}
                alt={product.name}
                width={800}
                height={600}
                className="object-contain max-h-[90vh] w-auto"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-200"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}