import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface HealthMetric {
  name: string;
  status: 'good' | 'warning' | 'critical';
  value: string;
  recommendation?: string;
}

const MOCK_METRICS: HealthMetric[] = [
  {
    name: 'Leaf Color',
    status: 'good',
    value: 'Healthy green',
    recommendation: 'Current nitrogen levels are optimal'
  },
  {
    name: 'Growth Rate',
    status: 'warning',
    value: '85% of expected',
    recommendation: 'Consider adjusting irrigation schedule'
  },
  {
    name: 'Disease Risk',
    status: 'critical',
    value: 'High risk of rust',
    recommendation: 'Immediate fungicide application recommended'
  },
  {
    name: 'Nutrient Levels',
    status: 'good',
    value: 'Balanced',
    recommendation: 'Maintain current fertilization program'
  }
];

export function CropHealth() {
  const getStatusIcon = (status: HealthMetric['status']) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'good':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <div className="space-y-4">
      {MOCK_METRICS.map((metric) => (
        <div
          key={metric.name}
          className={`p-4 rounded-lg border ${getStatusColor(metric.status)}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                {getStatusIcon(metric.status)}
                <h4 className="font-medium">{metric.name}</h4>
              </div>
              <p className="mt-1 text-sm opacity-90">{metric.value}</p>
              {metric.recommendation && (
                <p className="mt-2 text-sm">
                  Recommendation: {metric.recommendation}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}