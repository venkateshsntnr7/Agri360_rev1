import React from 'react';
import { Shield, Check, ArrowRight } from 'lucide-react';

interface InsurancePlan {
  id: string;
  name: string;
  description: string;
  coverage: {
    amount: number;
    unit: string;
  };
  premium: {
    amount: number;
    frequency: string;
  };
  benefits: string[];
  features: string[];
  recommended?: boolean;
}

const MOCK_PLANS: InsurancePlan[] = [
  {
    id: 'basic',
    name: 'Basic Protection',
    description: 'Essential coverage for small to medium farms',
    coverage: {
      amount: 100000,
      unit: 'per acre'
    },
    premium: {
      amount: 199,
      frequency: 'monthly'
    },
    benefits: [
      'Natural disaster coverage',
      'Basic equipment protection',
      'Liability insurance'
    ],
    features: [
      'Quick claim processing',
      '24/7 support',
      'Mobile app access'
    ]
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Shield',
    description: 'Complete protection for established farming operations',
    coverage: {
      amount: 250000,
      unit: 'per acre'
    },
    premium: {
      amount: 399,
      frequency: 'monthly'
    },
    benefits: [
      'Enhanced natural disaster coverage',
      'Full equipment protection',
      'Extended liability coverage',
      'Crop disease protection',
      'Revenue loss protection'
    ],
    features: [
      'Priority claim processing',
      'Personal account manager',
      'Free annual risk assessment',
      'Quarterly farm visits'
    ],
    recommended: true
  }
];

export function InsurancePlans() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {MOCK_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-lg border ${
              plan.recommended
                ? 'border-cyan-200 ring-1 ring-cyan-500'
                : 'border-gray-200'
            } p-6`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-sm font-medium rounded-full">
                  Recommended
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mt-1">{plan.description}</p>
              </div>
              <Shield className={`w-6 h-6 ${
                plan.recommended ? 'text-cyan-500' : 'text-gray-400'
              }`} />
            </div>

            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  ${plan.premium.amount}
                </span>
                <span className="text-gray-600 ml-2">/{plan.premium.frequency}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Up to ${plan.coverage.amount.toLocaleString()} {plan.coverage.unit}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Coverage Benefits</h4>
                <ul className="space-y-2">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Additional Features</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-cyan-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
              plan.recommended
                ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}>
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mt-8">
        <h4 className="font-medium text-gray-900 mb-2">Why Choose Our Insurance?</h4>
        <ul className="grid md:grid-cols-3 gap-4">
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-cyan-500 mt-0.5" />
            <span>Fast, hassle-free claims process</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-cyan-500 mt-0.5" />
            <span>Customizable coverage options</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-cyan-500 mt-0.5" />
            <span>Expert support team</span>
          </li>
        </ul>
      </div>
    </div>
  );
}