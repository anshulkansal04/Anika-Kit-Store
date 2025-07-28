import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import { 
  ShareIcon,
  TagIcon,
  InformationCircleIcon,
  ArrowLeftIcon,
  SparklesIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

const ProductDetail = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  if (loading) return <Loading text="Loading product details..." />;
  
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-50 to-primary-50">
        <div className="text-center card p-12 max-w-md mx-auto">
          <GiftIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
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

  const productImages = product.images?.length > 0 ? product.images : [product.image].filter(Boolean);
  const mainImage = productImages[selectedImageIndex] || productImages[0];

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
              <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm min-w-0 flex-1">
                <Link 
                  to={`/category/${product.categories?.[0]?._id || product.tag}`}
                  className="text-primary-600 hover:text-primary-800 font-medium capitalize transition-colors truncate"
                >
                  {product.categories?.[0]?.name || product.tag}
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-500 truncate">{product.name}</span>
              </nav>
            </div>
            <Link
              to="/admin/login"
              className="btn-outline text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap flex-shrink-0"
            >
              <span className="hidden sm:inline">Admin Login</span>
              <span className="sm:hidden">Admin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="card overflow-hidden">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gradient-to-br from-warm-100 to-primary-100">
                <img
                  src={mainImage?.url || product.image?.url}
                  alt={product.name}
                  className="w-full h-96 object-contain object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? 'border-primary-500 shadow-medium transform scale-105' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-soft'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 capitalize">
                  <TagIcon className="h-4 w-4 mr-1" />
                  {product.categories?.[0]?.name || product.tag}
                </span>
                {product.featured && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-warm-100 to-accent-100 text-warm-700">
                    <SparklesIcon className="h-4 w-4 mr-1" />
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {product.description && (
                <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* Product Details */}
            {(product.specifications?.length > 0 || product.features?.length > 0) && (
              <div className="space-y-6">
                {product.specifications?.length > 0 && (
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <InformationCircleIcon className="h-5 w-5 mr-2 text-primary-500" />
                      Specifications
                    </h3>
                    <dl className="grid grid-cols-1 gap-4">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
                          <dt className="text-sm font-medium text-gray-600">{spec.name}</dt>
                          <dd className="text-sm text-gray-900 font-medium">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {product.features?.length > 0 && (
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <SparklesIcon className="h-5 w-5 mr-2 text-secondary-500" />
                      Features
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
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
                onClick={handleShare}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-600 font-medium hover:border-primary-300 hover:text-primary-600 transition-all duration-300 shadow-soft hover:shadow-medium transform hover:-translate-y-0.5"
              >
                <ShareIcon className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100">
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="h-6 w-6 text-primary-600 mt-1" />
                <div className="text-sm">
                  <p className="font-semibold text-primary-800 mb-2">Product Information</p>
                  <ul className="space-y-1 text-primary-700">
                    {product.sku && <li><span className="font-medium">SKU:</span> {product.sku}</li>}
                    {product.weight && <li><span className="font-medium">Weight:</span> {product.weight}g</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                You might also <span className="gradient-text">love these</span>
              </h2>
              <p className="text-gray-600">More amazing products from the same category</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <div key={relatedProduct._id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link
                    to={`/product/${relatedProduct.slug}`}
                    className="group card card-hover animate-fade-in block"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gradient-to-br from-warm-100 to-primary-100">
                      <img
                        src={relatedProduct.image?.url || relatedProduct.images?.[0]?.url}
                        alt={relatedProduct.name}
                        className="h-48 w-full object-contain object-center group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-3">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent-100 to-secondary-100 text-accent-700 capitalize">
                          {relatedProduct.tag}
                        </span>
                        <span className="text-primary-600 group-hover:text-primary-800 font-medium text-sm flex items-center">
                          View
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail; 