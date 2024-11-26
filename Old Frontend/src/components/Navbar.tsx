import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, BarChart3, ShoppingBag, Upload, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">ArjunWellness</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 ${
                location.pathname === '/' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Products</span>
            </Link>
            <Link 
              to="/analytics" 
              className={`flex items-center space-x-1 ${
                location.pathname === '/analytics' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/convert"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Convert Post</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-purple-600 flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  location.pathname === '/' ? 'bg-purple-50 text-purple-600' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Products</span>
              </Link>
              <Link 
                to="/analytics" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  location.pathname === '/analytics' ? 'bg-purple-50 text-purple-600' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/convert"
                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Upload className="h-4 w-4" />
                    <span>Convert Post</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 px-4 py-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}