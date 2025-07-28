import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import { 
  ArrowLeftIcon, 
  SparklesIcon, 
  TagIcon, 
  GiftIcon
} from '@heroicons/react/24/outline';

const ProductCard = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group card card-hover animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gradient-to-br from-warm-100 to-primary-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          )}
          
          <img
            src={product.image?.url || product.images?.[0]?.url}
            alt={product.name}
            className={`h-64 w-full object-contain object-center transition-all duration-500 ${
              imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 border border-white/50">
              <SparklesIcon className="h-3 w-3 mr-1 text-primary-500" />
              {product.categories?.[0]?.name || product.tag}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 mb-3">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent-100 to-secondary-100 text-accent-700 capitalize">
              {product.categories?.[0]?.name || product.tag}
            </span>
            
            <div className="text-sm text-gray-500">
              View Details
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
              Click to explore
            </div>
            
            <div className="flex items-center text-primary-600 group-hover:text-primary-800 font-medium text-sm transition-all">
              <span className="mr-1">View</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const CategoryProducts = () => {
  const { categoryId, tagName } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  // Determine if this is a category ID or a legacy tag name
  const identifier = categoryId || tagName;
  const isLegacyRoute = !!tagName;

  useEffect(() => {
    if (isLegacyRoute) {
      // Legacy route: fetch products by tag
      fetchProductsByTag();
    } else {
      // New route: fetch category and its products
      fetchCategoryAndProducts();
    }
  }, [identifier, isLegacyRoute]);

  const fetchCategoryAndProducts = async (page = 1) => {
    try {
      setLoading(true);
      
      // First, get the category information by ID
      const categoryResponse = await categoryService.getCategoryById(identifier);
      if (categoryResponse.success) {
        setCategory(categoryResponse.data.category);
        
        // Then fetch products for this category using the proper category-based API
        const productsResponse = await productService.getProductsByCategory(identifier, { page, limit: 12 });
        if (productsResponse.success) {
          setProducts(productsResponse.data.products);
          setPagination(productsResponse.data.pagination);
        }
      } else {
        setError('Category not found');
      }
    } catch (err) {
      console.error('Error fetching category and products:', err);
      setError('Failed to fetch category products');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByTag = async (page = 1) => {
    try {
      setLoading(true);
      const response = await productService.getProductsByTag(identifier, { page, limit: 12 });
      if (response.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
        // Create a mock category for legacy routes
        setCategory({
          name: identifier.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: `All products in the ${identifier} category`,
          slug: identifier
        });
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products by tag:', err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!pagination || pagination.current >= pagination.pages) return;

    try {
      const nextPage = pagination.current + 1;
      let response;
      
      if (isLegacyRoute) {
        response = await productService.getProductsByTag(identifier, { page: nextPage, limit: 12 });
      } else {
        // Use proper category-based API
        response = await productService.getProductsByCategory(identifier, { page: nextPage, limit: 12 });
      }
      
      if (response.success) {
        setProducts(prev => [...prev, ...response.data.products]);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error loading more products:', err);
    }
  };

  if (loading) return <Loading text="Loading amazing products..." />;
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-50 to-primary-50">
        <div className="text-center card p-12 max-w-md mx-auto">
          <GiftIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="btn-primary"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-primary-50">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <Link 
                to="/" 
                className="flex items-center space-x-1 sm:space-x-2 text-primary-600 hover:text-primary-800 font-medium transition-colors flex-shrink-0"
              >
                <ArrowLeftIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                <img 
                  src="/logo.png" 
                  alt="Anika Kit Store" 
                  className="h-6 sm:h-8 w-auto"
                />
                <span className="gradient-text font-bold text-sm sm:text-base hidden sm:inline">
                  Anika Kit Store
                </span>
              </Link>
              
              <div className="h-4 sm:h-6 border-l border-gray-300"></div>
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-1">
                <TagIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500 flex-shrink-0" />
                <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 truncate">
                  {category?.name || 'Products'}
                </h1>
              </div>
            </div>
            {/* <Link
              to="/admin/login"
              className="btn-outline text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap flex-shrink-0"
            >
              <span className="hidden sm:inline">Admin Login</span>
              <span className="sm:hidden">Admin</span>
            </Link> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <section className="mb-12">
          <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white rounded-full shadow-soft">
                  <GiftIcon className="h-8 w-8 text-primary-500" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                <span className="gradient-text">{category?.name}</span> Collection
              </h2>
              
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="h-4 w-4 text-primary-500" />
                  <span className="text-gray-600">
                    {pagination && `${products.length} of ${pagination.total} products`}
                  </span>
                </div>
                
                {isLegacyRoute && (
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warm-100 text-warm-700 border border-warm-200">
                      Legacy Category
                    </span>
                  </div>
                )}
              </div>
              
              {category?.description && (
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
              {products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>

            {/* Load More Button */}
            {pagination && pagination.current < pagination.pages && (
              <div className="text-center">
                <button
                  onClick={loadMoreProducts}
                  className="btn-primary text-lg px-8 py-4"
                >
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  Load More Amazing Products
                </button>
                <div className="mt-4 text-sm text-gray-500">
                  Page {pagination.current} of {pagination.pages}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 card">
            <GiftIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 text-xl mb-2">
              No products found in this category yet.
            </div>
            <p className="text-gray-400 mb-6">
              But don't worry! Our amazing collection is always growing.
            </p>
            <Link 
              to="/" 
              className="btn-secondary"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Browse All Categories
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CategoryProducts; 