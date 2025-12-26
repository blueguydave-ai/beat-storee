'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Cart, CartItem } from '@/types';

interface CartContextType {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateItem: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  discount: 0,
  total: 0,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = (items: CartItem[], discount: number = 0) => {
    const subtotal = items.reduce((sum, item) => sum + item.license.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax (adjust as needed)
    const total = subtotal + tax - discount;

    return { subtotal, tax, total };
  };

  const addItem = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.beatId === newItem.beatId && item.licenseId === newItem.licenseId
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = prevCart.items.map((item) =>
          item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...prevCart.items, newItem];
      }

      const { subtotal, tax, total } = calculateTotals(
        updatedItems,
        prevCart.discount
      );

      return {
        ...prevCart,
        items: updatedItems,
        subtotal,
        tax,
        total,
      };
    });
  };

  const removeItem = (itemId: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== itemId);
      const { subtotal, tax, total } = calculateTotals(updatedItems, prevCart.discount);

      return {
        ...prevCart,
        items: updatedItems,
        subtotal,
        tax,
        total,
      };
    });
  };

  const updateItem = (itemId: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      );

      const { subtotal, tax, total } = calculateTotals(updatedItems, prevCart.discount);

      return {
        ...prevCart,
        items: updatedItems,
        subtotal,
        tax,
        total,
      };
    });
  };

  const clearCart = () => {
    setCart(initialCart);
  };

  const applyCoupon = (code: string) => {
    // Placeholder - will be integrated with backend
    setCart((prevCart) => ({
      ...prevCart,
      couponCode: code,
      discount: prevCart.subtotal * 0.1, // 10% discount placeholder
    }));
  };

  const removeCoupon = () => {
    setCart((prevCart) => {
      const { subtotal, tax, total } = calculateTotals(prevCart.items, 0);
      return {
        ...prevCart,
        couponCode: undefined,
        discount: 0,
        subtotal,
        tax,
        total,
      };
    });
  };

  const getTotal = () => cart.total;

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        applyCoupon,
        removeCoupon,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
