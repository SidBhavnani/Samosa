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

import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
} from "@shopify/hydrogen-react";

const CartContext = createContext(null);

async function trackAddToCart(cart, addedLines) {
  try {
    const privacy = window.Shopify?.customerPrivacy;

    // Only send the event when analytics consent is granted.
    if (!privacy?.analyticsProcessingAllowed?.()) return;

    const products = addedLines
      .map((line) => {
        const cartLine = cart.lines.edges
          .map((edge) => edge.node)
          .find((item) => item.merchandise.id === line.merchandiseId);

        if (!cartLine) return null;

        const variant = cartLine.merchandise;
        const product = variant.product;

        return {
          productGid: product.id,
          variantGid: variant.id,
          name: product.title,
          brand: product.vendor || "",
          variantName: variant.title,
          sku: variant.sku || "",
          price: variant.price.amount,
          quantity: line.quantity,
        };
      })
      .filter(Boolean);

    if (!products.length) return;

    const analyticsAllowed = Boolean(privacy.analyticsProcessingAllowed());

    const marketingAllowed = Boolean(privacy.marketingAllowed?.());

    const saleOfDataAllowed = Boolean(privacy.saleOfDataAllowed?.());

    const currency = cart.cost.totalAmount.currencyCode;

    const totalValue = products.reduce(
      (sum, product) => sum + Number(product.price) * product.quantity,
      0,
    );

    await sendShopifyAnalytics(
      {
        eventName: AnalyticsEventName.ADD_TO_CART,
        payload: {
          ...getClientBrowserParameters(),
          shopId: "gid://shopify/Shop/94901895552",
          shopifySalesChannel: "headless",
          cartId: cart.id,
          products,
          currency,
          acceptedLanguage:
            document.documentElement.lang?.split("-")[0] || "en",
          totalValue,
          hasUserConsent: analyticsAllowed,
          analyticsAllowed,
          marketingAllowed,
          saleOfDataAllowed,
        },
      },
      "www.playsamosa.com",
    );

    console.info("Shopify add-to-cart event sent.");
  } catch (error) {
    // Analytics failures should not break the shopping experience.
    console.error("Shopify add-to-cart analytics failed:", error);
  }
}

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

  // const addItem = useCallback(
  //   async (
  //     variantId = country === "US" || country === "CA"
  //       ? "gid://shopify/ProductVariant/56810100687232"
  //       : "gid://shopify/ProductVariant/56686365376896",
  //     quantity = 1,
  //   ) => {
  //     setAdding(true);
  //     const lines = [{ merchandiseId: variantId, quantity }];
  //     if (!cart) {
  //       const newCart = await createCart(lines, country);
  //       setCart(newCart);

  //      if (couponCode && !couponApplied) {
  //         applyCode(couponCode, newCart);
  //         setCouponApplied(true);
  //       }
  //     } else {
  //       const updatedCart = await addToCart(cart.id, lines, country);
  //       setCart(updatedCart);
  //     }
  //     setIsOpen(true);
  //     setAdding(false);
  //   },
  //   [cart, country, couponCode, couponApplied, applyCode],
  // );

  const addItem = useCallback(
    async (
      variantId = country === "US" || country === "CA"
        ? "gid://shopify/ProductVariant/56810100687232"
        : "gid://shopify/ProductVariant/56686365376896",
      quantity = 1,
    ) => {
      setAdding(true);

      try {
        const lines = [{ merchandiseId: variantId, quantity }];

        let updatedCart;

        if (!cart) {
          updatedCart = await createCart(lines, country);

          if (!updatedCart) return;

          setCart(updatedCart);

          if (couponCode && !couponApplied) {
            await applyCode(couponCode, updatedCart);
            setCouponApplied(true);
          }
        } else {
          updatedCart = await addToCart(cart.id, lines, country);

          if (!updatedCart) return;

          setCart(updatedCart);
        }

        // Track only after the cart operation succeeds.
        await trackAddToCart(updatedCart, lines);

        setIsOpen(true);
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      } finally {
        setAdding(false);
      }
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
