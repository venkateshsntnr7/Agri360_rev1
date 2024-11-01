import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, User, Users, Award, Search, Loader } from 'lucide-react';
import { CommunityPost } from './CommunityPost';
import { ExpertsList } from './ExpertsList';

interface Post {
  id: string;
  author: {
    name: string;
    role: 'farmer' | 'expert';
    avatar: string;
    badges?: string[];
  };
  content: string;
  topic: string;
  likes: number;
  replies: number;
  timestamp: string;
  isLiked?: boolean;
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: {
      name: 'John Smith',
      role: 'farmer',
      avatar: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=50&h=50&auto=format&fit=crop',
      badges: ['Verified Farmer']
    },
    content: "Has anyone tried companion planting with marigolds to control pests in their tomato fields? Looking for experiences and tips.",
    topic: 'Pest Control',
    likes: 24,
    replies: 8,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    author: {
      name: 'Dr. Sarah Wilson',
      role: 'expert',
      avatar: 'https://images.unsplash.com/photo-1594751543129-6701ad444259?w=50&h=50&auto=format&fit=crop',
      badges: ['Agricultural Scientist', 'Pest Management Expert']
    },
    content: "New research suggests that integrating cover crops can reduce fertilizer needs by up to 30%. Here's how to implement this in your rotation...",
    topic: 'Soil Management',
    likes: 56,
    replies: 15,
    timestamp: '1 day ago'
  },
  {
    id: '3',
    author: {
      name: 'Mike Johnson',
      role: 'farmer',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&auto=format&fit=crop'
    },
    content: "Looking for advice on drought-resistant wheat varieties suitable for semi-arid conditions. Any recommendations?",
    topic: 'Crop Selection',
    likes: 12,
    replies: 6,
    timestamp: '3 hours ago'
  }
];

export function CommunityHub() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'discussions' | 'experts'>('discussions');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPosts(MOCK_POSTS);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked
          }
        : post
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search discussions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('discussions')}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'discussions'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Discussions
          </div>
        </button>
        <button
          onClick={() => setActiveTab('experts')}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'experts'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Expert Connect
          </div>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'discussions' ? (
        <div className="space-y-4">
          {posts.map(post => (
            <CommunityPost
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
            />
          ))}
        </div>
      ) : (
        <ExpertsList />
      )}

      {/* Create Post Button */}
      <div className="flex justify-center pt-4">
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Start Discussion
        </button>
      </div>
    </div>
  );
}