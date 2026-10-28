import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { mainNavLinks } from '../data/navigation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isTransparent
            ? 'bg-transparent py-6 text-white'
            : 'bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#E8E4DC] py-4 text-[#171717] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-2 whitespace-nowrap shrink-0 text-decoration-none"
            aria-label="Atelier Noir Home"
          >
            <span
              className={`font-serif tracking-[0.25em] text-xl md:text-2xl uppercase font-medium transition-colors ${
                isTransparent ? 'text-white' : 'text-[#171717]'
              }`}
            >
              ATELIER NOIR
            </span>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            className={`hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium transition-colors ${
              isTransparent ? 'text-white/90' : 'text-[#4A453F]'
            }`}
            aria-label="Main Navigation"
          >
            {mainNavLinks.map(link => {
              const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative py-1 transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? isTransparent ? 'text-white font-semibold' : 'text-[#171717] font-semibold'
                      : isTransparent ? 'hover:text-white' : 'hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${isTransparent ? 'bg-white' : 'bg-[#171717]'}`} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Bag, Mobile Trigger) */}
          <div
            className={`flex items-center gap-4 md:gap-6 shrink-0 transition-colors ${
              isTransparent ? 'text-white' : 'text-[#171717]'
            }`}
          >
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 hover:opacity-75 transition-opacity"
              aria-label="Open search catalog"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-1.5 hover:opacity-75 transition-opacity"
              aria-label={`Saved items wishlist with ${wishlistCount} pieces`}
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 text-[9px] font-sans font-medium flex items-center justify-center rounded-full tabular-nums ${
                  isTransparent ? 'bg-white text-black' : 'bg-[#171717] text-[#F8F6F1]'
                }`}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 hover:opacity-75 transition-opacity"
              aria-label={`Open shopping bag with ${totalCount} items`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalCount > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 text-[9px] font-sans font-medium flex items-center justify-center rounded-full tabular-nums ${
                  isTransparent ? 'bg-white text-black' : 'bg-[#171717] text-[#F8F6F1]'
                }`}>
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="md:hidden p-1.5 hover:opacity-75 transition-opacity"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Slide-in Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="fixed inset-0 z-50 md:hidden bg-[#171717]/40 backdrop-blur-sm flex justify-end animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-[82%] max-w-sm h-full bg-[#F8F6F1] text-[#171717] p-8 flex flex-col justify-between shadow-2xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E4DC]">
                <span className="font-serif tracking-[0.2em] text-lg uppercase font-medium">
                  ATELIER NOIR
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#4A453F] hover:text-black"
                  aria-label="Close mobile navigation"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-6 text-sm uppercase tracking-[0.2em] font-medium text-[#2C2926]">
                {mainNavLinks.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="py-1 hover:text-black transition-colors flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#9E9589] font-serif group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mt-10 pt-6 border-t border-[#E8E4DC] flex flex-col gap-4 text-xs tracking-wider uppercase text-[#736B60]">
                <Link to="/cart" className="flex items-center justify-between py-1 hover:text-black">
                  <span>Shopping Bag</span>
                  <span className="font-mono tabular-nums">({totalCount})</span>
                </Link>
                <Link to="/wishlist" className="flex items-center justify-between py-1 hover:text-black">
                  <span>Saved Pieces</span>
                  <span className="font-mono tabular-nums">({wishlistCount})</span>
                </Link>
              </div>
            </div>

            <div className="pt-8 border-t border-[#E8E4DC] text-xs text-[#736B60] space-y-2">
              <p className="font-serif italic text-sm text-[#2C2926]">
                Contemporary Fashion &amp; Monograph Portfolio
              </p>
              <p className="text-[11px] text-[#9A9184]">
                Atelier inquiries: concierge@atelier-noir.com
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
