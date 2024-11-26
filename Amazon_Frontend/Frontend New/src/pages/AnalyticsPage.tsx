import { LineChart, BarChart, Activity, Clock, Package, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');

  const stats = [
    {
      title: 'Total Conversions',
      value: '1,234',
      change: '+12% from last month',
      icon: Activity,
      trend: 'up'
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+1.3% from last week',
      icon: TrendingUp,
      trend: 'up'
    },
    {
      title: 'Active Listings',
      value: '856',
      change: 'Across 32 categories',
      icon: Package,
      trend: 'neutral'
    },
    {
      title: 'Avg. Processing Time',
      value: '1.8s',
      change: '0.3s improvement',
      icon: Clock,
      trend: 'up'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your listing performance and conversion metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <stat.icon className="h-6 w-6 text-indigo-600" />
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Conversion Timeline</h2>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <LineChart className="h-8 w-8" />
              <span className="ml-2">Chart visualization would go here</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Category Distribution</h2>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <BarChart className="h-8 w-8" />
              <span className="ml-2">Chart visualization would go here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}