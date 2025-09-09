'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFilters as Filters } from '@/lib/products';

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  categories: Category[];
  priceRange: { min: number; max: number };
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProductFilters({
  filters,
  onFiltersChange,
  categories,
  priceRange,
  isOpen,
  onToggle
}: ProductFiltersProps) {
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice?.toString() || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice?.toString() || '');
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    availability: true
  });

  useEffect(() => {
    setLocalMinPrice(filters.minPrice?.toString() || '');
    setLocalMaxPrice(filters.maxPrice?.toString() || '');
  }, [filters.minPrice, filters.maxPrice]);

  const handlePriceChange = () => {
    const minPrice = localMinPrice ? parseInt(localMinPrice) : undefined;
    const maxPrice = localMaxPrice ? parseInt(localMaxPrice) : undefined;
    
    onFiltersChange({
      ...filters,
      minPrice,
      maxPrice
    });
  };

  const handleCategoryChange = (categorySlug: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === categorySlug ? undefined : categorySlug
    });
  };

  const handleStockChange = (inStock: boolean | undefined) => {
    onFiltersChange({
      ...filters,
      inStock
    });
  };

  const clearFilters = () => {
    setLocalMinPrice('');
    setLocalMaxPrice('');
    onFiltersChange({
      search: filters.search,
      sortBy: filters.sortBy
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const activeFiltersCount = [
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.inStock !== undefined ? filters.inStock : null
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={onToggle}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
          opacity: isOpen ? 1 : 0
        }}
        className={`
          fixed lg:relative top-0 left-0 z-50 lg:z-auto
          w-80 lg:w-full h-full lg:h-auto
          bg-white lg:bg-transparent
          shadow-xl lg:shadow-none
          overflow-y-auto lg:overflow-visible
          ${isOpen ? 'block' : 'hidden lg:block'}
        `}
      >
        <div className="p-6 lg:p-0">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="icon"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="mb-6">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full"
              >
                Clear All Filters ({activeFiltersCount})
              </Button>
            </div>
          )}

          {/* Category Filter */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Category</CardTitle>
                <Button
                  onClick={() => toggleSection('category')}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                >
                  {expandedSections.category ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            {expandedSections.category && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={!filters.category}
                      onChange={() => handleCategoryChange('')}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === category.slug}
                          onChange={() => handleCategoryChange(category.slug)}
                          className="w-4 h-4 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm font-medium group-hover:text-red-600 transition-colors">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        ({category.productCount})
                      </span>
                    </label>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Price Range Filter */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Price Range</CardTitle>
                <Button
                  onClick={() => toggleSection('price')}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                >
                  {expandedSections.price ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            {expandedSections.price && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Price
                      </label>
                      <Input
                        type="number"
                        placeholder={`₹${priceRange.min}`}
                        value={localMinPrice}
                        onChange={(e) => setLocalMinPrice(e.target.value)}
                        onBlur={handlePriceChange}
                        className="w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Price
                      </label>
                      <Input
                        type="number"
                        placeholder={`₹${priceRange.max}`}
                        value={localMaxPrice}
                        onChange={(e) => setLocalMaxPrice(e.target.value)}
                        onBlur={handlePriceChange}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handlePriceChange}
                    variant="outline"
                    className="w-full"
                  >
                    Apply Price Filter
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Availability Filter */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Availability</CardTitle>
                <Button
                  onClick={() => toggleSection('availability')}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                >
                  {expandedSections.availability ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            {expandedSections.availability && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={filters.inStock === undefined}
                      onChange={() => handleStockChange(undefined)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium">All Products</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={filters.inStock === true}
                      onChange={() => handleStockChange(true)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium">In Stock Only</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={filters.inStock === false}
                      onChange={() => handleStockChange(false)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm font-medium">Out of Stock</span>
                  </label>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}