import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SUGGESTIONS = [
  'Kids Toys',
  'Hair Accessories',
  'Lunch Boxes',
  'Flasks & Sippers',
  'Storage Organizers',
  'Diwali Items',
];

const SearchBar = ({ onSearch, isLoading, searchTerm, setSearchTerm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') onSearch('');
  };

  const clear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="group relative flex items-center">
          <MagnifyingGlassIcon
            className={`pointer-events-none absolute left-4 h-5 w-5 transition-colors duration-200 ${
              isLoading ? 'animate-pulse text-brand-600' : 'text-stone-400 group-focus-within:text-brand-600'
            }`}
          />
          <input
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full rounded-full border border-cream-200 bg-white py-3.5 pl-12 pr-28 text-base text-stone-800 shadow-soft transition-all duration-200 ease-out-quart placeholder:text-stone-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200"
            disabled={isLoading}
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            {searchTerm && !isLoading && (
              <button
                type="button"
                onClick={clear}
                aria-label="Clear search"
                className="rounded-full p-2 text-stone-400 transition-colors hover:text-stone-700"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary px-5 py-2 text-sm disabled:opacity-60"
            >
              {isLoading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setSearchTerm(suggestion);
              onSearch(suggestion);
            }}
            className="rounded-full border border-cream-200 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-600 transition-all duration-200 ease-out-quart hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 active:scale-[0.97]"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
