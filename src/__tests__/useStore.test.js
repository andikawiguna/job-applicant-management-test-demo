import { renderHook, act } from '@testing-library/react';
import { useStore } from '../store/useStore';

describe('useStore', () => {
  test('has correct initial state', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.sidebarOpen).toBe(true);
    expect(result.current.activePage).toBe('home');
    expect(result.current.darkMode).toBe(false);
    expect(result.current.currentPage).toEqual({ list: 1, table: 1 });
  });

  test('toggles sidebar correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.sidebarOpen).toBe(false);

    act(() => {
      result.current.toggleSidebar();
    });

    expect(result.current.sidebarOpen).toBe(true);
  });

  test('toggles dark mode correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.darkMode).toBe(true);

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.darkMode).toBe(false);
  });

  test('sets current page correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setCurrentPage('list', 3);
    });

    expect(result.current.currentPage.list).toBe(3);
    expect(result.current.currentPage.table).toBe(1); // unchanged

    act(() => {
      result.current.setCurrentPage('table', 5);
    });

    expect(result.current.currentPage.list).toBe(3); // unchanged
    expect(result.current.currentPage.table).toBe(5);
  });

  test('sets active page correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setActivePage('list');
    });

    expect(result.current.activePage).toBe('list');
  });
});