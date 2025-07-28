import { useState } from 'react';
import { MagnifyingGlassIcon, SparklesIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Auto-search with debouncing could be added here
    if (value === '') {
      onSearch('');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon 
              className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 ${
                isLoading 
                  ? 'text-primary-500 animate-pulse' 
                  : 'text-gray-400 group-focus-within:text-primary-500'
              }`}
            />
          </div>
          
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for kids gifts, toys, accessories..."
            className="block w-full pl-10 sm:pl-12 pr-20 sm:pr-32 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl leading-5 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-primary-400 text-sm sm:text-lg font-medium shadow-soft hover:shadow-medium transition-all duration-300 group-focus-within:bg-white"
            disabled={isLoading}
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-1 sm:pr-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary rounded-lg sm:rounded-xl px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 sm:space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden sm:inline">Searching...</span>
                </>
              ) : (
                <>
                  <MagnifyingGlassIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      {/* Search Tips */}
      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="h-3 w-3 sm:h-4 sm:w-4 text-primary-400" />
          <span>Popular: <span className="text-primary-600 font-medium">Storage Boxes</span></span>
        </div>
        <div className="flex items-center space-x-2">
          <SparklesIcon className="h-3 w-3 sm:h-4 sm:w-4 text-secondary-400" />
          <span>Trending: <span className="text-secondary-600 font-medium">Labubu Toys</span></span>
        </div>
      </div>
      
      {/* Quick Search Suggestions */}
      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 justify-center">
        {[
          'Kids Toys', 'Hair Accessories', 'Lunch Boxes', 'Flasks & Sippers', 
          'Storage Organizers', 'Speakers', 'Diwali Items'
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setSearchTerm(suggestion);
              onSearch(suggestion);
            }}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all duration-200 transform hover:scale-105"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar; 