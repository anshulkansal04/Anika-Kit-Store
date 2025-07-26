import { SparklesIcon, GiftIcon } from '@heroicons/react/24/outline';

const Loading = ({ size = 'default', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    default: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    default: 'text-lg',
    large: 'text-xl'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-50 to-primary-50">
      <div className="text-center animate-fade-in">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 opacity-20"></div>
            <div className="relative p-4 bg-white rounded-full shadow-soft">
              <GiftIcon className={`${sizeClasses[size]} text-primary-500 animate-bounce-gentle`} />
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-2 mb-6">
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-bounce"
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className={`font-semibold text-gray-900 ${textSizeClasses[size]}`}>
            {text}
          </h2>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <SparklesIcon className="h-4 w-4 text-primary-400 animate-pulse" />
            <span>Please wait while we prepare something amazing for you</span>
            <SparklesIcon className="h-4 w-4 text-secondary-400 animate-pulse" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-white rounded-full shadow-soft p-1">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-6 text-xs text-gray-500 italic">
          Bringing you the best from Anika Kit Store...
        </div>
      </div>
    </div>
  );
};

export default Loading; 