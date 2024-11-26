import React, { useState } from 'react';
import { Link, Upload, Search, AlertCircle, RefreshCw } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

interface PreviewData {
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
}

export default function ConvertPost() {
  const [step, setStep] = useState<'upload' | 'preview' | 'processing'>('upload');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    if (!url) {
      setError('Please provide a valid Instagram URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setStep('processing');

    try {
      const response = await fetch('http://127.0.0.1:8000/generate_amazon_listing/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const data = await response.json();
        setPreviewData({
          title: data.title,
          description: data.description,
          price: data.price || 'N/A',
          category: data.category || 'N/A',
          images: data.images || [],
        });
        setStep('preview');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch data.');
        setStep('upload');
      }
    } catch (err) {
      setError('An error occurred while connecting to the API.');
      setStep('upload');
    } finally {
      setLoading(false);
    }
  };

  const renderUploadStep = () => (
    <div className="space-y-4">
      <p className="text-gray-600">Enter the URL of your social media post:</p>
      <div className="flex gap-4">
        <input
          type="url"
          placeholder="https://instagram.com/p/..."
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={fetchData}
          disabled={loading}
          className={`btn-primary whitespace-nowrap ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze URL'}
        </button>
      </div>
      {error && (
        <div className="flex items-center text-red-500 mt-2">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  const renderProcessingStep = () => (
    <div className="text-center py-12">
      <RefreshCw className="h-12 w-12 mx-auto text-purple-600 animate-spin mb-4" />
      <h3 className="text-xl font-semibold mb-2">Processing your content</h3>
      <p className="text-gray-500">This will just take a moment...</p>
    </div>
  );

  const renderPreviewStep = () => {
    if (!previewData) return null;

    return (
      <div className="space-y-8">
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6">Preview Amazon Listing</h3>

          <div className="space-y-6">
            {/* Product Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
              <div className="flex space-x-4">
                {previewData.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Product ${idx + 1}`}
                    className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                  />
                ))}
              </div>
            </div>

            {/* Product Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
              <input
                type="text"
                value={previewData.title}
                onChange={(e) => setPreviewData({ ...previewData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Product Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={previewData.category}
                onChange={(e) => setPreviewData({ ...previewData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={previewData.description}
                onChange={(e) => setPreviewData({ ...previewData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => setStep('upload')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Start Over
            </button>
            <button
              onClick={() => {
                alert('Listing created successfully!');
                setStep('upload');
                setPreviewData(null);
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Create Listing
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search your posts or paste URL..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8">
          {step === 'upload' && renderUploadStep()}
          {step === 'processing' && renderProcessingStep()}
          {step === 'preview' && renderPreviewStep()}
        </div>
      </div>
    </>
  );
}