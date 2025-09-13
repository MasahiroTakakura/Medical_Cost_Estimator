import { ValidationErrors, FormState } from '../types';

/**
 * 入力値のバリデーション
 */
export function validateForm(formState: FormState): ValidationErrors {
  const errors: ValidationErrors = {};
  
  // 医療費のバリデーション
  if (formState.medicalCost < 0) {
    errors.medicalCost = "医療費は0円以上で入力してください";
  } else if (formState.medicalCost > 10000000) {
    errors.medicalCost = "医療費は10,000,000円以下で入力してください";
  }
  
  // 多数回該当回数のバリデーション
  if (formState.multiCount < 0) {
    errors.multiCount = "回数は0回以上で入力してください";
  } else if (formState.multiCount > 12) {
    errors.multiCount = "回数は12回以下で入力してください";
  }
  
  // 個室利用日数のバリデーション
  if (formState.roomDays < 0) {
    errors.roomDays = "利用日数は0日以上で入力してください";
  } else if (formState.roomDays > 31) {
    errors.roomDays = "利用日数は31日以下で入力してください";
  }
  
  // 食事単価のバリデーション
  if (formState.mealRate < 0) {
    errors.mealRate = "単価は0円以上で入力してください";
  } else if (formState.mealRate > 10000) {
    errors.mealRate = "単価は10,000円以下で入力してください";
  }
  
  // 食事回数のバリデーション
  if (formState.mealCount < 0) {
    errors.mealCount = "食数は0食以上で入力してください";
  } else if (formState.mealCount > 100) {
    errors.mealCount = "食数は100食以下で入力してください";
  }
  
  return errors;
}

/**
 * エラーメッセージがあるかチェック
 */
export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
