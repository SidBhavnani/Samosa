"use client";

import { createContext, useCallback, useContext, useState } from "react";

const ProductContext = createContext(null);

export default function ProductProvider({ product, allProducts, children }) {
  const [selectedProduct, setProduct] = useState(
    allProducts.length > 1 ? allProducts[0].node : null,
  );

  const setSelectedProduct = useCallback((product) => setProduct(product), []);

  return (
    <ProductContext.Provider
      value={{ product, selectedProduct, setSelectedProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
