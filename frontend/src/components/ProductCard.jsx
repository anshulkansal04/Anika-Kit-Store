import { Link } from 'react-router-dom';
import { HeartIcon, SparklesIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { _id, name, image, tag, slug } = product;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // In a real app, this would save to user's wishlist
  };

  return (
    <div className="group card card-hover animate-fade-in">
      <Link to={`/product/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gradient-to-br from-warm-100 to-primary-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          )}
          
          <img
            src={image.url}
            alt={name}
            className={`h-64 w-full object-cover object-center transition-all duration-500 ${
              imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 transform hover:scale-110 ${
                isWishlisted 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
            >
              {isWishlisted ? (
                <HeartSolidIcon className="h-4 w-4" />
              ) : (
                <HeartIcon className="h-4 w-4" />
              )}
            </button>
            
            <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-primary-500 transition-all duration-200 transform hover:scale-110">
              <EyeIcon className="h-4 w-4" />
            </button>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 border border-white/50">
              <SparklesIcon className="h-3 w-3 mr-1 text-primary-500" />
              {tag}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 mb-3">
            {name}
          </h3>
          
          {/* Tags and Category */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent-100 to-secondary-100 text-accent-700 capitalize">
              {tag}
            </span>
            
            {/* Price placeholder - you can add actual price if available */}
            <div className="text-sm text-gray-500">
              View Details
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
              Click to explore
            </div>
            
            <div className="flex items-center text-primary-600 group-hover:text-primary-800 font-medium text-sm transition-all">
              <span className="mr-1">View</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 