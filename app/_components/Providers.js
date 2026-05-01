"use client";

import { CartProvider } from "../_contexts/CartContext";

export default function Providers({ children, country }) {
  return <CartProvider country={country}>{children}</CartProvider>;
}
