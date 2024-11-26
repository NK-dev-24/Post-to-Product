import React, { useState } from 'react';
import { Upload, X, RefreshCw, AlertCircle, Camera, Type, Tag, DollarSign } from 'lucide-react';
import type { SocialPost } from '../../../../New Amazon Frontend/src/types';

interface PreviewData {
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
}

export default function ConvertPost() {
  const [step, setStep] = useState<'upload' | 'preview' | 'processing'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState(''); // Input for the Instagram URL
  const [loading, setLoading] = useState(false); // Loading state

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    setError(null);
    setStep('processing');
    await fetchData(url); // Call the API to fetch data
  };

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files?.length) {
        handleDrop({ preventDefault: () => {} } as React.DragEvent<HTMLDivElement>);
      }
    };
    input.click();
  };

  const fetchData = async (url: string) => {
    if (!url) {
      setError('Please provide a valid Instagram URL.');
      setStep('upload');
      return;
    }

    setLoading(true);

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
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        dragActive ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Enter the Instagram Post URL</h3>
      <input
        type="text"
        placeholder="Paste Instagram Post URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <button
        onClick={() => fetchData(url)}
        disabled={loading}
        className={`mt-4 px-6 py-3 rounded-lg text-white font-semibold ${
          loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {loading ? 'Processing...' : 'Convert Post'}
      </button>
      {error && (
        <div className="mt-4 flex items-center justify-center text-red-500">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-6">Preview Amazon Listing</h3>

          <div className="space-y-6">
            {/* Product Images */}
            <div className="flex items-start space-x-4">
              <Camera className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
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
            </div>

            {/* Product Title */}
            <div className="flex items-start space-x-4">
              <Type className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                <input
                  type="text"
                  value={previewData.title}
                  onChange={(e) => setPreviewData({ ...previewData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Product Category */}
            <div className="flex items-start space-x-4">
              <Tag className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={previewData.category}
                  onChange={(e) => setPreviewData({ ...previewData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Product Description */}
            <div className="flex items-start space-x-4">
              <Type className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={previewData.description}
                  onChange={(e) => setPreviewData({ ...previewData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
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
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Create Listing
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-semibold mb-8">Convert Social Media Post</h2>
        
        {step === 'upload' && renderUploadStep()}
        {step === 'processing' && renderProcessingStep()}
        {step === 'preview' && renderPreviewStep()}
      </div>
    </div>
  );
}