import React from 'react';
import { Sprout, Droplets, Sun, Wind } from 'lucide-react';

interface CropSuggestion {
  name: string;
  suitability: number;
  icon: typeof Sprout;
  conditions: {
    water: number;
    sunlight: number;
    windResistance: number;
  };
  description: string;
}

const MOCK_SUGGESTIONS: CropSuggestion[] = [
  {
    name: 'Winter Wheat',
    suitability: 95,
    icon: Sprout,
    conditions: {
      water: 70,
      sunlight: 85,
      windResistance: 90
    },
    description: 'Excellent choice for your soil type and climate conditions. High yield potential with current rainfall patterns.'
  },
  {
    name: 'Soybeans',
    suitability: 85,
    icon: Sprout,
    conditions: {
      water: 65,
      sunlight: 90,
      windResistance: 75
    },
    description: 'Good rotation crop. Consider early planting to maximize growing season.'
  },
  {
    name: 'Canola',
    suitability: 75,
    icon: Sprout,
    conditions: {
      water: 60,
      sunlight: 80,
      windResistance: 85
    },
    description: 'Moderate suitability. May require additional irrigation during dry spells.'
  }
];

export function CropRecommendations() {
  return (
    <div className="space-y-6">
      {MOCK_SUGGESTIONS.map((crop) => (
        <div
          key={crop.name}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <crop.icon className="w-5 h-5 text-emerald-500" />
                <h4 className="font-medium text-gray-900">{crop.name}</h4>
              </div>
              <div className="mt-1">
                <div className="inline-flex items-center px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm">
                  {crop.suitability}% Suitable
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {crop.description}
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="ml-1 text-sm text-gray-600">Water</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${crop.conditions.water}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="ml-1 text-sm text-gray-600">Sunlight</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${crop.conditions.sunlight}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Wind className="w-4 h-4 text-gray-500" />
                <span className="ml-1 text-sm text-gray-600">Wind</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-500 rounded-full"
                  style={{ width: `${crop.conditions.windResistance}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}