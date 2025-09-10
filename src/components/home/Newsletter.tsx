'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      setMessage('Thank you for subscribing!');
      setEmail('');
      setIsSubscribing(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-6 text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
            <Mail className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8 font-medium">
            Subscribe to our newsletter for the latest toys, deals, and exclusive offers!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 font-medium"
              required
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="rounded-full px-6 py-3 bg-red-600 text-white shadow-md hover:bg-red-700 transition font-medium whitespace-nowrap"
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-600 font-medium"
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}