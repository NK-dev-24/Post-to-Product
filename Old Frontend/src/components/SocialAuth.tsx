import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

interface SocialAuthProps {
  onAuth: (platform: string) => void;
}

export default function SocialAuth({ onAuth }: SocialAuthProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Connect Your Social Media</h2>
      <p className="text-gray-600 mb-8">
        Connect your social media account to start converting your posts into Amazon listings.
      </p>
      
      <div className="space-y-4">
        <button
          onClick={() => onAuth('instagram')}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Instagram className="h-5 w-5" />
          <span>Connect Instagram</span>
        </button>
        
        <button
          onClick={() => onAuth('facebook')}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          <Facebook className="h-5 w-5" />
          <span>Connect Facebook</span>
        </button>
        
        <button
          onClick={() => onAuth('twitter')}
          className="w-full flex items-center justify-center space-x-2 bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600"
        >
          <Twitter className="h-5 w-5" />
          <span>Connect Twitter</span>
        </button>
      </div>
    </div>
  );
}