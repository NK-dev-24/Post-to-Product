import { ArrowRight } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Transform Your Social Media Posts into{' '}
            <span className="text-indigo-600 inline-block animate-fade-in-up">Amazon Listings</span>{' '}
            Effortlessly!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Convert your social media content into professional Amazon product listings in seconds using AI-powered automation.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 pt-8 max-w-2xl mx-auto">
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
              <div className="font-bold text-2xl sm:text-3xl text-indigo-600">50K+</div>
              <div className="text-sm sm:text-base text-gray-600">Active Users</div>
            </div>
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
              <div className="font-bold text-2xl sm:text-3xl text-indigo-600">1M+</div>
              <div className="text-sm sm:text-base text-gray-600">Listings Created</div>
            </div>
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm col-span-2 md:col-span-1">
              <div className="font-bold text-2xl sm:text-3xl text-indigo-600">4.9/5</div>
              <div className="text-sm sm:text-base text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-50/50 to-transparent -z-10"></div>
      <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 blur-3xl"></div>
      </div>
    </div>
  );
}