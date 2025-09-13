import { formatYen, formatPercentage, formatNumber } from '../formatters';

describe('formatters', () => {
  describe('formatYen', () => {
    it('should format positive numbers correctly', () => {
      expect(formatYen(1000)).toBe('¥1,000');
      expect(formatYen(1000000)).toBe('¥1,000,000');
    });

    it('should format zero correctly', () => {
      expect(formatYen(0)).toBe('¥0');
    });

    it('should format negative numbers correctly', () => {
      expect(formatYen(-1000)).toBe('-¥1,000');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentages correctly', () => {
      expect(formatPercentage(0.1)).toBe('10.0%');
      expect(formatPercentage(0.3)).toBe('30.0%');
      expect(formatPercentage(0.25, 2)).toBe('25.00%');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
    });
  });
});
