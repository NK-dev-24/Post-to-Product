import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ListingsPage from './pages/ListingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProductsPage from './pages/ProductsPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <main className="py-12">
                  <UploadSection />
                </main>
              </>
            } />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;