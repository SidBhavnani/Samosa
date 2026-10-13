"use client";

// import { useEffect, useState } from "react";
// import { useShopifyCookies, getTrackingValues } from "@shopify/hydrogen-react";

// function TrackingInitializer() {
//   const cookiesReady = useShopifyCookies({
//     fetchTrackingValues: true,
//     storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
//     checkoutDomain: "https://checkout.playsamosa.com",
//   });

//   useEffect(() => {
//     if (!cookiesReady) return;

//     console.log("Shopify tracking values:", getTrackingValues());
//   }, [cookiesReady]);

//   return null;
// }

// export default function ShopifyAnalyticsInit() {
//   const [privacyReady, setPrivacyReady] = useState(false);

//   useEffect(() => {
//     const handleReady = () => setPrivacyReady(true);

//     window.addEventListener("shopify-privacy-api-ready", handleReady);

//     // Handle the case where the API loaded before this listener.
//     if (window.Shopify?.customerPrivacy?.setTrackingConsent) {
//       // setPrivacyReady(true);
//       handleReady();
//     }

//     return () => {
//       window.removeEventListener("shopify-privacy-api-ready", handleReady);
//     };
//   }, []);

//   if (!privacyReady) return null;

//   return <TrackingInitializer />;
// }

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  useShopifyCookies,
  getClientBrowserParameters,
  sendShopifyAnalytics,
  AnalyticsEventName,
} from "@shopify/hydrogen-react";

function TrackingInitializer({ currency }) {
  const pathname = usePathname();

  const cookiesReady = useShopifyCookies({
    fetchTrackingValues: true,
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
    checkoutDomain: "https://checkout.playsamosa.com",
  });

  useEffect(() => {
    if (!cookiesReady || !pathname) return;

    const privacy = window.Shopify?.customerPrivacy;

    if (!privacy) {
      console.warn("Shopify Customer Privacy API is unavailable.");
      return;
    }

    const analyticsAllowed = Boolean(privacy.analyticsProcessingAllowed?.());

    // Respect the visitor's analytics consent.
    if (!analyticsAllowed) {
      console.info("Shopify analytics consent not granted.");
      return;
    }

    const payload = {
      ...getClientBrowserParameters(),

      shopId: "gid://shopify/Shop/94901895552",
      shopifySalesChannel: "headless",

      // Match these to the market currently displayed.
      currency: currency || "GBP",
      acceptedLanguage: document.documentElement.lang?.split("-")[0] || "en",

      hasUserConsent: analyticsAllowed,
      analyticsAllowed,
      marketingAllowed: Boolean(privacy.marketingAllowed?.()),
      saleOfDataAllowed: Boolean(privacy.saleOfDataAllowed?.()),

      pageType:
        pathname === "/"
          ? "index"
          : pathname.startsWith("/shop")
            ? "product"
            : pathname.startsWith("/collections/")
              ? "collection"
              : pathname === "/cart"
                ? "cart"
                : "page",

      canonicalUrl: window.location.href,
    };

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload,
    })
      .then(() => {
        console.info("Shopify page-view event sent:", pathname);
      })
      .catch((error) => {
        console.error("Shopify analytics error:", error);
      });
  }, [cookiesReady, pathname]);

  return null;
}

export default function ShopifyAnalyticsInit({ currency }) {
  const [privacyReady, setPrivacyReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setPrivacyReady(true);

    window.addEventListener("shopify-privacy-api-ready", handleReady);

    // The API may already be initialized.
    if (window.Shopify?.customerPrivacy?.setTrackingConsent) {
      handleReady();
    }

    return () => {
      window.removeEventListener("shopify-privacy-api-ready", handleReady);
    };
  }, []);

  if (!privacyReady) return null;

  return <TrackingInitializer currency={currency} />;
}
