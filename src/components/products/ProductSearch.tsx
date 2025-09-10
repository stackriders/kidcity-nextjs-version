'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchProducts } from '@/lib/products';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
}

export default function ProductSearch({ 
  value, 
  onChange, 
  placeholder = "Search products...",
  showSuggestions = true
}: ProductSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search
  const debouncedOnChange = useCallback(
    debounce((searchValue: string) => {
      onChange(searchValue);
    }, 300),
    [onChange]
  );

  // Debounced suggestions
  const debouncedSuggestions = useCallback(
    debounce(async (searchValue: string) => {
      if (searchValue.length >= 2 && showSuggestions) {
        setIsLoading(true);
        try {
          const results = await searchProducts(searchValue, 5);
          setSuggestions(results);
          setShowSuggestionsList(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestionsList(false);
      }
    }, 500),
    [showSuggestions]
  );

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestionsList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
    
    if (showSuggestions) {
      debouncedSuggestions(newValue);
    }
  };

  const clearSearch = () => {
    setLocalValue('');
    onChange('');
    setSuggestions([]);
    setShowSuggestionsList(false);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setLocalValue(suggestion.name);
    onChange(suggestion.name);
    setShowSuggestionsList(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={localValue}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestionsList(true);
            }
          }}
          className="pl-10 pr-10 py-3 text-base border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg"
        />
        {localValue && (
          <Button
            onClick={clearSearch}
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        {isLoading && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {showSuggestionsList && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 font-medium">
                Search Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={suggestion.image}
                      alt={suggestion.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {suggestion.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {suggestion.category} • ₹{suggestion.price.toLocaleString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}