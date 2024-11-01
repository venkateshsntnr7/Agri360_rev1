import React, { useState } from 'react';
import { Camera, Upload, FileText, AlertTriangle } from 'lucide-react';

interface ClaimStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export function ClaimAssistant() {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploading, setUploading] = useState(false);

  const steps: ClaimStep[] = [
    {
      id: 'details',
      title: 'Incident Details',
      description: 'Provide information about what happened',
      completed: false
    },
    {
      id: 'documentation',
      title: 'Documentation',
      description: 'Upload photos and supporting documents',
      completed: false
    },
    {
      id: 'assessment',
      title: 'Damage Assessment',
      description: 'Estimate the extent of losses',
      completed: false
    },
    {
      id: 'review',
      title: 'Review & Submit',
      description: 'Verify information and submit claim',
      completed: false
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      // Simulate upload
      setTimeout(() => {
        setUploading(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex-1 ${index !== steps.length - 1 ? 'relative' : ''}`}
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {index + 1}
              </div>
              {index !== steps.length - 1 && (
                <div className={`flex-1 h-0.5 ${
                  index < currentStep ? 'bg-cyan-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-900">{step.title}</p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type of Incident
              </label>
              <select className="w-full border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500">
                <option>Natural Disaster</option>
                <option>Crop Disease</option>
                <option>Equipment Damage</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Incident
              </label>
              <input
                type="date"
                className="w-full border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Describe what happened..."
              />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Required Documentation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload damage photos</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="damage-photos"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="damage-photos"
                    className="inline-block px-4 py-2 bg-cyan-50 text-cyan-600 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    Select Photos
                  </label>
                </div>

                <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload supporting documents</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    className="hidden"
                    id="documents"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="documents"
                    className="inline-block px-4 py-2 bg-cyan-50 text-cyan-600 rounded-lg text-sm font-medium cursor-pointer"
                  >
                    Select Files
                  </label>
                </div>
              </div>
            </div>

            {uploading && (
              <div className="flex items-center gap-2 text-cyan-600">
                <Upload className="w-4 h-4 animate-bounce" />
                <span className="text-sm">Uploading files...</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm font-medium"
          >
            {currentStep === steps.length - 1 ? 'Submit Claim' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}