import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/commerceLogic';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Wishlist: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen pt-40 pb-24 px-6 text-center max-w-xl mx-auto space-y-6 text-[#171717]">
        <span className="editorial-subheading">Saved Pieces</span>
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-tight">
          Your Saved Archive is Empty
        </h1>
        <p className="text-sm text-[#7E7569] font-light leading-relaxed">
          Save your favorite runway tailoring, silk slip gowns, and cashmere pieces while you curate your wardrobe.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171717] text-[#F8F6F1] text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#171717]">
      {/* Header */}
      <div className="mb-12 border-b border-[#E8E4DC] pb-6 flex items-baseline justify-between">
        <div>
          <span className="editorial-subheading">Curated Selections</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight font-normal text-[#171717] mt-1">
            SAVED PIECES ({wishlistCount}).
          </h1>
        </div>

        <button
          onClick={clearWishlist}
          className="text-xs uppercase tracking-wider text-[#7E7569] hover:text-[#B91C1C] transition-colors"
        >
          Clear Wishlist
        </button>
      </div>

      {/* Grid of Saved Pieces */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {items.map(({ product }) => (
          <div key={product.id} className="group flex flex-col space-y-4">
            {/* Image */}
            <div className="relative aspect-[3/4] w-full bg-[#EBE7DF] overflow-hidden">
              <Link to={`/product/${product.slug}`} className="block w-full h-full relative">
                <ImageWithFallback
                  src={product.images.primary}
                  alt={product.name}
                  fallbackTitle={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>

              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 text-[#171717] rounded-full hover:bg-black hover:text-white transition-colors shadow-xs"
                aria-label={`Remove ${product.name} from saved archive`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#7E7569]">
                <span>{product.category}</span>
                <span className="font-mono tabular-nums text-black font-semibold text-xs">
                  {formatCurrency(product.price, product.currency)}
                </span>
              </div>

              <h3 className="font-serif text-lg font-normal text-[#171717] group-hover:text-[#635B50] transition-colors">
                <Link to={`/product/${product.slug}`}>{product.name}</Link>
              </h3>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() =>
                    addToCart(
                      product,
                      product.colors[0],
                      product.sizes[0] || 'One Size'
                    )
                  }
                  className="flex-1 py-2.5 bg-[#171717] hover:bg-black text-[#F8F6F1] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </button>

                <Link
                  to={`/product/${product.slug}`}
                  className="px-4 py-2.5 border border-[#171717] text-xs uppercase tracking-wider text-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
