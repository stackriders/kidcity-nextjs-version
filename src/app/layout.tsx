import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KidCity - Magical Toys for Every Child | Premium Toy Store',
  description: 'Discover the magic of childhood with KidCity! Premium toys, educational games, action figures, dolls, and more. Free shipping on orders over ₹999. Shop now!',
  keywords: 'toys, kids toys, educational toys, action figures, dolls, building blocks, board games, children toys, toy store, online toys',
  authors: [{ name: 'KidCity Team' }],
  creator: 'KidCity',
  publisher: 'KidCity',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kidcity.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KidCity - Magical Toys for Every Child',
    description: 'Discover the magic of childhood with premium toys, educational games, and more. Free shipping on orders over ₹999.',
    url: 'https://kidcity.com',
    siteName: 'KidCity',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KidCity - Premium Toy Store',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KidCity - Magical Toys for Every Child',
    description: 'Discover the magic of childhood with premium toys and educational games.',
    images: ['/twitter-image.jpg'],
    creator: '@kidcitystore',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="msapplication-TileColor" content="#ec4899" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}