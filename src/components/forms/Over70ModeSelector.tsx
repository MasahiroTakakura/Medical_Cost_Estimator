import React from 'react';
import { Over70Mode } from '../../types';
import { OVER_70_MODE_OPTIONS } from '../../constants';

interface Over70ModeSelectorProps {
  value: Over70Mode;
  onChange: (mode: Over70Mode) => void;
}

export function Over70ModeSelector({ value, onChange }: Over70ModeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        計算モード（70歳以上） <span className="text-red-500">*</span>
      </label>
      <select
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value as Over70Mode)}
      >
        {OVER_70_MODE_OPTIONS.map((mode) => (
          <option key={mode.value} value={mode.value}>
            {mode.label}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-1">
        ※ 外来のみ（個人）：個人上限。世帯：入院含む世帯合算の上限。
      </p>
    </div>
  );
}
