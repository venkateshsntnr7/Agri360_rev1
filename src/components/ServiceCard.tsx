import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  children: React.ReactNode;
  className?: string;
}

export function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  iconBgColor, 
  iconColor, 
  children,
  className = ''
}: ServiceCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${className}`}>
      <div className={`h-12 w-12 ${iconBgColor} rounded-xl flex items-center justify-center mb-6`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {children}
    </div>
  );
}