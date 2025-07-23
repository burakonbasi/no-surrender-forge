'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EnergyBar } from '@/components/energy-bar';
import { TabFilter } from '@/components/tab-filter';
import { CardGrid } from '@/components/card-grid';
import { useGameStore } from '@/store/game-store';
import { apiClient } from '@/lib/api-client';
import { motion } from 'framer-motion';

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
    }, 30000); // 30 saniyede bir

    return () => clearInterval(interval);
  }, [fetchCards, fetchEnergy, router]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-pink to-peach bg-clip-text text-transparent">
          No Surrender Forge
        </h1>
        <p className="text-white/60">Silahlarını geliştir, efsane ol!</p>
      </motion.div>

      <EnergyBar />
      <TabFilter />
      <CardGrid />
    </main>
  );
}