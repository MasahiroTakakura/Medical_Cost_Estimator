import React from 'react';
import { Under70IncomeLevel, Over70IncomeLevel, AgeGroup } from '../../types';
import { 
  UNDER_70_INCOME_KEYS,
  UNDER_70_INCOME_LEVELS,
  OVER_70_INCOME_KEYS,
  OVER_70_INCOME_LEVELS
} from '../../constants';

interface IncomeLevelSelectorProps {
  ageGroup: AgeGroup;
  under70Value: Under70IncomeLevel;
  over70Value: Over70IncomeLevel;
  onChange: (incomeLevel: Under70IncomeLevel | Over70IncomeLevel) => void;
}

export function IncomeLevelSelector({ 
  ageGroup, 
  under70Value, 
  over70Value, 
  onChange 
}: IncomeLevelSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        所得区分 <span className="text-red-500">*</span>
      </label>
      {ageGroup === "UNDER_70" ? (
        <select
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={under70Value}
          onChange={(e) => onChange(e.target.value as Under70IncomeLevel)}
        >
          {UNDER_70_INCOME_KEYS.map((key) => (
            <option key={key} value={key}>
              {UNDER_70_INCOME_LEVELS[key]}
            </option>
          ))}
        </select>
      ) : (
        <select
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={over70Value}
          onChange={(e) => onChange(e.target.value as Over70IncomeLevel)}
        >
          {OVER_70_INCOME_KEYS.map((key) => (
            <option key={key} value={key}>
              {OVER_70_INCOME_LEVELS[key]}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
