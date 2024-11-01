import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Calendar, Award, Search, Loader, Filter } from 'lucide-react';
import { CourseCard } from './CourseCard';
import { SeasonalTips } from './SeasonalTips';
import { PracticeGuides } from './PracticeGuides';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  progress?: number;
}

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Sustainable Farming Practices',
    description: 'Learn key principles of sustainable agriculture and how to implement them in your farm.',
    duration: '2.5 hours',
    level: 'beginner',
    category: 'Sustainability',
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
    instructor: {
      name: 'Dr. Sarah Wilson',
      title: 'Agricultural Scientist',
      avatar: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?w=50&h=50&auto=format&fit=crop'
    },
    progress: 45
  },
  {
    id: '2',
    title: 'Advanced Irrigation Techniques',
    description: 'Master modern irrigation systems and water management strategies.',
    duration: '3 hours',
    level: 'advanced',
    category: 'Water Management',
    thumbnail: 'https://images.unsplash.com/photo-1463123081488-789f998ac9c4?w=800&auto=format&fit=crop',
    instructor: {
      name: 'Prof. Michael Chen',
      title: 'Irrigation Specialist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&auto=format&fit=crop'
    }
  },
  {
    id: '3',
    title: 'Organic Pest Control',
    description: 'Natural and effective methods for managing pests in organic farming.',
    duration: '2 hours',
    level: 'intermediate',
    category: 'Pest Management',
    thumbnail: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?w=800&auto=format&fit=crop',
    instructor: {
      name: 'Dr. Emily Rodriguez',
      title: 'Organic Farming Expert',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&auto=format&fit=crop'
    },
    progress: 80
  }
];

export function EducationHub() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'courses' | 'seasonal' | 'guides'>('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | Course['level']>('all');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCourses(MOCK_COURSES);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'courses'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Courses
          </div>
        </button>
        <button
          onClick={() => setActiveTab('seasonal')}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'seasonal'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Seasonal Tips
          </div>
        </button>
        <button
          onClick={() => setActiveTab('guides')}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'guides'
              ? 'border-purple-500 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Best Practices
          </div>
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'courses' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter(course => 
                (filter === 'all' || course.level === filter) &&
                (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 course.description.toLowerCase().includes(searchQuery.toLowerCase()))
              )
              .map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            }
          </div>
        )}
        {activeTab === 'seasonal' && <SeasonalTips />}
        {activeTab === 'guides' && <PracticeGuides />}
      </div>
    </div>
  );
}