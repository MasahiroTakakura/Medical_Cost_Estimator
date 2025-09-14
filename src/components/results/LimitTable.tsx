import React from 'react';

export function LimitTable() {
  return (
    <div className="mt-8 grid lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">70歳未満 上限式</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">区分ア：</span>
            <span>252,600 + (医療費−842,000)×1% ／ 多数回 140,100</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">区分イ：</span>
            <span>167,400 + (医療費−558,000)×1% ／ 多数回 93,000</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">区分ウ：</span>
            <span>80,100 + (医療費−267,000)×1% ／ 多数回 44,400</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">区分エ：</span>
            <span>57,600 ／ 多数回 44,400</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">区分オ：</span>
            <span>35,400 ／ 多数回 24,600</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">70歳以上 上限式</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">現役並みIII：</span>
            <span>252,600 + (医療費−842,000)×1% ／ 多数回 140,100</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">現役並みII：</span>
            <span>167,400 + (医療費−558,000)×1% ／ 多数回 93,000</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">現役並みI：</span>
            <span>80,100 + (医療費−267,000)×1% ／ 多数回 44,400</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">一般所得者：</span>
            <span>外来 18,000 ／ 世帯 57,600（多数回 44,400）</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">低所得者II：</span>
            <span>外来 8,000 ／ 世帯 24,600</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">低所得者I：</span>
            <span>外来 8,000 ／ 世帯 15,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
