import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Loader2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function CombinedSearchInput({
  categories,
  selectedCategory,
  onCategoryChange,
  value,
  onChange,
  onSearch,
  placeholder = 'Search...'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const componentRef = useRef(null);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm.length >= 3) {
        setIsLoading(true);
        setSearchResults([]);
        try {
          const results = await onSearch(debouncedSearchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };
    performSearch();
  }, [debouncedSearchTerm, onSearch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setIsSearchDropdownOpen(false);
        setIsCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSearchResult = (option) => {
    onChange(option);
    setSearchTerm('');
    setIsSearchDropdownOpen(false);
  };
  
  const handleSelectCategory = (category) => {
    onCategoryChange(category);
    setIsCategoryDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      onChange('');
    }
  };

  return (
    <div className="relative" ref={componentRef}>
      <div className="flex items-center w-full bg-card border border-input rounded-md transition-colors duration-200 focus-within:border-ring dark:bg-gray-800 dark:border-gray-600 dark:focus-within:border-gray-500">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="flex items-center justify-between w-full pl-4 pr-8 py-2 text-sm text-left text-card-foreground dark:text-gray-300 focus:outline-none"
          >
            {selectedCategory}
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-2 dark:text-gray-400" />
          </button>
          {isCategoryDropdownOpen && (
            <div className="absolute z-20 w-48 mt-2 bg-card border border-border rounded-md shadow-lg top-full left-0 dark:bg-gray-700 dark:border-gray-600">
              {/* --- MODIFIED: Used standard overflow for scrolling --- */}
              <ul className="max-h-[180px] overflow-y-auto p-1">
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => handleSelectCategory(category)}
                    className="px-3 py-2 text-sm text-card-foreground cursor-pointer hover:bg-accent rounded-sm dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-px bg-border h-6 dark:bg-gray-600"></div>
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm || value}
            onChange={handleInputChange}
            onFocus={() => setIsSearchDropdownOpen(true)}
            placeholder={placeholder}
            className="w-full pl-4 pr-10 py-2 text-card-foreground text-sm bg-transparent focus:outline-none dark:text-gray-200"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none dark:text-gray-400" />
          {isSearchDropdownOpen && searchTerm.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-card border border-border rounded-md shadow-lg top-full left-0 dark:bg-gray-700 dark:border-gray-600">
              {/* --- MODIFIED: Used standard overflow for scrolling --- */}
              <ul className="max-h-[180px] overflow-y-auto p-1 text-sm">
                {isLoading && (
                  <li className="px-4 py-2 flex items-center justify-center text-muted-foreground dark:text-gray-400">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching...
                  </li>
                )}
                {!isLoading && debouncedSearchTerm.length < 3 && (
                  <li className="px-4 py-2 text-center text-muted-foreground dark:text-gray-400">Keep typing... (min 3 chars)</li>
                )}
                {!isLoading && debouncedSearchTerm.length >= 3 && searchResults.length === 0 && (
                  <li className="px-4 py-2 text-center text-muted-foreground dark:text-gray-400">No results found.</li>
                )}
                {!isLoading && searchResults.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSearchResult(option)}
                    className="px-3 py-2 text-card-foreground cursor-pointer hover:bg-accent rounded-sm dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default CombinedSearchInput;