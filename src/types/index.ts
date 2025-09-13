// 年齢区分
export type AgeGroup = "UNDER_70" | "OVER_70_74" | "OVER_75";

// 70歳未満の所得区分
export type Under70IncomeLevel = "A" | "B" | "C" | "D" | "E";

// 70歳以上の所得区分
export type Over70IncomeLevel = "ACTIVE_III" | "ACTIVE_II" | "ACTIVE_I" | "GENERAL" | "LOW_II" | "LOW_I";

// 70歳以上の計算モード
export const OVER_70_MODES = {
  OUTPATIENT: "outpatient",
  HOUSEHOLD: "household",
} as const;

export type Over70Mode = typeof OVER_70_MODES[keyof typeof OVER_70_MODES];

// 負担割合オプション
export interface CopayRateOption {
  value: number;
  label: string;
}

// 特別療養環境室料プラン
export interface RoomPlan {
  value: string;
  label: string;
  rate: number;
}

// 食事プラン
export interface MealPlan {
  value: string;
  label: string;
  rate: number;
}

// 計算結果
export interface CalculationResult {
  rawCopay: number;
  cap: number;
  payableMedical: number;
  roomTotal: number;
  mealTotal: number;
  totalPayable: number;
  isMultiple: boolean;
}

// 入力フォームの状態
export interface FormState {
  ageGroup: AgeGroup;
  under70IncomeLevel: Under70IncomeLevel;
  over70IncomeLevel: Over70IncomeLevel;
  o70Mode: Over70Mode;
  medicalCost: number;
  multiCount: number;
  roomPlan: string;
  roomDays: number;
  mealPlan: string;
  mealRate: number;
  mealCount: number;
}

// フォーム更新用の部分的な状態
export type PartialFormState = Partial<FormState>;

// 所得区分の統合型
export type IncomeLevel = Under70IncomeLevel | Over70IncomeLevel;

// バリデーションエラー
export interface ValidationErrors {
  medicalCost?: string;
  multiCount?: string;
  roomDays?: string;
  mealRate?: string;
  mealCount?: string;
}

