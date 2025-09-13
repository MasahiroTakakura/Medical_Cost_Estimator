import { validateForm, hasValidationErrors } from '../validation';
import { FormState } from '../../types';

describe('validation', () => {
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

  describe('validateForm', () => {
    it('should return no errors for valid form', () => {
      const errors = validateForm(baseFormState);
      expect(errors).toEqual({});
    });

    it('should validate medical cost', () => {
      const formState = { ...baseFormState, medicalCost: -100 };
      const errors = validateForm(formState);
      expect(errors.medicalCost).toBe('医療費は0円以上で入力してください');

      const formState2 = { ...baseFormState, medicalCost: 10000001 };
      const errors2 = validateForm(formState2);
      expect(errors2.medicalCost).toBe('医療費は10,000,000円以下で入力してください');
    });

    it('should validate multi count', () => {
      const formState = { ...baseFormState, multiCount: -1 };
      const errors = validateForm(formState);
      expect(errors.multiCount).toBe('回数は0回以上で入力してください');

      const formState2 = { ...baseFormState, multiCount: 13 };
      const errors2 = validateForm(formState2);
      expect(errors2.multiCount).toBe('回数は12回以下で入力してください');
    });

    it('should validate room days', () => {
      const formState = { ...baseFormState, roomDays: -1 };
      const errors = validateForm(formState);
      expect(errors.roomDays).toBe('利用日数は0日以上で入力してください');

      const formState2 = { ...baseFormState, roomDays: 32 };
      const errors2 = validateForm(formState2);
      expect(errors2.roomDays).toBe('利用日数は31日以下で入力してください');
    });

    it('should validate meal rate', () => {
      const formState = { ...baseFormState, mealRate: -1 };
      const errors = validateForm(formState);
      expect(errors.mealRate).toBe('単価は0円以上で入力してください');

      const formState2 = { ...baseFormState, mealRate: 10001 };
      const errors2 = validateForm(formState2);
      expect(errors2.mealRate).toBe('単価は10,000円以下で入力してください');
    });

    it('should validate meal count', () => {
      const formState = { ...baseFormState, mealCount: -1 };
      const errors = validateForm(formState);
      expect(errors.mealCount).toBe('食数は0食以上で入力してください');

      const formState2 = { ...baseFormState, mealCount: 101 };
      const errors2 = validateForm(formState2);
      expect(errors2.mealCount).toBe('食数は100食以下で入力してください');
    });
  });

  describe('hasValidationErrors', () => {
    it('should return false for empty errors', () => {
      expect(hasValidationErrors({})).toBe(false);
    });

    it('should return true for errors', () => {
      expect(hasValidationErrors({ medicalCost: 'error' })).toBe(true);
    });
  });
});
