'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { subscribeToNewsletter } from '@/lib/firestore';

export default function Footer() {
  const footerSections = [
    {
      title: 'CATEGORIES',
      links: [
        { name: 'Action Figures', href: '/category/action-figures' },
        { name: 'Dolls & Accessories', href: '/category/dolls-accessories' },
        { name: 'Building Blocks', href: '/category/building-blocks' },
        { name: 'Educational Toys', href: '/category/educational-toys' },
        { name: 'Board Games', href: '/category/board-games' },
      ],
    },
    {
      title: 'CUSTOMER CARE',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Track Order', href: '/track-order' },
      ],
    },
    {
      title: 'ABOUT HAMLEYS',
      links: [
        { name: 'Our Story', href: '/about' },
        { name: 'Store Locator', href: '/stores' },
        { name: 'Careers', href: '/careers' },        
        { name: 'Gift Cards', href: '/gift-cards' },
        { name: 'Press', href: '/press' },
      ],
    },
  ];

  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-red-600 border-b border-red-700">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-3xl font-black mb-4 tracking-tight">JOIN THE HAMLEYS FAMILY</h3>
            <p className="text-red-100 mb-6 font-medium">
              Be the first to know about new arrivals, exclusive offers, and magical events!
            </p>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                if (!email) return;
                
                setIsSubscribing(true);
                const success = await subscribeToNewsletter(email);
                
                if (success) {
                  setSubscriptionMessage('Thank you for subscribing!');
                  setEmail('');
                } else {
                  setSubscriptionMessage('Something went wrong. Please try again.');
                }
                setIsSubscribing(false);
                
                setTimeout(() => setSubscriptionMessage(''), 3000);
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white bg-white"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubscribing}
                className="bg-white text-red-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {isSubscribing ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </motion.button>
            </form>
            {subscriptionMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-white font-medium"
              >
                {subscriptionMessage}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl font-black text-red-500">
                HAMLEYS
              </span>
            </div>
            <div className="text-xs text-gray-400 mb-4 font-medium">
              THE FINEST TOY SHOP IN THE WORLD
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Since 1760, Hamleys has been creating magical moments and unforgettable memories for children around the world.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-300">1800-266-0777</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-300">care@hamleys.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-300">Stores across India</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-sm font-black mb-4 text-white tracking-wide">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media & Payment */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400 font-medium">FOLLOW US:</span>
              {[
                { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
                { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
                { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
                { icon: Youtube, href: '#', color: 'hover:text-red-500' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-500 ${social.color} transition-colors duration-200`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400 font-medium">WE ACCEPT:</span>
              <div className="flex space-x-2">
                {['VISA', 'MC', 'AMEX', 'UPI'].map((payment) => (
                  <div
                    key={payment}
                    className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold"
                  >
                    {payment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm font-medium">
            © 2024 Hamleys. All rights reserved. The Finest Toy Shop in the World since 1760.
          </p>
        </div>
      </div>
    </footer>
  );
}