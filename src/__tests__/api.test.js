import { getStatusColor, formatDate } from '../utils/statusColors';

// Simple unit tests for API-related utilities
describe('API Utilities', () => {
  describe('getStatusColor', () => {
    test('returns correct colors for different statuses', () => {
      expect(getStatusColor('new')).toBe('info');
      expect(getStatusColor('processed')).toBe('warning');
      expect(getStatusColor('rejected')).toBe('error');
      expect(getStatusColor('hired')).toBe('success');
      expect(getStatusColor('unknown')).toBe('default');
    });
  });

  describe('formatDate', () => {
    test('formats date string correctly', () => {
      const dateString = '2024-01-15';
      const formatted = formatDate(dateString);
      expect(formatted).toBe('Jan 15, 2024');
    });
  });
});