"use client";

import Image from "next/image";
import { useProduct } from "../ProductProvider";

export default function ProductSelector({ allProducts }) {
  const { selectedProduct, setSelectedProduct } = useProduct();

  const formatPrice = (price, currencyCode = "GBP") =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currencyCode,
    }).format(price);

  if (allProducts.length <= 1) {
    return null;
  }

  // if (!selectedProduct && allProducts.length > 1) {
  //   setSelectedProduct(allProducts[0].node);
  // }

  return (
    <section className="w-full px-4 pb-5 md:px-8 md:pb-6">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm text-center mx-auto font-semibold uppercase tracking-[0.15em] text-[#a7194b] md:text-base">
            Choose your game
          </h2>

          {/* Optional mobile hint */}
          {allProducts.length > 3 && (
            <span className="text-xs text-[#6f3048] md:hidden">
              Swipe to see more
            </span>
          )}
        </div>

        {/* Product list */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none md:justify-center">
          {allProducts.map((product) => {
            const isSelected = selectedProduct?.id === product.node.id;

            return (
              <button
                key={product.node.id}
                type="button"
                onClick={() => setSelectedProduct(product.node)}
                className={`group flex min-w-[220px] flex-shrink-0 items-center gap-3 rounded-xl border bg-[#fffdf8] px-3 py-2.5 text-left transition-all duration-200 md:min-w-[250px] md:px-4 ${
                  isSelected
                    ? "border-[#f15a24] shadow-[0_4px_14px_rgba(241,90,36,0.15)]"
                    : "border-[#d7d0c5] hover:border-[#f15a24]"
                }`}
              >
                {/* Product image */}
                <div
                  className={`
                    relative
                    h-[58px]
                    w-[58px]
                    flex-shrink-0
                    overflow-hidden
                    rounded-lg
                    bg-[#f4f0e7]
                    ${isSelected ? "ring-2 ring-[#f15a24] ring-offset-1" : ""}
                  `}
                >
                  <Image
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.title}
                    fill
                    sizes="58px"
                    className="object-contain p-1"
                  />
                </div>

                {/* Product information */}
                <div className="min-w-0 flex-1">
                  <div
                    className={`
                      text-sm
                      font-semibold
                      max-w-46
                      leading-tight                      
                      md:text-base
                      ${isSelected ? "text-[#a7194b]" : "text-[#3d1830]"}
                    `}
                  >
                    {product.node.title}
                  </div>

                  {product.node.variants?.edges[0]?.node?.price?.amount && (
                    <div className="mt-0.5 text-sm font-medium text-[#3d1830]">
                      {formatPrice(
                        product.node.variants.edges[0].node.price.amount,
                        product.node.variants.edges[0].node.price.currencyCode,
                      )}
                    </div>
                  )}
                </div>

                {/* Selected indicator */}
                <div
                  className={`
                    flex
                    h-5
                    w-5
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-all
                    ${
                      isSelected
                        ? "border-[#f15a24] bg-[#f15a24]"
                        : "border-[#c8c0b5] bg-white"
                    }
                  `}
                >
                  {isSelected && (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
