import React from 'react';
import { Sprout, Droplets, Sun, Wind, FileText } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  category: string;
  description: string;
  steps: string[];
  icon: typeof Sprout;
  downloadUrl: string;
}

const PRACTICE_GUIDES: Guide[] = [
  {
    id: '1',
    title: 'Soil Health Management',
    category: 'Soil Management',
    description: 'Comprehensive guide to maintaining and improving soil health for optimal crop growth.',
    icon: Sprout,
    steps: [
      'Regular soil testing and analysis',
      'Organic matter incorporation',
      'Cover cropping strategies',
      'pH management techniques'
    ],
    downloadUrl: '#'
  },
  {
    id: '2',
    title: 'Water Conservation',
    category: 'Resource Management',
    description: 'Best practices for efficient water usage and irrigation management.',
    icon: Droplets,
    steps: [
      'Irrigation scheduling',
      'Drip system maintenance',
      'Moisture monitoring',
      'Rainwater harvesting'
    ],
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'Integrated Pest Management',
    category: 'Pest Control',
    description: 'Sustainable approaches to managing pests while protecting beneficial insects.',
    icon: Sun,
    steps: [
      'Prevention strategies',
      'Monitoring techniques',
      'Biological control methods',
      'Chemical control as last resort'
    ],
    downloadUrl: '#'
  }
];

export function PracticeGuides() {
  return (
    <div className="space-y-6">
      {PRACTICE_GUIDES.map((guide) => (
        <div
          key={guide.id}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <guide.icon className="w-5 h-5 text-purple-500" />
                <h3 className="font-medium text-gray-900">{guide.title}</h3>
              </div>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                {guide.category}
              </span>
            </div>

            <button className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700">
              <FileText className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          <p className="mt-4 text-gray-600">{guide.description}</p>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Key Steps:</h4>
            <ul className="space-y-2">
              {guide.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="font-medium text-purple-600">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}