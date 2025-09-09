import { Metadata } from 'next';
import ProductsPageClient from './ProductsPageClient';

export const metadata: Metadata = {
  title: 'All Products - Hamleys | Premium Toys & Games Collection',
  description: 'Browse our complete collection of premium toys, games, and educational products. Filter by category, price, and availability. Free shipping on orders over ₹999.',
  keywords: 'toys, games, educational toys, action figures, dolls, building blocks, puzzles, board games, electronic toys, arts crafts',
  openGraph: {
    title: 'All Products - Hamleys',
    description: 'Browse our complete collection of premium toys and games with advanced filtering and search.',
    images: ['/products-og.jpg'],
  },
  alternates: {
    canonical: '/products',
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}