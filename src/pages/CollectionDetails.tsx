import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { collections } from '../data/collections';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const CollectionDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const collectionIndex = collections.findIndex(c => c.slug === slug);
  const collection = collections[collectionIndex];

  if (!collection) {
    return (
      <div className="min-h-screen pt-40 pb-24 px-6 text-center max-w-xl mx-auto space-y-4">
        <h1 className="font-serif text-3xl">Collection Not Found</h1>
        <p className="text-sm text-[#7E7569]">
          The collection you are requesting is either archived or unavailable.
        </p>
        <Link
          to="/collections"
          className="inline-block px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-widest mt-4"
        >
          View All Collections
        </Link>
      </div>
    );
  }

  const prevCollection = collections[collectionIndex - 1] || collections[collections.length - 1];
  const nextCollection = collections[collectionIndex + 1] || collections[0];

  const collectionProducts = products.filter(p => p.collectionSlug === collection.slug);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#171717]">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#7E7569] uppercase tracking-wider">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#B5A99A]" />
        <Link to="/collections" className="hover:text-black">Collections</Link>
        <ChevronRight className="w-3 h-3 text-[#B5A99A]" />
        <span className="text-black">{collection.name}</span>
      </nav>

      {/* Hero Header */}
      <div className="space-y-6 mb-16 border-b border-[#E8E4DC] pb-12">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#7E7569]">
          <span>{collection.season}</span>
          <span aria-hidden="true">·</span>
          <span>{collection.year}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight font-normal leading-tight">
          {collection.name}
        </h1>

        <p className="font-serif italic text-xl md:text-2xl text-[#635B50] max-w-3xl leading-relaxed">
          “{collection.quote}”
        </p>

        <p className="text-sm md:text-base text-[#544D44] font-light max-w-2xl leading-relaxed">
          {collection.description}
        </p>
      </div>

      {/* Editorial Lookbook Photography Grid */}
      <section className="mb-24 space-y-6">
        <div className="flex items-center justify-between">
          <span className="editorial-subheading">Lookbook Visual Journal</span>
          <span className="text-xs text-[#7E7569] uppercase tracking-wider">
            {collection.editorialImages.length} Editorial Plates
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collection.editorialImages.map((imgUrl, idx) => (
            <div
              key={idx}
              className={`relative bg-[#ECE8E1] overflow-hidden ${
                idx === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
              }`}
            >
              <ImageWithFallback
                src={imgUrl}
                alt={`${collection.name} Lookbook Plate ${idx + 1}`}
                fallbackTitle={`${collection.name} Plate ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#171717]/80 backdrop-blur-xs text-white px-3 py-1 text-[10px] uppercase tracking-widest font-mono">
                Plate 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop Available Pieces from Collection */}
      {collectionProducts.length > 0 && (
        <section className="mb-24 pt-16 border-t border-[#E8E4DC]">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="editorial-subheading">Collection Garments</span>
              <h2 className="font-serif text-3xl uppercase tracking-tight text-[#171717] mt-1">
                Pieces from {collection.name.split(':')[1] || collection.name}
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-wider underline text-[#7E7569] hover:text-black"
            >
              View Full Boutique
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Previous / Next Collection Navigation */}
      <div className="pt-12 border-t border-[#E8E4DC] flex items-center justify-between text-xs uppercase tracking-widest text-[#7E7569]">
        <Link
          to={`/collections/${prevCollection.slug}`}
          className="flex items-center gap-2 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: {prevCollection.name.split(':')[1] || prevCollection.name}</span>
        </Link>

        <Link
          to={`/collections/${nextCollection.slug}`}
          className="flex items-center gap-2 hover:text-black transition-colors"
        >
          <span>Next: {nextCollection.name.split(':')[1] || nextCollection.name}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
