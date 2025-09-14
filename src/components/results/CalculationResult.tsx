import React from 'react';
import { FormState, CalculationResult } from '../../types';
import { AGE_GROUPS, OVER_70_MODE_OPTIONS, ROOM_PLANS } from '../../constants';
import { formatYen } from '../../utils/formatters';

interface CalculationResultProps {
  formState: FormState;
  calculationResult: CalculationResult;
  incomeLabel: string;
  copayRate: number;
}

export function CalculationResultDisplay({ 
  formState, 
  calculationResult, 
  incomeLabel, 
  copayRate 
}: CalculationResultProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 border-b pb-3">計算結果</h2>

      {/* 基本情報 */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-gray-500">年齢区分</div>
        <div className="font-medium">{AGE_GROUPS[formState.ageGroup]}</div>
        <div className="text-gray-500">所得区分</div>
        <div className="font-medium">{incomeLabel}</div>
        {(formState.ageGroup === "OVER_70_74" || formState.ageGroup === "OVER_75") && (
          <>
            <div className="text-gray-500">モード</div>
            <div className="font-medium">
              {OVER_70_MODE_OPTIONS.find((m) => m.value === formState.o70Mode)?.label}
            </div>
          </>
        )}
        <div className="text-gray-500">医療費総額</div>
        <div className="font-medium">{formatYen(formState.medicalCost)} 円</div>
        <div className="text-gray-500">自己負担（率）</div>
        <div className="font-medium">
          {Math.round(copayRate * 10)} 割（{formatYen(calculationResult.rawCopay)} 円）
        </div>
        <div className="text-gray-500">上限額</div>
        <div className="font-medium">
          {formatYen(calculationResult.cap)} 円
          {calculationResult.isMultiple && (
            <span className="ml-2 text-xs text-green-600 font-medium">多数回該当</span>
          )}
        </div>
      </div>

      {/* 詳細内訳 */}
      <div className="border-t pt-4 space-y-3">
        <h3 className="font-semibold text-gray-900">詳細内訳</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>高額療養費対象分の自己負担：</span>
            <span className="font-semibold">{formatYen(calculationResult.payableMedical)} 円</span>
          </div>
          <div className="flex justify-between">
            <span>特別療養環境室料：</span>
            <span className="font-semibold">
              {formatYen(ROOM_PLANS.find(r => r.value === formState.roomPlan)?.rate || 0)} 円/日 × {formState.roomDays} 日 = {formatYen(calculationResult.roomTotal)} 円
            </span>
          </div>
          <div className="flex justify-between">
            <span>入院食事療養費：</span>
            <span className="font-semibold">
              {formatYen(formState.mealRate)} 円/食 × {formState.mealCount} 食 = {formatYen(calculationResult.mealTotal)} 円
            </span>
          </div>
        </div>
      </div>

      {/* 合計金額 */}
      <div className="border-t pt-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 mb-1">当月の支払見込み合計</div>
          <div className="text-3xl font-bold text-blue-600">
            {formatYen(calculationResult.totalPayable)} 円
          </div>
          <p className="text-xs text-gray-500 mt-2">
            ※ 合計＝min(医療費×負担割合, 上限額) ＋ 個室料 ＋ 食事負担
            <br />
            個室・食事は高額療養費の対象外です。
          </p>
        </div>
      </div>

      {/* 注意事項 */}
      <div className="bg-blue-50 rounded-xl p-4 text-xs text-blue-900 leading-relaxed">
        <p className="font-semibold mb-2">備考・前提</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>特別療養環境室料・食事負担は任意入力です（入院がない場合は0のまま）。</li>
          <li>70歳以上の外来（個人）モードでは、一般的に個室・食事は0となります。</li>
          <li>食事区分の単価は病院掲示に合わせて編集してください（本初期値は提示資料を参考）。</li>
          <li>本ツールは概算です。実際の請求・支給は保険種別や標準報酬月額等により異なります。</li>
        </ul>
      </div>
    </div>
  );
}
