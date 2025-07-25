import { useRef } from 'react';

interface UsePressAndHoldProps {
  onClick: () => void;
  onHold: () => void;
  disabled?: boolean;
  intervalMs?: number;
}

export function usePressAndHold({ onClick, onHold, disabled, intervalMs = 80 }: UsePressAndHoldProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoldingRef = useRef(false);
  const pressStartTimeRef = useRef<number>(0);

  // Basılı tutma başlat
  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    isHoldingRef.current = true;
    pressStartTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      if (isHoldingRef.current) onHold();
    }, intervalMs);
  };

  // Basılı tutma bırak
  const handlePressEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (isHoldingRef.current) {
      const pressDuration = Date.now() - pressStartTimeRef.current;
      // Eğer kısa tıklama ise (ör: < 200ms), sadece onClick çalışsın
      if (pressDuration < 200) {
        onClick();
      }
    }
    isHoldingRef.current = false;
  };

  return {
    onMouseDown: handlePressStart,
    onMouseUp: handlePressEnd,
    onMouseLeave: handlePressEnd,
    onTouchStart: handlePressStart,
    onTouchEnd: handlePressEnd,
    // onClick'i DOM'a aktarma!
  };
} 