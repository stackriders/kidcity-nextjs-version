import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductsPageClient from '../ProductsPageClient';
import { getFallbackCategories } from '@/lib/products';

interface Props {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Get valid category slugs from fallback data
const validCategories = getFallbackCategories().map(cat => cat.slug);

// Create category names mapping
const categoryNames: Record<string, string> = getFallbackCategories().reduce((acc, cat) => {
  acc[cat.slug] = cat.name;
  return acc;
}, {} as Record<string, string>);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params;
  
  if (!validCategories.includes(category)) {
    return {
      title: 'Category Not Found - Hamleys',
    };
  }

  const categoryName = categoryNames[category];
  
  return {
    title: `${categoryName} - Hamleys | Premium Toys & Games`,
    description: `Shop our amazing collection of ${categoryName.toLowerCase()} at Hamleys. Premium quality toys with free shipping on orders over ₹999.`,
    keywords: `${categoryName.toLowerCase()}, toys, games, children toys, ${category.replace('-', ' ')}`,
    openGraph: {
      title: `${categoryName} - Hamleys`,
      description: `Discover our premium collection of ${categoryName.toLowerCase()} for children of all ages.`,
      images: [`/categories/${category}-og.jpg`],
    },
    alternates: {
      canonical: `/products/${category}`,
    },
  };
}

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

export default function CategoryPage({ params, searchParams }: Props) {
  const { category } = params;
  
  if (!validCategories.includes(category)) {
    notFound();
  }

  // Pass category as a search param to the client component
  const modifiedSearchParams = {
    ...searchParams,
    category,
  };

  return <ProductsPageClient />;
}