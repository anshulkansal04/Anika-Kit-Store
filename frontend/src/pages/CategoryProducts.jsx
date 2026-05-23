import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Typography from '../components/ui/Typography';
import { SkeletonCard } from '../components/ui/Skeleton';

const CategoryProducts = () => {
  const { categoryId, tagName } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <Loading text="Loading category products..." />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <div className="text-center card p-8 sm:p-12 max-w-md mx-auto w-full">
          <Typography variant="h2" color="error" className="mb-4">Oops! Something went wrong</Typography>
          <Typography variant="body" color="muted" className="mb-8">{error}</Typography>
          <Link to="/" className="btn-primary inline-block">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header showBack={true} />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        
        {/* Category Header Area */}
        <section className="mb-10 animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <Typography variant="h1" color="primary">{category?.name}</Typography>
              {category?.description && (
                <Typography variant="body" color="secondary" className="max-w-2xl mt-2">
                  {category.description}
                </Typography>
              )}
            </div>
            {pagination && (
              <Typography variant="label" color="muted" className="shrink-0 pb-1 sm:text-right">
                {products.length} of {pagination.total} Items
              </Typography>
            )}
          </div>
        </section>

        {/* Product Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {products.map((product, index) => (
                <div key={product._id} className="animate-fade-up" style={{ animationDelay: `${(index % 12) * 40}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {pagination && pagination.current < pagination.pages && (
              <div className="flex justify-center pt-8">
                <button onClick={loadMoreProducts} className="btn-outline px-8 py-3">
                  Load More Inspiration
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 card bg-surface-warm">
            <Typography variant="h3" color="muted" className="mb-2">No products found</Typography>
            <Typography variant="body" color="secondary" className="mb-6">
              Our amazing collection is always growing. Check back soon!
            </Typography>
            <Link to="/" className="btn-primary">Browse All Categories</Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryProducts;