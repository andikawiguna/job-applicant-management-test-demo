import { create } from 'zustand';

/**
 * Global state store using Zustand for reactive state management
 * Manages UI state like sidebar open/close and active page
 */
export const useStore = create((set) => ({
  // UI State
  sidebarOpen: true,
  activePage: 'home',
  
  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActivePage: (page) => set({ activePage: page }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));