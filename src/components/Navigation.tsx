import { useNavigate } from 'react-router-dom';
import { Layout, Target, Newspaper, MessageSquare, LogIn, BookOpen, Umbrella, ShoppingBag, Briefcase } from 'lucide-react';

interface NavigationProps {
  onFeaturesClick: () => void;
  onMissionClick: () => void;
  onNewsClick: () => void;
  onEnquiryClick: () => void;
  onAuthClick: () => void;
}

export function Navigation({ 
  onFeaturesClick, 
  onMissionClick, 
  onNewsClick, 
  onEnquiryClick,
  onAuthClick 
}: NavigationProps) {
  const navigate = useNavigate();

  const handleFeatureClick = (feature: string) => {
    navigate(`/features/${feature}`);
  };

  const features = [
    { id: 'task-management', label: 'Task Management' },
    { id: 'crop-monitoring', label: 'Crop Monitoring' },
    { id: 'weather', label: 'Weather Updates' },
    { id: 'market-prices', label: 'Market Prices' },
    { id: 'finance', label: 'Financial Tools' },
    { id: 'peer-network', label: 'Community Hub' },
    { id: 'pest-alerts', label: 'Pest Alerts' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'education', label: 'Education & Guides' },
    { id: 'insurance', label: 'Insurance & Relief' },
    { id: 'marketplace', label: 'Equipment Marketplace' },
    { id: 'jobs', label: 'Jobs & Hiring' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button 
            onClick={() => navigate('/')}
            className="text-xl font-bold text-green-600"
          >
            Agri360
          </button>

          <div className="flex gap-8">
            <div className="relative group">
              <button
                onClick={onFeaturesClick}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                <Layout className="w-4 h-4" />
                Features
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="py-1">
                    {features.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => handleFeatureClick(feature.id)}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      >
                        {feature.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onMissionClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              <Target className="w-4 h-4" />
              Mission & Vision
            </button>

            <button
              onClick={onNewsClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              <Newspaper className="w-4 h-4" />
              News
            </button>

            <button
              onClick={onEnquiryClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Us
            </button>

            <button
              onClick={onAuthClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}