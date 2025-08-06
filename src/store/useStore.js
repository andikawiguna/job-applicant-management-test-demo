import { create } from 'zustand';

/**
 * Global state store using Zustand for reactive state management
 * Manages UI state like sidebar open/close and active page
 */
export const useStore = create((set, get) => ({
  // UI State
  sidebarOpen: true,
  activePage: 'home',
  darkMode: false,
  currentPage: {
    list: 1,
    table: 1,
  },
  
  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActivePage: (page) => set({ activePage: page }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setCurrentPage: (view, page) => set((state) => ({
    currentPage: { ...state.currentPage, [view]: page }
  })),
}));