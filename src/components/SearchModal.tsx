import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { projects } from '../data/projects';
import { collections } from '../data/collections';
import { formatCurrency } from '../utils/commerceLogic';
import { ImageWithFallback } from './ImageWithFallback';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedProducts = q
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.collectionName.toLowerCase().includes(q)
      )
    : [];

  const matchedProjects = q
    ? projects.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.concept.toLowerCase().includes(q)
      )
    : [];

  const matchedCollections = q
    ? collections.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.season.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q)
      )
    : [];

  const totalResults = matchedProducts.length + matchedProjects.length + matchedCollections.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog and Monograph"
      className="fixed inset-0 z-50 bg-[#171717]/60 backdrop-blur-md flex flex-col justify-start items-center p-4 md:p-12 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#F8F6F1] text-[#171717] shadow-2xl border border-[#E8E4DC] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-6 md:p-8 border-b border-[#E8E4DC] flex items-center gap-4">
          <Search className="w-6 h-6 text-[#7E7569] shrink-0 stroke-[1.5]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search silhouettes, materials, collections, or projects..."
            className="w-full bg-transparent border-none text-base md:text-xl font-serif text-[#171717] placeholder:text-[#9A9184] focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs uppercase tracking-wider text-[#7E7569] hover:text-black"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#544D44] hover:text-black transition-colors"
            aria-label="Close search overlay"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {!query ? (
            <div className="space-y-8">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C8377] block mb-3 font-medium">
                  Popular Silhouettes &amp; Textiles
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Virgin Wool Overcoat', 'Monolith Blazer', 'Belgian Linen', 'Habotai Silk Gown', 'Mongolian Cashmere'].map(
                    term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 bg-[#EFECE5] hover:bg-[#E5E0D6] text-xs text-[#2C2926] transition-colors"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C8377] block mb-3 font-medium">
                  Featured Portfolios
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projects.slice(0, 2).map(p => (
                    <Link
                      key={p.slug}
                      to={`/portfolio/${p.slug}`}
                      onClick={onClose}
                      className="p-3 border border-[#E8E4DC] hover:border-[#171717] transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#7E7569] block">
                          {p.category}
                        </span>
                        <span className="font-serif text-sm font-medium">{p.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#7E7569]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="font-serif text-lg text-[#171717]">
                No matching pieces found for "{query}".
              </p>
              <p className="text-xs text-[#7E7569]">
                Try searching by silhouette, fiber (e.g. wool, silk, linen), or collection season.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Matched Garments */}
              {matchedProducts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC] mb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#635B50] font-medium">
                      Garments &amp; Objects ({matchedProducts.length})
                    </span>
                    <Link
                      to="/shop"
                      onClick={onClose}
                      className="text-xs underline text-[#7E7569] hover:text-black"
                    >
                      View all in Shop
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchedProducts.map(p => (
                      <Link
                        key={p.slug}
                        to={`/product/${p.slug}`}
                        onClick={onClose}
                        className="flex gap-4 p-2 hover:bg-[#F2EFE8] transition-colors group"
                      >
                        <div className="w-16 h-20 bg-[#E8E4DC] shrink-0 overflow-hidden relative">
                          <ImageWithFallback
                            src={p.images.primary}
                            alt={p.name}
                            fallbackTitle={p.name}
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-[10px] uppercase tracking-wider text-[#7E7569]">
                            {p.category}
                          </span>
                          <span className="font-serif text-sm font-medium text-[#171717] group-hover:text-[#635B50] transition-colors line-clamp-1">
                            {p.name}
                          </span>
                          <span className="text-xs font-mono tabular-nums text-black mt-1">
                            {formatCurrency(p.price, p.currency)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Collections */}
              {matchedCollections.length > 0 && (
                <div>
                  <div className="pb-3 border-b border-[#E8E4DC] mb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#635B50] font-medium">
                      Seasonal Collections ({matchedCollections.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {matchedCollections.map(c => (
                      <Link
                        key={c.slug}
                        to={`/collections/${c.slug}`}
                        onClick={onClose}
                        className="p-4 border border-[#E8E4DC] hover:border-black transition-colors flex justify-between items-center group"
                      >
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#7E7569] block">
                            {c.season} {c.year}
                          </span>
                          <span className="font-serif text-base text-[#171717] group-hover:underline">
                            {c.name}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#7E7569] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Creative Projects */}
              {matchedProjects.length > 0 && (
                <div>
                  <div className="pb-3 border-b border-[#E8E4DC] mb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#635B50] font-medium">
                      Portfolio &amp; Art Direction ({matchedProjects.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchedProjects.map(proj => (
                      <Link
                        key={proj.slug}
                        to={`/portfolio/${proj.slug}`}
                        onClick={onClose}
                        className="p-3 border border-[#E8E4DC] hover:border-black transition-colors flex gap-3 group"
                      >
                        <div className="w-14 h-14 bg-[#E8E4DC] shrink-0 overflow-hidden relative">
                          <ImageWithFallback
                            src={proj.coverImage}
                            alt={proj.title}
                            fallbackTitle={proj.title}
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#7E7569] block">
                            {proj.category} · {proj.year}
                          </span>
                          <span className="font-serif text-sm text-[#171717] group-hover:underline">
                            {proj.title}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
