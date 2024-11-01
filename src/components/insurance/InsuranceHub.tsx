import React, { useState, useEffect } from 'react';
import { Umbrella, AlertTriangle, FileText, Phone, Loader, Shield } from 'lucide-react';
import { InsurancePlans } from './InsurancePlans';
import { ClaimAssistant } from './ClaimAssistant';
import { DisasterAlerts } from './DisasterAlerts';

export function InsuranceHub() {
  const [activeTab, setActiveTab] = useState<'plans' | 'claims' | 'alerts'>('plans');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Emergency Contact Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-700">
            <Phone className="w-5 h-5" />
            <span className="font-medium">24/7 Emergency Assistance:</span>
            <span>1-800-FARM-HELP</span>
          </div>
          <button className="text-sm text-red-600 hover:text-red-700 font-medium">
            Save Contact
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('plans')}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'plans'
              ? 'border-cyan-500 text-cyan-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Insurance Plans
          </div>
        </button>
        <button
          onClick={() => setActiveTab('claims')}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'claims'
              ? 'border-cyan-500 text-cyan-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            File a Claim
          </div>
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'alerts'
              ? 'border-cyan-500 text-cyan-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Disaster Alerts
          </div>
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'plans' && <InsurancePlans />}
        {activeTab === 'claims' && <ClaimAssistant />}
        {activeTab === 'alerts' && <DisasterAlerts />}
      </div>
    </div>
  );
}