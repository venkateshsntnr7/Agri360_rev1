import React, { useState, useEffect } from 'react';
import { DollarSign, AlertCircle, Loader, Shield, Sprout } from 'lucide-react';

interface LoanOffer {
  id: string;
  type: string;
  amount: number;
  rate: number;
  term: number;
  requirements: string[];
}

interface InsurancePlan {
  id: string;
  name: string;
  coverage: number;
  premium: number;
  deductible: number;
  benefits: string[];
}

const MOCK_LOANS: LoanOffer[] = [
  {
    id: 'equipment-loan',
    type: 'Equipment Financing',
    amount: 75000,
    rate: 4.25,
    term: 60,
    requirements: [
      'Business operating > 2 years',
      'Credit score > 650',
      'Annual revenue > $150,000'
    ]
  },
  {
    id: 'seasonal',
    type: 'Seasonal Working Capital',
    amount: 25000,
    rate: 5.75,
    term: 12,
    requirements: [
      'Business operating > 1 year',
      'Credit score > 600',
      'Monthly revenue > $8,000'
    ]
  },
  {
    id: 'expansion',
    type: 'Farm Expansion',
    amount: 250000,
    rate: 3.85,
    term: 120,
    requirements: [
      'Business operating > 5 years',
      'Credit score > 720',
      'Annual revenue > $500,000'
    ]
  }
];

const MOCK_INSURANCE: InsurancePlan[] = [
  {
    id: 'basic',
    name: 'Essential Coverage',
    coverage: 100000,
    premium: 2400,
    deductible: 5000,
    benefits: [
      'Natural disaster protection',
      'Crop failure coverage',
      'Basic liability insurance'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Protection',
    coverage: 250000,
    premium: 4800,
    deductible: 2500,
    benefits: [
      'Comprehensive crop insurance',
      'Equipment breakdown coverage',
      'Extended liability protection',
      'Revenue loss protection'
    ]
  }
];

export function FinanceMonitor() {
  const [selectedLoan, setSelectedLoan] = useState<string>('equipment-loan');
  const [selectedInsurance, setSelectedInsurance] = useState<string>('basic');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  const activeLoan = MOCK_LOANS.find(loan => loan.id === selectedLoan)!;
  const activeInsurance = MOCK_INSURANCE.find(plan => plan.id === selectedInsurance)!;

  return (
    <div className="space-y-6">
      {/* Loan Section */}
      <div>
        <div className="flex gap-2 mb-4">
          {MOCK_LOANS.map(loan => (
            <button
              key={loan.id}
              onClick={() => setSelectedLoan(loan.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedLoan === loan.id
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {loan.type}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-semibold text-gray-900">{activeLoan.type}</h4>
              <p className="text-sm text-gray-500">
                {activeLoan.term} months @ {activeLoan.rate}% APR
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">
                ${activeLoan.amount.toLocaleString()}
              </span>
              <p className="text-sm text-gray-500">Maximum amount</p>
            </div>
          </div>

          <div className="space-y-2">
            {activeLoan.requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Sprout className="w-4 h-4 text-green-500" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insurance Section */}
      <div>
        <div className="flex gap-2 mb-4">
          {MOCK_INSURANCE.map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelectedInsurance(plan.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedInsurance === plan.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-semibold text-gray-900">{activeInsurance.name}</h4>
              <p className="text-sm text-gray-500">
                ${activeInsurance.deductible.toLocaleString()} deductible
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-green-600">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Protected</span>
              </div>
              <span className="block text-2xl font-bold text-gray-900">
                ${activeInsurance.coverage.toLocaleString()}
              </span>
              <p className="text-sm text-gray-500">
                ${activeInsurance.premium}/year
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {activeInsurance.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}