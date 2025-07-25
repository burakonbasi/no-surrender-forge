'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EnergyBar } from '@components/energy-bar';
import { TabFilter } from '@components/tab-filter';
import { CardGrid } from '@components/card-grid';
import { useGameStore } from '@store/game-store';
import { apiClient } from '@lib/api-client';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const { fetchCards, fetchEnergy } = useGameStore();

  useEffect(() => {
    // Auth kontrolü
    if (!apiClient.getToken()) {
      router.push('/login');
      return;
    }

    // Initial data fetch
    fetchCards();
    fetchEnergy();

    // Periodic refresh
    const interval = setInterval(() => {
      fetchEnergy();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchCards, fetchEnergy, router]);

  return (
    <main className="min-h-screen bg-[#0F0E13]">
      {/* Header */}
      <div className="bg-[#0F0E13] border-b border-[#1A1922] sticky top-0 z-20">
        <div className="max-w-[390px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="text-[#5A596B] p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div>
                <h1 className="text-white text-base font-semibold">No Surrender Forge</h1>
                <p className="text-[#5A596B] text-xs">Bot</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link 
                href="/items"
                className="p-2 text-[#5A596B] hover:text-white transition-colors"
                title="Tüm Ürünler"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
                <span className="text-xs">All Items</span>
              </Link>
              <button className="p-2 text-[#5A596B]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[420px] mx-auto px-4 py-4">
        {/* Energy Bar */}
        <EnergyBar />
        
        {/* Tab Filter */}
        <TabFilter />
        
        {/* Card Grid */}
        <CardGrid />
      </div>

      {/* Bottom Safe Area */}
      <div className="h-20" />
    </main>
  );
}