"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  createCart,
  addToCart,
  updateCart,
  applyDiscount,
} from "../_lib/shopify";
import { useSearchParams } from "next/navigation";

const CartContext = createContext(null);

export function CartProvider({ children, country = "GB" }) {
  const searchParams = useSearchParams();

  const [cart, setCart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [applying, setApplying] = useState(false);
  const [couponCode, setCouponCode] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    if (couponCode) return;
    const discountCode = searchParams.get("discount");
    if (!discountCode) return;

    setCouponCode(discountCode);

    // console.log("Discount code:", discountCode);

    window.history.replaceState({}, "", window.location.pathname);
  }, [searchParams, couponCode]);

  const applyCode = useCallback(
    async (code, newCart = cart) => {
      // console.log("Applying code:", newCart);
      if (!newCart) return;

      setApplying(true);

      const updatedCart = await applyDiscount(newCart.id, [code], country);
      setCart(updatedCart);

      // console.log("Updated cart:", updatedCart);

      setApplying(false);
    },
    [cart, country],
  );

  const addItem = useCallback(
    // async (variantId, quantity = 1) => {
    async (
      variantId = country === "US" || country === "CA"
        ? "gid://shopify/ProductVariant/56810100687232"
        : "gid://shopify/ProductVariant/56686365376896",
      quantity = 1,
    ) => {
      setAdding(true);
      const lines = [{ merchandiseId: variantId, quantity }];
      if (!cart) {
        const newCart = await createCart(lines, country);
        setCart(newCart);

        // console.log("Coupon Code:", couponCode);
        if (couponCode && !couponApplied) {
          applyCode(couponCode, newCart);
          setCouponApplied(true);
        }
      } else {
        const updatedCart = await addToCart(cart.id, lines, country);
        setCart(updatedCart);
      }
      setIsOpen(true);
      setAdding(false);
    },
    [cart, country, couponCode, couponApplied, applyCode],
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
