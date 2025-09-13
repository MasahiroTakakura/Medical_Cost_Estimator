/**
 * アプリケーション全体で使用される定数
 */

// 多数回該当のしきい値
export const MULTI_HIT_THRESHOLD = 3;

// 数値の制限値
export const LIMITS = {
  MEDICAL_COST: {
    MIN: 0,
    MAX: 10000000, // 1000万円
  },
  MULTI_COUNT: {
    MIN: 0,
    MAX: 12,
  },
  ROOM_DAYS: {
    MIN: 0,
    MAX: 31,
  },
  MEAL_RATE: {
    MIN: 0,
    MAX: 10000,
  },
  MEAL_COUNT: {
    MIN: 0,
    MAX: 100,
  },
} as const;

// デフォルト値
export const DEFAULTS = {
  MEDICAL_COST: 300000,
  MULTI_COUNT: 0,
  ROOM_DAYS: 0,
  MEAL_RATE: 510,
  MEAL_COUNT: 0,
  ROOM_PLAN: "none",
  MEAL_PLAN: "general",
} as const;
