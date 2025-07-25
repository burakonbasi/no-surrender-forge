"use client";
import { usePressAndHold } from '../lib/use-press-and-hold';
import React from 'react';

interface PressAndHoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  onHold: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function PressAndHoldButton({ onClick, onHold, disabled, children, ...props }: PressAndHoldButtonProps) {
  const pressAndHoldProps = usePressAndHold({ onClick, onHold, disabled });
  return (
    <button {...pressAndHoldProps} disabled={disabled} {...props}>
      {children}
    </button>
  );
}