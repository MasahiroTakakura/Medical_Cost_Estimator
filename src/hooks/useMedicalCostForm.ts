import { useState, useEffect, useMemo } from 'react';
import { FormState, PartialFormState, ValidationErrors, AgeGroup, Under70IncomeLevel, Over70IncomeLevel, IncomeLevel } from '../types';
import { validateForm } from '../utils/validation';
import { calculateMedicalCost } from '../utils/calculations';
import { getCopayRate } from '../constants';

/**
 * 医療費計算フォームの状態管理フック
 */
export function useMedicalCostForm() {
  const [formState, setFormState] = useState<FormState>({
    ageGroup: "UNDER_70",
    under70IncomeLevel: "C",
    over70IncomeLevel: "GENERAL",
    o70Mode: "household",
    medicalCost: 300000,
    multiCount: 0,
    roomPlan: "none",
    roomDays: 0,
    mealPlan: "general",
    mealRate: 510,
    mealCount: 0,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // 計算結果
  const calculationResult = useMemo(() => {
    return calculateMedicalCost(formState);
  }, [formState]);

  // バリデーション実行
  useEffect(() => {
    const errors = validateForm(formState);
    setValidationErrors(errors);
  }, [formState]);

  // フォーム更新のヘルパー関数
  const updateFormState = (updates: PartialFormState) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  // 年齢区分変更時の所得区分リセット
  const handleAgeGroupChange = (ageGroup: AgeGroup) => {
    const updates: PartialFormState = { ageGroup };
    
    if (ageGroup === "UNDER_70") {
      updates.under70IncomeLevel = "C";
    } else {
      updates.over70IncomeLevel = "GENERAL";
    }
    
    updateFormState(updates);
  };

  // 所得区分変更
  const handleIncomeLevelChange = (incomeLevel: IncomeLevel) => {
    if (formState.ageGroup === "UNDER_70") {
      updateFormState({ under70IncomeLevel: incomeLevel as Under70IncomeLevel });
    } else {
      updateFormState({ over70IncomeLevel: incomeLevel as Over70IncomeLevel });
    }
  };

  // 現在の所得区分を取得
  const currentIncomeLevel = useMemo((): IncomeLevel => {
    return formState.ageGroup === "UNDER_70" 
      ? formState.under70IncomeLevel
      : formState.over70IncomeLevel;
  }, [formState.ageGroup, formState.under70IncomeLevel, formState.over70IncomeLevel]);

  // 負担割合を取得
  const copayRate = useMemo(() => {
    return getCopayRate(formState.ageGroup, currentIncomeLevel);
  }, [formState.ageGroup, currentIncomeLevel]);

  return {
    formState,
    validationErrors,
    calculationResult,
    currentIncomeLevel,
    copayRate,
    updateFormState,
    handleAgeGroupChange,
    handleIncomeLevelChange,
  };
}
