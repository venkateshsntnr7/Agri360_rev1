import React, { useState, useEffect } from 'react';
import { ShoppingBag, Filter, Search, Loader, Grid, List, MapPin } from 'lucide-react';
import { ListingCard } from './ListingCard';
import { ListingFilters } from './ListingFilters';
import { ServiceProviders } from './ServiceProviders';

interface Listing {
  id: string;
  title: string;
  type: 'sale' | 'rent' | 'service';
  category: string;
  price: number;
  location: string;
  distance: string;
  images: string[];
  condition?: 'new' | 'excellent' | 'good' | 'fair';
  seller: {
    name: string;
    rating: number;
    verified: boolean;
    avatar: string;
  };
  description: string;
  postedAt: string;
}

const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'John Deere 5075E Utility Tractor',
    type: 'sale',
    category: 'Tractors',
    price: 45000,
    location: 'Springfield, IL',
    distance: '15 miles away',
    images: [
      'https://images.unsplash.com/photo-1605338198618-d6c992964abe?w=800&auto=format&fit=crop',
    ],
    condition: 'excellent',
    seller: {
      name: 'Mike Johnson',
      rating: 4.8,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&auto=format&fit=crop'
    },
    description: '2019 model with only 500 hours. Well maintained, includes front loader attachment.',
    postedAt: '2 days ago'
  },
  {
    id: '2',
    title: 'Combine Harvester Rental',
    type: 'rent',
    category: 'Harvesters',
    price: 250,
    location: 'Bloomington, IL',
    distance: '8 miles away',
    images: [
      'https://images.unsplash.com/photo-1570333196184-6f5ff784e4b3?w=800&auto=format&fit=crop'
    ],
    condition: 'good',
    seller: {
      name: 'Farm Equipment Rentals LLC',
      rating: 4.9,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&auto=format&fit=crop'
    },
    description: 'Daily rental rate. Includes operator. Minimum 2-day booking required.',
    postedAt: '1 week ago'
  },
  {
    id: '3',
    title: 'Professional Crop Spraying Service',
    type: 'service',
    category: 'Field Services',
    price: 75,
    location: 'Decatur, IL',
    distance: '20 miles away',
    images: [
      'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=800&auto=format&fit=crop'
    ],
    seller: {
      name: 'AgriServices Pro',
      rating: 5.0,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&auto=format&fit=crop'
    },
    description: 'Professional spraying service. Rate per acre. Licensed and insured operators.',
    postedAt: '3 days ago'
  }
];

export function MarketplaceHub() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'equipment' | 'services'>('equipment');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setListings(MOCK_LISTINGS);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search equipment, rentals, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2 border border-gray-200 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${
                viewMode === 'list'
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('equipment')}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'equipment'
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Equipment & Rentals
          </div>
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'services'
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Service Providers
          </div>
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'equipment' ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          }`}>
            {listings
              .filter(listing => listing.type !== 'service')
              .map(listing => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  viewMode={viewMode}
                />
              ))}
          </div>
        ) : (
          <ServiceProviders />
        )}
      </div>
    </div>
  );
}