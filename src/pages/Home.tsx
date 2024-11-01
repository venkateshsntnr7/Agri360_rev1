import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { MissionVision } from '../components/MissionVision';
import { NewsSection } from '../components/news/NewsSection';
import { EnquiryForm } from '../components/EnquiryForm';

export function Home() {
  return (
    <>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80"
            alt="Farm field at sunset"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="text-green-600">Agri</span>360
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering farmers with digital tools for maximizing productivity, profitability, and resilience
            </p>
            <div className="mt-8">
              <button 
                className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MissionVision />
      <NewsSection />
      <EnquiryForm />

      <section className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers already using Agri360 to improve their yields and increase profitability.
          </p>
          <button 
            className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
          >
            Start Free Trial
          </button>
        </div>
      </section>

      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>© {new Date().getFullYear()} Agri360™. All rights reserved. Transforming Agriculture for a Sustainable Future.</p>
            <p className="mt-2 text-sm">
              Agri360 is a registered trademark. Patents pending. Developed with ❤️ for farmers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}