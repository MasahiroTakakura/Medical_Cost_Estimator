import React from 'react';
import { AgeGroup } from '../../types';
import { AGE_GROUPS } from '../../constants';

interface AgeGroupSelectorProps {
  value: AgeGroup;
  onChange: (ageGroup: AgeGroup) => void;
}

export function AgeGroupSelector({ value, onChange }: AgeGroupSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        年齢区分 <span className="text-red-500">*</span>
      </label>
      <select
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value as AgeGroup)}
      >
        <option value="UNDER_70">70歳未満</option>
        <option value="OVER_70_74">70～74歳</option>
        <option value="OVER_75">75歳以上</option>
      </select>
    </div>
  );
}
