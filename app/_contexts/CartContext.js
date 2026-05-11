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
  const [isOpen, setIsOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [applying, setApplying] = useState(false);

  const addItem = useCallback(
    // async (variantId, quantity = 1) => {
    async (
      variantId = "gid://shopify/ProductVariant/56686365376896",
      quantity = 1,
    ) => {
      setAdding(true);
      const lines = [{ merchandiseId: variantId, quantity }];
      if (!cart) {
        const newCart = await createCart(lines, country);
        setCart(newCart);
      } else {
        const updatedCart = await addToCart(cart.id, lines, country);
        setCart(updatedCart);
      }
      setIsOpen(true);
      setAdding(false);
    },
    [cart, country],
  );

  const updateQuantity = useCallback(
    async (lineId, quantity) => {
      setUpdating(true);
      if (!cart) return;
      const updatedCart = await updateCart(
        cart.id,
        [{ id: lineId, quantity }],
        country,
      );
      setCart(updatedCart);
      // console.log("Updated cart:", updatedCart);
      setUpdating(false);
    },
    [cart, country],
  );

  const applyCode = useCallback(
    async (code) => {
      if (!cart) return;

      setApplying(true);

      const updatedCart = await applyDiscount(cart.id, [code], country);
      setCart(updatedCart);

      setApplying(false);
    },
    [cart, country],
  );

  // const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalItems = cart?.lines.edges.reduce(
    (sum, item) => sum + item.node.quantity,
    0,
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        adding,
        updateQuantity,
        updating,
        applyCode,
        applying,
        isOpen,
        totalItems,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
