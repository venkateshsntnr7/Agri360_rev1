import React from 'react';
import { Droplets, Thermometer, Activity } from 'lucide-react';

interface SoilMetric {
  name: string;
  value: number;
  unit: string;
  icon: typeof Activity;
  color: string;
  description: string;
  optimal: {
    min: number;
    max: number;
  };
}

const MOCK_SOIL_DATA: SoilMetric[] = [
  {
    name: 'Moisture Content',
    value: 35,
    unit: '%',
    icon: Droplets,
    color: 'blue',
    description: 'Current soil moisture levels are within optimal range',
    optimal: {
      min: 30,
      max: 45
    }
  },
  {
    name: 'Temperature',
    value: 22,
    unit: '°C',
    icon: Thermometer,
    color: 'amber',
    description: 'Soil temperature is suitable for most crops',
    optimal: {
      min: 18,
      max: 24
    }
  },
  {
    name: 'pH Level',
    value: 6.8,
    unit: 'pH',
    icon: Activity,
    color: 'emerald',
    description: 'Slightly acidic soil, ideal for most crops',
    optimal: {
      min: 6.0,
      max: 7.0
    }
  }
];

export function SoilAnalysis() {
  const getStatusColor = (value: number, optimal: { min: number; max: number }) => {
    if (value < optimal.min || value > optimal.max) {
      return 'text-red-500';
    }
    if (value === optimal.min || value === optimal.max) {
      return 'text-amber-500';
    }
    return 'text-green-500';
  };

  return (
    <div className="space-y-6">
      {MOCK_SOIL_DATA.map((metric) => (
        <div
          key={metric.name}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <metric.icon className={`w-5 h-5 text-${metric.color}-500`} />
              <h4 className="font-medium text-gray-900">{metric.name}</h4>
            </div>
            <div className={`text-lg font-semibold ${getStatusColor(metric.value, metric.optimal)}`}>
              {metric.value}{metric.unit}
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            {metric.description}
          </p>

          <div className="relative pt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Min: {metric.optimal.min}{metric.unit}</span>
              <span>Max: {metric.optimal.max}{metric.unit}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-${metric.color}-500 rounded-full`}
                style={{
                  width: `${(metric.value / metric.optimal.max) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}