import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import SiteHeader from '../components/SiteHeader';
import MobileNav from '../components/MobileNav';
import ItemCard, { ItemCardSkeleton } from '../components/ItemCard';

const PAGE_SIZE = 16;

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (page = 1) => {
    try {
      page === 1 ? setLoading(true) : setLoadingMore(true);
      const response = await productService.getAllProducts({ page, limit: PAGE_SIZE });
      if (response.success) {
        const incoming = response.data.products;
        setProducts((prev) => (page === 1 ? incoming : [...prev, ...incoming]));
        setPagination(response.data.pagination);
      } else {
        setError('We couldn’t load the products. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('We couldn’t load the products. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!pagination || pagination.current >= pagination.pages) return;
    fetchProducts(pagination.current + 1);
  };

  if (loading) return <Loading text="Loading the catalogue…" />;

  return (
    <div className="min-h-screen pb-mobile-nav">
      <SiteHeader back crumbs={[{ label: 'All products' }]} />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-8 sm:mb-10">
          <p className="eyebrow">Catalogue</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-brand-800 sm:text-3xl">
            All products
          </h1>
          {pagination && (
            <p className="mt-2 text-sm text-stone-500">
              Showing {products.length} of {pagination.total} products
            </p>
          )}
        </header>

        {error && (
          <div
            role="alert"
            className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-2.5 xs:gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {products.map((product, index) => (
                <ItemCard
                  key={product._id}
                  to={`/product/${product.slug}`}
                  imageUrl={product.image?.url || product.images?.[0]?.url}
                  label={product.categories?.[0]?.name || product.tag}
                  title={product.name}
                  index={index % PAGE_SIZE}
                />
              ))}
              {loadingMore &&
                Array.from({ length: 4 }).map((_, i) => <ItemCardSkeleton key={`s-${i}`} />)}
            </div>

            {pagination && pagination.current < pagination.pages && (
              <div className="mt-12 text-center">
                <button onClick={loadMore} disabled={loadingMore} className="btn-primary disabled:opacity-60">
                  {loadingMore ? 'Loading…' : 'Load more products'}
                </button>
                <p className="mt-3 text-xs text-stone-400">
                  Page {pagination.current} of {pagination.pages}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="card mx-auto max-w-md px-6 py-14 text-center">
            <h2 className="font-display text-xl text-brand-800">No products yet</h2>
            <p className="mt-2 text-sm text-stone-500">
              Our collection is growing. Please check back soon.
            </p>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default AllProducts;
