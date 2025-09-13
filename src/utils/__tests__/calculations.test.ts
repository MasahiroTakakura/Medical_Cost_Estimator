import { calculateCapUnder70, calculateCapOver70, calculateMedicalCost } from '../calculations';
import { formatYen } from '../formatters';
import { FormState } from '../../types';

describe('calculations', () => {
  describe('calculateCapUnder70', () => {
    it('should calculate cap for income group A without multiple hits', () => {
      const result = calculateCapUnder70('A', 1000000, false);
      expect(result).toBe(252600 + (1000000 - 842000) * 0.01);
    });

    it('should calculate cap for income group A with multiple hits', () => {
      const result = calculateCapUnder70('A', 1000000, true);
      expect(result).toBe(140100);
    });

    it('should calculate cap for income group E without multiple hits', () => {
      const result = calculateCapUnder70('E', 100000, false);
      expect(result).toBe(35400);
    });

    it('should calculate cap for income group E with multiple hits', () => {
      const result = calculateCapUnder70('E', 100000, true);
      expect(result).toBe(24600);
    });
  });

  describe('calculateCapOver70', () => {
    it('should calculate cap for ACTIVE_III in outpatient mode (70-74)', () => {
      const result = calculateCapOver70('ACTIVE_III', 1000000, false, 'outpatient', 'OVER_70_74');
      expect(result).toBe(252600 + (1000000 - 842000) * 0.01);
    });

    it('should calculate cap for GENERAL in outpatient mode (70-74)', () => {
      const result = calculateCapOver70('GENERAL', 100000, false, 'outpatient', 'OVER_70_74');
      expect(result).toBe(18000);
    });

    it('should calculate cap for GENERAL in household mode (70-74)', () => {
      const result = calculateCapOver70('GENERAL', 100000, false, 'household', 'OVER_70_74');
      expect(result).toBe(57600);
    });

    it('should calculate cap for GENERAL in outpatient mode (75+)', () => {
      const result = calculateCapOver70('GENERAL', 100000, false, 'outpatient', 'OVER_75');
      expect(result).toBe(8000);
    });

    it('should calculate cap for GENERAL in household mode (75+)', () => {
      const result = calculateCapOver70('GENERAL', 100000, false, 'household', 'OVER_75');
      expect(result).toBe(15000);
    });

    it('should calculate cap for LOW_II in outpatient mode (70-74)', () => {
      const result = calculateCapOver70('LOW_II', 100000, false, 'outpatient', 'OVER_70_74');
      expect(result).toBe(8000);
    });

    it('should calculate cap for LOW_II in household mode (70-74)', () => {
      const result = calculateCapOver70('LOW_II', 100000, false, 'household', 'OVER_70_74');
      expect(result).toBe(24600);
    });

    it('should calculate cap for LOW_II in outpatient mode (75+)', () => {
      const result = calculateCapOver70('LOW_II', 100000, false, 'outpatient', 'OVER_75');
      expect(result).toBe(8000);
    });

    it('should calculate cap for LOW_II in household mode (75+)', () => {
      const result = calculateCapOver70('LOW_II', 100000, false, 'household', 'OVER_75');
      expect(result).toBe(15000);
    });
  });

  describe('calculateMedicalCost', () => {
    const baseFormState: FormState = {
      ageGroup: 'UNDER_70',
      under70IncomeLevel: 'C',
      over70IncomeLevel: 'GENERAL',
      o70Mode: 'household',
      medicalCost: 300000,
      multiCount: 0,
      roomPlan: 'none',
      roomDays: 0,
      mealPlan: 'general',
      mealRate: 510,
      mealCount: 0,
    };

    it('should calculate basic medical cost for under 70', () => {
      const result = calculateMedicalCost(baseFormState);
      expect(result.rawCopay).toBe(90000); // 300000 * 0.3
      expect(result.payableMedical).toBe(80430); // min(90000, 80100 + (300000-267000)*0.01)
      expect(result.totalPayable).toBe(80430);
    });

    it('should calculate medical cost with room and meal costs', () => {
      const formState = {
        ...baseFormState,
        roomPlan: 'A',
        roomDays: 5,
        mealCount: 10,
      };
      const result = calculateMedicalCost(formState);
      expect(result.roomTotal).toBe(14300 * 5); // 71500
      expect(result.mealTotal).toBe(510 * 10); // 5100
      expect(result.totalPayable).toBe(80430 + 71500 + 5100); // 80430 + 71500 + 5100 = 157030
    });

    it('should handle multiple hits correctly', () => {
      const formState = {
        ...baseFormState,
        multiCount: 4, // 4回目以降
      };
      const result = calculateMedicalCost(formState);
      expect(result.isMultiple).toBe(true);
      expect(result.payableMedical).toBe(44400); // 多数回該当の上限
    });
  });

  describe('formatYen', () => {
    it('should format numbers with Japanese locale', () => {
      expect(formatYen(1234567)).toBe('1,234,567');
      expect(formatYen(1000)).toBe('1,000');
      expect(formatYen(0)).toBe('0');
    });
  });
});
