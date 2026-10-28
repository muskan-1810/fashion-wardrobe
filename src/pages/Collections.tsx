import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collections } from '../data/collections';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const Collections: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#171717]">
      {/* Header */}
      <div className="mb-16 border-b border-[#E8E4DC] pb-8 space-y-4">
        <span className="editorial-subheading">Seasonal Monograph Archives</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight font-normal text-[#171717]">
          COLLECTIONS &amp; ESSAYS.
        </h1>
        <p className="text-sm md:text-base text-[#635B50] max-w-2xl font-light leading-relaxed">
          Each Atelier Noir collection is authored as a thematic architectural study—merging sculptural volume with tactile raw textiles.
        </p>
      </div>

      {/* Collections Stack */}
      <div className="space-y-24">
        {collections.map((collection, index) => {
          const isEven = index % 2 === 0;
          return (
            <article
              key={collection.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-b border-[#E8E4DC] pb-24"
            >
              {/* Media Column (col-span-7) */}
              <div
                className={`lg:col-span-7 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <Link
                  to={`/collections/${collection.slug}`}
                  className="group block relative aspect-[16/10] bg-[#ECE8E1] overflow-hidden"
                >
                  <ImageWithFallback
                    src={collection.coverImage}
                    alt={collection.name}
                    fallbackTitle={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-[#171717]/85 backdrop-blur-xs text-white px-3 py-1 text-[10px] uppercase tracking-widest">
                    {collection.season} · {collection.year}
                  </div>
                </Link>
              </div>

              {/* Text Column (col-span-5) */}
              <div
                className={`lg:col-span-5 space-y-6 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#7E7569] block">
                    {collection.season} {collection.year}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight font-normal text-[#171717]">
                    <Link
                      to={`/collections/${collection.slug}`}
                      className="hover:text-[#635B50] transition-colors"
                    >
                      {collection.name}
                    </Link>
                  </h2>
                  <p className="text-xs uppercase tracking-wider text-[#9E9589] font-sans">
                    {collection.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#544D44] font-light leading-relaxed">
                  {collection.description}
                </p>

                <blockquote className="border-l border-[#171717] pl-4 italic font-serif text-sm text-[#3E3831] leading-relaxed">
                  “{collection.quote}”
                </blockquote>

                <div className="pt-2 flex items-center gap-6">
                  <Link
                    to={`/collections/${collection.slug}`}
                    className="px-6 py-3 bg-[#171717] text-[#F8F6F1] hover:bg-black text-xs uppercase tracking-[0.2em] font-medium transition-colors inline-flex items-center gap-2 group"
                  >
                    <span>View Lookbook</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to={`/shop?category=All`}
                    className="text-xs uppercase tracking-[0.16em] text-[#635B50] hover:text-black underline underline-offset-4 transition-colors"
                  >
                    Shop Pieces ({collection.productCount})
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
