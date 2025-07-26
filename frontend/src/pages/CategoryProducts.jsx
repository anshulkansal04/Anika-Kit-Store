import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image?.url || product.images?.[0]?.url}
          alt={product.name}
          className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
            {product.categories?.[0]?.name || product.tag}
          </span>
        </div>
      </div>
    </Link>
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

  if (loading) return <Loading text="Loading products..." />;
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Home
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-3xl font-bold text-gray-900">
                {category?.name || 'Products'}
              </h1>
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
        {/* Category Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {category?.name} Collection
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {pagination && `Showing ${products.length} of ${pagination.total} products`}
              </p>
              {isLegacyRoute && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Legacy Category
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {pagination && pagination.current < pagination.pages && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreProducts}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Load More Products
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-500 text-lg mb-4">
              No products found in this category.
            </div>
            <Link 
              to="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
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