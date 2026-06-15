import { Link } from 'react-router-dom';
import { useState } from 'react';

/**
 * Editorial product / category card.
 * Calm cream image well, uppercase eyebrow label, serif title in brand green.
 *
 * Props:
 *  - to: route to navigate to
 *  - imageUrl: image source
 *  - label: small uppercase category/tag label (optional)
 *  - title: card title
 *  - priority: if true, eager-load the image (above the fold)
 *  - index: used to stagger the entrance animation (optional)
 */
const ItemCard = ({ to, imageUrl, label, title, priority = false, index = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={to}
      className="group block animate-fade-up active:scale-[0.99] transition-transform duration-200 ease-out-quart"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <article className="card card-hover h-full !rounded-xl xs:!rounded-2xl">
        <div className="relative overflow-hidden rounded-lg xs:rounded-xl m-1.5 xs:m-2.5 sm:m-3 border border-cream-200 bg-cream-100 aspect-[4/5]">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-cream-200/60" aria-hidden="true" />
          )}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              loading={priority ? 'eager' : 'lazy'}
              fetchpriority={priority ? 'high' : 'auto'}
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={`h-full w-full object-cover object-center transition-[transform,opacity] duration-500 ease-out-quart group-hover:scale-[1.04] ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-stone-300">
              <span className="font-display text-3xl">A</span>
            </div>
          )}
        </div>

        <div className="px-2.5 pb-3 pt-1 xs:px-4 xs:pb-4 xs:pt-1.5 sm:px-5 sm:pb-5">
          {label && (
            <p className="eyebrow truncate text-[10px] xs:text-[11px]" title={label}>
              {label}
            </p>
          )}
          <h3 className="mt-1 xs:mt-1.5 font-display text-[13px] xs:text-base sm:text-lg leading-snug text-brand-700 line-clamp-2 transition-colors duration-200 group-hover:text-brand-800">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  );
};

const ShimmerLine = ({ className }) => (
  <div className={`relative overflow-hidden bg-cream-200/50 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-cream-200/0 via-cream-100/80 to-cream-200/0" />
  </div>
);

export const ItemCardSkeleton = () => (
  <div className="card h-full !rounded-xl xs:!rounded-2xl" aria-hidden="true">
    <div className="m-1.5 xs:m-2.5 sm:m-3 rounded-lg xs:rounded-xl border border-cream-200 overflow-hidden aspect-[4/5]">
      <ShimmerLine className="h-full w-full" />
    </div>
    <div className="px-2.5 pb-3 pt-1 xs:px-4 xs:pb-4 xs:pt-1.5 sm:px-5 sm:pb-5">
      <ShimmerLine className="h-2 xs:h-2.5 w-1/3 rounded-full" />
      <ShimmerLine className="mt-2 xs:mt-3 h-3.5 xs:h-4 w-4/5 rounded-full" />
      <ShimmerLine className="mt-1.5 xs:mt-2 h-3.5 xs:h-4 w-2/5 rounded-full" />
    </div>
  </div>
);

export default ItemCard;
