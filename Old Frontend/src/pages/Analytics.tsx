import React from 'react';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Conversions</p>
              <p className="text-2xl font-semibold">1,234</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-500">↑ 12% increase</span>
            <span className="text-sm text-gray-500"> from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-semibold">94.2%</p>
            </div>
            <PieChart className="h-8 w-8 text-purple-500" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-500">↑ 3% increase</span>
            <span className="text-sm text-gray-500"> from last week</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Listings</p>
              <p className="text-2xl font-semibold">856</p>
            </div>
            <BarChart className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Across 12 categories</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Processing Time</p>
              <p className="text-2xl font-semibold">1.8s</p>
            </div>
            <LineChart className="h-8 w-8 text-orange-500" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-500">↓ 0.3s improvement</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Conversion Timeline</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
}