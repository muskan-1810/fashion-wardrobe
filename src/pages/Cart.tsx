import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/commerceLogic';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Cart: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    tax,
    total,
    totalCount,
  } = useCart();

  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-24 px-6 text-center max-w-xl mx-auto space-y-6">
        <span className="editorial-subheading">Shopping Bag</span>
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-[#171717]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-[#7E7569] font-light leading-relaxed">
          Pieces in our catalog are produced in strictly numbered, sequential editions. Explore our latest tailoring and evening silhouettes.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171717] text-[#F8F6F1] text-xs uppercase tracking-[0.2em] font-medium hover:bg-black transition-colors"
          >
            <span>Discover Ready to Wear</span>
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
          <span className="editorial-subheading">Order Manifest</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight font-normal text-[#171717] mt-1">
            SHOPPING BAG.
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs uppercase tracking-wider text-[#7E7569] hover:text-[#B91C1C] transition-colors"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Itemized Table (col-span-8) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="divide-y divide-[#E8E4DC] border-b border-[#E8E4DC]">
            {items.map(item => (
              <div
                key={`${item.productId}-${item.selectedColor.name}-${item.selectedSize}`}
                className="py-6 first:pt-0 flex flex-col sm:flex-row gap-6 items-start"
              >
                {/* Thumbnail */}
                <div className="w-28 sm:w-32 aspect-[3/4] bg-[#ECE8E1] shrink-0 overflow-hidden relative">
                  <ImageWithFallback
                    src={item.product.images.primary}
                    alt={item.product.name}
                    fallbackTitle={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between self-stretch">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#7E7569]">
                          {item.product.category}
                        </span>
                        <h3 className="font-serif text-lg font-normal text-black hover:underline">
                          <Link to={`/product/${item.product.slug}`}>{item.product.name}</Link>
                        </h3>
                      </div>

                      <span className="font-sans font-medium text-base tabular-nums">
                        {formatCurrency(item.product.price * item.quantity, item.product.currency)}
                      </span>
                    </div>

                    <div className="text-xs text-[#635B50] space-x-3">
                      <span>Size: <strong className="text-black font-semibold">{item.selectedSize}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>Color: <strong className="text-black font-semibold">{item.selectedColor.name}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#8C8377]">Unit: {formatCurrency(item.product.price, item.product.currency)}</span>
                    </div>
                  </div>

                  {/* Quantity & Removal */}
                  <div className="pt-4 flex items-center justify-between border-t border-[#E8E4DC]/60 mt-4">
                    <div className="flex items-center border border-[#D5CFC5] bg-white">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.selectedColor.name,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="px-2.5 py-1 text-[#544D44] hover:text-black hover:bg-[#F2EFE8]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-mono text-xs tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.selectedColor.name,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="px-2.5 py-1 text-[#544D44] hover:text-black hover:bg-[#F2EFE8]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.productId,
                          item.selectedColor.name,
                          item.selectedSize
                        )
                      }
                      className="text-xs uppercase tracking-wider text-[#9E9589] hover:text-[#B91C1C] transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Packaging & Archival Care Note */}
          <div className="p-6 bg-[#F4F1EA] border border-[#E8E4DC] flex items-start gap-4 text-xs text-[#544D44]">
            <Gift className="w-5 h-5 text-[#2C2926] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-sm font-medium uppercase text-black">
                Complimentary Atelier Presentation Packaging
              </h4>
              <p className="mt-1 leading-relaxed">
                All garments arrive encased in breathable raw organic cotton garment covers with handcrafted wooden archival hangers and numbered verification certificate cards.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Order Summary (col-span-4) */}
        <div className="lg:col-span-4 p-8 bg-[#F4F1EA] border border-[#E8E4DC] space-y-6">
          <h3 className="font-serif text-xl uppercase tracking-wide text-[#171717] font-medium border-b border-[#E0D9CE] pb-3">
            Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-[#635B50]">
              <span>Items Total ({totalCount})</span>
              <span className="font-mono tabular-nums text-black">{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-[#635B50]">
              <span>Estimated Shipping</span>
              <span className="font-mono tabular-nums text-black">
                {shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}
              </span>
            </div>

            <div className="flex justify-between text-[#635B50]">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-mono tabular-nums text-black">{formatCurrency(tax)}</span>
            </div>

            <div className="pt-4 border-t border-[#E0D9CE] flex justify-between text-base font-semibold text-black">
              <span className="font-serif uppercase tracking-wider">Total</span>
              <span className="font-sans tabular-nums">{formatCurrency(total)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-[#171717] hover:bg-black text-[#F8F6F1] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="pt-2 space-y-2 text-[11px] text-[#7E7569] leading-tight">
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2C2926]" />
              <span>Complimentary insured worldwide courier above $500.</span>
            </p>
            <p>14-day archival collection returns policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
