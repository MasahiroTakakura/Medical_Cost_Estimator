import { renderHook, act } from '@testing-library/react';
import { useMedicalCostForm } from '../useMedicalCostForm';

describe('useMedicalCostForm', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useMedicalCostForm());
    
    expect(result.current.formState.ageGroup).toBe('UNDER_70');
    expect(result.current.formState.under70IncomeLevel).toBe('C');
    expect(result.current.formState.over70IncomeLevel).toBe('GENERAL');
    expect(result.current.formState.medicalCost).toBe(300000);
  });

  it('should update form state correctly', () => {
    const { result } = renderHook(() => useMedicalCostForm());
    
    act(() => {
      result.current.updateFormState({ medicalCost: 500000 });
    });
    
    expect(result.current.formState.medicalCost).toBe(500000);
  });

  it('should handle age group change correctly', () => {
    const { result } = renderHook(() => useMedicalCostForm());
    
    act(() => {
      result.current.handleAgeGroupChange('OVER_70_74');
    });
    
    expect(result.current.formState.ageGroup).toBe('OVER_70_74');
    expect(result.current.formState.over70IncomeLevel).toBe('GENERAL');
  });

  it('should calculate copay rate correctly', () => {
    const { result } = renderHook(() => useMedicalCostForm());
    
    expect(result.current.copayRate).toBe(0.3); // 70歳未満は3割
    
    act(() => {
      result.current.handleAgeGroupChange('OVER_70_74');
      result.current.handleIncomeLevelChange('GENERAL');
    });
    
    expect(result.current.copayRate).toBe(0.2); // 70～74歳一般所得者は2割
    
    act(() => {
      result.current.handleAgeGroupChange('OVER_75');
      result.current.handleIncomeLevelChange('GENERAL');
    });
    
    expect(result.current.copayRate).toBe(0.1); // 75歳以上一般所得者は1割
    
    act(() => {
      result.current.handleIncomeLevelChange('ACTIVE_III');
    });
    
    expect(result.current.copayRate).toBe(0.3); // 75歳以上現役並み所得者は3割
  });

  it('should calculate medical cost correctly', () => {
    const { result } = renderHook(() => useMedicalCostForm());
    
    expect(result.current.calculationResult.rawCopay).toBe(90000); // 300000 * 0.3
    expect(result.current.calculationResult.totalPayable).toBe(80430); // min(90000, cap)
  });
});
