import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Hamleys - The Finest Toy Shop in the World | Premium Toys & Games',
  description: 'Discover the magic at Hamleys! Premium toys, educational games, action figures, dolls, and more. The finest toy shop in the world since 1760. Free shipping on orders over ₹999.',
  keywords: 'toys, kids toys, educational toys, action figures, dolls, building blocks, board games, children toys, toy store, online toys',
  authors: [{ name: 'Hamleys India' }],
  creator: 'Hamleys India',
  publisher: 'Hamleys',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hamleys.in'),
  alternates: { 
    canonical: '/',
  },
  openGraph: {
    title: 'Hamleys - The Finest Toy Shop in the World',
    description: 'Discover the magic at Hamleys with premium toys, educational games, and more. The finest toy shop in the world since 1760.',
    url: 'https://hamleys.in',
    siteName: 'Hamleys',
    images: [ 
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hamleys - The Finest Toy Shop in the World',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamleys - The Finest Toy Shop in the World',
    description: 'Discover the magic at Hamleys with premium toys and educational games since 1760.',
    images: ['/twitter-image.jpg'],
    creator: '@HamleysIndia',
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
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'shopping',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="application-name" content="Hamleys" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hamleys" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
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