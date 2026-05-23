import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Typography from './ui/Typography';

const SearchBar = ({ onSearch, isLoading, searchTerm, setSearchTerm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      onSearch('');
    }
  };

  const suggestions = [
    'Kids Toys', 'Lunch Boxes', 'Sippers', 
    'Storage', 'Accessories', 'Kitchen'
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon 
              className={`h-5 w-5 transition-colors duration-300 ${
                isLoading 
                  ? 'text-primary-500 animate-spin' // Use spin if it's a loading icon, but here it's magnifying glass, let's just do pulse
                  : 'text-neutral-400 group-focus-within:text-primary-500'
              } ${isLoading ? 'animate-pulse' : ''}`}
            />
          </div>
          
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search collections..."
            className="block w-full pl-12 pr-4 py-4 bg-surface-warm border border-transparent rounded-full font-body text-body-md text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-200 focus:bg-surface shadow-inner-warm transition-all duration-300 ease-out-quart"
            disabled={isLoading}
          />
          
          {/* Submit button hidden but accessible for form submission */}
          <button type="submit" className="hidden" disabled={isLoading}>Search</button>
        </div>
      </form>
      
      {/* Quick Search Chips */}
      <div className="mt-4 flex gap-2 overflow-x-auto hide-scrollbar pb-2 px-1">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setSearchTerm(suggestion);
              onSearch(suggestion);
            }}
            className="flex-shrink-0 px-4 py-1.5 bg-surface-warm rounded-full border border-neutral-200/50 hover:border-primary-200 hover:bg-primary-50 transition-colors duration-200 active:scale-[0.98]"
          >
            <Typography variant="label" color="secondary" className="group-hover:text-primary-600 transition-colors">
              {suggestion}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;