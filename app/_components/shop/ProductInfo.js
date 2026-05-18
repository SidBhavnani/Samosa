"use client";

import { Share2 } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { Button } from "../ui/button";
import { useCart } from "@/app/_contexts/CartContext";
import BundlePricing from "./BundlePricing";

export default function ProductInfo({ product }) {
  const { cart, addItem, adding } = useCart();

  const handleAddToCart = (quantity = 1) => {
    addItem(product.variants.edges[0].node.id, quantity);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(price);

  return (
    <div className="flex-1 space-y-5 min-w-0">
      {/* Title */}
      <AnimatedSection variant="fade-left" delay={100}>
        <h1 className="text-[32px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal">
          <span className="text-secondary">{product.title}</span>
        </h1>
      </AnimatedSection>

      {/* Price */}
      <p className="text-[32px] md:text-[38px] font-sans font-bold text-primary leading-none">
        {formatPrice(product.variants.edges[0].node.price.amount)}
      </p>

      {/* Bundle Pricing */}
      {/* <div className="rounded-xl px-4 py-3 space-y-1">
        <p className="text-primary font-sans font-bold text-xs uppercase tracking-[0.1em] mb-1">
          🎉 Bundle & Save
        </p>
        <p className="text-primary/80 font-sans font-semibold text-sm">
          Buy 2 for £XX each
        </p>
        <p className="text-primary/80 font-sans font-semibold text-sm">
          Buy 3 for £XX each
        </p>
        <p className="text-primary/80 font-sans font-semibold text-sm">
          Buy 4+ for £XX each
        </p>
      </div> */}

      {/* Add to Cart */}
      {/* <Button
        onClick={handleAddToCart}
        disabled={adding}
        className="w-full py-7 text-base font-sans font-black uppercase tracking-[0.15em] rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all text-lg"
      >
        ADD TO CART
      </Button> */}

      {/* Buy Now */}
      {/* <Button
        asChild
        className="w-full py-6 text-base font-sans font-bold uppercase tracking-[0.1em] rounded-full bg-primary/10 text-primary border-2 border-primary/30 hover:bg-primary/20 transition-all"
      >
        <a
          href="https://www.playsamosa.com/products/samosa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Now
        </a>
      </Button> */}

      <BundlePricing handleAddToCart={handleAddToCart} adding={adding} />

      {/* Description */}
      <div
        className="pt-2 space-y-3 text-primary/70 font-sans font-semibold text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      ></div>

      {/* Share */}
      <button className="flex items-center gap-2 text-primary/50 hover:text-primary text-xs font-sans uppercase tracking-[0.15em] transition-colors">
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );
}

// Cart
// {
//     "id": "gid://shopify/Cart/hWNBcfUj0DHkwZINmymLYjw6?key=c5b3605a3be13684cc02cc2e4048887b",
//     "checkoutUrl": "https://www.playsamosa.com/cart/c/hWNBcfUj0DHkwZINmymLYjw6?key=c5b3605a3be13684cc02cc2e4048887b&_s=6ae5c907-8b9a-4dbd-97e0-563b874266d1&_y=50917ae8-f6a4-42ae-a3b6-f68c00429af8",
//     "cost": {
//         "totalAmount": {
//             "amount": "27.99",
//             "currencyCode": "GBP"
//         },
//         "subtotalAmount": {
//             "amount": "27.99",
//             "currencyCode": "GBP"
//         }
//     },
//     "discountCodes": [],
//     "lines": {
//         "edges": [
//             {
//                 "node": {
//                     "id": "gid://shopify/CartLine/587f2f15-2ac8-4324-91a6-94322bf27eaa?cart=hWNBcfUj0DHkwZINmymLYjw6",
//                     "quantity": 1,
//                     "cost": {
//                         "totalAmount": {
//                             "amount": "27.99",
//                             "currencyCode": "GBP"
//                         }
//                     },
//                     "merchandise": {
//                         "id": "gid://shopify/ProductVariant/56686365376896",
//                         "title": "Default Title",
//                         "price": {
//                             "amount": "27.99",
//                             "currencyCode": "GBP"
//                         },
//                         "product": {
//                             "title": "SAMOSA - The Ultimate Desi Party Game"
//                         }
//                     },
//                     "discountAllocations": []
//                 }
//             }
//         ]
//     }
// }

// Cart 2
// {
//     "id": "gid://shopify/Cart/hWNBoDH6vQum0dTZX4rU4UC6?key=4d505aa1a3216a7e58802458fcf89f32",
//     "checkoutUrl": "https://www.playsamosa.com/cart/c/hWNBoDH6vQum0dTZX4rU4UC6?key=4d505aa1a3216a7e58802458fcf89f32&_s=38010445-f47b-4028-96ef-e10b1997c716&_y=95e147a8-9e86-4d5d-837e-0509587e070f",
//     "cost": {
//         "totalAmount": {
//             "amount": "50.39",
//             "currencyCode": "GBP"
//         },
//         "subtotalAmount": {
//             "amount": "55.98",
//             "currencyCode": "GBP"
//         }
//     },
//     "discountCodes": [],
//     "lines": {
//         "edges": [
//             {
//                 "node": {
//                     "id": "gid://shopify/CartLine/e1d4153b-03c9-4075-b69d-4f087892a077?cart=hWNBoDH6vQum0dTZX4rU4UC6",
//                     "quantity": 2,
//                     "cost": {
//                         "totalAmount": {
//                             "amount": "55.98",
//                             "currencyCode": "GBP"
//                         }
//                     },
//                     "merchandise": {
//                         "id": "gid://shopify/ProductVariant/56686365376896",
//                         "title": "Default Title",
//                         "price": {
//                             "amount": "27.99",
//                             "currencyCode": "GBP"
//                         },
//                         "product": {
//                             "title": "SAMOSA - The Ultimate Desi Party Game",
//                             "images": {
//                                 "edges": [
//                                     {
//                                         "node": {
//                                             "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/Box_Mockups_front.png?v=1761839665",
//                                             "altText": null
//                                         }
//                                     },
//                                     {
//                                         "node": {
//                                             "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/IMG_9944-min_f4bf3ccd-25fc-4057-94c8-988196bfc5fa.jpg?v=1761840111",
//                                             "altText": null
//                                         }
//                                     },
//                                     {
//                                         "node": {
//                                             "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/IMG_5500.jpg?v=1761843078",
//                                             "altText": null
//                                         }
//                                     },
//                                     {
//                                         "node": {
//                                             "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/VID20250215160303.gif?v=1761843078",
//                                             "altText": null
//                                         }
//                                     },
//                                     {
//                                         "node": {
//                                             "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/ezgif-1-2960f3ef30-2_a9170775-0345-49cb-9612-f1d939f1ff5a.gif?v=1761842295",
//                                             "altText": null
//                                         }
//                                     },
//                                     {
//                                         "node": {
//                                             "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/unit_dimensions.png?v=1761842295",
//                                             "altText": null
//                                         }
//                                     },
//                                     {
//                                         "node": {
//                                             "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/IMG_5584.jpg?v=1761842295",
//                                             "altText": null
//                                         }
//                                     }
//                                 ]
//                             }
//                         }
//                     },
//                     "discountAllocations": []
//                 }
//             }
//         ]
//     }
// }
