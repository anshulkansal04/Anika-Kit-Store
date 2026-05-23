import { useState, useEffect } from 'react';

/**
 * ImageContainer — Ensures images are contained within a consistent aspect ratio
 * without stretching or cropping. Includes a fade-in effect on load.
 *
 * @param {string} src - Image URL
 * @param {string} alt - Alt text
 * @param {string} className - Additional classes for the wrapper
 * @param {string} imgClassName - Additional classes for the image itself
 * @param {string} aspectRatio - CSS aspect ratio (default: 'square')
 */
const ImageContainer = ({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  aspectRatio = 'square',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset states if src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div
      className={`relative bg-surface-warm overflow-hidden flex items-center justify-center p-4 aspect-${aspectRatio} ${className}`}
    >
      {/* Loading Skeleton / Background */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 shimmer-loader" />
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 p-4 text-center">
          <svg className="w-8 h-8 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-caption">Image unavailable</span>
        </div>
      )}

      {/* Actual Image */}
      {src && !error && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-contain mix-blend-multiply transition-opacity duration-300 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default ImageContainer;
