import React from 'react';
import { Sparkles, TrendingUp, ShieldCheck, Package } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Social Media to Amazon Listing Converter
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your social media content into professional Amazon product listings with AI-powered automation
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold">AI-Powered Conversion</h3>
          </div>
          <p className="text-gray-600">
            Our advanced AI automatically extracts product details from your social media posts
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Performance Analytics</h3>
          </div>
          <p className="text-gray-600">
            Track your listing performance and optimize for better results
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <ShieldCheck className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold">Compliance Check</h3>
          </div>
          <p className="text-gray-600">
            Ensure your listings meet Amazon's guidelines and regulations
          </p>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Conversions</h2>
            <button className="text-purple-600 hover:text-purple-700">View All</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Package className="h-10 w-10 text-gray-400" />
                  <div>
                    <h4 className="font-medium">Smart Fitness Tracker Pro</h4>
                    <p className="text-sm text-gray-500">Converted 2 hours ago</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}