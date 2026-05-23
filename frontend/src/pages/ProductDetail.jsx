import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { FaWhatsapp } from 'react-icons/fa';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ImageContainer from '../components/ui/ImageContainer';
import Typography from '../components/ui/Typography';
import ProductCard from '../components/ProductCard';
import { ShareIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ProductDetail = () => {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchProductDetail();
  }, [productSlug]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const searchResponse = await productService.getAllProducts({ search: productSlug.replace(/-/g, ' ') });
      
      if (searchResponse.success && searchResponse.data.products.length > 0) {
        const foundProduct = searchResponse.data.products.find(p => 
          p.slug === productSlug || 
          p.name.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(productSlug.split('-')[0])
        ) || searchResponse.data.products[0];

        try {
          const detailResponse = await productService.getProductById(foundProduct._id);
          if (detailResponse.success) {
            setProduct(detailResponse.data.product);
          } else {
            setProduct(foundProduct);
          }
        } catch (e) {
          setProduct(foundProduct);
        }
        
        if (foundProduct.tag) {
          const relatedResponse = await productService.getProductsByTag(foundProduct.tag, { limit: 5 });
          if (relatedResponse.success) {
            const filtered = relatedResponse.data.products.filter(p => p._id !== foundProduct._id);
            setRelatedProducts(filtered.slice(0, 4));
          }
        }
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
          text: product.description || '',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const scrollThumbnails = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return <Loading text="Loading product details..." />;
  
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <div className="text-center card p-12 max-w-md mx-auto w-full">
          <Typography variant="h2" color="error" className="mb-4">Product Not Found</Typography>
          <Typography variant="body" color="muted" className="mb-6">
            {error || 'The product you are looking for does not exist.'}
          </Typography>
          <Link to="/" className="btn-primary inline-block">Back to Home</Link>
        </div>
      </div>
    );
  }

  const productImages = product.images?.length > 0 ? product.images : [product.image].filter(Boolean);
  const mainImage = productImages[selectedImageIndex] || productImages[0];
  const whatsappNumber = "918708258249";
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in the product: ${product.name}`);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header showBack={true} />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          
          {/* Images Section */}
          <div className="space-y-4 animate-fade-up">
            {/* Main Image */}
            <ImageContainer
              src={mainImage?.url}
              alt={product.name}
              aspectRatio="square"
              className="rounded-2xl border border-neutral-200/50 shadow-ambient-low"
            />
            
            {/* Thumbnails Row */}
            {productImages.length > 1 && (
              <div className="relative group">
                <button 
                  onClick={() => scrollThumbnails('left')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-surface rounded-full shadow-ambient-low items-center justify-center hidden md:group-hover:flex z-10"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-neutral-600" />
                </button>
                
                <div 
                  ref={scrollRef}
                  className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-2 px-1"
                >
                  {productImages.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden snap-start transition-all duration-200 ${
                        selectedImageIndex === idx 
                          ? 'ring-2 ring-primary-500 ring-offset-2' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="w-full h-full bg-surface-warm p-2">
                        <img src={image.url} alt="thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => scrollThumbnails('right')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-surface rounded-full shadow-ambient-low items-center justify-center hidden md:group-hover:flex z-10"
                >
                  <ChevronRightIcon className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div>
              <Typography variant="overline" color="muted" className="mb-3 block">
                {product.categories?.[0]?.name || product.tag || 'Product'}
              </Typography>
              
              <Typography variant="h1" className="mb-4">{product.name}</Typography>
              
              {product.description && (
                <Typography variant="body-lg" color="secondary" className="leading-relaxed">
                  {product.description}
                </Typography>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-200/50">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-full shadow-ambient-low hover:shadow-ambient-high transition-all active:scale-[0.98]"
              >
                <FaWhatsapp className="w-6 h-6" />
                <span>WhatsApp Enquiry</span>
              </a>
              
              <button
                onClick={handleShare}
                className="sm:w-auto w-full flex items-center justify-center gap-2 btn-outline border-neutral-300 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-400 py-4 px-8"
              >
                <ShareIcon className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Specs & Features */}
            {(product.specifications?.length > 0 || product.features?.length > 0) && (
              <div className="space-y-6 pt-6">
                {product.features?.length > 0 && (
                  <div>
                    <Typography variant="h3" className="mb-4">Features</Typography>
                    <ul className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-3 text-neutral-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-2" />
                          <Typography variant="body">{feature}</Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.specifications?.length > 0 && (
                  <div>
                    <Typography variant="h3" className="mb-4">Specifications</Typography>
                    <div className="bg-surface-warm rounded-xl border border-neutral-200/50 p-6">
                      <dl className="grid grid-cols-1 gap-y-4 text-sm">
                        {product.specifications.map((spec, idx) => (
                          <div key={idx} className="flex justify-between border-b border-neutral-200/50 pb-4 last:pb-0 last:border-0">
                            <Typography variant="body" color="muted" as="dt">{spec.name}</Typography>
                            <Typography variant="body" weight="medium" as="dd" className="text-right pl-4">{spec.value}</Typography>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-10 border-t border-neutral-200/50 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="mb-8 flex justify-between items-end">
              <div>
                <Typography variant="h2" className="mb-2">You might also love</Typography>
                <Typography variant="body" color="secondary">More amazing products from the same category</Typography>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;