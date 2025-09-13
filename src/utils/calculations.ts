import { Under70IncomeLevel, Over70IncomeLevel, Over70Mode, CalculationResult, FormState } from '../types';
import { MULTI_HIT_THRESHOLD, ROOM_PLANS, getCopayRate } from '../constants';
import { formatYen } from './formatters';

/**
 * 70歳未満の上限額を計算
 */
export function calculateCapUnder70(
  incomeLevel: Under70IncomeLevel,
  totalMedicalCost: number,
  isMultiple: boolean
): number {
  switch (incomeLevel) {
    case "A":
      return isMultiple ? 140100 : 252600 + Math.max(0, totalMedicalCost - 842000) * 0.01;
    case "B":
      return isMultiple ? 93000 : 167400 + Math.max(0, totalMedicalCost - 558000) * 0.01;
    case "C":
      return isMultiple ? 44400 : 80100 + Math.max(0, totalMedicalCost - 267000) * 0.01;
    case "D":
      return isMultiple ? 44400 : 57600;
    case "E":
      return isMultiple ? 24600 : 35400;
    default:
      return 0;
  }
}

/**
 * 70歳以上の上限額を計算
 */
export function calculateCapOver70(
  incomeLevel: Over70IncomeLevel,
  totalMedicalCost: number,
  isMultiple: boolean,
  mode: Over70Mode,
  ageGroup: string
): number {
  // 現役並み所得者（III、II、I）は同じ計算式
  if (incomeLevel === "ACTIVE_III") {
    return isMultiple ? 140100 : 252600 + Math.max(0, totalMedicalCost - 842000) * 0.01;
  }
  if (incomeLevel === "ACTIVE_II") {
    return isMultiple ? 93000 : 167400 + Math.max(0, totalMedicalCost - 558000) * 0.01;
  }
  if (incomeLevel === "ACTIVE_I") {
    return isMultiple ? 44400 : 80100 + Math.max(0, totalMedicalCost - 267000) * 0.01;
  }
  
  // 75歳以上は現役並み以外は1割負担
  if (ageGroup === "OVER_75") {
    // 一般所得者・低所得者II・低所得者Iは同じ上限額
    return mode === "outpatient" ? 8000 : 15000;
  }
  
  // 70～74歳の一般所得者・低所得者
  if (incomeLevel === "GENERAL") {
    return mode === "outpatient" ? 18000 : (isMultiple ? 44400 : 57600);
  }
  
  if (incomeLevel === "LOW_II") {
    return mode === "outpatient" ? 8000 : 24600;
  }
  
  if (incomeLevel === "LOW_I") {
    return mode === "outpatient" ? 8000 : 15000;
  }
  
  return 0;
}

/**
 * 高額療養費の計算を実行
 */
export function calculateMedicalCost(formState: FormState): CalculationResult {
  const { ageGroup, under70IncomeLevel, over70IncomeLevel, o70Mode, medicalCost, multiCount, roomPlan, roomDays, mealRate, mealCount } = formState;
  
  const isMultiple = multiCount >= MULTI_HIT_THRESHOLD;
  
  // 所得区分と負担割合を決定
  let incomeLevel: string;
  let copayRate: number;
  
  if (ageGroup === "UNDER_70") {
    incomeLevel = under70IncomeLevel || "C";
    copayRate = getCopayRate(ageGroup, incomeLevel);
  } else {
    incomeLevel = over70IncomeLevel || "GENERAL";
    copayRate = getCopayRate(ageGroup, incomeLevel);
  }
  
  // 上限額を計算
  let cap: number;
  if (ageGroup === "UNDER_70") {
    cap = calculateCapUnder70(under70IncomeLevel || "C", medicalCost, isMultiple);
  } else {
    cap = calculateCapOver70(over70IncomeLevel || "GENERAL", medicalCost, isMultiple, o70Mode, ageGroup);
  }
  
  // 自己負担額を計算
  const rawCopay = medicalCost * copayRate;
  const payableMedical = Math.min(rawCopay, cap);
  
  // 個室料を計算
  const roomRate = ROOM_PLANS.find(r => r.value === roomPlan)?.rate || 0;
  const roomTotal = roomRate * roomDays;
  
  // 食事料を計算
  const mealTotal = mealRate * mealCount;
  
  // 合計を計算
  const totalPayable = payableMedical + roomTotal + mealTotal;
  
  return {
    rawCopay,
    cap,
    payableMedical,
    roomTotal,
    mealTotal,
    totalPayable,
    isMultiple,
  };
}

