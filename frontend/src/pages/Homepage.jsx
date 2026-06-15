import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import SiteHeader from '../components/SiteHeader';
import MobileNav from '../components/MobileNav';
import ItemCard, { ItemCardSkeleton } from '../components/ItemCard';

const CategoryCard = ({ category, index }) => {
  const count = category.productCount || 0;
  const label = count > 0 ? `${count} ${count === 1 ? 'item' : 'items'}` : 'Collection';

  return (
    <ItemCard
      to={`/category/${category._id}`}
      imageUrl={category.image?.url}
      label={label}
      title={category.name}
      index={index}
      priority={index < 4}
    />
  );
};

const Homepage = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (location.hash === '#categories' && !loading) {
      const el = document.getElementById('categories');
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
        return () => clearTimeout(t);
      }
    }
  }, [location.hash, loading]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAllCategories({ active: true, limit: 50 });
      if (response.success) {
        setCategories(response.data.categories);
      } else {
        setError('We couldn’t load the categories. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('We couldn’t load the categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }
    try {
      setIsSearching(true);
      const response = await productService.searchProducts(term, { limit: 24 });
      if (response.success) {
        setSearchResults(response.data.products);
      } else {
        setError('Search failed. Please try again.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setIsSearching(false);
    setSearchTerm('');
  };

  if (loading) return <Loading text="Loading the collection…" />;

  return (
    <div className="min-h-screen pb-mobile-nav">
      <SiteHeader />

      {/* Hero */}
      {!searchResults && (
        <section className="relative overflow-hidden border-b border-cream-200 bg-cream-100">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:py-24">
            <p className="eyebrow animate-fade-up">Anika Kit Store · E-Catalogue</p>
            <h1 className="mt-4 animate-fade-up font-display text-3xl font-semibold leading-tight text-brand-800 sm:text-5xl" style={{ animationDelay: '60ms' }}>
              Thoughtful finds for gifting, play &amp; everyday living
            </h1>
            <p className="mx-auto mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-stone-600 sm:text-lg" style={{ animationDelay: '120ms' }}>
              Browse our curated range of kids&apos; gifts, toys, lunch boxes, sippers, hair
              accessories, storage organizers, festive picks and more.
            </p>
          </div>
        </section>
      )}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Search */}
        <div className="mb-12 sm:mb-16">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isSearching}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {error && (
          <div
            role="alert"
            className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {/* Search results */}
        {searchResults && (
          <section className="mb-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Search</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-brand-800 sm:text-3xl">
                  {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for “{searchTerm}”
                </h2>
              </div>
              <button onClick={clearSearch} className="btn-secondary text-sm">
                Clear search
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                {searchResults.map((product, index) => (
                  <ItemCard
                    key={product._id}
                    to={`/product/${product.slug}`}
                    imageUrl={product.image?.url || product.images?.[0]?.url}
                    label={product.categories?.[0]?.name || product.tag}
                    title={product.name}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="card mx-auto max-w-md px-6 py-14 text-center">
                <h3 className="font-display text-xl text-brand-800">No matches found</h3>
                <p className="mt-2 text-sm text-stone-500">
                  Try a different term, or browse the categories below.
                </p>
                <button onClick={clearSearch} className="btn-primary mt-6 text-sm">
                  Browse categories
                </button>
              </div>
            )}
          </section>
        )}

        {/* Categories */}
        {!searchResults && (
          <section id="categories" className="scroll-mt-24">
            <div className="mb-8 sm:mb-10">
              <p className="eyebrow">Browse</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-brand-800 sm:text-3xl">
                Shop by category
              </h2>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                {categories.map((category, index) => (
                  <CategoryCard key={category._id} category={category} index={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ItemCardSkeleton key={i} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

export default Homepage;
