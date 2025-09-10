import { Metadata } from 'next';
import CartPageClient from './CartPageClient';

export const metadata: Metadata = {
  title: 'Shopping Cart - Hamleys | Review Your Items',
  description: 'Review your selected toys and games before checkout. Free shipping on orders over ₹999.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return <CartPageClient />;
}