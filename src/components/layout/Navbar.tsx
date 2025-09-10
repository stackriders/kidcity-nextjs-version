'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, Heart, MapPin, Phone, ChevronDown, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const categories = [
  { name: 'Action Figures & Collectibles', href: '/category/action-figures' },
  { name: 'Arts, Crafts & DIY', href: '/category/arts-crafts' },
  { name: 'Baby & Preschool', href: '/category/baby-preschool' },
  { name: 'Building & Construction', href: '/category/building-blocks' },
  { name: 'Dolls & Dollhouses', href: '/category/dolls-accessories' },
  { name: 'Electronic Toys', href: '/category/electronic-toys' },
  { name: 'Games & Puzzles', href: '/category/board-games' },
  { name: 'Learning & Education', href: '/category/educational-toys' },
  { name: 'Outdoor & Sports', href: '/category/outdoor-toys' },
  { name: 'Vehicles & Remote Control', href: '/category/vehicles' },
];

const ageGroups = [
  { name: '0-2 Years', href: '/age/0-2' },
  { name: '3-4 Years', href: '/age/3-4' },
  { name: '5-7 Years', href: '/age/5-7' },
  { name: '8-11 Years', href: '/age/8-11' },
  { name: '12+ Years', href: '/age/12-plus' },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showAgeMenu, setShowAgeMenu] = useState(false);
  const { itemCount } = useCart();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar - Hamleys Style */}
      <div className="bg-red-600 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">1800-266-0777</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Store Locator</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span className="font-medium">Free Shipping on Orders Above ₹999</span>
            <span>|</span>
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span className="font-medium">Gift Cards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Hamleys Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Hamleys Style */}
            <Link href="/" className="flex items-center">
              <div className="text-4xl font-black text-red-600 tracking-tight">
                Hamleys
              </div>
              <div className="ml-2 text-xs text-gray-500 font-medium">
                EST. 1760
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Categories Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowCategoriesMenu(true)}
                onMouseLeave={() => setShowCategoriesMenu(false)}
              >
                <button className="flex items-center space-x-1 text-gray-800 hover:text-red-600 font-bold text-sm transition-colors duration-200 py-2">
                  <span>CATEGORIES</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <AnimatePresence>
                  {showCategoriesMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-1 w-80 bg-white shadow-2xl rounded-lg border border-gray-100 py-6 z-50"
                    >
                      <div className="grid grid-cols-1 gap-1">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="px-6 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 font-medium border-b border-gray-50 last:border-b-0"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Age Groups Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowAgeMenu(true)}
                onMouseLeave={() => setShowAgeMenu(false)}
              >
                <button className="flex items-center space-x-1 text-gray-800 hover:text-red-600 font-bold text-sm transition-colors duration-200 py-2">
                  <span>SHOP BY AGE</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <AnimatePresence>
                  {showAgeMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-white shadow-2xl rounded-lg border border-gray-100 py-6 z-50"
                    >
                      <div className="grid grid-cols-1 gap-1">
                        {ageGroups.map((age) => (
                          <Link
                            key={age.name}
                            href={age.href}
                            className="px-6 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 font-medium border-b border-gray-50 last:border-b-0"
                          >
                            {age.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/brands" className="text-gray-800 hover:text-red-600 font-bold text-sm transition-colors duration-200 py-2">
                BRANDS
              </Link>
              <Link href="/new-arrivals" className="text-gray-800 hover:text-red-600 font-bold text-sm transition-colors duration-200 py-2">
                NEW ARRIVALS
              </Link>
              <Link href="/sale" className="text-red-600 hover:text-red-700 font-black text-sm transition-colors duration-200 py-2 bg-red-50 px-3 rounded">
                SALE
              </Link>
            </nav>

            {/* Search Bar - Hamleys Style */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search toys, games & more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-2.5 rounded-full border-2 border-gray-300 focus:border-red-500 focus:ring-0 transition-colors text-sm bg-gray-50 focus:bg-white"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3">
              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-gray-100"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5 text-gray-700" />
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="relative hidden md:flex hover:bg-gray-100">
                <Heart className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                  0
                </span>
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </Button>
              </Link>

              {/* User Account */}
              <Link href={user ? "/account" : "/auth"}>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <User className="w-5 h-5 text-gray-700" />
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden hover:bg-gray-100">
                    <Menu className="w-5 h-5 text-gray-700" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-black text-red-600">Hamleys</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-6 mt-8">
                    
                    {/* Categories */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4 text-lg">Categories</h3>
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block text-gray-700 hover:text-red-600 font-medium py-3 px-2 border-b border-gray-100 transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Age Groups */}
                    <div>
                      <h3 className="font-bold text-gray-800 mb-4 text-lg">Shop by Age</h3>
                      <div className="space-y-1">
                        {ageGroups.map((age) => (
                          <Link
                            key={age.name}
                            href={age.href}
                            className="block text-gray-700 hover:text-red-600 font-medium py-3 px-2 border-b border-gray-100 transition-colors"
                          >
                            {age.name}
                          </Link>
                        ))}
                      </div>
                    </div>
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
                    placeholder="Search toys, games & more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-red-500 bg-gray-50 focus:bg-white"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}