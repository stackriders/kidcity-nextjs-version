'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getUserOrders, Order } from '@/lib/orders';

export default function ProfilePageClient() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserOrders = async () => {
      if (user) {
        try {
          const userOrders = await getUserOrders(user.uid);
          setOrders(userOrders);
        } catch (error) {
          console.error('Error loading orders:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserOrders();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account and view your order history
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-red-600" />
                  )}
                </div>
                <CardTitle className="text-xl">
                  {user?.displayName || 'User'}
                </CardTitle>
                <p className="text-gray-600">{user?.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Mail className="w-5 h-5 text-red-600" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Package className="w-5 h-5 text-red-600" />
                    <span className="text-sm">{orders.length} Orders</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-red-600" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading orders...</p>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              Order #{order.id?.slice(-8)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {order.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-red-600">
                              ₹{order.total.toLocaleString()}
                            </p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.orderStatus}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {order.items.slice(0, 2).map((item) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-xs text-gray-500 pl-15">
                              +{order.items.length - 2} more items
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No orders yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start shopping to see your orders here
                    </p>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Start Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}