const Loading = ({ size = 'default', text = 'Loading...' }) => {
  const spinnerSizeClasses = {
    small: 'h-6 w-6 border-2',
    default: 'h-9 w-9 border-2',
    large: 'h-12 w-12 border-[3px]'
  };

  const wordmarkSizeClasses = {
    small: 'text-lg',
    default: 'text-2xl',
    large: 'text-3xl'
  };

  const textSizeClasses = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base'
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen flex items-center justify-center bg-cream-50 px-6"
    >
      <div className="flex flex-col items-center text-center animate-fade-in">
        <span className={`font-display text-brand-800 tracking-tight mb-8 ${wordmarkSizeClasses[size]}`}>
          Anika Kit Store
        </span>

        <span
          aria-hidden="true"
          className={`inline-block rounded-full border-cream-200 border-b-brand-700 animate-spin ${spinnerSizeClasses[size]}`}
          style={{ animationDuration: '700ms' }}
        />

        <p className={`mt-6 text-stone-600 ${textSizeClasses[size]}`}>
          {text}
        </p>

        <span className="sr-only">{text}</span>
      </div>
    </div>
  );
};

export default Loading;
