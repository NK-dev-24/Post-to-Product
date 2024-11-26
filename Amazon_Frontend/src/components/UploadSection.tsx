import { useNavigate } from 'react-router-dom';

export default function UploadSection() {
  const navigate = useNavigate();

  const navigateToListings = () => {
    // Demo content data similar to the previous implementation
    const dummyContentData = {
      title: "Sample Product",
      description: "A demo product for quick navigation",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
      ],
      tags: ["demo", "sample"],
      price: 99.99
    };

    navigate('/listings', {
      state: {
        contentData: dummyContentData,
        sourceType: 'demo'
      }
    });
  };

  return (
    <div className="">
      <div className="text-center">
        <button 
          onClick={navigateToListings}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Convert Instagram Post 
        </button>
      </div>
    </div>
  );
}