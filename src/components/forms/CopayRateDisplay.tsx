import React from 'react';

interface CopayRateDisplayProps {
  copayRate: number;
}

export function CopayRateDisplay({ copayRate }: CopayRateDisplayProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        負担割合（自動計算）
      </label>
      <div className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50">
        <span className="text-lg font-semibold text-blue-600">
          {Math.round(copayRate * 10)}割
        </span>
        <p className="text-xs text-gray-500 mt-1">
          ※ 年齢・所得区分により自動的に決定されます。
        </p>
      </div>
    </div>
  );
}
