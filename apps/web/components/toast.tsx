"use client";
import { useToastStore } from '../store/toast-store';

export function Toast() {
  const { message, visible } = useToastStore();
  if (!visible) return null;
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#23222B] text-white px-6 py-3 rounded-xl shadow-lg text-sm font-semibold animate-fade-in">
      {message}
    </div>
  );
} 