import React from 'react';
import { useMedicalCostForm } from '../hooks/useMedicalCostForm';
import { AgeGroupSelector } from './forms/AgeGroupSelector';
import { IncomeLevelSelector } from './forms/IncomeLevelSelector';
import { CopayRateDisplay } from './forms/CopayRateDisplay';
import { MedicalCostInput } from './forms/MedicalCostInput';
import { MultiCountInput } from './forms/MultiCountInput';
import { Over70ModeSelector } from './forms/Over70ModeSelector';
import { RoomPlanInput } from './forms/RoomPlanInput';
import { MealPlanInput } from './forms/MealPlanInput';
import { CalculationResultDisplay } from './results/CalculationResult';
import { LimitTable } from './results/LimitTable';
import { UNDER_70_INCOME_LEVELS, OVER_70_INCOME_LEVELS } from '../constants';

/**
 * 高額療養費の月額上限を用いた概算ツール（令和4年10月～基準）
 * - 入力：年齢区分、所得区分、医療費総額、外来/世帯（70歳以上のみ）、多数回該当 回数
 * - 出力：自己負担の概算額（= min(医療費×負担割合, 上限額)）と詳細内訳
 *
 * 注意：本ツールは概算です。実際の請求・支給は保険種別や標準報酬月額・旧ただし書き所得、
 * 入院食事療養費/生活療養費、対象外費用、限度額適用認定証の有無、月の計算単位、世帯合算等により異なります。
 */
export default function MedicalCostEstimator() {
  const {
    formState,
    validationErrors,
    calculationResult,
    currentIncomeLevel,
    copayRate,
    updateFormState,
    handleAgeGroupChange,
    handleIncomeLevelChange,
  } = useMedicalCostForm();

  // 所得区分のラベル取得
  const incomeLabel = React.useMemo(() => {
    if (formState.ageGroup === "UNDER_70") {
      const key = formState.under70IncomeLevel || "C";
      return UNDER_70_INCOME_LEVELS[key];
    } else {
      const key = formState.over70IncomeLevel || "GENERAL";
      return OVER_70_INCOME_LEVELS[key];
    }
  }, [formState.ageGroup, formState.under70IncomeLevel, formState.over70IncomeLevel]);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
            高額療養費・自己負担 概算ツール（試作）
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            令和4年10月以降の上限表にもとづく概算です。実際の自己負担は制度要件により増減します。
            <br />
            ※有料個室・食事は上限対象外として別計上します。
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 左：入力フォーム */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">入力</h2>

            <AgeGroupSelector
              value={formState.ageGroup}
              onChange={handleAgeGroupChange}
            />

            <IncomeLevelSelector
              ageGroup={formState.ageGroup}
              under70Value={formState.under70IncomeLevel || "C"}
              over70Value={formState.over70IncomeLevel || "GENERAL"}
              onChange={handleIncomeLevelChange}
            />

            {(formState.ageGroup === "OVER_70_74" || formState.ageGroup === "OVER_75") && (
              <Over70ModeSelector
                value={formState.o70Mode}
                onChange={(mode) => updateFormState({ o70Mode: mode })}
              />
            )}

            <CopayRateDisplay copayRate={copayRate} />

            <MedicalCostInput
              value={formState.medicalCost}
              onChange={(value) => updateFormState({ medicalCost: value })}
              errors={validationErrors}
            />

            <MultiCountInput
              value={formState.multiCount}
              onChange={(value) => updateFormState({ multiCount: value })}
              errors={validationErrors}
            />

            <RoomPlanInput
              roomPlan={formState.roomPlan}
              roomDays={formState.roomDays}
              onRoomPlanChange={(plan) => updateFormState({ roomPlan: plan })}
              onRoomDaysChange={(days) => updateFormState({ roomDays: days })}
              errors={validationErrors}
            />

            <MealPlanInput
              mealPlan={formState.mealPlan}
              mealRate={formState.mealRate}
              mealCount={formState.mealCount}
              onMealPlanChange={(plan) => updateFormState({ mealPlan: plan })}
              onMealRateChange={(rate) => updateFormState({ mealRate: rate })}
              onMealCountChange={(count) => updateFormState({ mealCount: count })}
              errors={validationErrors}
            />
          </div>

          {/* 右：計算結果 */}
          <CalculationResultDisplay
            formState={formState}
            calculationResult={calculationResult}
            incomeLabel={incomeLabel}
            copayRate={copayRate}
          />
        </div>

        {/* 区分早見表 */}
        <LimitTable />

        {/* フッター */}
        <footer className="text-xs text-gray-500 mt-8 leading-relaxed text-center">
          参考：厚労省/各保険者公表の「患者負担割合および高額療養費自己負担限度額（令和4年10月～）」等。
          <br />
          本ツールは参考用の試作アプリです。最新の通知・院内掲示に合わせて金額を調整してください。
        </footer>
      </div>
    </div>
  );
}
