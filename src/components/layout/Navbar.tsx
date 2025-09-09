'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, Heart, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const categories = [
  'Action Figures',
  'Dolls & Accessories',
  'Building Blocks',
  'Educational Toys',
  'Outdoor Toys',
  'Board Games',
  'Arts & Crafts',
  'Electronic Toys',
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar - Hamleys Style */}
      <div className="bg-red-600 text-white text-xs py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-3 h-3" />
              <span>1800-266-0777</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>Store Locator</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Free Shipping on Orders Above ₹999</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl font-bold text-red-600">
              HAMLEYS
            </div>
            <div className="text-xs text-gray-500 -ml-1">
              FINEST TOY SHOP IN THE WORLD
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-800 hover:text-red-600 font-semibold text-sm uppercase tracking-wide transition-colors duration-200 relative group"
              >
                {category}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for toys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-red-500 transition-colors bg-gray-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <Link href={user ? "/account" : "/auth"}>
              <Button variant="ghost" size="icon">
                <User className="w-6 h-6 text-gray-700" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-800 hover:text-red-600 font-semibold py-3 border-b border-gray-100 uppercase text-sm"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pb-4"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for toys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-red-500 bg-gray-50"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}