'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import ProductSearch from '@/components/products/ProductSearch';
import ProductSort from '@/components/products/ProductSort';
import { 
  getProducts, 
  getProductCategories, 
  getPriceRange,
  getFallbackProducts,
  Product, 
  ProductFilters as Filters 
} from '@/lib/products';

export default function ProductsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get filters from URL
  const getFiltersFromURL = useCallback((): Filters => {
    return {
      category: searchParams.get('category') || undefined,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      inStock: searchParams.get('inStock') ? searchParams.get('inStock') === 'true' : undefined,
      search: searchParams.get('search') || undefined,
      sortBy: (searchParams.get('sortBy') as Filters['sortBy']) || 'newest'
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<Filters>(getFiltersFromURL());

  // Update URL when filters change
  const updateURL = useCallback((newFilters: Filters) => {
    const params = new URLSearchParams();
    
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice.toString());
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice.toString());
    if (newFilters.inStock !== undefined) params.set('inStock', newFilters.inStock.toString());
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.sortBy) params.set('sortBy', newFilters.sortBy);

    const queryString = params.toString();
    const newURL = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.push(newURL, { scroll: false });
  }, [pathname, router]);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        // Load categories and price range
        const [categoriesData, priceRangeData] = await Promise.all([
          getProductCategories(),
          getPriceRange()
        ]);

        // Fallback categories if Firestore fails
        const fallbackCategories = [
          { id: '1', name: 'Action Figures', slug: 'action-figures', productCount: 25 },
          { id: '2', name: 'Dolls & Accessories', slug: 'dolls-accessories', productCount: 30 },
          { id: '3', name: 'Building Blocks', slug: 'building-blocks', productCount: 20 },
          { id: '4', name: 'Puzzles', slug: 'puzzles', productCount: 15 },
          { id: '5', name: 'Board Games', slug: 'board-games', productCount: 18 },
          { id: '6', name: 'Vehicles', slug: 'vehicles', productCount: 22 },
          { id: '7', name: 'Arts & Crafts', slug: 'arts-crafts', productCount: 16 },
          { id: '8', name: 'Electronic Toys', slug: 'electronic-toys', productCount: 12 }
        ];

        setCategories(categoriesData.length > 0 ? categoriesData : fallbackCategories);
        setPriceRange(priceRangeData);

        // Load products
        await loadProducts(filters, true);
      } catch (error) {
        console.error('Error loading initial data:', error);
        // Use fallback data
        setProducts(getFallbackProducts());
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Load products when filters change
  useEffect(() => {
    if (!loading) {
      loadProducts(filters, true);
    }
  }, [filters]);

  // Update filters when URL changes
  useEffect(() => {
    const newFilters = getFiltersFromURL();
    setFilters(newFilters);
  }, [getFiltersFromURL]);

  const loadProducts = async (currentFilters: Filters, reset = false) => {
    try {
      if (reset) {
        setLoadingMore(true);
        setLastDoc(null);
      } else {
        setLoadingMore(true);
      }

      const response = await getProducts(currentFilters, 12, reset ? undefined : lastDoc);
      
      if (response.products.length === 0 && reset) {
        // Use fallback products if no results
        const fallbackProducts = getFallbackProducts();
        let filteredFallback = fallbackProducts;

        // Apply client-side filtering to fallback products
        if (currentFilters.category) {
          filteredFallback = filteredFallback.filter(p => p.categorySlug === currentFilters.category);
        }
        if (currentFilters.search) {
          const searchTerm = currentFilters.search.toLowerCase();
          filteredFallback = filteredFallback.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
          );
        }
        if (currentFilters.inStock !== undefined) {
          filteredFallback = filteredFallback.filter(p => p.inStock === currentFilters.inStock);
        }
        if (currentFilters.minPrice) {
          filteredFallback = filteredFallback.filter(p => p.price >= currentFilters.minPrice!);
        }
        if (currentFilters.maxPrice) {
          filteredFallback = filteredFallback.filter(p => p.price <= currentFilters.maxPrice!);
        }

        // Apply sorting
        switch (currentFilters.sortBy) {
          case 'price_asc':
            filteredFallback.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredFallback.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredFallback.sort((a, b) => b.rating - a.rating);
            break;
          case 'name':
            filteredFallback.sort((a, b) => a.name.localeCompare(b.name));
            break;
          default:
            // newest - already in order
            break;
        }

        setProducts(filteredFallback);
        setHasMore(false);
      } else {
        if (reset) {
          setProducts(response.products);
        } else {
          setProducts(prev => [...prev, ...response.products]);
        }
        setHasMore(response.hasMore);
        setLastDoc(response.lastDoc);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      if (reset) {
        setProducts(getFallbackProducts());
        setHasMore(false);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      loadProducts(filters, false);
    }
  };

  const getCategoryName = (slug: string) => {
    const category = categories.find(cat => cat.slug === slug);
    return category ? category.name : slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-red-600" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {filters.category ? getCategoryName(filters.category) : 'All Products'}
          </h1>
          <p className="text-lg text-gray-600">
            {filters.category 
              ? `Discover our amazing collection of ${getCategoryName(filters.category).toLowerCase()}`
              : 'Discover our complete collection of premium toys and games'
            }
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-96">
              <ProductSearch
                value={filters.search || ''}
                onChange={(search) => handleFiltersChange({ ...filters, search })}
                placeholder="Search products..."
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center space-x-1 bg-white rounded-lg border border-gray-300 p-1">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className="px-3"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Sort */}
              <ProductSort
                sortBy={filters.sortBy}
                onSortChange={(sortBy) => handleFiltersChange({ ...filters, sortBy })}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              categories={categories}
              priceRange={priceRange}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {products.length} products
                {filters.search && ` for "${filters.search}"`}
              </p>
            </div>

            {/* Products */}
            {products.length > 0 ? (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="text-center mt-12">
                    <Button
                      onClick={loadMore}
                      disabled={loadingMore}
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Loading...
                        </>
                      ) : (
                        'Load More Products'
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-600 mb-8">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <Button
                  onClick={() => handleFiltersChange({ sortBy: 'newest' })}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}