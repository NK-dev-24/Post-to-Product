import React, { useState } from 'react';
import { Upload, X, Check, RefreshCw } from 'lucide-react';
import type { SocialPost, ConversionStatus } from '../../../../New Amazon Frontend/src/types';

interface PostConverterProps {
  onConvert: (post: SocialPost) => void;
}

export default function PostConverter({ onConvert }: PostConverterProps) {
  const [dragActive, setDragActive] = useState(false);
  const [converting, setConverting] = useState(false);
  const [status, setStatus] = useState<ConversionStatus[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    setConverting(true);
    
    // Simulate conversion process
    setStatus([
      { id: '1', status: 'completed', step: 'Content Analysis', progress: 100 },
      { id: '2', status: 'processing', step: 'Image Processing', progress: 60 },
      { id: '3', status: 'pending', step: 'Amazon Listing Creation', progress: 0 }
    ]);

    // Simulate API call
    setTimeout(() => {
      const mockPost: SocialPost = {
        id: Date.now().toString(),
        platform: 'instagram',
        content: 'Smart Fitness Tracker with advanced health monitoring',
        images: ['https://images.unsplash.com/photo-1557438159-51eec7a6c9e8'],
        timestamp: new Date().toISOString()
      };
      onConvert(mockPost);
      setConverting(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-lg mb-2">Drop your social media post here</p>
        <p className="text-sm text-gray-500 mb-4">or click to upload</p>
        <button 
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          Select Files
        </button>
        <input 
          id="fileInput" 
          type="file" 
          className="hidden" 
          onChange={() => {}} 
        />
      </div>

      {converting && (
        <div className="space-y-4">
          {status.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                {item.status === 'completed' && <Check className="h-5 w-5 text-green-500" />}
                {item.status === 'processing' && <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />}
                {item.status === 'pending' && <div className="h-5 w-5 rounded-full border-2 border-gray-300" />}
                <div>
                  <p className="font-medium">{item.step}</p>
                  <p className="text-sm text-gray-500">
                    {item.status === 'completed' && 'Completed'}
                    {item.status === 'processing' && 'Processing...'}
                    {item.status === 'pending' && 'Waiting...'}
                  </p>
                </div>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}