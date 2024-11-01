import React from 'react';
import { Star, MapPin, Phone, Mail, Calendar, CheckCircle } from 'lucide-react';

interface ServiceProvider {
  id: string;
  name: string;
  services: string[];
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  avatar: string;
  verified: boolean;
  availability: string;
  description: string;
  contactInfo: {
    phone: string;
    email: string;
  };
}

const MOCK_PROVIDERS: ServiceProvider[] = [
  {
    id: '1',
    name: 'AgriTech Solutions',
    services: ['Equipment Operation', 'Field Preparation', 'Harvesting'],
    rating: 4.9,
    reviews: 128,
    location: 'Springfield, IL',
    distance: '12 miles away',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&auto=format&fit=crop',
    verified: true,
    availability: 'Available Next Week',
    description: 'Professional farm equipment operators with over 15 years of experience. Specialized in precision agriculture.',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'contact@agritech.com'
    }
  },
  {
    id: '2',
    name: 'Green Valley Services',
    services: ['Crop Spraying', 'Soil Testing', 'Irrigation Setup'],
    rating: 4.8,
    reviews: 95,
    location: 'Bloomington, IL',
    distance: '8 miles away',
    avatar: 'https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?w=100&h=100&auto=format&fit=crop',
    verified: true,
    availability: 'Available Tomorrow',
    description: 'Comprehensive agricultural services with state-of-the-art equipment. Licensed and insured operators.',
    contactInfo: {
      phone: '(555) 234-5678',
      email: 'info@greenvalley.com'
    }
  },
  {
    id: '3',
    name: 'Farm Assist Pro',
    services: ['Equipment Maintenance', 'System Installation', 'Technical Support'],
    rating: 4.7,
    reviews: 73,
    location: 'Decatur, IL',
    distance: '15 miles away',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&auto=format&fit=crop',
    verified: false,
    availability: 'Available Today',
    description: 'Expert equipment maintenance and repair services. Emergency support available.',
    contactInfo: {
      phone: '(555) 345-6789',
      email: 'support@farmassist.com'
    }
  }
];

export function ServiceProviders() {
  return (
    <div className="space-y-6">
      {MOCK_PROVIDERS.map((provider) => (
        <div
          key={provider.id}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900">{provider.name}</h3>
                    {provider.verified && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({provider.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {provider.location}
                      <span className="text-xs">({provider.distance})</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-full">
                    {provider.availability}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-gray-600">{provider.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {provider.services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {provider.contactInfo.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  {provider.contactInfo.email}
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-emerald-600 font-medium hover:text-emerald-700">
                    View Profile
                  </button>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    Contact Now
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