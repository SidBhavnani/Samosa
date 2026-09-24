"use client";

import { CartProvider } from "../_contexts/CartContext";
import { EmailModalProvider } from "../_contexts/EmailModalContext";

export default function Providers({ children, country }) {
  return (
    <CartProvider country={country}>
      <EmailModalProvider>{children}</EmailModalProvider>
    </CartProvider>
  );
}
