import { create } from 'zustand';
import { apiClient } from '@lib/api-client';
import { GAME_CONFIG } from '@no-surrender/common';

interface ClickBatch {
  cardId: string;
  clicks: number;
  timestamp: number;
}

interface GameStore {
  energy: number;
  maxEnergy: number;
  cards: any[];
  selectedTab: string;
  clickBatches: ClickBatch[];
  isLoading: boolean;
  
  // Actions
  setEnergy: (energy: number) => void;
  setCards: (cards: any[]) => void;
  setSelectedTab: (tab: string) => void;
  addClick: (cardId: string) => void;
  processBatches: () => Promise<void>;
  levelUpCard: (cardId: string) => Promise<void>;
  fetchEnergy: () => Promise<void>;
  fetchCards: () => Promise<void>;
  addSingleClick: (cardId: string) => Promise<void>;
  addBatchClick: (cardId: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  energy: 100,
  maxEnergy: GAME_CONFIG.MAX_ENERGY,
  cards: [],
  selectedTab: 'all',
  clickBatches: [],
  isLoading: false,

  setEnergy: (energy) => set({ energy }),
  
  setCards: (cards) => set({ cards }),
  
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  
  addClick: (cardId) => {
    const state = get();
    const existingBatch = state.clickBatches.find(b => b.cardId === cardId);
    
    if (existingBatch) {
      set({
        clickBatches: state.clickBatches.map(b =>
          b.cardId === cardId 
            ? { ...b, clicks: b.clicks + 1, timestamp: Date.now() }
            : b
        )
      });
    } else {
      set({
        clickBatches: [...state.clickBatches, {
          cardId,
          clicks: 1,
          timestamp: Date.now()
        }]
      });
    }
    
    // Optimistic update kaldırıldı
    // get().optimisticUpdateProgress(cardId, GAME_CONFIG.PROGRESS_STEP);
    
    // Auto-process batches after 300ms or 20 clicks
    const totalClicks = get().clickBatches.reduce((sum, b) => sum + b.clicks, 0);
    if (totalClicks >= 20) {
      get().processBatches();
    } else {
      setTimeout(() => {
        const currentBatch = get().clickBatches.find(b => b.cardId === cardId);
        if (currentBatch && Date.now() - currentBatch.timestamp >= 300) {
          get().processBatches();
        }
      }, 300);
    }
  },
  
  processBatches: async () => {
    const state = get();
    if (state.clickBatches.length === 0 || state.isLoading) return;
    
    set({ isLoading: true });
    
    try {
      const promises = state.clickBatches.map(batch =>
        apiClient.progressBatch({
          cardId: batch.cardId,
          increment: batch.clicks * GAME_CONFIG.PROGRESS_STEP
        })
      );
      
      await Promise.all(promises);
      set({ clickBatches: [] });
      
      // Refresh data
      await get().fetchCards();
      await get().fetchEnergy();
    } catch (error) {
      console.error('Batch processing error:', error);
      // Rollback on error
      await get().fetchCards();
      await get().fetchEnergy();
    } finally {
      set({ isLoading: false });
    }
  },
  
  levelUpCard: async (cardId) => {
    try {
      await apiClient.levelUp({ cardId });
      await get().fetchCards();
    } catch (error) {
      console.error('Level up error:', error);
    }
  },
  
  fetchEnergy: async () => {
    try {
      const data = await apiClient.getEnergy();
      set({ energy: data.energy, maxEnergy: data.maxEnergy });
    } catch (error) {
      console.error('Fetch energy error:', error);
    }
  },
  
  fetchCards: async () => {
    try {
      const data = await apiClient.getCards();
      set({ cards: data.cards });
    } catch (error) {
      console.error('Fetch cards error:', error);
    }
  },

  addSingleClick: async (cardId: string) => {
    const state = get();
    set({ isLoading: true });
    try {
      // increment: 1 gönder, böylece 1 enerji harcanır, 2 progress artar
      await apiClient.progressBatch({ cardId: String(cardId), increment: 1 });
      await get().fetchCards();
      await get().fetchEnergy();
    } catch (error) {
      console.error('Single click error:', error);
      await get().fetchCards();
      await get().fetchEnergy();
    } finally {
      set({ isLoading: false });
    }
  },

  addBatchClick: (cardId: string) => {
    const state = get();
    const existingBatch = state.clickBatches.find(b => b.cardId === cardId);
    if (existingBatch) {
      set({
        clickBatches: state.clickBatches.map(b =>
          b.cardId === cardId 
            ? { ...b, clicks: b.clicks + 1, timestamp: Date.now() }
            : b
        )
      });
    } else {
      set({
        clickBatches: [...state.clickBatches, {
          cardId,
          clicks: 1,
          timestamp: Date.now()
        }]
      });
    }
    // Auto-process batches after 300ms or 20 clicks
    const totalClicks = get().clickBatches.reduce((sum, b) => sum + b.clicks, 0);
    if (totalClicks >= 20) {
      get().processBatches();
    } else {
      setTimeout(() => {
        const currentBatch = get().clickBatches.find(b => b.cardId === cardId);
        if (currentBatch && Date.now() - currentBatch.timestamp >= 300) {
          get().processBatches();
        }
      }, 300);
    }
  }
}));