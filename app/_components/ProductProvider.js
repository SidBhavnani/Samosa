"use client";

import { createContext, useContext } from "react";

const ProductContext = createContext(null);

export default function ProductProvider({ product, children }) {
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
