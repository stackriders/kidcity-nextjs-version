import { db } from './firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  orderBy, 
  limit,
  DocumentData 
} from 'firebase/firestore';

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon: string;
  color: string;
  productCount: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  category: string;
  featured: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
  ageRange: string;
}

export interface Subscriber {
  email: string;
  subscribedAt: Date;
  source: string;
}

// Fetch banners for hero carousel
export const getBanners = async (): Promise<Banner[]> => {
  try {
    const bannersRef = collection(db, 'banners');
    const q = query(
      bannersRef, 
      where('active', '==', true),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Banner));
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
};

// Fetch categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const categoriesRef = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      where('featured', '==', true),
      where('inStock', '==', true),
      limit(12)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
  try {
    const subscribersRef = collection(db, 'subscribers');
    await addDoc(subscribersRef, {
      email,
      subscribedAt: new Date(),
      source: 'homepage'
    });
    return true;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return false;
  }
};