export const generateDummyListing = (contentData: any) => {
  // Generate a price between $19.99 and $299.99
  const price = Math.floor(Math.random() * (29999 - 1999) + 1999) / 100;

  // Sample features based on content type
  const features = [
    "Premium quality materials",
    "Durable construction",
    "Easy to use",
    "Modern design",
    "Satisfaction guaranteed",
    "Fast shipping"
  ];

  // Sample keywords
  const keywords = [
    "trending",
    "bestseller",
    "premium",
    "quality",
    "popular",
    "recommended"
  ];

  return {
    title: contentData.title || "Premium Product Listing",
    description: contentData.description || "High-quality product perfect for your needs. Features premium materials and expert craftsmanship.",
    price,
    category: "General",
    images: contentData.images || [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    ],
    features: features.slice(0, 3 + Math.floor(Math.random() * 3)), // Random 3-5 features
    keywords: keywords.slice(0, 3 + Math.floor(Math.random() * 3)) // Random 3-5 keywords
  };
};

export const generateDummyListings = (contentData: any) => {
  // Generate 2-4 variations of listings
  const numListings = 2 + Math.floor(Math.random() * 3);
  return Array(numListings).fill(null).map(() => generateDummyListing(contentData));
};