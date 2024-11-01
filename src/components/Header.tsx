import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut } from 'lucide-react';

interface HeaderProps {
  onAuthClick: () => void;
}

export function Header({ onAuthClick }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="fixed top-0 right-0 p-6 z-50">
      {isAuthenticated ? (
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.farmName || 'Farm not set'}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
              title="Profile"
            >
              <User className="h-5 w-5" />
            </button>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={onAuthClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 backdrop-blur-sm"
        >
          Sign in
        </button>
      )}
    </div>
  );
}