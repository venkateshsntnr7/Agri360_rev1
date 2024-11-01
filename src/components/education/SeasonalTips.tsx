import React from 'react';
import { Sun, Cloud, Leaf, Wind } from 'lucide-react';

interface SeasonalTip {
  id: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  title: string;
  tips: string[];
  icon: typeof Sun;
}

const SEASONAL_TIPS: SeasonalTip[] = [
  {
    id: 'spring',
    season: 'spring',
    title: 'Spring Preparation',
    icon: Sun,
    tips: [
      'Prepare soil with organic matter for optimal nutrient content',
      'Plan crop rotation based on previous year\'s layout',
      'Check and maintain irrigation systems',
      'Start seedlings indoors for early planting'
    ]
  },
  {
    id: 'summer',
    season: 'summer',
    title: 'Summer Management',
    icon: Cloud,
    tips: [
      'Monitor water needs during peak growth',
      'Implement pest control measures',
      'Apply mulch to retain moisture',
      'Schedule regular crop inspections'
    ]
  },
  {
    id: 'fall',
    season: 'fall',
    title: 'Fall Harvest',
    icon: Leaf,
    tips: [
      'Plan harvest schedule for optimal crop quality',
      'Prepare storage facilities',
      'Plant cover crops for soil protection',
      'Collect and save seeds for next season'
    ]
  },
  {
    id: 'winter',
    season: 'winter',
    title: 'Winter Planning',
    icon: Wind,
    tips: [
      'Maintain and repair equipment',
      'Review and update farm records',
      'Plan next season\'s crop rotation',
      'Attend agricultural workshops and training'
    ]
  }
];

export function SeasonalTips() {
  const getSeasonColor = (season: SeasonalTip['season']) => {
    switch (season) {
      case 'spring':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'summer':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'fall':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'winter':
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {SEASONAL_TIPS.map((season) => (
        <div
          key={season.id}
          className={`p-6 rounded-lg border ${getSeasonColor(season.season)}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <season.icon className="w-6 h-6" />
            <h3 className="text-lg font-medium">{season.title}</h3>
          </div>

          <ul className="space-y-3">
            {season.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="font-medium">•</span>
                <span className="text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}