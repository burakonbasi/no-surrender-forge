import clsx from 'clsx';

export function ProductCard({
  image,
  name,
  description,
  level,
  progress = 0,
  onAction,
  disabled = false,
  isUpgrade = false,
}: {
  image: string;
  name: string;
  description: string;
  level: number;
  progress?: number;
  onAction?: () => void;
  disabled?: boolean;
  isUpgrade?: boolean;
}) {
  return (
    <div className="bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2E] rounded-3xl p-5 aspect-[1/1.2] relative">
      {/* Seviye Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className={clsx(
          'rounded-lg px-3 py-1.5',
          level === 1 && 'bg-[#666]',
          level === 2 && 'bg-[#4ADE80]',
          level >= 3 && 'bg-[#FFD600]'
        )}>
          <span className="text-xs font-bold text-black">Seviye {level}</span>
        </div>
      </div>

      {/* Görsel */}
      <div className="h-[45%] relative mb-3">
        <img src={image} alt={name} className="w-full h-full object-contain drop-shadow-xl" />
      </div>

      {/* İçerik */}
      <div className="text-center">
        <h3 className="text-white font-bold text-sm mb-1">{name}</h3>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{description}</p>
        
        {/* Yüzde */}
        <div className="text-[#E0E0E0] text-3xl font-bold mb-3">
          %{isUpgrade ? 100 : progress}
        </div>
        
        {/* Buton */}
        <button
          onClick={onAction}
          disabled={disabled}
          className={clsx(
            'w-full py-3 rounded-full font-bold text-sm',
            isUpgrade && 'bg-gradient-to-r from-[#FF1E67] to-[#FF6B96] text-white',
            !isUpgrade && !disabled && 'bg-gradient-to-r from-[#FF6B1A] to-[#FF9A4D] text-white',
            disabled && 'bg-[#252430] text-[#5A596B] cursor-not-allowed'
          )}
        >
          {isUpgrade ? 'Yükselt' : 'Geliştir'}
        </button>
      </div>
    </div>
  );
}