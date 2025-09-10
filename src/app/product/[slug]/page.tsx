import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { getProductBySlug, getFallbackProducts } from '@/lib/products';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  
  try {
    const product = await getProductBySlug(slug);
    
    if (!product) {
      return {
        title: 'Product Not Found - Hamleys',
        description: 'The product you are looking for could not be found.',
      };
    }

    const discountPercentage = product.originalPrice > product.price 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    return {
      title: `${product.name} - Hamleys | Premium Toys & Games`,
      description: `${product.description} Buy ${product.name} online at Hamleys. ${product.inStock ? 'In stock' : 'Out of stock'}. ${discountPercentage > 0 ? `Save ${discountPercentage}%!` : ''} Free shipping on orders over ₹999.`,
      keywords: `${product.name}, ${product.category}, ${product.brand}, toys, games, ${product.tags.join(', ')}`,
      openGraph: {
        title: `${product.name} - Hamleys`,
        description: product.description,
        images: [
          {
            url: product.image,
            width: 800,
            height: 600,
            alt: product.name,
          },
          ...product.images.map(img => ({
            url: img,
            width: 800,
            height: 600,
            alt: product.name,
          }))
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} - Hamleys`,
        description: product.description,
        images: [product.image],
      },
      alternates: {
        canonical: `/product/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product - Hamleys',
      description: 'Premium toys and games at Hamleys.',
    };
  }
}

export async function generateStaticParams() {
  // Generate static params for fallback products
  const fallbackProducts = getFallbackProducts();
  return fallbackProducts.map((product) => ({
    slug: product.slug || product.id,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}