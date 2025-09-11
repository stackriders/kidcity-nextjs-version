'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const aboutLinks = [
    { name: 'Our Story', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press & Media', href: '/press' },
    { name: 'Store Locator', href: '/stores' },
    { name: 'Investor Relations', href: '/investors' }
  ];

  const customerCareLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Track Your Order', href: '/track-order' },
    { name: 'Shipping & Delivery', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'FAQ', href: '/faq' }
  ];

  const contactInfo = [
    { icon: Phone, text: '1800-266-0777' },
    { icon: Mail, text: 'care@hamleys.in' },
    { icon: MapPin, text: '200+ Stores Across India' }
  ];

  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-['Poppins']">
              About Hamleys
            </h3>
            <div className="space-y-2">
              {aboutLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Care Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-['Poppins']">
              Customer Care
            </h3>
            <div className="space-y-2">
              {customerCareLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-['Poppins']">
              Contact Us
            </h3>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <item.icon className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-gray-600 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
                  { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
                  { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
                  { icon: Youtube, href: '#', color: 'hover:text-red-600' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-500 ${social.color} transition-colors`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-2xl font-bold text-red-600 font-['Poppins']">
              Hamleys
            </div>
            <p className="text-sm text-gray-500 font-medium">
              © 2024 Hamleys. All rights reserved. The Finest Toy Shop in the World since 1760.
            </p>
            <div className="flex space-x-4 text-xs">
              <Link href="/privacy" className="text-gray-500 hover:text-red-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-red-600 transition-colors">
                Terms of Service Rama
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}