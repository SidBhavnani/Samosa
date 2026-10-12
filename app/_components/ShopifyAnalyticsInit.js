"use client";

import { useShopifyCookies } from "@shopify/hydrogen-react";

export default function ShopifyAnalyticsInit() {
  useShopifyCookies({
    fetchTrackingValues: true,
    ignoreDeprecatedCookies: true,
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
    checkoutDomain: "https://checkout.playsamosa.com",
  });

  return null;
}
