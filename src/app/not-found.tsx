'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-8xl md:text-9xl font-black text-red-600 mb-8"
          >
            404
          </motion.div>

          {/* Sad Toy Icon */}
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-6xl mb-8"
          >
            🧸
          </motion.div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Oops! Toy Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            The page you're looking for seems to have wandered off to the toy box. 
            Don't worry, we'll help you find your way back to the fun!
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>

            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 font-bold px-8 py-3 rounded-full"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
            </Link>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-4">Popular categories:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'Action Figures', href: '/products/action-figures' },
                { name: 'Building Blocks', href: '/products/building-blocks' },
                { name: 'Dolls', href: '/products/dolls-accessories' },
                { name: 'Board Games', href: '/products/board-games' }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}