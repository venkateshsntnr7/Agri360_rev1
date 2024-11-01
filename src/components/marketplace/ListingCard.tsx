import React from 'react';
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react';

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

interface ListingCardProps {
  listing: Listing;
  viewMode: 'grid' | 'list';
}

export function ListingCard({ listing, viewMode }: ListingCardProps) {
  const getConditionColor = (condition?: Listing['condition']) => {
    switch (condition) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'excellent':
        return 'bg-blue-100 text-blue-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800';
      case 'fair':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${
      viewMode === 'list' ? 'flex' : ''
    }`}>
      <div className={viewMode === 'list' ? 'w-72 flex-shrink-0' : ''}>
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-gray-900">{listing.title}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{listing.location}</span>
              <span className="text-xs">({listing.distance})</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">
              ${listing.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              {listing.type === 'rent' ? '/day' : listing.type === 'service' ? '/acre' : ''}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {listing.condition && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(listing.condition)}`}>
              {listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}
            </span>
          )}
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
            {listing.category}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {listing.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={listing.seller.avatar}
              alt={listing.seller.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-900">
                  {listing.seller.name}
                </span>
                {listing.seller.verified && (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{listing.seller.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {listing.postedAt}
          </div>
        </div>
      </div>
    </div>
  );
}