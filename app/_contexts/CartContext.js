"use client";

import { createContext, useContext, useState, useCallback } from "react";
import {
  createCart,
  addToCart,
  updateCart,
  applyDiscount,
} from "../_lib/shopify";

const CartContext = createContext(null);

export function CartProvider({ children, country = "GB" }) {
  const [cart, setCart] = useState(null);

  const addItem = useCallback(
    async (variantId, quantity = 1) => {
      const lines = [{ merchandiseId: variantId, quantity }];
      if (!cart) {
        const newCart = await createCart(lines, country);
        setCart(newCart);
      } else {
        const updatedCart = await addToCart(cart.id, lines, country);
        setCart(updatedCart);
      }
    },
    [cart, country],
  );

  const updateQuantity = useCallback(
    async (lineId, quantity) => {
      if (!cart) return;
      const updatedCart = await updateCart(
        cart.id,
        [{ id: lineId, quantity }],
        country,
      );
      setCart(updatedCart);
    },
    [cart, country],
  );

  const applyCode = useCallback(
    async (code) => {
      if (!cart) return;
      const updatedCart = await applyDiscount(cart.id, [code], country);
      setCart(updatedCart);
    },
    [cart, country],
  );

  return (
    <CartContext.Provider value={{ cart, addItem, updateQuantity, applyCode }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
