import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/category/${category._id}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-gray-200">
        <img
          src={category.image.url}
          alt={category.name}
          className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
          {category.name}
        </h3>
        

        
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {category.productCount || 0} Products
          </span>
          
          <span className="text-blue-600 group-hover:text-blue-800 font-medium text-sm">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
};

const ProductSearchResult = ({ product }) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image?.url || product.images?.[0]?.url}
          alt={product.name}
          className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
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

  if (loading) return <Loading text="Loading categories..." />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">E-Catalogue</h1>
              <p className="mt-1 text-sm text-gray-600">Discover amazing products by category</p>
            </div>
            <Link
              to="/admin/login"
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </div>

        {/* Search Results */}
        {searchResults && (
          <div className="mb-8">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results ({searchResults.length} found)
              </h2>
              <button
                onClick={() => {
                  setSearchResults(null);
                  setIsSearching(false);
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {searchResults.map((product) => (
                  <ProductSearchResult key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="text-gray-500 text-lg">
                  No products found matching your search.
                </div>
                <button
                  onClick={() => setSearchResults(null)}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Browse Categories
                </button>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Categories Section - Only show when not searching */}
        {!searchResults && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop by Category</h2>
              <p className="text-gray-600">Explore our wide range of product categories</p>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <CategoryCard key={category._id} category={category} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="text-gray-500 text-lg">
                  No categories available at the moment.
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Categories will appear here once they are created by the admin.
                </p>
              </div>
            )}
          </div>
        )}

        {/* {!searchResults && categories.length > 0 && (
          <div className="mt-16 bg-blue-50 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Use our search feature to find specific products across all categories, 
                or explore our categories to discover new items.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link
                  to="#search"
                  onClick={() => document.querySelector('input[type="text"]').focus()}
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Search Products
                </Link>
                <Link
                  to="/admin/login"
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium border border-blue-200"
                >
                  Admin Access
                </Link>
              </div>
            </div>
          </div>
        )} */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage; 