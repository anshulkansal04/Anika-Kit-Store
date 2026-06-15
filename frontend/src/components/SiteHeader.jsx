import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

/**
 * Shared sticky header.
 *  - back: show a back-to-home affordance on the logo
 *  - crumbs: optional [{ label, to }] breadcrumb; the last item renders as current page
 */
const SiteHeader = ({ back = false, crumbs = [] }) => {
  return (
    <header className="glass-effect sticky top-0 z-40 border-b">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          to="/"
          className="flex flex-shrink-0 items-center gap-2 transition-opacity duration-200 hover:opacity-80"
          aria-label="Anika Kit Store home"
        >
          {back && <ArrowLeftIcon className="h-4 w-4 text-brand-600" />}
          <img
            src="/logo.webp"
            alt=""
            width={670}
            height={670}
            className="h-8 w-auto sm:h-9"
            fetchPriority="high"
          />
          {!back && (
            <span className="font-display text-base font-semibold tracking-tight text-brand-800 sm:text-lg">
              Anika Kit Store
            </span>
          )}
        </Link>

        {crumbs.length > 0 && (
          <>
            <span className="h-5 w-px bg-cream-300" aria-hidden="true" />
            <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
              <ol className="flex items-center gap-1.5 text-sm">
                {crumbs.map((crumb, i) => {
                  const isLast = i === crumbs.length - 1;
                  return (
                    <li key={`${crumb.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
                      {i > 0 && <span className="text-cream-400" aria-hidden="true">/</span>}
                      {crumb.to && !isLast ? (
                        <Link
                          to={crumb.to}
                          className="truncate font-medium text-brand-600 transition-colors hover:text-brand-800"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span
                          className={`truncate ${isLast ? 'font-medium text-stone-700' : 'text-stone-500'}`}
                          aria-current={isLast ? 'page' : undefined}
                        >
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
