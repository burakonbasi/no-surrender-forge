export function CardSkeleton() {
  return (
    <div className="bg-[#1C1B23] rounded-lg p-3 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-[#252430] rounded-md mb-2" />
      
      {/* Title Skeleton */}
      <div className="h-4 bg-[#252430] rounded mb-1 w-3/4" />
      
      {/* Description Skeleton */}
      <div className="h-3 bg-[#252430] rounded mb-2 w-full opacity-50" />
      
      {/* Progress Skeleton */}
      <div className="h-3 bg-[#252430] rounded mb-3 w-1/2 opacity-50" />
      
      {/* Button Skeleton */}
      <div className="h-8 bg-[#252430] rounded-md" />
    </div>
  );
}

export function CardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(count)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}