import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import SiteHeader from '../components/SiteHeader';
import MobileNav from '../components/MobileNav';
import ItemCard, { ItemCardSkeleton } from '../components/ItemCard';

const CategoryProducts = () => {
  const { categoryId, tagName } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const identifier = categoryId || tagName;
  const isLegacyRoute = !!tagName;

  useEffect(() => {
    if (isLegacyRoute) {
      fetchProductsByTag();
    } else {
      fetchCategoryAndProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identifier, isLegacyRoute]);

  const fetchCategoryAndProducts = async (page = 1) => {
    try {
      setLoading(true);
      const categoryResponse = await categoryService.getCategoryById(identifier);
      if (categoryResponse.success) {
        setCategory(categoryResponse.data.category);
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
      setError('We couldn’t load this category. Please try again.');
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
        setCategory({
          name: identifier.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
          description: '',
          slug: identifier,
        });
      } else {
        setError('We couldn’t load these products. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching products by tag:', err);
      setError('We couldn’t load these products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!pagination || pagination.current >= pagination.pages) return;
    try {
      setLoadingMore(true);
      const nextPage = pagination.current + 1;
      const response = isLegacyRoute
        ? await productService.getProductsByTag(identifier, { page: nextPage, limit: 12 })
        : await productService.getProductsByCategory(identifier, { page: nextPage, limit: 12 });
      if (response.success) {
        setProducts((prev) => [...prev, ...response.data.products]);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error loading more products:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) return <Loading text="Loading products…" />;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="card max-w-md px-8 py-12 text-center">
          <h2 className="font-display text-2xl text-brand-800">Something went wrong</h2>
          <p className="mt-3 text-stone-600">{error}</p>
          <Link to="/" className="btn-primary mt-6">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-mobile-nav">
      <SiteHeader
        back
        crumbs={[{ label: 'Categories', to: '/#categories' }, { label: category?.name || 'Products' }]}
      />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-8 sm:mb-12">
          <p className="eyebrow">Category</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-brand-800 sm:text-4xl">
            {category?.name}
          </h1>
          <p className="mt-3 text-sm text-stone-500">
            {pagination ? `${products.length} of ${pagination.total} products` : `${products.length} products`}
          </p>
          {category?.description && (
            <p className="mt-4 max-w-2xl leading-relaxed text-stone-600">{category.description}</p>
          )}
        </header>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {products.map((product, index) => (
                <ItemCard
                  key={product._id}
                  to={`/product/${product.slug}`}
                  imageUrl={product.image?.url || product.images?.[0]?.url}
                  label={product.categories?.[0]?.name || product.tag}
                  title={product.name}
                  index={index % 12}
                  priority={index < 4}
                />
              ))}
              {loadingMore &&
                Array.from({ length: 4 }).map((_, i) => <ItemCardSkeleton key={`s-${i}`} />)}
            </div>

            {pagination && pagination.current < pagination.pages && (
              <div className="mt-12 text-center">
                <button onClick={loadMoreProducts} disabled={loadingMore} className="btn-primary disabled:opacity-60">
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
            <h2 className="font-display text-xl text-brand-800">Nothing here yet</h2>
            <p className="mt-2 text-sm text-stone-500">
              This category doesn’t have products yet. Our collection is always growing.
            </p>
            <Link to="/" className="btn-primary mt-6">
              Browse all categories
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default CategoryProducts;
