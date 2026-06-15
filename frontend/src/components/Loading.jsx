const ShimmerBlock = ({ className }) => (
  <div className={`relative overflow-hidden bg-cream-200/50 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-cream-200/0 via-cream-100/80 to-cream-200/0" />
  </div>
);

const CardSkeleton = ({ index = 0 }) => (
  <div
    className="card h-full !rounded-xl xs:!rounded-2xl animate-fade-up"
    style={{ animationDelay: `${index * 80}ms` }}
    aria-hidden="true"
  >
    {/* Image area */}
    <div className="m-1.5 xs:m-2.5 sm:m-3 rounded-lg xs:rounded-xl border border-cream-200 overflow-hidden aspect-[4/5]">
      <ShimmerBlock className="h-full w-full" />
    </div>
    {/* Text area */}
    <div className="px-2.5 pb-3 pt-1 xs:px-4 xs:pb-4 xs:pt-1.5 sm:px-5 sm:pb-5">
      <ShimmerBlock className="h-2 xs:h-2.5 w-1/3 rounded-full" />
      <ShimmerBlock className="mt-2 xs:mt-3 h-3.5 xs:h-4 w-4/5 rounded-full" />
      <ShimmerBlock className="mt-1.5 xs:mt-2 h-3.5 xs:h-4 w-2/5 rounded-full" />
    </div>
  </div>
);

const Loading = ({ size = 'default', text = 'Loading...' }) => {
  const cardCount = size === 'small' ? 3 : size === 'large' ? 9 : 6;

  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen bg-cream-50 px-4 sm:px-6 pt-10 pb-24 animate-fade-in"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="flex flex-col items-center mb-10">
          <ShimmerBlock className="h-3 w-32 rounded-full mb-4" />
          <ShimmerBlock className="h-7 sm:h-9 w-64 sm:w-96 rounded-lg mb-3" />
          <ShimmerBlock className="h-4 w-48 sm:w-72 rounded-full" />
        </div>

        {/* Card grid mimicking the real layout */}
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5">
          {Array.from({ length: cardCount }).map((_, i) => (
            <CardSkeleton key={i} index={i} />
          ))}
        </div>
      </div>

      {/* Floating status indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 glass-effect border rounded-full px-4 py-2 shadow-soft z-50">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
        </span>
        <span className="text-xs font-medium text-stone-500 tracking-wide">{text}</span>
      </div>

      <span className="sr-only">{text}</span>
    </div>
  );
};

export default Loading;
