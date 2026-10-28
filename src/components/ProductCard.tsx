import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils/commerceLogic';
import { useWishlist } from '../context/WishlistContext';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  return (
    <div
      className="group flex flex-col h-full text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full bg-[#EBE7DF] overflow-hidden">
        <Link
          to={`/product/${product.slug}`}
          className="block w-full h-full relative"
          aria-label={`View details for ${product.name}`}
        >
          {/* Primary Image */}
          <ImageWithFallback
            src={product.images.primary}
            alt={product.name}
            fallbackTitle={product.name}
            className={`transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered && product.images.hover ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Alternate Hover Image */}
          {product.images.hover && (
            <ImageWithFallback
              src={product.images.hover}
              alt={`${product.name} alternate view`}
              fallbackTitle={product.name}
              className={`absolute inset-0 transition-all duration-700 ease-out group-hover:scale-105 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Subtle New / Edition Tag (Unboxed text tag, zero-pill discipline) */}
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-[#171717]/85 backdrop-blur-sm text-[#F8F6F1] px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-medium">
              New Season
            </div>
          )}
        </Link>

        {/* Wishlist Heart Button */}
        <button
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isSaved
              ? 'bg-[#171717] text-white shadow-md'
              : 'bg-[#F8F6F1]/90 text-[#171717] opacity-80 md:opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black shadow-sm'
          }`}
          aria-label={isSaved ? `Remove ${product.name} from saved pieces` : `Save ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : 'stroke-[1.5]'}`} />
        </button>

        {/* Quick Sizes Strip on Hover */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-between text-white text-xs">
          <span className="text-[10px] uppercase tracking-widest text-[#E8E4DC]">
            Sizes: {product.sizes.join(' · ')}
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="text-[10px] uppercase tracking-wider text-white underline underline-offset-2 hover:text-[#E8E4DC]"
          >
            Select
          </Link>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-4 pb-2 flex flex-col flex-grow justify-between">
        <div>
          {/* Category kicker */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#7E7569] mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-[#C0B9AF]">·</span>
            <span className="truncate max-w-[150px]">{product.collectionName.split(':')[0]}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base md:text-lg text-[#171717] font-normal leading-snug group-hover:text-[#635B50] transition-colors line-clamp-1">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>

        {/* Price & Colors row */}
        <div className="mt-2 pt-2 border-t border-[#E8E4DC]/60 flex items-center justify-between">
          <span className="font-sans font-medium text-sm text-[#171717] tabular-nums">
            {formatCurrency(product.price, product.currency)}
          </span>

          {/* Color swatch dots */}
          <div className="flex items-center gap-1.5" aria-label="Available colors">
            {product.colors.map(color => (
              <span
                key={color.name}
                title={color.name}
                className="w-2.5 h-2.5 rounded-full border border-black/15 shadow-2xs"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
