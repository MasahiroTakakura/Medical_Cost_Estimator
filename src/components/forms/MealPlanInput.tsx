import React, { useEffect } from 'react';
import { ValidationErrors } from '../../types';
import { MEAL_PLANS } from '../../constants';

interface MealPlanInputProps {
  mealPlan: string;
  mealRate: number;
  mealCount: number;
  onMealPlanChange: (plan: string) => void;
  onMealRateChange: (rate: number) => void;
  onMealCountChange: (count: number) => void;
  errors: ValidationErrors;
}

export function MealPlanInput({ 
  mealPlan, 
  mealRate, 
  mealCount, 
  onMealPlanChange, 
  onMealRateChange, 
  onMealCountChange, 
  errors 
}: MealPlanInputProps) {
  // 食事プラン変更時の単価自動設定
  useEffect(() => {
    const selectedMealPlan = MEAL_PLANS.find(plan => plan.value === mealPlan);
    if (selectedMealPlan) {
      onMealRateChange(selectedMealPlan.rate);
    }
  }, [mealPlan, onMealRateChange]);

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">入院時食事療養費（患者負担）</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            区分（所得区分に応じて自動選択、必要に応じて変更可能）
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={mealPlan}
            onChange={(e) => onMealPlanChange(e.target.value)}
          >
            {MEAL_PLANS.map((plan) => (
              <option key={plan.value} value={plan.value}>
                {plan.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">単価（円/食）</label>
          <input
            type="number"
            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.mealRate ? 'border-red-500' : 'border-gray-300'
            }`}
            min={0}
            max={10000}
            value={mealRate}
            onChange={(e) => onMealRateChange(parseInt(e.target.value || "0", 10))}
            placeholder="例: 510"
          />
          {errors.mealRate && (
            <span className="text-red-500 text-xs mt-1 block">{errors.mealRate}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">食数（当月合計）</label>
          <input
            type="number"
            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.mealCount ? 'border-red-500' : 'border-gray-300'
            }`}
            min={0}
            max={100}
            value={mealCount}
            onChange={(e) => onMealCountChange(parseInt(e.target.value || "0", 10))}
            placeholder="例: 0"
          />
          {errors.mealCount && (
            <span className="text-red-500 text-xs mt-1 block">{errors.mealCount}</span>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        ※ 食事の患者負担は高額療養費の対象外です。病院の案内金額に合わせて単価は調整してください。
      </p>
    </div>
  );
}
