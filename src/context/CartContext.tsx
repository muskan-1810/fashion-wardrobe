import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { CartItem, Product, ProductColor } from '../types';
import { calculateSubtotal, calculateTotalCount, calculateShipping, calculateTax, calculateOrderTotal } from '../utils/commerceLogic';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedColor: ProductColor, selectedSize: string, quantity?: number) => void;
  removeFromCart: (productId: string, colorName: string, selectedSize: string) => void;
  updateQuantity: (productId: string, colorName: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  totalCount: number;
  lastAddedItem: { product: Product; size: string; color: string } | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'atelier_noir_cart_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<{ product: Product; size: string; color: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage write errors
    }
  }, [items]);

  const addToCart = (product: Product, selectedColor: ProductColor, selectedSize: string, quantity = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        i =>
          i.productId === product.id &&
          i.selectedColor.name === selectedColor.name &&
          i.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          productId: product.id,
          product,
          selectedColor,
          selectedSize,
          quantity,
        },
      ];
    });

    setLastAddedItem({
      product,
      size: selectedSize,
      color: selectedColor.name,
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, colorName: string, selectedSize: string) => {
    setItems(prev =>
      prev.filter(
        i => !(i.productId === productId && i.selectedColor.name === colorName && i.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (productId: string, colorName: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName, selectedSize);
      return;
    }
    setItems(prev =>
      prev.map(i => {
        if (i.productId === productId && i.selectedColor.name === colorName && i.selectedSize === selectedSize) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = useMemo(() => calculateSubtotal(items), [items]);
  const shipping = useMemo(() => calculateShipping(subtotal), [subtotal]);
  const tax = useMemo(() => calculateTax(subtotal), [subtotal]);
  const total = useMemo(() => calculateOrderTotal(subtotal, shipping, tax), [subtotal, shipping, tax]);
  const totalCount = useMemo(() => calculateTotalCount(items), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        shipping,
        tax,
        total,
        totalCount,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
