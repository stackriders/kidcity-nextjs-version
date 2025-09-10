import { db } from './firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  WhereFilterOp,
  getCountFromServer
} from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  featured: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  ageRange: string;
  brand: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating' | 'name';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  image?: string;
  description?: string;
}

export interface ProductsResponse {
  products: Product[];
  hasMore: boolean;
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
  total: number;
}

// Fetch products with filters and pagination
export const getProducts = async (
  filters: ProductFilters = {},
  pageSize: number = 12,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<ProductsResponse> => {
  try {
    const productsRef = collection(db, 'products');
    let constraints: any[] = [];

    // Apply filters
    if (filters.category) {
      constraints.push(where('categorySlug', '==', filters.category));
    }

    if (filters.inStock !== undefined) {
      constraints.push(where('inStock', '==', filters.inStock));
    }

    if (filters.minPrice !== undefined) {
      constraints.push(where('price', '>=', filters.minPrice));
    }

    if (filters.maxPrice !== undefined) {
      constraints.push(where('price', '<=', filters.maxPrice));
    }

    // Apply sorting
    let orderByField = 'createdAt';
    let orderByDirection: 'asc' | 'desc' = 'desc';
    
    switch (filters.sortBy) {
      case 'price_asc':
        orderByField = 'price';
        orderByDirection = 'asc';
        break;
      case 'price_desc':
        orderByField = 'price';
        orderByDirection = 'desc';
        break;
      case 'newest':
        orderByField = 'createdAt';
        orderByDirection = 'desc';
        break;
      case 'rating':
        orderByField = 'rating';
        orderByDirection = 'desc';
        break;
      case 'name':
        orderByField = 'name';
        orderByDirection = 'asc';
        break;
    }

    constraints.push(orderBy(orderByField, orderByDirection));

    // Add pagination
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    constraints.push(limit(pageSize + 1)); // Get one extra to check if there are more

    const q = query(productsRef, ...constraints);

    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.docs.forEach((doc, index) => {
      if (index < pageSize) {
        const data = doc.data();
        products.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Product);
      }
    });

    // Filter by search term (client-side for now)
    let filteredProducts = products;
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    const hasMore = querySnapshot.docs.length > pageSize;
    const newLastDoc = querySnapshot.docs.length > 0 ? 
      querySnapshot.docs[Math.min(pageSize - 1, querySnapshot.docs.length - 1)] : 
      undefined;

    return {
      products: filteredProducts,
      hasMore,
      lastDoc: newLastDoc,
      total: filteredProducts.length
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      hasMore: false,
      total: 0
    };
  }
};

// Get product categories for filter sidebar
export const getProductCategories = async (): Promise<Category[]> => {
  try {
    const categoriesRef = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Category[];

    return categories.length > 0 ? categories : getFallbackCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return getFallbackCategories();
  }
};

// Get fallback categories
export const getFallbackCategories = (): Category[] => [
  { id: '1', name: 'Action Figures', slug: 'action-figures', productCount: 25 },
  { id: '2', name: 'Dolls & Accessories', slug: 'dolls-accessories', productCount: 30 },
  { id: '3', name: 'Building Blocks', slug: 'building-blocks', productCount: 20 },
  { id: '4', name: 'Puzzles', slug: 'puzzles', productCount: 15 },
  { id: '5', name: 'Board Games', slug: 'board-games', productCount: 18 },
  { id: '6', name: 'Vehicles', slug: 'vehicles', productCount: 22 },
  { id: '7', name: 'Arts & Crafts', slug: 'arts-crafts', productCount: 16 },
  { id: '8', name: 'Electronic Toys', slug: 'electronic-toys', productCount: 12 },
  { id: '9', name: 'Educational Toys', slug: 'educational-toys', productCount: 14 },
  { id: '10', name: 'Outdoor Toys', slug: 'outdoor-toys', productCount: 10 }
];

// Get price range for filters
export const getPriceRange = async (): Promise<{ min: number; max: number }> => {
  try {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    let min = Infinity;
    let max = 0;
    
    querySnapshot.docs.forEach(doc => {
      const price = doc.data().price;
      if (price < min) min = price;
      if (price > max) max = price;
    });
    
    return { min: min === Infinity ? 0 : min, max };
  } catch (error) {
    console.error('Error fetching price range:', error);
    return { min: 0, max: 10000 };
  }
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Try fallback products
      const fallbackProduct = getFallbackProducts().find(p => p.id === id);
      return fallbackProduct || null;
    }
    
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return getFallbackProducts().find(p => p.id === id) || null;
  }
};

