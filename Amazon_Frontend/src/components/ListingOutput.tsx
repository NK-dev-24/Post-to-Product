import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ListingData {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  features: string[];
  keywords: string[];
}

interface ListingOutputProps {
  listing: ListingData;
}

export default function ListingOutput({ listing }: ListingOutputProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-semibold text-gray-900">Generated Listing</h2>
          <button
            onClick={() => copyToClipboard(JSON.stringify(listing, null, 2))}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? 'Copied!' : 'Copy All'}
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Title</h3>
            <p className="mt-2 text-lg text-gray-900">{listing.title}</p>
          </div>

          {/* Price */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Price</h3>
            <p className="mt-2 text-lg text-gray-900">{formatPrice(listing.price)}</p>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Category</h3>
            <p className="mt-2 text-gray-900">{listing.category}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-2 text-gray-900 whitespace-pre-wrap">{listing.description}</p>
          </div>

          {/* Features */}
          {listing.features.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Key Features</h3>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {listing.features.map((feature, index) => (
                  <li key={index} className="text-gray-900">{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Keywords */}
          {listing.keywords.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Keywords</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {listing.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Images */}
          {listing.images.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Images</h3>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {listing.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <a
            href="https://sellercentral.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Open in Amazon Seller Central
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}