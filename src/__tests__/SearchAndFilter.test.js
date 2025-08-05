import { getStatusColor, formatDate } from '../utils/statusColors';

// Simple tests for search and filter utilities
describe('SearchAndFilter Utilities', () => {
  test('getStatusColor returns correct colors', () => {
    expect(getStatusColor('new')).toBe('info');
    expect(getStatusColor('processed')).toBe('warning');
    expect(getStatusColor('rejected')).toBe('error');
    expect(getStatusColor('hired')).toBe('success');
  });

  test('formatDate formats dates correctly', () => {
    const dateString = '2024-01-15';
    const formatted = formatDate(dateString);
    expect(formatted).toBe('Jan 15, 2024');
  });
});