// Search products
export const searchProducts = async (searchTerm: string, limit: number = 10): Promise<Product[]> => {
  try {
    // For now, we'll use client-side search on all products
    // In production, you might want to use Algolia or similar for better search
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    const allProducts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Product;
    });

    const searchTermLower = searchTerm.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTermLower) ||
      product.description.toLowerCase().includes(searchTermLower) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTermLower)) ||
      product.category.toLowerCase().includes(searchTermLower)
    );

    return filteredProducts.slice(0, limit);
  } catch (error) {
    console.error('Error searching products:', error);
    const searchTermLower = searchTerm.toLowerCase();
    return getFallbackProducts()
      .filter(product =>
        product.name.toLowerCase().includes(searchTermLower) ||
        product.description.toLowerCase().includes(searchTermLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTermLower))
      )
      .slice(0, limit);
  }
};

// Fallback products for development/demo
export const getFallbackProducts = (): Product[] => [
  {
    id: '1',
    name: 'Super Hero Action Figure',
    description: 'Amazing superhero figure with movable joints and accessories',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Action Figures',
    categorySlug: 'action-figures',
    featured: true,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    stockCount: 15,
    badge: 'Best Seller',
    ageRange: '6-12 years',
    brand: 'Marvel',
    tags: ['superhero', 'action', 'collectible'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Educational Building Blocks',
    description: 'Creative building blocks for learning and development',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Building Blocks',
    categorySlug: 'building-blocks',
    featured: true,
    rating: 4.9,
    reviews: 89,
    inStock: true,
    stockCount: 25,
    badge: 'Educational',
    ageRange: '3-8 years',
    brand: 'LEGO',
    tags: ['educational', 'building', 'creative'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Princess Doll Set',
    description: 'Beautiful princess doll with accessories and outfits',
    price: 2199,
    originalPrice: 2799,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Dolls & Accessories',
    categorySlug: 'dolls-accessories',
    featured: true,
    rating: 4.7,
    reviews: 156,
    inStock: true,
    stockCount: 8,
    badge: 'Popular',
    ageRange: '4-10 years',
    brand: 'Barbie',
    tags: ['doll', 'princess', 'accessories'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Remote Control Racing Car',
    description: 'High-speed remote control racing car with LED lights',
    price: 3499,
    originalPrice: 4299,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Vehicles',
    categorySlug: 'vehicles',
    featured: true,
    rating: 4.6,
    reviews: 203,
    inStock: true,
    stockCount: 12,
    badge: 'Sale',
    ageRange: '8+ years',
    brand: 'Hot Wheels',
    tags: ['car', 'remote control', 'racing'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Art & Craft Mega Kit',
    description: 'Complete art and craft supplies kit with 200+ pieces',
    price: 1599,
    originalPrice: 1999,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Arts & Crafts',
    categorySlug: 'arts-crafts',
    featured: true,
    rating: 4.8,
    reviews: 67,
    inStock: true,
    stockCount: 20,
    badge: 'Creative',
    ageRange: '5+ years',
    brand: 'Crayola',
    tags: ['art', 'craft', 'creative', 'drawing'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Challenging Puzzle Adventure',
    description: '1000-piece challenging puzzle with beautiful artwork',
    price: 799,
    originalPrice: 999,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Puzzles',
    categorySlug: 'puzzles',
    featured: false,
    rating: 4.5,
    reviews: 91,
    inStock: true,
    stockCount: 30,
    badge: 'Brain Teaser',
    ageRange: '10+ years',
    brand: 'Ravensburger',
    tags: ['puzzle', 'challenging', 'brain teaser'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    name: 'Electronic Learning Tablet',
    description: 'Interactive learning tablet with educational games',
    price: 4999,
    originalPrice: 5999,
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Electronic Toys',
    categorySlug: 'electronic-toys',
    featured: true,
    rating: 4.9,
    reviews: 45,
    inStock: true,
    stockCount: 5,
    badge: 'Tech',
    ageRange: '3-8 years',
    brand: 'LeapFrog',
    tags: ['electronic', 'learning', 'educational', 'tablet'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    name: 'Board Game Family Pack',
    description: 'Collection of classic board games for family fun',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [],
    category: 'Board Games',
    categorySlug: 'board-games',
    featured: false,
    rating: 4.7,
    reviews: 78,
    inStock: false,
    stockCount: 0,
    badge: 'Family Fun',
    ageRange: '6+ years',
    brand: 'Hasbro',
    tags: ['board game', 'family', 'strategy'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];