import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import { 
  HeartIcon,
  ShareIcon,
  TagIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ProductDetail = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetchProductDetail();
  }, [productSlug]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      
      // For now, we'll search by slug or name since we don't have a direct slug endpoint
      const searchResponse = await productService.getAllProducts({ search: productSlug.replace(/-/g, ' ') });
      
      if (searchResponse.success && searchResponse.data.products.length > 0) {
        // Find the product that matches the slug most closely
        const foundProduct = searchResponse.data.products.find(p => 
          p.slug === productSlug || 
          p.name.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(productSlug.split('-')[0])
        ) || searchResponse.data.products[0];
        
        setProduct(foundProduct);
        
        // Fetch related products from the same category
        if (foundProduct.tag) {
          const relatedResponse = await productService.getProductsByTag(foundProduct.tag, { limit: 4 });
          if (relatedResponse.success) {
            // Filter out the current product
            const filtered = relatedResponse.data.products.filter(p => p._id !== foundProduct._id);
            setRelatedProducts(filtered.slice(0, 3));
          }
        }
        
        // Update view count (this would be handled by the backend in a real app)
        // await productService.incrementViews(foundProduct._id);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // In a real app, this would save to user's wishlist
  };

  if (loading) return <Loading text="Loading product details..." />;
  
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
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

  const productImages = product.images?.length > 0 ? product.images : [product.image].filter(Boolean);
  const mainImage = productImages[selectedImageIndex] || productImages[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Home
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <Link 
                to={`/category/${product.categories?.[0]?._id || product.tag}`}
                className="text-blue-600 hover:text-blue-800 font-medium capitalize"
              >
                {product.categories?.[0]?.name || product.tag}
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <span className="text-gray-500 truncate max-w-xs">{product.name}</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={mainImage?.url || product.image?.url}
                alt={product.name}
                className="w-full h-96 object-cover object-center"
              />
            </div>
            
            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="mt-2 flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                  <TagIcon className="h-4 w-4 mr-1" />
                  {product.categories?.[0]?.name || product.tag}
                </span>
                {product.featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-sm font-medium bg-red-100 text-red-800">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-green-600">
                  You save ${(product.originalPrice - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            {(product.specifications?.length > 0 || product.features?.length > 0) && (
              <div className="space-y-4">
                {product.specifications?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                    <dl className="grid grid-cols-1 gap-2">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                          <dt className="text-sm font-medium text-gray-500">{spec.name}</dt>
                          <dd className="text-sm text-gray-900">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {product.features?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={toggleWishlist}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition ${
                  isWishlisted 
                    ? 'border-red-300 bg-red-50 text-red-600' 
                    : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="h-5 w-5" />
                ) : (
                  <HeartIcon className="h-5 w-5" />
                )}
                <span className="text-sm font-medium">
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition"
              >
                <ShareIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Product Information</p>
                  <ul className="space-y-1 text-blue-700">
                    {product.sku && <li>SKU: {product.sku}</li>}
                    {product.weight && <li>Weight: {product.weight}g</li>}
                    {product.stock !== undefined && (
                      <li>Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <img
                      src={relatedProduct.image?.url || relatedProduct.images?.[0]?.url}
                      alt={relatedProduct.name}
                      className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      <span className="text-blue-600 group-hover:text-blue-800 font-medium text-sm">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail; 