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
      <article className="card card-hover h-full">
        <div className="relative overflow-hidden rounded-xl m-2.5 sm:m-3 border border-cream-200 bg-cream-100 aspect-[4/5]">
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

        <div className="px-4 pb-4 pt-1.5 sm:px-5 sm:pb-5">
          {label && (
            <p className="eyebrow truncate" title={label}>
              {label}
            </p>
          )}
          <h3 className="mt-1.5 font-display text-base sm:text-lg leading-snug text-brand-700 line-clamp-2 transition-colors duration-200 group-hover:text-brand-800">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  );
};

export const ItemCardSkeleton = () => (
  <div className="card h-full" aria-hidden="true">
    <div className="m-2.5 sm:m-3 rounded-xl border border-cream-200 bg-cream-100 aspect-[4/5] animate-pulse" />
    <div className="px-4 pb-4 pt-1.5 sm:px-5 sm:pb-5">
      <div className="h-2.5 w-1/3 rounded-full bg-cream-200" />
      <div className="mt-3 h-4 w-4/5 rounded-full bg-cream-200" />
      <div className="mt-2 h-4 w-2/5 rounded-full bg-cream-200" />
    </div>
  </div>
);

export default ItemCard;
