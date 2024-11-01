import React, { useState, useEffect } from 'react';
import { Newspaper, ArrowRight, Loader, BookOpen } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: 'news' | 'technique';
  imageUrl: string;
  source: string;
  date: string;
  readTime: string;
}

const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'Precision Agriculture: AI-Powered Crop Monitoring',
    summary: 'New satellite imaging technology combined with AI helps farmers detect crop health issues weeks before visible symptoms appear.',
    category: 'technique',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400',
    source: 'AgTech Weekly',
    date: 'Today',
    readTime: '4 min read'
  },
  {
    id: '2',
    title: 'Sustainable Farming Practices Show 40% Yield Increase',
    summary: 'Recent study reveals regenerative agriculture techniques significantly improve soil health and crop yields.',
    category: 'news',
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c10?auto=format&fit=crop&q=80&w=400',
    source: 'Farm Innovation',
    date: '2 hours ago',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Vertical Farming: The Future of Urban Agriculture',
    summary: 'Indoor vertical farming systems are revolutionizing urban food production with 95% less water usage.',
    category: 'technique',
    imageUrl: 'https://images.unsplash.com/photo-1595074475099-69284aff0337?auto=format&fit=crop&q=80&w=400',
    source: 'Future Farming',
    date: '1 day ago',
    readTime: '5 min read'
  },
  {
    id: '4',
    title: 'New Drought-Resistant Crop Varieties Released',
    summary: 'Scientists develop climate-resilient crop varieties that can thrive in water-stressed conditions.',
    category: 'news',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400',
    source: 'Crop Science Today',
    date: '2 days ago',
    readTime: '3 min read'
  }
];

export function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'news' | 'technique'>('all');

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setArticles(MOCK_NEWS);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredArticles = articles.filter(article => 
    activeCategory === 'all' || article.category === activeCategory
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Agricultural Insights</h2>
            <p className="mt-2 text-gray-600">Stay updated with the latest farming news and techniques</p>
          </div>
          
          <div className="flex gap-2">
            {(['all', 'news', 'technique'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    article.category === 'news'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {article.category === 'news' ? (
                      <Newspaper className="w-3 h-3 inline-block mr-1" />
                    ) : (
                      <BookOpen className="w-3 h-3 inline-block mr-1" />
                    )}
                    {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">{article.source}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <button className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1">
                    Read more <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}