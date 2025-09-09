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
  WhereFilterOp
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
    let q = query(productsRef);

    // Apply filters
    if (filters.category) {
      q = query(q, where('categorySlug', '==', filters.category));
    }

    if (filters.inStock !== undefined) {
      q = query(q, where('inStock', '==', filters.inStock));
    }

    if (filters.minPrice !== undefined) {
      q = query(q, where('price', '>=', filters.minPrice));
    }

    if (filters.maxPrice !== undefined) {
      q = query(q, where('price', '<=', filters.maxPrice));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        q = query(q, orderBy('price', 'asc'));
        break;
      case 'price_desc':
        q = query(q, orderBy('price', 'desc'));
        break;
      case 'newest':
        q = query(q, orderBy('createdAt', 'desc'));
        break;
      case 'rating':
        q = query(q, orderBy('rating', 'desc'));
        break;
      case 'name':
        q = query(q, orderBy('name', 'asc'));
        break;
      default:
        q = query(q, orderBy('createdAt', 'desc'));
    }

    // Add pagination
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    q = query(q, limit(pageSize + 1)); // Get one extra to check if there are more

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
export const getProductCategories = async () => {
  try {
    const categoriesRef = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get price range for filters
export const getPriceRange = async (): Promise<{ min: number; max: number }> => {
  try {
    // In a real app, you might want to cache this or store it separately
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