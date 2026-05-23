import Typography from './ui/Typography';

/**
 * Loading — Minimalistic loading spinner respecting reduced motion.
 */
const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      {/* Brand Initial */}
      <div className="w-12 h-12 mb-6 rounded-full bg-surface-warm flex items-center justify-center border border-neutral-200">
        <span className="font-display font-bold text-2xl text-primary-500">A</span>
      </div>

      {/* Loading Dots */}
      <div className="flex items-center space-x-1.5 mb-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"
            style={{ animationDelay: `${i * 150}ms`, animationDuration: '1s' }}
          />
        ))}
      </div>

      {/* Loading Text */}
      <Typography variant="body-sm" color="muted">
        {text}
      </Typography>
    </div>
  );
};

export default Loading;