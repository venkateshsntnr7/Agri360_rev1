import React, { useState, useEffect } from 'react';
import { Package, AlertCircle, Plus, Loader, Archive, BarChart, Bell } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: 'seeds' | 'fertilizers' | 'pesticides' | 'equipment';
  quantity: number;
  unit: string;
  minThreshold: number;
  expiryDate?: string;
  lastRestocked: string;
  status: 'good' | 'low' | 'critical';
  supplier?: string;
  price: number;
}

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    name: 'Wheat Seeds (HD-2967)',
    category: 'seeds',
    quantity: 250,
    unit: 'kg',
    minThreshold: 100,
    expiryDate: '2025-06-15',
    lastRestocked: '2024-01-15',
    status: 'good',
    supplier: 'AgriSeeds Corp',
    price: 45.50
  },
  {
    id: '2',
    name: 'NPK Fertilizer 20-20-20',
    category: 'fertilizers',
    quantity: 150,
    unit: 'kg',
    minThreshold: 200,
    lastRestocked: '2024-02-01',
    status: 'low',
    supplier: 'FarmNutrients Ltd',
    price: 32.75
  },
  {
    id: '3',
    name: 'Organic Pesticide',
    category: 'pesticides',
    quantity: 25,
    unit: 'L',
    minThreshold: 50,
    expiryDate: '2024-12-31',
    lastRestocked: '2024-01-20',
    status: 'critical',
    supplier: 'EcoCrop Solutions',
    price: 78.99
  },
  {
    id: '4',
    name: 'Sprinkler Heads',
    category: 'equipment',
    quantity: 45,
    unit: 'pieces',
    minThreshold: 20,
    lastRestocked: '2024-02-15',
    status: 'good',
    supplier: 'IrrigationTech',
    price: 12.50
  }
];

export function InventoryManager() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | InventoryItem['category']>('all');
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'quantity'>('status');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setInventory(MOCK_INVENTORY);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const sortInventory = (items: InventoryItem[]) => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'quantity':
          return b.quantity - a.quantity;
        default:
          return 0;
      }
    });
  };

  const filteredInventory = sortInventory(
    inventory.filter(item => filter === 'all' || item.category === filter)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['all', 'seeds', 'fertilizers', 'pesticides', 'equipment'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filter === category
                  ? 'bg-orange-100 text-orange-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="text-orange-600 hover:text-orange-700 flex items-center gap-1 text-sm font-medium">
            <Bell className="w-4 h-4" />
            Set Alerts
          </button>
          <button className="text-orange-600 hover:text-orange-700 flex items-center gap-1 text-sm font-medium">
            <BarChart className="w-4 h-4" />
            Analytics
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredInventory.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg border ${getStatusColor(item.status)}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4" />
                  <h4 className="font-medium">{item.name}</h4>
                  {item.status === 'critical' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Reorder Required
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm">
                  <div>
                    <span className="text-gray-600">Quantity:</span>
                    <span className="ml-2 font-medium">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Min. Threshold:</span>
                    <span className="ml-2 font-medium">
                      {item.minThreshold} {item.unit}
                    </span>
                  </div>
                  {item.expiryDate && (
                    <div>
                      <span className="text-gray-600">Expires:</span>
                      <span className="ml-2">
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Last Restocked:</span>
                    <span className="ml-2">
                      {new Date(item.lastRestocked).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Supplier:</span>
                    <span className="ml-2">{item.supplier}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Price:</span>
                    <span className="ml-2">${item.price.toFixed(2)}/{item.unit}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                  Update Stock
                </button>
                <button className="px-3 py-1 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                  Order More
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredInventory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Archive className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No inventory items found</p>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-4">
        <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Item
        </button>
      </div>
    </div>
  );
}