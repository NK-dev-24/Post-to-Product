import React from 'react';
import { Package, ExternalLink } from 'lucide-react';
import type { SocialPost } from '../../../../New Amazon Frontend/src/types';

interface RecentConversionsProps {
  conversions: SocialPost[];
}

export default function RecentConversions({ conversions }: RecentConversionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Conversions</h2>
          <button className="text-purple-600 hover:text-purple-700">View All</button>
        </div>
        
        <div className="space-y-4">
          {conversions.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img 
                  src={post.images[0]} 
                  alt="Product" 
                  className="h-16 w-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium">{post.content}</h4>
                  <p className="text-sm text-gray-500">
                    Converted from {post.platform} • {new Date(post.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-700">
                <span>View</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}