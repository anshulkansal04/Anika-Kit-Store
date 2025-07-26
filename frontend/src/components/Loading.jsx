const Loading = ({ size = 'default', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}></div>
      </div>
      {text && (
        <p className="mt-4 text-sm text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
};

export default Loading; 