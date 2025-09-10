'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOrderById, updatePaymentStatus, Order } from '@/lib/orders';

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        router.push('/');
        return;
      }

      try {
        const orderData = await getOrderById(orderId);
        if (orderData) {
          setOrder(orderData);
          
          // Update payment status if paymentId is present
          if (paymentId && orderData.paymentStatus === 'pending') {
            await updatePaymentStatus(orderId, 'completed', paymentId);
            setOrder(prev => prev ? { ...prev, paymentStatus: 'completed', paymentId } : null);
          }
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, paymentId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="text-sm text-gray-500">
            Order ID: <span className="font-mono font-bold">{order.id}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-red-600" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium capitalize">{order.orderStatus}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {order.createdAt.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Estimated Delivery</span>
                  </div>
                  <p className="text-blue-800">
                    {estimatedDelivery.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items ({order.items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-red-600" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700">
                  <p className="font-medium">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-2">
                    <span className="text-sm text-gray-500">Phone: </span>
                    {order.shippingAddress.phone}
                  </p>
                  <p>
                    <span className="text-sm text-gray-500">Email: </span>
                    {order.shippingAddress.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{order.shippingCost === 0 ? 'FREE' : `₹${order.shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{order.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-red-600">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Payment Method</span>
                    <span className="capitalize">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment Status</span>
                    <span className={`capitalize font-medium ${
                      order.paymentStatus === 'completed' ? 'text-green-600' : 
                      order.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                  {order.paymentId && (
                    <div className="flex justify-between text-sm mt-1">
                      <span>Payment ID</span>
                      <span className="font-mono text-xs">{order.paymentId}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.print()}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  
                  <Link href="/products">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Continue Shopping
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      Confirmation Email Sent
                    </span>
                  </div>
                  <p className="text-xs text-green-700">
                    Order confirmation and tracking details have been sent to {order.shippingAddress.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}