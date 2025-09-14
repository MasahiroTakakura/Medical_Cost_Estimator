import React from 'react';
import { ValidationErrors } from '../../types';

interface MedicalCostInputProps {
  value: number;
  onChange: (value: number) => void;
  errors: ValidationErrors;
}

export function MedicalCostInput({ value, onChange, errors }: MedicalCostInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        当月の医療費総額（円） <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          errors.medicalCost ? 'border-red-500' : 'border-gray-300'
        }`}
        value={value === 0 ? '' : value.toString()}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (inputValue === '') {
            onChange(0);
          } else {
            const numValue = parseInt(inputValue, 10);
            if (!isNaN(numValue) && numValue >= 0) {
              onChange(numValue);
            }
          }
        }}
        placeholder="例: 300000"
      />
      {errors.medicalCost && (
        <span className="text-red-500 text-xs mt-1 block">{errors.medicalCost}</span>
      )}
    </div>
  );
}
