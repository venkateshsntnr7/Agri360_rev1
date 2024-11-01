import React from 'react';
import { MapPin, Clock, DollarSign, Users, Briefcase, CheckCircle } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  type: 'full-time' | 'part-time' | 'seasonal' | 'contract';
  category: string;
  location: string;
  salary: {
    min: number;
    max: number;
    period: 'hour' | 'month' | 'year';
  };
  employer: {
    name: string;
    logo: string;
    verified: boolean;
  };
  description: string;
  requirements: string[];
  postedAt: string;
  deadline: string;
  applicants: number;
}

interface JobListingProps {
  job: Job;
}

export function JobListing({ job }: JobListingProps) {
  const getTypeColor = (type: Job['type']) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'seasonal':
        return 'bg-orange-100 text-orange-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
    }
  };

  const formatSalary = (salary: Job['salary']) => {
    const formatNumber = (num: number) => 
      num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num;

    const period = salary.period === 'year' ? '/yr' : 
                  salary.period === 'month' ? '/mo' : '/hr';

    return `$${formatNumber(salary.min)} - $${formatNumber(salary.max)}${period}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={job.employer.logo}
          alt={job.employer.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                {job.employer.verified && (
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                )}
              </div>
              
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Briefcase className="w-4 h-4" />
                  {job.employer.name}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(job.type)}`}>
                {job.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
              <span className="text-sm text-gray-500">
                {job.applicants} applicants
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {formatSalary(job.salary)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Posted {job.postedAt}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {job.category}
            </div>
          </div>

          <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.requirements.slice(0, 3).map((req, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
              >
                {req}
              </span>
            ))}
            {job.requirements.length > 3 && (
              <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                +{job.requirements.length - 3} more
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Apply before {new Date(job.deadline).toLocaleDateString()}
            </span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}