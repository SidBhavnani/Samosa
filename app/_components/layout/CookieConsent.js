"use client";

import { useSyncExternalStore, useState } from "react";

const CONSENT_KEY = "cookie-consent-v2";
const SHOPIFY_SCRIPT =
  "https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.2/consent-tracking-api.js";

let privacyApiPromise;

function getConsent() {
  return localStorage.getItem(CONSENT_KEY);
}

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("cookie-consent-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cookie-consent-updated", callback);
  };
}

function getServerSnapshot() {
  return "unknown";
}

function loadShopifyPrivacyApi() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Browser environment required"));
  }

  if (window.Shopify?.customerPrivacy?.setTrackingConsent) {
    return Promise.resolve(window.Shopify.customerPrivacy);
  }

  if (!privacyApiPromise) {
    privacyApiPromise = new Promise((resolve, reject) => {
      const initialize = () => {
        if (typeof window.Shopify?.loadFeatures !== "function") {
          reject(new Error("Shopify Customer Privacy API did not load"));
          return;
        }

        window.Shopify.loadFeatures(
          [{ name: "consent-tracking-api", version: "0.1" }],
          (error) => {
            if (error) {
              reject(error);
              return;
            }

            const privacy = window.Shopify?.customerPrivacy;

            if (!privacy?.setTrackingConsent) {
              reject(new Error("Shopify consent API is unavailable"));
              return;
            }

            resolve(privacy);
          },
        );
      };

      let script = document.querySelector(
        'script[data-shopify-privacy-api="true"]',
      );

      if (script?.dataset.loaded === "true") {
        initialize();
        return;
      }

      if (!script) {
        script = document.createElement("script");
        script.src = SHOPIFY_SCRIPT;
        script.async = true;
        script.dataset.shopifyPrivacyApi = "true";
        document.head.appendChild(script);
      }

      script.addEventListener(
        "load",
        () => {
          script.dataset.loaded = "true";
          initialize();
        },
        { once: true },
      );

      script.addEventListener(
        "error",
        () => reject(new Error("Could not load Shopify consent script")),
        { once: true },
      );

      // The script might have loaded before this listener was attached.
      if (window.Shopify?.loadFeatures) {
        initialize();
      }
    }).catch((error) => {
      // console.error("Failed to load Shopify privacy API:", error);
      privacyApiPromise = null;
      throw error;
    });
  }

  return privacyApiPromise;
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getConsent,
    getServerSnapshot,
  );

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleConsent(accepted) {
    setPending(true);
    setError("");

    try {
      const privacy = await loadShopifyPrivacyApi();

      // console.log(privacy);

      await new Promise((resolve) => {
        privacy.setTrackingConsent(
          {
            analytics: accepted,
            marketing: accepted,
            preferences: accepted,
            headlessStorefront: true,
            storefrontRootDomain: "playsamosa.com",
            checkoutRootDomain: "checkout.playsamosa.com",
            storefrontAccessToken:
              process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
          },
          resolve,
        );
      });

      localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "rejected");

      window.dispatchEvent(new Event("cookie-consent-updated"));
    } catch (err) {
      console.error("Failed to save Shopify consent:", err);
      setError("We couldn't save your preference. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (consent && consent !== "unknown") {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[9999] w-[calc(100%-2rem)] max-w-[380px] rounded-2xl bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5 md:p-5">
      <p className="text-xs leading-5 text-[#3d1830] md:text-sm">
        We use cookies to improve your experience and understand how our website
        is used.
      </p>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}

      <div className="mt-3 flex gap-2 md:mt-4 md:gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={() => handleConsent(false)}
          className="flex-1 rounded-full border border-[#a7194b] px-4 py-2.5 text-xs font-semibold text-[#a7194b] transition hover:bg-[#a7194b]/5 disabled:opacity-50 md:text-sm"
        >
          Reject All
        </button>

        <button
          type="button"
          disabled={pending}
          onClick={() => handleConsent(true)}
          className="flex-1 rounded-full bg-[#a7194b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#8f1640] disabled:opacity-50 md:text-sm"
        >
          {pending ? "Saving..." : "Accept All"}
        </button>
      </div>
    </div>
  );
}
