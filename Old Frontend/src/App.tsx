import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import ProductListing from './pages/ProductListing';
import Analytics from './pages/Analytics';
import ConvertPost from './pages/ConvertPost';
import Login from './pages/Login';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/product-listing" element={<ProductListing />} />
          <Route 
            path="/analytics" 
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/convert" 
            element={
              <PrivateRoute>
                <ConvertPost />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;