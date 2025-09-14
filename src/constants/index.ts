import { CopayRateOption, RoomPlan, MealPlan } from '../types';

// 多数回該当のしきい値
export const MULTI_HIT_THRESHOLD = 3;

// 年齢区分
export const AGE_GROUPS = {
  UNDER_70: "70歳未満",
  OVER_70_74: "70～74歳",
  OVER_75: "75歳以上",
} as const;

// 70歳未満の所得区分
export const UNDER_70_INCOME_LEVELS = {
  A: "区分ア（標準報酬月額83万円以上）",
  B: "区分イ（標準報酬月額53万～79万円）",
  C: "区分ウ（標準報酬月額28万～50万円）",
  D: "区分エ（標準報酬月額26万円以下）",
  E: "区分オ（低所得者・住民税非課税）",
} as const;

// 70歳以上の所得区分
export const OVER_70_INCOME_LEVELS = {
  ACTIVE_III: "現役並み所得者III（標準報酬月額83万円以上）",
  ACTIVE_II: "現役並み所得者II（標準報酬月額53万～79万円）",
  ACTIVE_I: "現役並み所得者I（標準報酬月額28万～50万円）",
  GENERAL: "一般所得者",
  LOW_II: "低所得者II（住民税非課税）",
  LOW_I: "低所得者I（所得なし）",
} as const;

// 所得区分のキー配列
export const UNDER_70_INCOME_KEYS = ["A", "B", "C", "D", "E"] as const;
export const OVER_70_INCOME_KEYS = ["ACTIVE_III", "ACTIVE_II", "ACTIVE_I", "GENERAL", "LOW_II", "LOW_I"] as const;

// 負担割合の計算関数
export function getCopayRate(ageGroup: string, incomeLevel: string): number {
  // 70歳未満は一律3割
  if (ageGroup === "UNDER_70") {
    return 0.3;
  }
  
  // 70～74歳
  if (ageGroup === "OVER_70_74") {
    // 現役並み所得者は3割
    if (incomeLevel === "ACTIVE_III" || incomeLevel === "ACTIVE_II" || incomeLevel === "ACTIVE_I") {
      return 0.3;
    }
    // 一般所得者は2割
    if (incomeLevel === "GENERAL") {
      return 0.2;
    }
    // 低所得者は1割
    if (incomeLevel === "LOW_II" || incomeLevel === "LOW_I") {
      return 0.1;
    }
  }
  
  // 75歳以上
  if (ageGroup === "OVER_75") {
    // 現役並み所得者は3割
    if (incomeLevel === "ACTIVE_III" || incomeLevel === "ACTIVE_II" || incomeLevel === "ACTIVE_I") {
      return 0.3;
    }
    // その他は1割
    return 0.1;
  }
  
  return 0.3; // デフォルト
}

// 70歳以上の計算モードオプション
export const OVER_70_MODE_OPTIONS = [
  { value: "outpatient", label: "外来のみ（個人ごと）" },
  { value: "household", label: "世帯（入院含む合算）" },
] as const;

// 特別療養環境室料プラン
export const ROOM_PLANS: RoomPlan[] = [
  { value: "none", label: "個室なし（0円/日）", rate: 0 },
  { value: "A", label: "A：14,300円/日（本館）", rate: 14300 },
  { value: "B", label: "B：13,200円/日（本館）", rate: 13200 },
  { value: "C", label: "C：12,100円/日（本館）", rate: 12100 },
  { value: "D", label: "D：11,000円/日（本館）", rate: 11000 },
  { value: "E", label: "E：24,200円/日（中央棟）", rate: 24200 },
  { value: "F", label: "F：18,150円/日（中央棟）", rate: 18150 },
  { value: "G", label: "G：14,520円/日（中央棟）", rate: 14520 },
  { value: "H", label: "H： 8,470円/日（中央棟）", rate: 8470 },
];

// 食事プラン
export const MEAL_PLANS: MealPlan[] = [
  { value: "general", label: "一般（510円/食）", rate: 510 },
  { value: "low2_90", label: "低所得者Ⅱ（90日目まで）", rate: 240 },
  { value: "low2_91", label: "低所得者Ⅱ（91日目以降：長期該当者）", rate: 190 },
  { value: "low1", label: "低所得者Ⅰ（老齢福祉年金受給者）", rate: 110 },
  { value: "nambyo", label: "指定難病・小児慢性特定疾患", rate: 300 },
];

// 所得区分に応じた食事区分の初期値
export function getDefaultMealPlan(ageGroup: string, incomeLevel: string): string {
  // 70歳未満
  if (ageGroup === "UNDER_70") {
    // 上位所得者（区分ア・イ）は一般
    if (incomeLevel === "A" || incomeLevel === "B") {
      return "general";
    }
    // 一般（区分ウ・エ）は一般
    if (incomeLevel === "C" || incomeLevel === "D") {
      return "general";
    }
    // 低所得者（区分オ）は低所得者Ⅱ（90日目まで）
    if (incomeLevel === "E") {
      return "low2_90";
    }
  }
  
  // 70歳以上
  if (ageGroup === "OVER_70_74" || ageGroup === "OVER_75") {
    // 現役並み所得者は一般
    if (incomeLevel === "ACTIVE_III" || incomeLevel === "ACTIVE_II" || incomeLevel === "ACTIVE_I") {
      return "general";
    }
    // 一般所得者は一般
    if (incomeLevel === "GENERAL") {
      return "general";
    }
    // 低所得者IIは低所得者Ⅱ（90日目まで）
    if (incomeLevel === "LOW_II") {
      return "low2_90";
    }
    // 低所得者Iは低所得者Ⅰ（老齢福祉年金受給者）
    if (incomeLevel === "LOW_I") {
      return "low1";
    }
  }
  
  return "general"; // デフォルト
}

