import { getStatusColor, formatDate } from '../utils/statusColors';

describe('Utility Functions', () => {
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

    test('handles different date formats', () => {
      const dateString = '2024-12-25T10:30:00Z';
      const formatted = formatDate(dateString);
      expect(formatted).toBe('Dec 25, 2024');
    });
  });
});