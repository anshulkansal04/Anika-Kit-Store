/**
 * Skeleton — Composable shimmer placeholder primitives.
 *
 * Usage:
 *   <Skeleton className="h-4 w-3/4" />
 *   <Skeleton className="h-8 w-full rounded-full" />
 *   <SkeletonCard />
 */

const Skeleton = ({ className = '' }) => (
  <div
    className={`shimmer-loader rounded ${className}`}
    aria-hidden="true"
  />
);

const SkeletonCard = () => (
  <div className="card overflow-hidden" aria-busy="true" aria-label="Loading">
    {/* Image placeholder */}
    <div className="aspect-square bg-surface-warm shimmer-loader" />
    {/* Content placeholder */}
    <div className="p-5 space-y-3">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-3/4" />
    </div>
  </div>
);

export { Skeleton, SkeletonCard };
export default Skeleton;
