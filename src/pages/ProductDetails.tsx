import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ChevronRight, Check, ShieldCheck, Ruler, ArrowLeft, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/commerceLogic';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Accordion active sections
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    materials: true,
    fit: true,
    shipping: false,
    care: false,
  });

  if (!product) {
    return (
      <div className="min-h-screen pt-40 pb-24 px-6 text-center max-w-xl mx-auto space-y-4">
        <h1 className="font-serif text-3xl">Garment Not Found</h1>
        <p className="text-sm text-[#7E7569]">
          The piece you are seeking may belong to an archived season or has been relocated.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-widest mt-4"
        >
          Return to Boutique
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const allImages = [product.images.primary, product.images.hover, ...product.images.gallery].filter(Boolean);
  const uniqueImages = Array.from(new Set(allImages));

  const toggleAccordion = (section: string) => {
    setOpenAccordions(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedColor || product.colors[0], selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collectionSlug === product.collectionSlug))
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#171717]">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#7E7569] uppercase tracking-wider">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#B5A99A]" />
        <Link to="/shop" className="hover:text-black">Shop</Link>
        <ChevronRight className="w-3 h-3 text-[#B5A99A]" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-black">{product.category}</Link>
        <ChevronRight className="w-3 h-3 text-[#B5A99A]" />
        <span className="text-black truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Two-Column Layout (Sticky Gallery Left, Sticky Purchase Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Gallery Column (col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[3/4] w-full bg-[#EBE7DF] overflow-hidden">
            <ImageWithFallback
              src={uniqueImages[activeImageIndex] || product.images.primary}
              alt={`${product.name} view ${activeImageIndex + 1}`}
              fallbackTitle={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-[#171717] text-[#F8F6F1] px-3 py-1 text-[10px] uppercase tracking-widest font-medium">
                New Season Edition
              </span>
            )}
          </div>

          {/* Thumbnail Navigation Row */}
          {uniqueImages.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-2">
              {uniqueImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] bg-[#EBE7DF] overflow-hidden border transition-all ${
                    activeImageIndex === idx ? 'border-[#171717] ring-1 ring-[#171717]' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                  aria-label={`View image thumbnail ${idx + 1}`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fallbackTitle={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Purchase & Details Module (col-span-5) */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          {/* Header Info */}
          <div className="space-y-3 pb-6 border-b border-[#E8E4DC]">
            <div className="flex items-center justify-between text-xs text-[#7E7569] uppercase tracking-[0.2em]">
              <span>{product.category}</span>
              <Link
                to={`/collections/${product.collectionSlug}`}
                className="hover:underline hover:text-black"
              >
                {product.collectionName}
              </Link>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#171717] leading-tight">
              {product.name}
            </h1>

            <p className="text-xs text-[#6B6357] font-light leading-relaxed">
              {product.subtitle}
            </p>

            <div className="pt-2 text-2xl font-sans font-medium text-[#171717] tabular-nums">
              {formatCurrency(product.price, product.currency)}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-widest font-semibold text-[#171717]">
                Color:
              </span>
              <span className="text-[#635B50]">
                {selectedColor?.name || product.colors[0]?.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {product.colors.map(color => {
                const isSelected = selectedColor?.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative p-1 rounded-full border transition-all ${
                      isSelected ? 'border-[#171717]' : 'border-transparent hover:border-[#D5CFC5]'
                    }`}
                    aria-label={`Select color ${color.name}`}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-widest font-semibold text-[#171717]">
                Size:
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[#7E7569] hover:text-black uppercase tracking-wider underline underline-offset-4 flex items-center gap-1"
              >
                <Ruler className="w-3 h-3" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map(size => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    aria-label={`Select size ${size}`}
                    className={`py-3 text-xs uppercase tracking-wider font-medium border transition-all ${
                      isSelected
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-white border-[#D5CFC5] text-[#2C2926] hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {sizeError && (
              <p className="text-xs text-[#B91C1C] pt-1" role="alert">
                Please choose a size to proceed with your order.
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 text-xs">
            <span className="uppercase tracking-widest font-semibold text-[#171717]">
              Quantity:
            </span>
            <div className="flex items-center border border-[#D5CFC5] bg-white">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1.5 hover:bg-[#F2EFE8]"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center font-mono tabular-nums">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-1.5 hover:bg-[#F2EFE8]"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* CTAs: Add to Bag + Wishlist */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                addedSuccess
                  ? 'bg-[#2B593F] text-white'
                  : 'bg-[#171717] hover:bg-black text-[#F8F6F1]'
              }`}
            >
              {addedSuccess ? '✓ Added to Shopping Bag' : 'Add to Bag'}
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="w-full py-3 border border-[#171717] text-xs uppercase tracking-[0.16em] text-[#171717] hover:bg-white flex items-center justify-center gap-2 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-[#171717]' : 'stroke-[1.5]'}`} />
              <span>{isSaved ? 'In Your Wishlist' : 'Save to Wishlist'}</span>
            </button>
          </div>

          {/* Trust markers */}
          <div className="pt-2 text-xs text-[#7E7569] space-y-1.5 border-t border-[#E8E4DC]">
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2C2926]" />
              <span>Complimentary worldwide express courier on this edition.</span>
            </p>
            <p className="pl-6 text-[11px] text-[#8C8377]">
              14-day archival return window with complimentary atelier collection.
            </p>
          </div>

          {/* Accordion Sections: Materials, Fit, Origin, Shipping */}
          <div className="pt-4 border-t border-[#E8E4DC] divide-y divide-[#E8E4DC] text-xs">
            {/* Description & Materials */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('materials')}
                className="w-full flex items-center justify-between font-serif text-sm font-medium uppercase tracking-wide text-left"
              >
                <span>Materials &amp; Composition</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions.materials ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions.materials && (
                <div className="pt-3 space-y-3 text-[#635B50] font-light leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-4 space-y-1 text-black font-normal">
                    {product.details.materials.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-[#7E7569]">
                    Origin: {product.details.origin}
                  </p>
                </div>
              )}
            </div>

            {/* Tailoring & Fit */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('fit')}
                className="w-full flex items-center justify-between font-serif text-sm font-medium uppercase tracking-wide text-left"
              >
                <span>Tailoring &amp; Proportions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions.fit ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions.fit && (
                <div className="pt-3 space-y-2 text-[#635B50] font-light leading-relaxed">
                  <p>{product.details.fit}</p>
                  {product.details.modelSpecs && (
                    <p className="text-black font-normal">{product.details.modelSpecs}</p>
                  )}
                </div>
              )}
            </div>

            {/* Garment Care */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full flex items-center justify-between font-serif text-sm font-medium uppercase tracking-wide text-left"
              >
                <span>Care &amp; Longevity</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordions.care ? 'rotate-180' : ''}`} />
              </button>
              {openAccordions.care && (
                <div className="pt-3 space-y-2 text-[#635B50] font-light leading-relaxed">
                  <ul className="list-disc pl-4 space-y-1">
                    {product.details.care.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-28 pt-16 border-t border-[#E8E4DC]">
          <div className="mb-10 flex justify-between items-end">
            <div>
              <span className="editorial-subheading">Complete The Look</span>
              <h2 className="font-serif text-2xl sm:text-3xl uppercase tracking-tight text-[#171717] mt-1">
                Complementary Silhouettes
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-wider underline text-[#7E7569] hover:text-black"
            >
              All Pieces
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
