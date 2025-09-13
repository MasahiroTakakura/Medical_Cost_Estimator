import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MedicalCostEstimator from './components/MedicalCostEstimator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MedicalCostEstimator />
  </React.StrictMode>
);

