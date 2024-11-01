import React from 'react';
import { AlertTriangle, CloudRain, Wind, Thermometer } from 'lucide-react';

interface DisasterAlert {
  id: string;
  type: string;
  severity: 'warning' | 'watch' | 'advisory';
  title: string;
  description: string;
  area: string;
  timeframe: string;
  recommendations: string[];
  icon: typeof CloudRain;
}

const MOCK_ALERTS: DisasterAlert[] = [
  {
    id: '1',
    type: 'Flood',
    severity: 'warning',
    title: 'Flash Flood Warning',
    description: 'Heavy rainfall expected. High risk of flash floods in low-lying areas.',
    area: 'Northern Region',
    timeframe: 'Next 24 hours',
    icon: CloudRain,
    recommendations: [
      'Move equipment to higher ground',
      'Clear drainage systems',
      'Document pre-flood conditions',
      'Review insurance coverage'
    ]
  },
  {
    id: '2',
    type: 'Storm',
    severity: 'watch',
    title: 'Severe Storm Watch',
    description: 'Potential for severe thunderstorms with high winds and hail.',
    area: 'Central District',
    timeframe: 'Next 48 hours',
    icon: Wind,
    recommendations: [
      'Secure loose equipment',
      'Protect sensitive crops',
      'Check emergency supplies',
      'Monitor weather updates'
    ]
  },
  {
    id: '3',
    type: 'Heat',
    severity: 'advisory',
    title: 'Extreme Heat Advisory',
    description: 'Extended period of high temperatures may affect crop health.',
    area: 'Southern Region',
    timeframe: 'Next 5 days',
    icon: Thermometer,
    recommendations: [
      'Increase irrigation frequency',
      'Apply protective measures for crops',
      'Monitor soil moisture levels',
      'Check cooling systems'
    ]
  }
];

export function DisasterAlerts() {
  const getSeverityColor = (severity: DisasterAlert['severity']) => {
    switch (severity) {
      case 'warning':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'watch':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'advisory':
        return 'bg-orange-50 border-orange-200 text-orange-700';
    }
  };

  const getSeverityBadge = (severity: DisasterAlert['severity']) => {
    switch (severity) {
      case 'warning':
        return 'bg-red-100 text-red-800';
      case 'watch':
        return 'bg-yellow-100 text-yellow-800';
      case 'advisory':
        return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="space-y-6">
      {MOCK_ALERTS.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-lg border p-6 ${getSeverityColor(alert.severity)}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <alert.icon className="w-5 h-5" />
                <h3 className="font-medium">{alert.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(alert.severity)}`}>
                  {alert.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-sm opacity-90">{alert.description}</p>
            </div>
            <div className="text-right text-sm">
              <p>{alert.area}</p>
              <p className="opacity-75">{alert.timeframe}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Recommended Actions:
            </h4>
            <ul className="grid md:grid-cols-2 gap-2">
              {alert.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="font-medium">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="text-sm font-medium hover:underline">
              View Detailed Advisory
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}