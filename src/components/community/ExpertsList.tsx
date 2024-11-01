import React from 'react';
import { MessageSquare, Award, Calendar } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  avatar: string;
  availability: string;
  rating: number;
  consultations: number;
}

const MOCK_EXPERTS: Expert[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    title: 'Agricultural Scientist',
    specialties: ['Soil Health', 'Sustainable Farming', 'Crop Disease Management'],
    avatar: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?w=100&h=100&auto=format&fit=crop',
    availability: 'Available Next Week',
    rating: 4.9,
    consultations: 234
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    title: 'Agronomist',
    specialties: ['Precision Agriculture', 'Irrigation Systems', 'Climate-Smart Farming'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&auto=format&fit=crop',
    availability: 'Available Tomorrow',
    rating: 4.8,
    consultations: 189
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    title: 'Plant Pathologist',
    specialties: ['Disease Prevention', 'Organic Farming', 'Pest Management'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop',
    availability: 'Available Today',
    rating: 4.7,
    consultations: 156
  }
];

export function ExpertsList() {
  return (
    <div className="space-y-6">
      {MOCK_EXPERTS.map((expert) => (
        <div
          key={expert.id}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-start gap-4">
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    {expert.name}
                    <Award className="w-4 h-4 text-blue-500" />
                  </h3>
                  <p className="text-sm text-gray-600">{expert.title}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500">
                    <span className="font-medium">{expert.rating}</span>
                    <span className="text-sm text-gray-500">/ 5.0</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {expert.consultations} consultations
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {expert.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {expert.availability}
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    View Profile
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}