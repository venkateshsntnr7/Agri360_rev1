import React, { useState, useEffect } from 'react';
import { Briefcase, Filter, Search, Loader, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { JobListing } from './JobListing';
import { JobFilters } from './JobFilters';

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

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Seasonal Harvest Operator',
    type: 'seasonal',
    category: 'Field Operations',
    location: 'Springfield, IL',
    salary: {
      min: 20,
      max: 25,
      period: 'hour'
    },
    employer: {
      name: 'Green Valley Farms',
      logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&auto=format&fit=crop',
      verified: true
    },
    description: 'Seeking experienced combine operators for upcoming wheat harvest season. Must have previous experience with modern harvesting equipment.',
    requirements: [
      'Valid driver\'s license',
      '2+ years harvesting experience',
      'Equipment maintenance knowledge',
      'Flexible schedule during harvest season'
    ],
    postedAt: '2 days ago',
    deadline: '2024-04-15',
    applicants: 8
  },
  {
    id: '2',
    title: 'Agricultural Technician',
    type: 'full-time',
    category: 'Technical',
    location: 'Bloomington, IL',
    salary: {
      min: 45000,
      max: 65000,
      period: 'year'
    },
    employer: {
      name: 'AgriTech Solutions',
      logo: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=50&h=50&auto=format&fit=crop',
      verified: true
    },
    description: 'Looking for a skilled technician to maintain and repair agricultural equipment. Will work with precision farming technology.',
    requirements: [
      'Technical degree or equivalent experience',
      'Knowledge of precision agriculture systems',
      'Problem-solving skills',
      'Available for emergency repairs'
    ],
    postedAt: '1 week ago',
    deadline: '2024-04-30',
    applicants: 15
  },
  {
    id: '3',
    title: 'Farm Manager Assistant',
    type: 'full-time',
    category: 'Management',
    location: 'Decatur, IL',
    salary: {
      min: 40000,
      max: 55000,
      period: 'year'
    },
    employer: {
      name: 'Sunrise Acres',
      logo: 'https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?w=50&h=50&auto=format&fit=crop',
      verified: false
    },
    description: 'Assist in daily farm operations management, including staff supervision, inventory management, and crop planning.',
    requirements: [
      'Agriculture degree preferred',
      'Strong organizational skills',
      'Leadership experience',
      'Computer proficiency'
    ],
    postedAt: '3 days ago',
    deadline: '2024-05-15',
    applicants: 12
  }
];

export function JobMarketplace() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setJobs(MOCK_JOBS);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Post a Job
          </button>
        </div>
      </div>

      {/* Job Type Filters */}
      <div className="flex gap-2">
        {['all', 'full-time', 'part-time', 'seasonal', 'contract'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              selectedType === type
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs
          .filter(job => 
            (selectedType === 'all' || job.type === selectedType) &&
            (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             job.location.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map(job => (
            <JobListing key={job.id} job={job} />
          ))}

        {jobs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No jobs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}