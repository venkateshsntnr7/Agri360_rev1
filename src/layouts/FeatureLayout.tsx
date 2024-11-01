import React from 'react';
import { Outlet } from 'react-router-dom';

export function FeatureLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <Outlet />
      </div>
    </div>
  );
}