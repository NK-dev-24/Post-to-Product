import { Package, ExternalLink, Search } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  title: string;
  timestamp: string;
  status: 'active' | 'pending' | 'failed';
  category: string;
  imageUrl: string;
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const dummyProducts: Product[] = [
    {
      id: '1',
      title: 'Smart Fitness Tracker Pro',
      timestamp: '2 hours ago',
      status: 'active',
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558'
    },
    {
      id: '2',
      title: 'Smart Fitness Tracker Pro',
      timestamp: '2 hours ago',
      status: 'active',
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558'
    }
  ];

  const filteredProducts = dummyProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
          <p className="mt-2 text-gray-600">View and manage your Amazon product listings</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900 truncate">
                        {product.title}
                      </h2>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        product.status === 'active' ? 'bg-green-100 text-green-800' :
                        product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {product.category}
                      </span>
                      <span>{product.timestamp}</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-500"
                  >
                    View Listing
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}