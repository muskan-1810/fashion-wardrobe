import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotal,
  calculateTotalCount,
  calculateShipping,
  calculateTax,
  calculateOrderTotal,
  formatCurrency,
  filterAndSortProducts,
  isValidEmail,
} from './commerceLogic';
import { Product, CartItem, FilterOptions } from '../types';

const mockProductA: Product = {
  id: 'prod-1',
  slug: 'wool-overcoat',
  name: 'Structured Wool Overcoat',
  subtitle: 'Double-breasted virgin wool',
  price: 850,
  currency: 'USD',
  category: 'Outerwear',
  collectionSlug: 'form-and-void',
  collectionName: 'Collection 01: Form & Void',
  images: { primary: '', hover: '', gallery: [] },
  colors: [{ name: 'Charcoal', hex: '#2B2B2B' }, { name: 'Ivory', hex: '#F5F5F0' }],
  sizes: ['S', 'M', 'L'],
  description: 'A tailored minimalist coat.',
  details: { materials: ['100% Virgin Wool'], care: ['Dry clean only'], fit: 'Structured', origin: 'Italy' },
  inStock: true,
  isFeatured: true,
  isNew: true,
};

const mockProductB: Product = {
  id: 'prod-2',
  slug: 'silk-slip-dress',
  name: 'Bias Cut Silk Slip Dress',
  subtitle: 'Mulberry silk with cowl neckline',
  price: 420,
  currency: 'USD',
  category: 'Dresses',
  collectionSlug: 'raw-silk-shadow',
  collectionName: 'Collection 03: Raw Silk & Shadow',
  images: { primary: '', hover: '', gallery: [] },
  colors: [{ name: 'Taupe', hex: '#B5A99A' }],
  sizes: ['XS', 'S', 'M'],
  description: 'Fluid drape evening wear.',
  details: { materials: ['100% Silk'], care: ['Dry clean'], fit: 'Fluid', origin: 'France' },
  inStock: true,
  isFeatured: false,
  isNew: false,
};

test('calculateSubtotal and calculateTotalCount calculate accurate values', () => {
  const items: CartItem[] = [
    { productId: 'prod-1', product: mockProductA, selectedColor: mockProductA.colors[0], selectedSize: 'M', quantity: 1 },
    { productId: 'prod-2', product: mockProductB, selectedColor: mockProductB.colors[0], selectedSize: 'S', quantity: 2 },
  ];

  assert.equal(calculateSubtotal(items), 850 * 1 + 420 * 2); // 850 + 840 = 1690
  assert.equal(calculateTotalCount(items), 3);
});

test('calculateShipping waives shipping fee above $500 threshold', () => {
  assert.equal(calculateShipping(0), 0);
  assert.equal(calculateShipping(420), 35);
  assert.equal(calculateShipping(500), 0);
  assert.equal(calculateShipping(850), 0);
});

test('calculateOrderTotal calculates total with shipping and tax', () => {
  const subtotal = 1000;
  const shipping = 0;
  const tax = calculateTax(subtotal); // 80
  assert.equal(tax, 80);
  assert.equal(calculateOrderTotal(subtotal, shipping, tax), 1080);
});

test('formatCurrency outputs expected formatted strings', () => {
  assert.equal(formatCurrency(850), '$850');
  assert.equal(formatCurrency(1200), '$1,200');
});

test('filterAndSortProducts applies category and price filtering correctly', () => {
  const products = [mockProductA, mockProductB];
  const filters: FilterOptions = {
    category: 'Outerwear',
    size: 'All',
    color: 'All',
    priceRange: [0, 2000],
    sortBy: 'featured',
  };

  const filtered = filterAndSortProducts(products, filters);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 'prod-1');
});

test('filterAndSortProducts applies search query correctly', () => {
  const products = [mockProductA, mockProductB];
  const defaultFilters: FilterOptions = {
    category: 'All',
    size: 'All',
    color: 'All',
    priceRange: [0, 2000],
    sortBy: 'featured',
  };

  const searched = filterAndSortProducts(products, defaultFilters, 'Silk');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 'prod-2');
});

test('isValidEmail validates genuine email format', () => {
  assert.equal(isValidEmail('atelier@example.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
});
