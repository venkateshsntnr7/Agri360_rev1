import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Loader } from 'lucide-react';

interface CropPrice {
  id: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  lastUpdated: string;
}

const MOCK_PRICES: CropPrice[] = [
  {
    id: 'wheat',
    name: 'Wheat',
    price: 285.75,
    change: 2.3,
    volume: '142.5K',
    lastUpdated: '2 min ago'
  },
  {
    id: 'corn',
    name: 'Corn',
    price: 175.25,
    change: -1.8,
    volume: '238.2K',
    lastUpdated: '1 min ago'
  },
  {
    id: 'soybeans',
    name: 'Soybeans',
    price: 452.90,
    change: 3.2,
    volume: '98.7K',
    lastUpdated: 'Just now'
  },
  {
    id: 'rice',
    name: 'Rice',
    price: 198.45,
    change: -0.8,
    volume: '76.3K',
    lastUpdated: '5 min ago'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    price: 89.65,
    change: 1.5,
    volume: '156.1K',
    lastUpdated: '3 min ago'
  }
];

export function PriceTracker() {
  const [prices, setPrices] = useState<CropPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with mock data
    const fetchPrices = () => {
      setLoading(true);
      setTimeout(() => {
        setPrices(MOCK_PRICES.map(price => ({
          ...price,
          // Add small random fluctuations to prices
          price: price.price + (Math.random() - 0.5) * 2,
          change: price.change + (Math.random() - 0.5)
        })));
        setLoading(false);
      }, 1000);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-sm text-gray-500 px-2">
        <span>Commodity</span>
        <span className="text-right">Price/Bu</span>
        <span className="text-right">Volume</span>
      </div>
      
      <div className="space-y-2">
        {prices.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-3 items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div>
              <span className="font-medium text-gray-900">{item.name}</span>
              <span className="block text-xs text-gray-500">{item.lastUpdated}</span>
            </div>
            
            <div className="text-right">
              <span className="font-mono font-medium">${item.price.toFixed(2)}</span>
              <div className={`flex items-center justify-end gap-1 text-sm ${
                item.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(item.change).toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="text-right font-medium text-gray-600">
              {item.volume}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}