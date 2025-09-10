'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, itemCount, removeItem, updateQuantity } = useCart();

  const shippingThreshold = 999;
  const shippingCost = total >= shippingThreshold ? 0 : 99;
  const finalTotal = total + shippingCost;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold">
                Shopping Cart ({itemCount})
              </SheetTitle>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Add some amazing toys to get started!
                </p>
                <Link href="/products" onClick={onClose}>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-red-600 font-bold">
                            ₹{item.price.toLocaleString()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <span className="text-xs">-</span>
                            </button>
                            <span className="text-sm font-bold min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <span className="text-xs">+</span>
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 rounded-full bg-red-50 border border-red-200 flex items-center justify-center hover:bg-red-100 transition-colors ml-2"
                            >
                              <Trash2 className="w-3 h-3 text-red-600" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm font-bold text-gray-900 mt-1">
                          Total: ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 bg-white">
              {/* Shipping Notice */}
              {total < shippingThreshold && (
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    Add ₹{(shippingThreshold - total).toLocaleString()} more for FREE shipping!
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-xl font-bold text-red-600">
                  ₹{finalTotal.toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link href="/cart" onClick={onClose}>
                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50"
                  >
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={onClose}>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}