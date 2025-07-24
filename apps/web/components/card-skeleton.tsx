export function CardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2E] rounded-3xl p-5 aspect-[1/1.2] animate-pulse">
      {/* Image Skeleton */}
      <div className="h-[45%] bg-white/5 rounded-xl mb-3" />
      
      {/* Title */}
      <div className="h-4 bg-white/5 rounded w-3/4 mx-auto mb-2" />
      
      {/* Description */}
      <div className="h-3 bg-white/5 rounded w-full mb-1" />
      <div className="h-3 bg-white/5 rounded w-5/6 mx-auto mb-3" />
      
      {/* Progress */}
      <div className="h-8 bg-white/5 rounded w-1/3 mx-auto mb-3" />
      
      {/* Button */}
      <div className="h-12 bg-white/5 rounded-full" />
    </div>
  );
}

export function CardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[...Array(count)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}