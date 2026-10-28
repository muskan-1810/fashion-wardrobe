import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/commerceLogic';
import { ImageWithFallback } from './ImageWithFallback';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalCount,
  } = useCart();

  const navigate = useNavigate();
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (!isCartOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag Drawer"
      className="fixed inset-0 z-50 bg-[#171717]/50 backdrop-blur-xs flex justify-end transition-opacity duration-300"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="w-full max-w-md h-full bg-[#F8F6F1] text-[#171717] flex flex-col justify-between shadow-2xl relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E8E4DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl tracking-wide uppercase font-medium">
              Shopping Bag
            </h2>
            <span className="text-xs font-mono text-[#7E7569] tabular-nums">
              ({totalCount})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#544D44] hover:text-black transition-colors"
            aria-label="Close shopping bag drawer"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Complimentary Shipping Progress Banner */}
        <div className="bg-[#EFECE4] px-6 py-3 border-b border-[#E5E0D6] text-xs text-[#544D44]">
          {remainingForFreeShipping > 0 ? (
            <p>
              Add <span className="font-semibold text-black">{formatCurrency(remainingForFreeShipping)}</span> more for complimentary worldwide courier.
            </p>
          ) : (
            <p className="font-medium text-[#1E5C38] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Complimentary worldwide courier applied.
            </p>
          )}
          <div className="w-full bg-[#D8D2C5] h-1 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#171717] h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List / Empty State */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-14 h-14 rounded-full border border-[#D5CFC5] flex items-center justify-center text-[#7E7569]">
                <svg
                  className="w-6 h-6 stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.2"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg text-[#171717]">
                  Your bag is currently empty.
                </p>
                <p className="text-xs text-[#7E7569] max-w-xs font-light">
                  Pieces in our collection are cut in strictly limited editions to ensure tailoring precision.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="mt-4 px-6 py-2.5 bg-[#171717] text-[#F8F6F1] text-xs uppercase tracking-widest hover:bg-black transition-colors"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#E8E4DC]">
              {items.map(item => (
                <div
                  key={`${item.productId}-${item.selectedColor.name}-${item.selectedSize}`}
                  className="pt-4 first:pt-0 pb-4 flex gap-4"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#ECE8E1] shrink-0 overflow-hidden relative">
                    <ImageWithFallback
                      src={item.product.images.primary}
                      alt={item.product.name}
                      fallbackTitle={item.product.name}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-sm font-normal text-[#171717] line-clamp-1">
                          <Link
                            to={`/product/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="hover:underline"
                          >
                            {item.product.name}
                          </Link>
                        </h4>
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.productId,
                              item.selectedColor.name,
                              item.selectedSize
                            )
                          }
                          className="text-[#968E82] hover:text-[#B91C1C] transition-colors p-0.5"
                          aria-label={`Remove ${item.product.name} from bag`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#7E7569] mt-1 space-x-2">
                        <span>Size: <strong className="font-medium text-black">{item.selectedSize}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>Color: <strong className="font-medium text-black">{item.selectedColor.name}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
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
                          className="p-1.5 text-[#544D44] hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono tabular-nums">
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
                          className="p-1.5 text-[#544D44] hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <span className="text-xs font-medium tabular-nums text-black">
                        {formatCurrency(item.product.price * item.quantity, item.product.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer with Subtotal & CTAs */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E8E4DC] bg-[#F4F1EA] space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-wider text-xs text-[#635B50]">
                Estimated Subtotal
              </span>
              <span className="font-medium font-sans text-base tabular-nums">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <p className="text-[11px] text-[#7E7569] leading-tight">
              Taxes &amp; customs calculated at checkout. Complimentary courier on orders exceeding $500.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3.5 bg-[#171717] hover:bg-black text-[#F8F6F1] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/cart');
                }}
                className="w-full py-2.5 border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white text-xs uppercase tracking-[0.16em] transition-colors"
              >
                View Full Bag ({totalCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
