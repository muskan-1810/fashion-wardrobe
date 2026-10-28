import { CartItem, Product, FilterOptions } from '../types';

/**
 * Calculates subtotal for all items in the shopping bag
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

/**
 * Calculates item count in shopping bag
 */
export function calculateTotalCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Calculates shipping: complimentary over $500 threshold
 */
export function calculateShipping(subtotal: number, threshold = 500, flatFee = 35): number {
  if (subtotal <= 0) return 0;
  return subtotal >= threshold ? 0 : flatFee;
}

/**
 * Calculates estimated tax (8%)
 */
export function calculateTax(subtotal: number, rate = 0.08): number {
  return Math.round(subtotal * rate * 100) / 100;
}

/**
 * Calculates total order sum
 */
export function calculateOrderTotal(subtotal: number, shipping: number, tax: number): number {
  return Math.round((subtotal + shipping + tax) * 100) / 100;
}

/**
 * Formats monetary amounts in USD or EUR
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Filter and sort products
 */
export function filterAndSortProducts(
  products: Product[],
  filters: FilterOptions,
  searchQuery = ''
): Product[] {
  let filtered = [...products];

  // Search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.collectionName.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'All') {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  // Size filter
  if (filters.size && filters.size !== 'All') {
    filtered = filtered.filter(p => p.sizes.includes(filters.size));
  }

  // Color filter
  if (filters.color && filters.color !== 'All') {
    filtered = filtered.filter(p => p.colors.some(c => c.name.toLowerCase() === filters.color.toLowerCase()));
  }

  // Price range
  filtered = filtered.filter(
    p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );

  // Sorting
  switch (filters.sortBy) {
    case 'newest':
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  return filtered;
}

/**
 * Validates email address format
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}
