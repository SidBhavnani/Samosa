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

// import { useEffect } from "react";
// import { useShopifyCookies, getTrackingValues } from "@shopify/hydrogen-react";

// export default function ShopifyAnalyticsInit() {
//   useShopifyCookies({
//     fetchTrackingValues: true,
//     ignoreDeprecatedCookies: true,
//     storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
//     checkoutDomain: "https://checkout.playsamosa.com",
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       console.log("Shopify tracking values:", getTrackingValues());
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   return null;
// }

import { useEffect, useState } from "react";
import { useShopifyCookies, getTrackingValues } from "@shopify/hydrogen-react";

function TrackingInitializer() {
  const cookiesReady = useShopifyCookies({
    fetchTrackingValues: true,
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
    checkoutDomain: "https://checkout.playsamosa.com",
  });

  useEffect(() => {
    if (!cookiesReady) return;

    console.log("Shopify tracking values:", getTrackingValues());
  }, [cookiesReady]);

  return null;
}

export default function ShopifyAnalyticsInit() {
  const [privacyReady, setPrivacyReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setPrivacyReady(true);

    window.addEventListener("shopify-privacy-api-ready", handleReady);

    // Handle the case where the API loaded before this listener.
    if (window.Shopify?.customerPrivacy?.setTrackingConsent) {
      // setPrivacyReady(true);
      handleReady();
    }

    return () => {
      window.removeEventListener("shopify-privacy-api-ready", handleReady);
    };
  }, []);

  if (!privacyReady) return null;

  return <TrackingInitializer />;
}
