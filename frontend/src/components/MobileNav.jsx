import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Squares2X2Icon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import {
  Squares2X2Icon as Squares2X2Solid,
  ArchiveBoxIcon as ArchiveBoxSolid,
} from '@heroicons/react/24/solid';

const CompassIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M15.8 8.2l-1.9 5.7-5.7 1.9 1.9-5.7 5.7-1.9z" strokeLinejoin="round" />
  </svg>
);

const CompassSolid = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zm4.06 5.2a.75.75 0 00-.95-.95l-4.8 1.6a.75.75 0 00-.47.47l-1.6 4.8a.75.75 0 00.95.95l4.8-1.6a.75.75 0 00.47-.47l1.6-4.8zM12 11a1 1 0 100 2 1 1 0 000-2z"
      clipRule="evenodd"
    />
  </svg>
);

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, hash } = location;

  const isDiscovery = pathname === '/' && hash !== '#categories';
  const isCategories = pathname.startsWith('/category') || hash === '#categories';
  const isProducts = pathname.startsWith('/product');

  const handleCategories = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('categories');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', '/#categories');
      }
    } else {
      e.preventDefault();
      navigate('/#categories');
    }
  };

  const items = [
    {
      key: 'discovery',
      label: 'Discovery',
      to: '/',
      active: isDiscovery,
      Icon: CompassIcon,
      ActiveIcon: CompassSolid,
    },
    {
      key: 'categories',
      label: 'Categories',
      to: '/#categories',
      active: isCategories,
      onClick: handleCategories,
      Icon: Squares2X2Icon,
      ActiveIcon: Squares2X2Solid,
    },
    {
      key: 'products',
      label: 'Products',
      to: '/products',
      active: isProducts,
      Icon: ArchiveBoxIcon,
      ActiveIcon: ArchiveBoxSolid,
    },
  ];

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed inset-x-0 bottom-0 z-50 flex items-stretch justify-around gap-1 rounded-t-3xl border-t border-cream-200 bg-white/95 px-2 pt-2 shadow-nav backdrop-blur-md"
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
    >
      {items.map(({ key, label, to, active, onClick, Icon, ActiveIcon }) => {
        const Glyph = active ? ActiveIcon : Icon;
        return (
          <Link
            key={key}
            to={to}
            onClick={onClick}
            aria-current={active ? 'page' : undefined}
            className={`group flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition-colors duration-200 ease-out-quart active:scale-[0.96] ${
              active ? 'text-brand-700' : 'text-stone-500 hover:text-brand-700'
            }`}
          >
            <span
              className={`flex h-8 w-12 items-center justify-center rounded-full transition-colors duration-200 ${
                active ? 'bg-brand-50' : 'bg-transparent'
              }`}
            >
              <Glyph className="h-6 w-6" />
            </span>
            <span className={`text-[11px] leading-none ${active ? 'font-semibold' : 'font-medium'}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
