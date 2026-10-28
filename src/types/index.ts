export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductDetailsInfo {
  materials: string[];
  care: string[];
  fit: string;
  origin: string;
  modelSpecs?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  currency: string;
  category: 'Outerwear' | 'Tailoring' | 'Dresses' | 'Knitwear' | 'Trousers' | 'Accessories';
  collectionSlug: string;
  collectionName: string;
  images: {
    primary: string;
    hover: string;
    gallery: string[];
  };
  colors: ProductColor[];
  sizes: string[];
  description: string;
  details: ProductDetailsInfo;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  season: string;
  year: string;
  subtitle: string;
  description: string;
  quote: string;
  coverImage: string;
  editorialImages: string[];
  productCount: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Fashion Photography' | 'Styling' | 'Creative Direction' | 'Brand Identity' | 'Editorial Campaigns' | 'Lookbooks';
  year: string;
  role: string;
  clientOrBrand: string;
  brief: string;
  concept: string;
  process: string;
  coverImage: string;
  galleryImages: {
    url: string;
    caption?: string;
    aspectRatio?: 'landscape' | 'portrait' | 'square';
  }[];
  credits?: {
    photographer?: string;
    artDirection?: string;
    styling?: string;
    model?: string;
    hairMakeup?: string;
    location?: string;
  };
  nextSlug?: string;
  prevSlug?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface FilterOptions {
  category: string;
  size: string;
  color: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc';
}
