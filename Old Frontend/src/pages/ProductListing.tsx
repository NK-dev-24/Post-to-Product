import React, { useState } from 'react';
import type { AuthState, SocialPost } from '../../../../New Amazon Frontend/src/types';
import SocialAuth from '../components/SocialAuth';
import PostConverter from '../components/PostConverter';
import RecentConversions from '../components/RecentConversions';

export default function ProductListing() {
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false });
  const [conversions, setConversions] = useState<SocialPost[]>([]);

  const handleAuth = (platform: string) => {
    // Simulate authentication
    setAuth({
      isAuthenticated: true,
      platform: platform as AuthState['platform'],
      username: 'arjun_wellness'
    });
  };

  const handleConversion = (post: SocialPost) => {
    setConversions(prev => [post, ...prev]);
  };

  if (!auth.isAuthenticated) {
    return <SocialAuth onAuth={handleAuth} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Create New Product Listing</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Connected as</span>
            <span className="text-sm font-medium">{auth.username}</span>
            <button 
              onClick={() => setAuth({ isAuthenticated: false })}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Disconnect
            </button>
          </div>
        </div>
        
        <PostConverter onConvert={handleConversion} />
      </div>

      {conversions.length > 0 && <RecentConversions conversions={conversions} />}
    </div>
  );
}