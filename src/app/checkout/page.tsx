import { Metadata } from 'next';
import CheckoutPageClient from './CheckoutPageClient';

export const metadata: Metadata = {
  title: 'Checkout - Hamleys | Secure Payment & Shipping',
  description: 'Complete your order with secure payment and fast shipping. Multiple payment options available.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}