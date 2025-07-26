import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon 
              className={`h-5 w-5 ${isLoading ? 'text-blue-600 animate-pulse' : 'text-gray-400'}`}
            />
          </div>
          
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for products..."
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            disabled={isLoading}
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 mr-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>
      </form>
      
      {/* Search Tips */}
      <div className="mt-2 text-sm text-gray-500 text-center">
        Search by product name, description, or category
      </div>
    </div>
  );
};

export default SearchBar; 