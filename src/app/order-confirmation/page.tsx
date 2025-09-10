import { Metadata } from 'next';
import OrderConfirmationClient from './OrderConfirmationClient';

export const metadata: Metadata = {
  title: 'Order Confirmation - Hamleys | Thank You for Your Purchase',
  description: 'Your order has been confirmed. Thank you for shopping with Hamleys!',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderConfirmationPage() {
  return <OrderConfirmationClient />;
}