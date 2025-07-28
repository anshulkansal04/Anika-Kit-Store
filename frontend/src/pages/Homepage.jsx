import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import { 
  HeartIcon, 
  GiftIcon, 
  SparklesIcon,
  ShoppingBagIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/category/${category._id}`}
      className="group card card-hover animate-fade-in"
    >
      <div className="relative aspect-w-16 aspect-h-9 w-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
        <img
          src={category.image.url}
          alt={category.name}
          className="h-56 w-full object-contain object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-3">
          {category.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700">
            <SparklesIcon className="h-4 w-4 mr-1" />
            {category.productCount || 0} Products
          </span>
          
          <div className="flex items-center text-primary-600 group-hover:text-primary-800 font-medium text-sm">
            <span className="mr-1">Explore</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProductSearchResult = ({ product }) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group card card-hover animate-scale-in"
    >
      <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gradient-to-br from-warm-100 to-primary-100">
        <img
          src={product.image?.url || product.images?.[0]?.url}
          alt={product.name}
          className="h-48 w-full object-contain object-center group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
            <HeartIcon className="h-4 w-4 text-primary-500" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent-100 to-secondary-100 text-accent-700 capitalize">
            {product.tag}
          </span>
        </div>
      </div>
    </Link>
  );
};

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAllCategories({ 
        active: true, 
        limit: 50 
      });
      if (response.success) {
        setCategories(response.data.categories);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await productService.searchProducts(searchTerm, { limit: 20 });
      if (response.success) {
        setSearchResults(response.data.products);
      } else {
        setError('Search failed');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  if (loading) return <Loading text="Loading amazing products..." />;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <img 
                src="/logo.png" 
                alt="Anika Kit Store" 
                className="h-8 sm:h-10 lg:h-12 w-auto"
              />
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text truncate">
                  Anika Kit Store
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Your one-stop shop for amazing products
                </p>
              </div>
            </div>
            {/* <Link
              to="/admin/login"
              className="btn-outline text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Admin Login</span>
              <span className="sm:hidden">Admin</span>
            </Link> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!searchResults && (
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-warm-50 to-secondary-100"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-slide-up">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <GiftIcon className="h-5 w-5 text-primary-500" />
                  <span className="text-sm font-medium text-primary-700">Amazing Products Collection</span>
                  <SparklesIcon className="h-5 w-5 text-secondary-500" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Welcome to{' '}
                <span className="gradient-text">Anika Kit Store</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover our amazing collection of <span className="font-semibold text-primary-600">kids gifts</span>, 
                <span className="font-semibold text-secondary-600"> toys</span>, 
                <span className="font-semibold text-accent-600"> sippers</span>, 
                lunch boxes, bottles, hair accessories, flasks, storage organizers, speakers, 
                <span className="font-semibold text-warm-600"> diwali items</span> and so much more!
              </p>
              
              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={() => document.querySelector('input[type="text"]')?.focus()}
                  className="btn-primary text-lg px-8 py-4"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  Start Shopping
                </button>
                <Link to="#categories" className="btn-outline text-lg px-8 py-4">
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  Browse Categories
                </Link>
              </div> */}
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                {[
                  { icon: GiftIcon, label: 'Kids Gifts', color: 'text-primary-500' },
                  { icon: HeartIcon, label: 'Quality Products', color: 'text-secondary-500' },
                  { icon: StarIcon, label: 'Happy Customers', color: 'text-accent-500' },
                  { icon: SparklesIcon, label: 'Amazing Variety', color: 'text-warm-500' }
                ].map((stat, index) => (
                  <div key={index} className="text-center animate-bounce-gentle" style={{ animationDelay: `${index * 0.2}s` }}>
                    <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </div>

        {/* Search Results */}
        {searchResults && (
          <div className="mb-12">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Search Results 
                <span className="text-primary-600"> ({searchResults.length} found)</span>
              </h2>
              <button
                onClick={() => {
                  setSearchResults(null);
                  setIsSearching(false);
                }}
                className="btn-outline text-sm px-4 py-2"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {searchResults.map((product, index) => (
                  <div key={product._id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProductSearchResult product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 card">
                <GiftIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-500 text-xl mb-2">
                  No products found matching your search.
                </div>
                <p className="text-gray-400 mb-6">Try searching for toys, gifts, accessories, or browse our categories</p>
                <button
                  onClick={() => setSearchResults(null)}
                  className="btn-primary"
                >
                  Browse Categories
                </button>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="text-red-700 font-medium">{error}</div>
          </div>
        )}

        {/* Categories Section */}
        {!searchResults && (
          <div id="categories">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Shop by <span className="gradient-text">Category</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our carefully curated categories filled with amazing products for every need
              </p>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {categories.map((category, index) => (
                  <div key={category._id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <CategoryCard category={category} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 card">
                <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-500 text-xl mb-2">
                  Categories are being prepared for you!
                </div>
                <p className="text-gray-400 mb-6">
                  Our amazing product categories will appear here once they are created.
                </p>
                <Link to="/admin/login" className="btn-secondary">
                  Admin Access
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Call to Action Section */}
        {/* {!searchResults && categories.length > 0 && (
          <section className="mt-20 relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            
            <div className="relative p-12 text-center text-white">
              <GiftIcon className="h-16 w-16 mx-auto mb-6 animate-bounce-gentle" />
              <h3 className="text-3xl font-bold mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Use our search feature to find specific products across all categories, 
                or contact us directly - we're here to help you find the perfect item!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.querySelector('input[type="text"]')?.focus()}
                  className="bg-white text-primary-600 hover:text-primary-700 font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-soft hover:shadow-medium transform hover:-translate-y-0.5"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2 inline" />
                  Search Products
                </button>
                <a
                  href="#footer"
                  className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        )} */}
      </main>

      {/* Footer */}
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage; 