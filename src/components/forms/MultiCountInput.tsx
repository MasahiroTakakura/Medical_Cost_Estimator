import React from 'react';
import { ValidationErrors } from '../../types';

interface MultiCountInputProps {
  value: number;
  onChange: (value: number) => void;
  errors: ValidationErrors;
}

export function MultiCountInput({ value, onChange, errors }: MultiCountInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        直近12か月の高額療養費 支給回数
      </label>
      <input
        type="number"
        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          errors.multiCount ? 'border-red-500' : 'border-gray-300'
        }`}
        value={value}
        min={0}
        max={12}
        onChange={(e) => onChange(parseInt(e.target.value || "0", 10))}
        placeholder="例: 0"
      />
      {errors.multiCount && (
        <span className="text-red-500 text-xs mt-1 block">{errors.multiCount}</span>
      )}
      <p className="text-xs text-gray-500 mt-1">
        ※ 3回以上ある場合は、今回（4回目以降）「多数回該当」で軽減されます。
      </p>
    </div>
  );
}
