import React from 'react';
import { Target, Compass, Users, Leaf } from 'lucide-react';

interface ValueProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Value({ icon, title, description }: ValueProps) {
  return (
    <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex-shrink-0">
        <div className="p-3 bg-green-50 rounded-lg">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export function MissionVision() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
          <p className="text-lg text-gray-600">
            Empowering farmers with innovative technology and sustainable solutions for a more productive and resilient agricultural future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-lg mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize farming through digital innovation, providing farmers with the tools and insights they need to maximize yields, reduce risks, and build sustainable agricultural businesses.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-lg mb-4">
                <Compass className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To create a future where every farmer has access to advanced agricultural technology, enabling them to thrive in an increasingly complex global market while promoting environmental stewardship.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <Value
              icon={<Users className="w-5 h-5 text-green-600" />}
              title="Farmer-First Approach"
              description="Every feature and decision is made with our farmers' success in mind, ensuring practical solutions that address real needs."
            />
            <Value
              icon={<Leaf className="w-5 h-5 text-green-600" />}
              title="Sustainable Innovation"
              description="We promote farming practices that are both profitable and environmentally responsible, ensuring long-term success."
            />
          </div>
        </div>
      </div>
    </section>
  );
}