import { Link, useNavigate } from 'react-router-dom';

/**
 * Header — Shared sticky navigation bar.
 * Uses glass-panel effect, responsive layout.
 *
 * @param {boolean} showBack - If true, shows a back arrow instead of the logo (useful for deeper pages).
 */
const Header = ({ showBack = false }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-neutral-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Section: Back Button OR Logo */}
        <div className="flex items-center">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors"
              aria-label="Go back"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <Link to="/" className="flex items-center gap-2 group">
              {/* Optional: Add Logo Image Here */}
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-display font-bold text-lg shadow-ambient-low group-hover:scale-105 transition-transform ease-out-quart">
                A
              </div>
              <span className="font-display font-bold text-xl text-primary-600 hidden sm:block">
                Anika Kit Store
              </span>
            </Link>
          )}
        </div>

        {/* Center Section: Desktop Nav (Optional) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-body text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
            Home
          </Link>
          <a href="#categories" className="font-body text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
            Categories
          </a>
        </nav>

        {/* Right Section: Mobile Logo (if showing back button) or placeholder */}
        <div className="flex items-center justify-end">
          {showBack && (
            <span className="font-display font-bold text-lg text-primary-600 sm:hidden">
              Anika
            </span>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
