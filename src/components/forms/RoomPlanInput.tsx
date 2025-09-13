import React from 'react';
import { ValidationErrors } from '../../types';
import { ROOM_PLANS } from '../../constants';

interface RoomPlanInputProps {
  roomPlan: string;
  roomDays: number;
  onRoomPlanChange: (plan: string) => void;
  onRoomDaysChange: (days: number) => void;
  errors: ValidationErrors;
}

export function RoomPlanInput({ 
  roomPlan, 
  roomDays, 
  onRoomPlanChange, 
  onRoomDaysChange, 
  errors 
}: RoomPlanInputProps) {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">特別療養環境室料（任意）</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">種別</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={roomPlan}
            onChange={(e) => onRoomPlanChange(e.target.value)}
          >
            {ROOM_PLANS.map((plan) => (
              <option key={plan.value} value={plan.value}>
                {plan.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">利用日数（日）</label>
          <input
            type="number"
            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.roomDays ? 'border-red-500' : 'border-gray-300'
            }`}
            min={0}
            max={31}
            value={roomDays}
            onChange={(e) => onRoomDaysChange(parseInt(e.target.value || "0", 10))}
            placeholder="例: 0"
          />
          {errors.roomDays && (
            <span className="text-red-500 text-xs mt-1 block">{errors.roomDays}</span>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        ※ 有料個室は高額療養費の対象外（全額自己負担）です。
      </p>
    </div>
  );
}
