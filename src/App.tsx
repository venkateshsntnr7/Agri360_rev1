import React, { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { Home } from './pages/Home';
import { FeatureLayout } from './layouts/FeatureLayout';
import { TaskManager } from './components/tasks/TaskManager';
import { CropMonitor } from './components/crops/CropMonitor';
import { CommunityHub } from './components/community/CommunityHub';
import { PestAlerts } from './components/alerts/PestAlerts';
import { InventoryManager } from './components/inventory/InventoryManager';
import { WeatherUpdate } from './components/weather/WeatherUpdate';
import { PriceTracker } from './components/market/PriceTracker';
import { FinanceMonitor } from './components/finance/FinanceMonitor';
import { EducationHub } from './components/education/EducationHub';
import { InsuranceHub } from './components/insurance/InsuranceHub';
import { MarketplaceHub } from './components/marketplace/MarketplaceHub';
import { JobMarketplace } from './components/jobs/JobMarketplace';

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Refs for scroll targets
  const featuresRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const newsRef = useRef<HTMLElement>(null);
  const enquiryRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Navigation 
          onFeaturesClick={() => scrollToSection(featuresRef)}
          onMissionClick={() => scrollToSection(missionRef)}
          onNewsClick={() => scrollToSection(newsRef)}
          onEnquiryClick={() => scrollToSection(enquiryRef)}
          onAuthClick={() => setIsAuthModalOpen(true)}
        />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<FeatureLayout />}>
            <Route path="task-management" element={<TaskManager />} />
            <Route path="crop-monitoring" element={<CropMonitor />} />
            <Route path="peer-network" element={<CommunityHub />} />
            <Route path="pest-alerts" element={<PestAlerts />} />
            <Route path="inventory" element={<InventoryManager />} />
            <Route path="weather" element={<WeatherUpdate />} />
            <Route path="market-prices" element={<PriceTracker />} />
            <Route path="finance" element={<FinanceMonitor />} />
            <Route path="education" element={<EducationHub />} />
            <Route path="insurance" element={<InsuranceHub />} />
            <Route path="marketplace" element={<MarketplaceHub />} />
            <Route path="jobs" element={<JobMarketplace />} />
          </Route>
        </Routes>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </AuthProvider>
  );
}