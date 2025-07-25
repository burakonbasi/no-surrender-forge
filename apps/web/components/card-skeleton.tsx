export function CardSkeleton() {
  return (
    <div className="bg-gradient-to-b from-[#0A0A0F] to-[#1A1A2E] rounded-3xl p-4 aspect-[1/1.2] min-h-[200px] relative flex flex-col justify-between animate-pulse">
      {/* Seviye Rozeti Skeleton */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/10 rounded-lg px-3 py-1.5 min-w-[56px] h-6" />
      </div>
      {/* Silah Görseli Skeleton */}
      <div className="h-[45%] flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#23222B] to-[#18162A] mb-3 drop-shadow-xl" />
      {/* İçerik Skeleton */}
      <div className="text-center flex flex-col items-center">
        {/* Başlık */}
        <div className="h-4 bg-white/10 rounded w-3/4 mb-1" />
        {/* Açıklama */}
        <div className="h-3 bg-white/10 rounded w-full mb-1" />
        <div className="h-3 bg-white/10 rounded w-5/6 mb-3" />
        {/* Büyük Yüzde Skeleton (progress yerine) */}
        <div className="w-16 h-10 bg-white/10 rounded-xl mb-3" />
        {/* Buton Skeleton */}
        <div className="h-12 bg-white/10 rounded-full w-full mt-1" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 px-2 pb-10">
      {[...Array(count)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}