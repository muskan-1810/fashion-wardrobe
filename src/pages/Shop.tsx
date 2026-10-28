import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { products } from '../data/products';
import { shopCategories } from '../data/navigation';
import { ProductCard } from '../components/ProductCard';
import { FilterOptions } from '../types';
import { filterAndSortProducts } from '../utils/commerceLogic';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [priceMax, setPriceMax] = useState<number>(1500);
  const [sortBy, setSortBy] = useState<FilterOptions['sortBy']>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const allSizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'One Size'];
  const allColors = ['All', 'Onyx Noir', 'Warm Taupe', 'Ivory Bone', 'Midnight Charcoal', 'Ecru Chalk', 'Stone Sand'];

  const filters: FilterOptions = useMemo(
    () => ({
      category: selectedCategory,
      size: selectedSize,
      color: selectedColor,
      priceRange: [0, priceMax],
      sortBy,
    }),
    [selectedCategory, selectedSize, selectedColor, priceMax, sortBy]
  );

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, filters);
  }, [filters]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedSize !== 'All' ? 1 : 0) +
    (selectedColor !== 'All' ? 1 : 0) +
    (priceMax < 1500 ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setPriceMax(1500);
    setSortBy('featured');
    setSearchParams({});
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#171717]">
      {/* Page Header */}
      <div className="mb-12 border-b border-[#E8E4DC] pb-8 space-y-4">
        <span className="editorial-subheading">Boutique &amp; Archive Catalog</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight font-normal leading-none text-[#171717]">
          THE READY TO WEAR EDITIONS.
        </h1>
        <p className="text-sm md:text-base text-[#635B50] max-w-2xl font-light leading-relaxed">
          A sequential catalog of architectural tailoring, fluid bias-cut silk eveningwear, and perennial knit foundations produced in limited runs.
        </p>

        {/* Category Pill Tabs (Desktop) */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          {shopCategories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#171717] text-[#F8F6F1]'
                  : 'bg-[#ECE8E1] text-[#4A453F] hover:bg-[#E2DDD5] hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar: Product Count, Mobile Filter Trigger, Desktop Filter / Sort */}
      <div className="flex items-center justify-between gap-4 py-4 mb-8 border-b border-[#E8E4DC] text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#7E7569] uppercase tracking-wider">
            Displaying <strong className="font-semibold text-black font-mono tabular-nums">{filteredProducts.length}</strong> of {products.length} pieces
          </span>

          {/* Active filter counter badge */}
          {activeFilterCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="text-[#8C8377] hover:text-black underline underline-offset-2 uppercase tracking-wider text-[11px]"
            >
              Clear all ({activeFilterCount})
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 border border-[#D5CFC5] hover:border-black uppercase tracking-wider text-[11px]"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[#7E7569] uppercase tracking-wider">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as FilterOptions['sortBy'])}
              className="bg-transparent border border-[#D5CFC5] px-3 py-1.5 text-xs text-[#171717] uppercase tracking-wider focus:outline-none focus:border-black cursor-pointer"
              aria-label="Sort product catalog"
            >
              <option value="featured">Featured Editions</option>
              <option value="newest">New Season Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Desktop Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Desktop Sidebar Filters (col-span-3) */}
        <aside className="hidden md:block md:col-span-3 space-y-8 pr-4">
          {/* Size Filter */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717]">
              Size
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {allSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    selectedSize === size
                      ? 'border-[#171717] bg-[#171717] text-[#F8F6F1]'
                      : 'border-[#D5CFC5] bg-white text-[#544D44] hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717]">
              Palette
            </h4>
            <div className="space-y-1.5 text-xs text-[#544D44]">
              {allColors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-full text-left py-1 px-1.5 flex items-center justify-between hover:text-black transition-colors ${
                    selectedColor === color ? 'font-semibold text-black bg-[#EFECE5]' : ''
                  }`}
                >
                  <span>{color}</span>
                  {selectedColor === color && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <h4 className="uppercase tracking-[0.2em] font-semibold text-[#171717]">
                Max Price
              </h4>
              <span className="font-mono tabular-nums text-black font-medium">
                ${priceMax}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="1500"
              step="50"
              value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#171717] cursor-pointer"
              aria-label="Filter maximum price"
            />
            <div className="flex justify-between text-[10px] text-[#7E7569] font-mono">
              <span>$200</span>
              <span>$1,500</span>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 border border-[#171717] text-xs uppercase tracking-widest text-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          )}
        </aside>

        {/* Product Grid Area (col-span-9 on desktop) */}
        <main className="md:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center border border-[#E8E4DC] bg-[#FAF8F5] p-12 space-y-4">
              <p className="font-serif text-2xl text-[#171717]">
                No garments match your current selection.
              </p>
              <p className="text-xs text-[#7E7569] max-w-sm mx-auto font-light leading-relaxed">
                Try widening your price range, clearing size filters, or switching category views.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-6 py-2.5 bg-[#171717] text-[#F8F6F1] text-xs uppercase tracking-widest hover:bg-black transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter Catalog"
          className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-xs flex justify-end"
          onClick={() => setIsFilterDrawerOpen(false)}
        >
          <div
            className="w-[85%] max-w-sm h-full bg-[#F8F6F1] p-6 flex flex-col justify-between overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC]">
                <h3 className="font-serif text-lg uppercase font-medium">Filters</h3>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-1 text-[#7E7569]"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Size */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest font-semibold">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs border ${
                        selectedSize === size
                          ? 'bg-[#171717] text-white'
                          : 'bg-white border-[#D5CFC5]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Color */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest font-semibold">Color</h4>
                <div className="space-y-1 text-xs">
                  {allColors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-full text-left py-1.5 px-2 flex justify-between ${
                        selectedColor === color ? 'bg-[#EFECE5] font-semibold' : ''
                      }`}
                    >
                      <span>{color}</span>
                      {selectedColor === color && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <h4 className="uppercase tracking-widest font-semibold">Max Price</h4>
                  <span className="font-mono">${priceMax}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1500"
                  step="50"
                  value={priceMax}
                  onChange={e => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#171717]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E4DC] space-y-2">
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full py-3 bg-[#171717] text-[#F8F6F1] text-xs uppercase tracking-widest"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2 border border-[#171717] text-xs uppercase tracking-widest"
                >
                  Reset All
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
