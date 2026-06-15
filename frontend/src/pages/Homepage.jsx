import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPinIcon } from '@heroicons/react/24/outline';
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

      {/* Hero — headline + search above the fold */}
      {!searchResults && (
        <section className="relative overflow-hidden">
          {/* Decorative background */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50" />
            <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl sm:h-96 sm:w-96" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
            <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="text-center lg:col-span-7 lg:text-left">
                <p className="eyebrow animate-fade-up">Anika Kit Store</p>

                <h1
                  className="mt-4 animate-fade-up font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-brand-900 xs:text-[2.5rem] sm:text-5xl lg:text-[3.75rem]"
                  style={{ animationDelay: '60ms' }}
                >
                  A catalogue of{' '}
                  <em className="font-normal italic text-brand-700">joyful</em>{' '}
                  <span className="lg:block">everyday things.</span>
                </h1>

                <p
                  className="mx-auto mt-4 max-w-lg animate-fade-up text-[15px] leading-relaxed text-stone-500 sm:text-base lg:mx-0"
                  style={{ animationDelay: '120ms' }}
                >
                  Kids toys, organizers, jewellery, hair accessories, bottles, and
                  festive finds — thoughtfully curated so every shelf feels a little
                  more special.
                </p>

                {/* Search in hero — mobile only */}
                <div
                  className="mx-auto mt-8 max-w-lg animate-fade-up lg:hidden"
                  style={{ animationDelay: '180ms' }}
                >
                  <SearchBar
                    onSearch={handleSearch}
                    isLoading={isSearching}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                </div>
              </div>

              {/* Right: floating quick-access card (desktop only) */}
              {categories.length >= 4 && (
                <div className="hidden lg:col-span-5 lg:block">
                  <div
                    className="animate-fade-up rounded-3xl border border-white/60 bg-white/70 p-5 shadow-large backdrop-blur-xl"
                    style={{ animationDelay: '300ms' }}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {categories.slice(0, 4).map((cat, i) => (
                        <Link
                          key={cat._id}
                          to={`/category/${cat._id}`}
                          className="group flex items-center gap-3 rounded-2xl border border-cream-200 bg-cream-50/70 p-3 transition-all duration-200 ease-out-quart hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:shadow-soft"
                        >
                          {cat.image?.url ? (
                            <img
                              src={cat.image.url}
                              alt=""
                              loading="eager"
                              fetchpriority={i < 2 ? 'high' : 'auto'}
                              className="h-11 w-11 flex-shrink-0 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 font-display text-lg text-brand-700">
                              {cat.name.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="truncate font-display text-sm font-semibold text-brand-800 group-hover:text-brand-900">
                              {cat.name}
                            </p>
                            <p className="truncate text-[11px] text-stone-500">
                              {cat.productCount > 0
                                ? `${cat.productCount} ${cat.productCount === 1 ? 'item' : 'items'}`
                                : 'Explore the range'}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-cream-200 pt-4 text-xs">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary-700">
                        <MapPinIcon className="h-3.5 w-3.5" />
                        Store pickup available
                      </span>
                      <a
                        href="#categories"
                        className="font-medium text-brand-700 transition-colors hover:text-brand-800"
                      >
                        View all →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Desktop: search always visible above categories / results */}
        {/* Mobile: only when viewing search results (hero search is hidden) */}
        <div className={`mb-12 sm:mb-16 ${searchResults ? '' : 'hidden lg:block'}`}>
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
              <div className="grid grid-cols-2 gap-2.5 xs:gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
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
              <div className="grid grid-cols-2 gap-2.5 xs:gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                {categories.map((category, index) => (
                  <CategoryCard key={category._id} category={category} index={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 xs:gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
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
