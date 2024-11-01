import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Bug, AlertCircle, Loader, Bell } from 'lucide-react';

interface Alert {
  id: string;
  type: 'pest' | 'disease';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  distance: string;
  date: string;
  recommendations: string[];
}

const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'pest',
    title: 'Fall Armyworm Outbreak',
    description: 'High population of fall armyworm detected in neighboring farms. High risk of spread within 48 hours.',
    severity: 'critical',
    location: 'North County',
    distance: '5 km away',
    date: '2 hours ago',
    recommendations: [
      'Apply recommended pesticides immediately',
      'Monitor crop daily for signs of infestation',
      'Consider installing pheromone traps'
    ]
  },
  {
    id: '2',
    type: 'disease',
    title: 'Wheat Rust Risk',
    description: 'Environmental conditions favorable for wheat rust development. Preventive action recommended.',
    severity: 'medium',
    location: 'Central District',
    distance: '12 km away',
    date: '1 day ago',
    recommendations: [
      'Apply fungicide as preventive measure',
      'Increase ventilation in dense crop areas',
      'Monitor humidity levels'
    ]
  },
  {
    id: '3',
    type: 'pest',
    title: 'Aphid Activity Increase',
    description: 'Rising aphid populations reported in the region. Early intervention possible.',
    severity: 'low',
    location: 'South Region',
    distance: '8 km away',
    date: '3 hours ago',
    recommendations: [
      'Release beneficial insects if available',
      'Monitor undersides of leaves',
      'Prepare organic pesticides'
    ]
  }
];

export function PestAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pest' | 'disease'>('all');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setAlerts(MOCK_ALERTS);
      setLoading(false);
    }, 1000);
  }, []);

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getTypeIcon = (type: Alert['type']) => {
    return type === 'pest' ? (
      <Bug className="w-4 h-4" />
    ) : (
      <AlertCircle className="w-4 h-4" />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }

  const filteredAlerts = alerts.filter(
    alert => filter === 'all' || alert.type === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['all', 'pest', 'disease'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filter === type
                  ? 'bg-red-100 text-red-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        
        <button className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-medium">
          <Bell className="w-4 h-4" />
          Set Alert Preferences
        </button>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getTypeIcon(alert.type)}
                  <h4 className="font-medium">{alert.title}</h4>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <MapPin className="w-4 h-4" />
                  <span>{alert.location}</span>
                  <span className="text-xs">({alert.distance})</span>
                </div>
              </div>
              <span className="text-sm">{alert.date}</span>
            </div>

            <p className="text-sm mb-4">{alert.description}</p>

            <div className="space-y-2">
              <h5 className="text-sm font-medium flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Recommended Actions:
              </h5>
              <ul className="list-disc list-inside text-sm space-y-1">
                {alert.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No active alerts for your area</p>
          </div>
        )}
      </div>
    </div>
  );
}