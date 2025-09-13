import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MedicalCostEstimator from '../MedicalCostEstimator';

describe('MedicalCostEstimator', () => {
  it('renders without crashing', () => {
    render(<MedicalCostEstimator />);
    expect(screen.getByText('高額療養費・自己負担 概算ツール（試作）')).toBeInTheDocument();
  });

  it('displays calculation results', () => {
    render(<MedicalCostEstimator />);
    expect(screen.getByText('計算結果')).toBeInTheDocument();
    expect(screen.getByText('当月の支払見込み合計')).toBeInTheDocument();
  });

  it('updates medical cost when input changes', () => {
    render(<MedicalCostEstimator />);
    const medicalCostInput = screen.getByDisplayValue('300000');
    fireEvent.change(medicalCostInput, { target: { value: '500000' } });
    expect(medicalCostInput).toHaveValue(500000);
  });

  it('switches between age groups', () => {
    render(<MedicalCostEstimator />);
    const ageGroupSelect = screen.getByDisplayValue('70歳未満');
    fireEvent.change(ageGroupSelect, { target: { value: 'OVER_70_74' } });
    expect(screen.getByText('計算モード（70歳以上）')).toBeInTheDocument();
  });

  it('validates input values', () => {
    render(<MedicalCostEstimator />);
    const medicalCostInput = screen.getByDisplayValue('300000');
    fireEvent.change(medicalCostInput, { target: { value: '-100' } });
    // バリデーションエラーが表示されることを確認
    expect(screen.getByText('医療費は0円以上で入力してください')).toBeInTheDocument();
  });
});
