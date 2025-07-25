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

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    isHoldingRef.current = true;
    onHold(); // İlk tıklama anında
    timerRef.current = setInterval(() => {
      if (isHoldingRef.current) onHold();
    }, intervalMs);
  };

  const handlePressEnd = () => {
    isHoldingRef.current = false;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    onClick();
  };

  return {
    onClick: handleClick,
    onMouseDown: handlePressStart,
    onMouseUp: handlePressEnd,
    onMouseLeave: handlePressEnd,
    onTouchStart: handlePressStart,
    onTouchEnd: handlePressEnd,
  };
} 