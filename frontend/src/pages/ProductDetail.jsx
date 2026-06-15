import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import SiteHeader from '../components/SiteHeader';
import MobileNav from '../components/MobileNav';
import ItemCard from '../components/ItemCard';
import {
  ShareIcon,
  InformationCircleIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

const ProductDetail = () => {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    fetchProductDetail();
    setSelectedImageIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const searchResponse = await productService.getAllProducts({ search: productSlug.replace(/-/g, ' ') });

      if (searchResponse.success && searchResponse.data.products.length > 0) {
        const foundProduct =
          searchResponse.data.products.find(
            (p) =>
              p.slug === productSlug ||
              p.name.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(productSlug.split('-')[0])
          ) || searchResponse.data.products[0];

        try {
          const detailResponse = await productService.getProductById(foundProduct._id);
          setProduct(detailResponse.success ? detailResponse.data.product : foundProduct);
        } catch {
          setProduct(foundProduct);
        }

        if (foundProduct.tag) {
          const relatedResponse = await productService.getProductsByTag(foundProduct.tag, { limit: 4 });
          if (relatedResponse.success) {
            const filtered = relatedResponse.data.products.filter((p) => p._id !== foundProduct._id);
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
        await navigator.share({ title: product.name, text: product.description, url: window.location.href });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTouchStart = (e) => {
    imageContainerRef.current.touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!imageContainerRef.current?.touchStartX) return;
    const diff = imageContainerRef.current.touchStartX - e.touches[0].clientX;
    if (Math.abs(diff) > 10) e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!imageContainerRef.current?.touchStartX) return;
    const diff = imageContainerRef.current.touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50 && productImages.length > 1) {
      if (diff > 0) {
        setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
      } else {
        setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
      }
    }
    imageContainerRef.current.touchStartX = null;
  };

  if (loading) return <Loading text="Loading product details…" />;

  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="card max-w-md px-8 py-12 text-center">
          <h2 className="font-display text-2xl text-brand-800">Product not found</h2>
          <p className="mt-3 text-stone-600">{error || 'The product you are looking for does not exist.'}</p>
          <Link to="/" className="btn-primary mt-6">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const productImages = product.images?.length > 0 ? product.images : [product.image].filter(Boolean);
  const mainImage = productImages[selectedImageIndex] || productImages[0];
  const categoryName = product.categories?.[0]?.name || product.tag;
  const categoryTo = `/category/${product.categories?.[0]?._id || product.tag}`;

  return (
    <div className="min-h-screen pb-mobile-nav">
      <SiteHeader
        back
        crumbs={[
          { label: categoryName, to: categoryTo },
          { label: product.name },
        ]}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="card overflow-hidden">
              <div
                ref={imageContainerRef}
                className="relative aspect-square w-full touch-pan-x overflow-hidden bg-cream-100"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={mainImage?.url || product.image?.url}
                  alt={product.name}
                  className="h-full w-full object-contain object-center p-6 transition-transform duration-500 ease-out-quart hover:scale-[1.03]"
                />
              </div>
            </div>

            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-pressed={selectedImageIndex === index}
                    className={`h-16 w-16 flex-shrink-0 snap-start overflow-hidden rounded-xl border bg-cream-100 transition-all duration-200 ease-out-quart sm:h-20 sm:w-20 ${
                      selectedImageIndex === index
                        ? 'border-brand-600 ring-1 ring-brand-600'
                        : 'border-cream-200 hover:border-cream-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-contain p-1.5"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {categoryName && (
                  <Link
                    to={categoryTo}
                    className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-medium capitalize text-brand-700 transition-colors hover:bg-brand-100"
                  >
                    {categoryName}
                  </Link>
                )}
                {product.featured && (
                  <span className="inline-flex items-center rounded-full border border-cream-300 bg-cream-100 px-3 py-1 text-xs font-medium text-stone-600">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-brand-800 sm:text-4xl">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
                  {product.description}
                </p>
              )}
            </div>

            {(product.specifications?.length > 0 || product.features?.length > 0) && (
              <div className="space-y-5">
                {product.specifications?.length > 0 && (
                  <div className="card p-6">
                    <h2 className="eyebrow">Specifications</h2>
                    <dl className="mt-4 divide-y divide-cream-200">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between gap-4 py-3 text-sm">
                          <dt className="text-stone-500">{spec.name}</dt>
                          <dd className="text-right font-medium text-stone-800">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {product.features?.length > 0 && (
                  <div className="card p-6">
                    <h2 className="eyebrow">Features</h2>
                    <ul className="mt-4 space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-stone-600">
                          <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 border-t border-cream-200 pt-6">
              <button onClick={handleShare} className="btn-secondary text-sm">
                {copied ? <CheckIcon className="h-5 w-5" /> : <ShareIcon className="h-5 w-5" />}
                <span>{copied ? 'Link copied' : 'Share'}</span>
              </button>
            </div>

            {(product.sku || product.weight) && (
              <div className="rounded-2xl border border-cream-200 bg-cream-100 p-5">
                <div className="flex items-start gap-3">
                  <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
                  <div className="text-sm text-stone-600">
                    <p className="font-medium text-stone-800">Product information</p>
                    <ul className="mt-2 space-y-1">
                      {product.sku && (
                        <li>
                          <span className="text-stone-500">SKU:</span> {product.sku}
                        </li>
                      )}
                      {product.weight && (
                        <li>
                          <span className="text-stone-500">Weight:</span> {product.weight}g
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="mb-8">
              <p className="eyebrow">You might also like</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-brand-800 sm:text-3xl">
                More from {categoryName}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct, index) => (
                <ItemCard
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct.slug}`}
                  imageUrl={relatedProduct.image?.url || relatedProduct.images?.[0]?.url}
                  label={relatedProduct.categories?.[0]?.name || relatedProduct.tag}
                  title={relatedProduct.name}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default ProductDetail;
