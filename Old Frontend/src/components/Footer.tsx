import React from 'react';
import { Activity, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Activity className="h-6 w-6 text-purple-600" />
            <span className="text-lg font-semibold text-gray-800">ArjunWellness</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-purple-600">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          © 2024 ArjunWellness. All rights reserved.
        </div>
      </div>
    </footer>
  );
}