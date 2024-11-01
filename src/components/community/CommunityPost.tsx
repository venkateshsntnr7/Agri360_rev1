import React from 'react';
import { MessageSquare, ThumbsUp, Award } from 'lucide-react';

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

interface CommunityPostProps {
  post: Post;
  onLike: () => void;
}

export function CommunityPost({ post, onLike }: CommunityPostProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start gap-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900">{post.author.name}</span>
            {post.author.role === 'expert' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                <Award className="w-3 h-3 mr-1" />
                Expert
              </span>
            )}
            {post.author.badges?.map((badge) => (
              <span
                key={badge}
                className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mb-2">
            <span className="text-sm text-gray-500">{post.timestamp}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm font-medium text-indigo-600">{post.topic}</span>
          </div>

          <p className="text-gray-800 mb-4">{post.content}</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onLike}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                post.isLiked
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{post.likes}</span>
            </button>

            <button className="flex items-center gap-1 px-3 py-1 rounded-full text-sm text-gray-500 hover:bg-gray-50">
              <MessageSquare className="w-4 h-4" />
              <span>{post.replies}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}