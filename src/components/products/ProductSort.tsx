'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ProductFilters } from '@/lib/products';

interface ProductSortProps {
  sortBy: ProductFilters['sortBy'];
  onSortChange: (sortBy: ProductFilters['sortBy']) => void;
}

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name: A to Z' }
] as const;

export default function ProductSort({ sortBy, onSortChange }: ProductSortProps) {
  const currentSort = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

  return (
    <div className="relative">
      <select
        value={sortBy || 'newest'}
        onChange={(e) => onSortChange(e.target.value as ProductFilters['sortBy'])}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}