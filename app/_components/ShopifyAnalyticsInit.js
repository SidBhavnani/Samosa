"use client";

// import { useShopifyCookies } from "@shopify/hydrogen-react";

// export default function ShopifyAnalyticsInit() {
//   useShopifyCookies({
//     fetchTrackingValues: true,
//     ignoreDeprecatedCookies: true,
//     storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
//     checkoutDomain: "https://checkout.playsamosa.com",
//   });

//   return null;
// }

import { useEffect } from "react";
import { useShopifyCookies, getTrackingValues } from "@shopify/hydrogen-react";

export default function ShopifyAnalyticsInit() {
  useShopifyCookies({
    fetchTrackingValues: true,
    ignoreDeprecatedCookies: true,
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
    checkoutDomain: "https://checkout.playsamosa.com",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Shopify tracking values:", getTrackingValues());
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
