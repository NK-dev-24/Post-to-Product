import { ArrowRight, Heart, Activity, Battery } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Track Your Fitness,{' '}
              <span className="text-indigo-600">Transform Your Life</span>
            </h1>
            <p className="text-xl text-gray-600">
              Experience the next generation of fitness tracking with our Smart Fitness Tracker.
              Advanced health monitoring meets elegant design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition flex items-center justify-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition">
                Learn More
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <Heart className="h-8 w-8 text-indigo-600 mx-auto" />
                  <p className="mt-2 font-semibold">Heart Rate</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <Activity className="h-8 w-8 text-indigo-600 mx-auto" />
                  <p className="mt-2 font-semibold">Activity</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <Battery className="h-8 w-8 text-indigo-600 mx-auto" />
                  <p className="mt-2 font-semibold">Battery Life</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&q=80"
              alt="Smart Fitness Tracker"
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>
      
      {/* Social Proof */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 opacity-50 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" alt="Samsung" className="h-8 opacity-50 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-8 opacity-50 hover:opacity-100 transition" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Google_logo_%282010-2013%29.svg" alt="Google" className="h-8 opacity-50 hover:opacity-100 transition" />
          </div>
        </div>
      </div>
    </div>
  );
}