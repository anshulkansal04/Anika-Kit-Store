import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const ProductsByTag = () => {
  const { tagName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchProductsByTag();
  }, [tagName]);

  const fetchProductsByTag = async (page = 1) => {
    try {
      setLoading(true);
      const response = await productService.getProductsByTag(tagName, { page, limit: 12 });
      if (response.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
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
      const response = await productService.getProductsByTag(
        tagName, 
        { page: pagination.current + 1, limit: 12 }
      );
      if (response.success) {
        setProducts(prev => [...prev, ...response.data.products]);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error loading more products:', err);
    }
  };

  if (loading) return <Loading text="Loading products..." />;

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
              <h1 className="text-3xl font-bold text-gray-900 capitalize">
                {tagName} Products
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
            <h2 className="text-2xl font-semibold text-gray-900 capitalize mb-2">
              {tagName} Collection
            </h2>
            <p className="text-gray-600">
              {pagination && `Showing ${products.length} of ${pagination.total} products`}
            </p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <img
                      src={product.image.url}
                      alt={product.name}
                      className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {product.tag}
                      </span>
                    </div>
                  </div>
                </div>
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
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No products found in the {tagName} category.
            </div>
            <Link 
              to="/" 
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              Browse all products
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsByTag; 