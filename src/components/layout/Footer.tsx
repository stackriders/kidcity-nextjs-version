'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      setSubscriptionMessage('Thank you for subscribing!');
      setEmail('');
      setIsSubscribing(false);
      setTimeout(() => setSubscriptionMessage(''), 3000);
    }, 1000);
  };

  const footerSections = [
    {
      title: 'CUSTOMER CARE',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Track Your Order', href: '/track-order' },
        { name: 'Shipping & Delivery', href: '/shipping' },
        { name: 'Returns & Exchanges', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'ABOUT HAMLEYS',
      links: [
        { name: 'Our Story', href: '/about' },
        { name: 'Store Locator', href: '/stores' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press & Media', href: '/press' },
        { name: 'Investor Relations', href: '/investors' },
        { name: 'Corporate Gifts', href: '/corporate' },
      ],
    },
    {
      title: 'QUICK LINKS',
      links: [
        { name: 'New Arrivals', href: '/new-arrivals' },
        { name: 'Best Sellers', href: '/best-sellers' },
        { name: 'Sale', href: '/sale' },
        { name: 'Gift Cards', href: '/gift-cards' },
        { name: 'Wishlist', href: '/wishlist' },
        { name: 'Compare', href: '/compare' },
      ],
    },
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders above ₹999'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure checkout'
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment',
      description: 'Cards, UPI, Wallets'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Bar */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="bg-red-600 rounded-full p-3">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{feature.title}</h4>
                  <p className="text-gray-400 text-xs">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-red-600 border-b border-red-700">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-3xl font-black mb-4 tracking-tight">STAY IN THE LOOP</h3>
            <p className="text-red-100 mb-6 font-medium text-lg">
              Get the latest updates on new arrivals, exclusive offers, and magical events!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white bg-white text-lg"
                required
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-white text-red-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg text-lg"
              >
                {isSubscribing ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </Button>
            </form>
            {subscriptionMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-white font-medium text-lg"
              >
                {subscriptionMessage}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <span className="text-4xl font-black text-red-500 tracking-tight">
                HAMLEYS
              </span>
              <div className="text-xs text-gray-400 mt-1 font-medium">
                THE FINEST TOY SHOP IN THE WORLD
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Since 1760, Hamleys has been creating magical moments and unforgettable memories for children around the world. We're not just a toy store - we're a destination for wonder, imagination, and joy.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500" />
                <span className="text-gray-300 font-medium">1800-266-0777</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-500" />
                <span className="text-gray-300 font-medium">care@hamleys.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="text-gray-300 font-medium">200+ Stores Across India</span>
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
              <h4 className="text-lg font-black mb-6 text-white tracking-wide">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 font-medium hover:underline"
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
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-bold">FOLLOW US:</span>
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
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-bold">WE ACCEPT:</span>
              <div className="flex space-x-3">
                {['VISA', 'MASTERCARD', 'AMEX', 'UPI', 'PAYTM'].map((payment) => (
                  <div
                    key={payment}
                    className="bg-white text-gray-900 px-3 py-1 rounded text-xs font-bold"
                  >
                    {payment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 font-medium">
            © 2024 Hamleys. All rights reserved. The Finest Toy Shop in the World since 1760.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/privacy" className="text-gray-500 hover:text-red-500 text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-red-500 text-sm">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-500 hover:text-red-500 text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}