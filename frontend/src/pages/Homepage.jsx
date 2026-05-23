import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ImageContainer from '../components/ui/ImageContainer';
import Typography from '../components/ui/Typography';
import { Skeleton, SkeletonCard } from '../components/ui/Skeleton';
import ProductCard from '../components/ProductCard';

const CategoryCardSkeleton = () => <SkeletonCard />;

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/category/${category._id}`}
      className="block h-full outline-none group animate-fade-up"
    >
      <div className="card h-full flex flex-col card-hover active:scale-[0.98]">
        <ImageContainer
          src={category.image?.url}
          alt={category.name}
          aspectRatio="square"
          className="rounded-t-[1rem]"
          imgClassName="group-hover:scale-105 transition-transform duration-500 ease-out-quart"
        />
        <div className="p-4 sm:p-5 flex-grow flex flex-col">
          <Typography variant="overline" color="muted" className="mb-2 block">
            {category.productCount || 0} Products
          </Typography>
          <Typography
            variant="h3"
            className="group-hover:text-primary-600 transition-colors duration-200 line-clamp-2"
          >
            {category.name}
          </Typography>
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
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = async (term) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await productService.searchProducts(term, { limit: 20 });
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
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />

      {/* Main Content Area — padded top for fixed header */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        
        {/* Hero Section / Search */}
        <section className="mb-12">
          {!searchResults && (
            <div className="text-center mb-10 animate-fade-up">
              <Typography variant="h1" color="primary" className="mb-4">
                Quality products for every family
              </Typography>
              <Typography variant="body-lg" color="secondary" className="max-w-2xl mx-auto">
                Discover our amazing collection of kids gifts, toys, storage organizers, kitchen essentials, and more.
              </Typography>
            </div>
          )}

          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <SearchBar
              onSearch={handleSearch}
              isLoading={isSearching}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </section>

        {/* Search Results */}
        {searchResults && (
          <div className="mb-12 animate-fade-up">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Typography variant="h2">
                Search Results{' '}
                <Typography variant="body" color="primary" as="span" className="font-semibold">
                  ({searchResults.length} found)
                </Typography>
              </Typography>
              
              <button
                onClick={() => {
                  setSearchResults(null);
                  setIsSearching(false);
                  setSearchTerm('');
                }}
                className="btn-outline text-sm"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {searchResults.map((product, index) => (
                  <div key={product._id} className="animate-fade-up" style={{ animationDelay: `${index * 40}ms` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 card bg-surface-warm">
                <Typography variant="h3" color="muted" className="mb-2">
                  No products found
                </Typography>
                <Typography variant="body" color="secondary" className="mb-6">
                  Try searching for toys, gifts, or browse our categories
                </Typography>
                <button
                  onClick={() => {
                    setSearchResults(null);
                    setSearchTerm('');
                  }}
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
          <div className="mb-8 p-4 bg-error-50 rounded-xl border border-error-100">
            <Typography variant="body" color="error" weight="medium">{error}</Typography>
          </div>
        )}

        {/* Categories Grid */}
        {!searchResults && (
          <section id="categories" className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="mb-6">
              <Typography variant="h2">Explore Categories</Typography>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((category, index) => (
                  <div key={category._id} style={{ animationDelay: `${index * 40}ms` }}>
                    <CategoryCard category={category} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 card bg-surface-warm">
                <Typography variant="h3" color="muted" className="mb-2">
                  Categories are being prepared
                </Typography>
                <Typography variant="body" color="secondary" className="mb-6">
                  Our product categories will appear here soon.
                </Typography>
                <Link to="/admin/login" className="btn-secondary">
                  Admin Access
                </Link>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;