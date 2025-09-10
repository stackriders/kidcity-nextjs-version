'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut, Edit, Save, X, Trash2, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getUserOrders, Order } from '@/lib/orders';
import { getUserWishlist, addToWishlist, removeFromWishlist, Wishlist } from '@/lib/wishlist';
import { updateUserProfile, getUserProfile, UserProfile } from '@/lib/profile';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePageClient() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    displayName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          setLoading(true);
          const [userOrders, userWishlist, profile] = await Promise.all([
            getUserOrders(user.uid),
            getUserWishlist(user.uid),
            getUserProfile(user.uid)
          ]);
          
          setOrders(userOrders);
          setWishlist(userWishlist);
          setUserProfile(profile);
          
          // Initialize edit form with current data
          setEditForm({
            displayName: profile?.displayName || user.displayName || '',
            phone: profile?.phone || '',
            address: profile?.address || '',
            city: profile?.city || '',
            state: profile?.state || '',
            pincode: profile?.pincode || '',
            country: profile?.country || 'India'
          });
        } catch (error) {
          console.error('Error loading user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      await updateUserProfile(user.uid, editForm);
      setUserProfile(prev => ({ ...prev, ...editForm }));
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!user) return;
    
    try {
      await removeFromWishlist(user.uid, productId);
      setWishlist(prev => prev.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

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
            My Account
          </h1>
          <p className="text-gray-600">
            Manage your profile, orders, and wishlist
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
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
                  {userProfile?.displayName || user?.displayName || 'User'}
                </CardTitle>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                    {tab.id === 'orders' && orders.length > 0 && (
                      <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                        {orders.length}
                      </span>
                    )}
                    {tab.id === 'wishlist' && wishlist.length > 0 && (
                      <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                        {wishlist.length}
                      </span>
                    )}
                  </button>
                ))}
                
                <div className="pt-4 border-t">
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2 text-red-600" />
                        Profile Information
                      </CardTitle>
                      <Button
                        onClick={() => editMode ? setEditMode(false) : setEditMode(true)}
                        variant="outline"
                        size="sm"
                      >
                        {editMode ? (
                          <>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </>
                        ) : (
                          <>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </>
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {editMode ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                              </label>
                              <Input
                                value={editForm.displayName}
                                onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                                placeholder="Enter your full name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                              </label>
                              <Input
                                value={editForm.phone}
                                onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Address
                            </label>
                            <Input
                              value={editForm.address}
                              onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                              placeholder="Enter your address"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                              </label>
                              <Input
                                value={editForm.city}
                                onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                                placeholder="City"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                State
                              </label>
                              <Input
                                value={editForm.state}
                                onChange={(e) => setEditForm(prev => ({ ...prev, state: e.target.value }))}
                                placeholder="State"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                PIN Code
                              </label>
                              <Input
                                value={editForm.pincode}
                                onChange={(e) => setEditForm(prev => ({ ...prev, pincode: e.target.value }))}
                                placeholder="PIN Code"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end space-x-3">
                            <Button
                              onClick={() => setEditMode(false)}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSaveProfile}
                              disabled={saving}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              {saving ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <Save className="w-4 h-4 mr-2" />
                                  Save Changes
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center space-x-3">
                              <Mail className="w-5 h-5 text-red-600" />
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{user?.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Phone className="w-5 h-5 text-red-600" />
                              <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{userProfile?.phone || 'Not provided'}</p>
                              </div>
                            </div>
                          </div>

                          {userProfile?.address && (
                            <div className="flex items-start space-x-3">
                              <MapPin className="w-5 h-5 text-red-600 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium">
                                  {userProfile.address}
                                  {userProfile.city && `, ${userProfile.city}`}
                                  {userProfile.state && `, ${userProfile.state}`}
                                  {userProfile.pincode && ` - ${userProfile.pincode}`}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Account Statistics</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-blue-700">Total Orders</p>
                                <p className="font-bold text-blue-900">{orders.length}</p>
                              </div>
                              <div>
                                <p className="text-blue-700">Wishlist Items</p>
                                <p className="font-bold text-blue-900">{wishlist.length}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Package className="w-5 h-5 mr-2 text-red-600" />
                        Order History ({orders.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div
                              key={order.id}
                              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h4 className="font-bold text-gray-900 text-lg">
                                    Order #{order.id?.slice(-8)}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {order.createdAt.toLocaleDateString('en-IN', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-red-600 text-xl">
                                    ₹{order.total.toLocaleString()}
                                  </p>
                                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                    order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                                    order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                    order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {order.orderStatus.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                {order.items.slice(0, 3).map((item) => (
                                  <div key={item.id} className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium text-gray-900 truncate">
                                        {item.name}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium text-gray-900">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                                {order.items.length > 3 && (
                                  <p className="text-sm text-gray-500 pl-20">
                                    +{order.items.length - 3} more items
                                  </p>
                                )}
                              </div>

                              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                <div className="text-sm text-gray-600">
                                  Payment: <span className="capitalize font-medium">{order.paymentMethod}</span>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
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
                          <Link href="/products">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              Start Shopping
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-red-600" />
                        My Wishlist ({wishlist.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {wishlist.map((item) => (
                            <div
                              key={item.productId}
                              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            >
                              <div className="relative h-48 bg-gray-100">
                                <Image
                                  src={item.productImage}
                                  alt={item.productName}
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  onClick={() => handleRemoveFromWishlist(item.productId)}
                                  className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              </div>
                              <div className="p-4">
                                <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                                  {item.productName}
                                </h4>
                                <div className="flex items-center space-x-1 mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(item.productRating)
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-gray-600 ml-2">
                                    ({item.productRating})
                                  </span>
                                </div>
                                <p className="font-bold text-red-600 text-lg mb-3">
                                  ₹{item.productPrice.toLocaleString()}
                                </p>
                                <Link href={`/product/${item.productId}`}>
                                  <Button
                                    size="sm"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                                  >
                                    View Product
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Your wishlist is empty
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Save your favorite products to your wishlist
                          </p>
                          <Link href="/products">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              Browse Products
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}