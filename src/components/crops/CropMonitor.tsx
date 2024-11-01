import React, { useState } from 'react';
import { Camera, Upload, Leaf, AlertTriangle, Loader } from 'lucide-react';
import { CropHealth } from './CropHealth';
import { CropRecommendations } from './CropRecommendations';
import { SoilAnalysis } from './SoilAnalysis';

export function CropMonitor() {
  const [activeTab, setActiveTab] = useState<'health' | 'recommendations' | 'soil'>('health');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      // Simulate image analysis
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="crop-image-upload"
        />
        <label
          htmlFor="crop-image-upload"
          className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 transition-colors cursor-pointer"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Camera className="w-8 h-8" />
            <span className="text-sm font-medium">Upload crop photo for analysis</span>
            <span className="text-xs">or drag and drop image here</span>
          </div>
        </label>

        {isAnalyzing && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
            <div className="flex items-center gap-2">
              <Loader className="w-5 h-5 text-emerald-500 animate-spin" />
              <span className="text-sm font-medium text-gray-600">Analyzing image...</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: 'health', label: 'Health Analysis', icon: Leaf },
          { id: 'recommendations', label: 'Recommendations', icon: AlertTriangle },
          { id: 'soil', label: 'Soil Analysis', icon: Upload }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="min-h-[300px]">
        {activeTab === 'health' && <CropHealth />}
        {activeTab === 'recommendations' && <CropRecommendations />}
        {activeTab === 'soil' && <SoilAnalysis />}
      </div>
    </div>
  );
}