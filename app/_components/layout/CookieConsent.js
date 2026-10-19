"use client";

import { useSyncExternalStore, useState, useEffect } from "react";

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

function enableShopifyBackendConsentMode() {
  let shopify = window.Shopify;

  const backendConsentStub = {
    backendConsentEnabled: true,
  };

  Object.defineProperty(window, "Shopify", {
    configurable: true,

    get() {
      return shopify;
    },

    set(value) {
      shopify = value;

      // Shopify's CDN resets window.Shopify to an empty object
      // before installing the full Customer Privacy API.
      if (
        value &&
        typeof value === "object" &&
        Object.keys(value).length === 0
      ) {
        let customerPrivacy;

        Object.defineProperty(value, "customerPrivacy", {
          configurable: true,

          get() {
            return customerPrivacy ?? backendConsentStub;
          },

          set(api) {
            customerPrivacy = api;
          },
        });
      }
    },
  });
}

function enableBackendConsentMode() {
  let backendConsentStub = null;
  let fullCustomerPrivacy = null;
  let customShopify = window.Shopify || undefined;

  Object.defineProperty(window, "Shopify", {
    configurable: true,

    get() {
      return customShopify;
    },

    set(value) {
      // Shopify's CDN resets window.Shopify to {} before
      // assigning the full Customer Privacy API.
      if (
        typeof value === "object" &&
        value !== null &&
        Object.keys(value).length === 0
      ) {
        customShopify = value;
        backendConsentStub = { backendConsentEnabled: true };

        Object.defineProperty(window.Shopify, "customerPrivacy", {
          configurable: true,

          get() {
            return fullCustomerPrivacy ?? backendConsentStub;
          },

          set(api) {
            if (
              typeof api === "object" &&
              api !== null &&
              "setTrackingConsent" in api
            ) {
              fullCustomerPrivacy = api;
            }
          },
        });
      } else {
        customShopify = value;
      }
    },
  });
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
      enableBackendConsentMode();

      const initialize = () => {
        const privacy = window.Shopify?.customerPrivacy;

        if (privacy?.setTrackingConsent) {
          resolve(privacy);
          return;
        }

        reject(
          new Error(
            "Shopify Customer Privacy API script loaded, but customerPrivacy is unavailable.",
          ),
        );
      };

      // const initialize = () => {
      //   if (typeof window.Shopify?.loadFeatures !== "function") {
      //     reject(new Error("Shopify Customer Privacy API did not load"));
      //     return;
      //   }

      //   window.Shopify.loadFeatures(
      //     [{ name: "consent-tracking-api", version: "0.1" }],
      //     (error) => {
      //       if (error) {
      //         reject(error);
      //         return;
      //       }

      //       const privacy = window.Shopify?.customerPrivacy;

      //       if (!privacy?.setTrackingConsent) {
      //         reject(new Error("Shopify consent API is unavailable"));
      //         return;
      //       }

      //       resolve(privacy);
      //     },
      //   );
      // };

      // enableShopifyBackendConsentMode();

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
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [statisticsEnabled, setStatisticsEnabled] = useState(true);

  async function handleConsent(choice) {
    setPending(true);
    setError("");

    const choices =
      choice === "accept"
        ? { analytics: true, marketing: true, preferences: true }
        : choice === "reject"
          ? { analytics: false, marketing: false, preferences: false }
          : {
              analytics: statisticsEnabled,
              marketing: statisticsEnabled,
              preferences: statisticsEnabled,
            };

    try {
      const privacy = await loadShopifyPrivacyApi();

      // await new Promise((resolve) => {
      //   privacy.setTrackingConsent(
      //     {
      //       analytics: accepted,
      //       marketing: accepted,
      //       preferences: accepted,
      //       headlessStorefront: true,
      //       storefrontRootDomain: "playsamosa.com",
      //       checkoutRootDomain: "checkout.playsamosa.com",
      //       storefrontAccessToken:
      //         process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
      //     },
      //     resolve,
      //   );
      // });

      const result = await new Promise((resolve, reject) => {
        privacy.setTrackingConsent(
          {
            // analytics: accepted,
            // marketing: accepted,
            // preferences: accepted,
            ...choices,
            headlessStorefront: true,
            // storefrontRootDomain: "playsamosa.com",
            // checkoutRootDomain: "checkout.playsamosa.com",
            storefrontRootDomain: ".playsamosa.com",
            checkoutRootDomain: window.location.host,
            storefrontAccessToken:
              process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
          },
          (result) => {
            if (result?.error) {
              reject(
                new Error(
                  `Shopify rejected consent: ${JSON.stringify(result.error)}`,
                ),
              );
              return;
            }

            resolve(result);
          },
        );
      });

      // console.log("Shopify consent result:", result);
      // console.log("Shopify visitor consent:", privacy.currentVisitorConsent());

      // localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "rejected");
      localStorage.setItem(
        CONSENT_KEY,
        choice === "accept"
          ? "accepted"
          : choice === "reject"
            ? "rejected"
            : "custom",
      );

      window.dispatchEvent(new Event("cookie-consent-updated"));
      setPreferencesOpen(false);
    } catch (err) {
      console.error("Failed to save Shopify consent:", err);
      setError("We couldn't save your preference. Please try again.");
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    loadShopifyPrivacyApi()
      .then(() => {
        window.dispatchEvent(new Event("shopify-privacy-api-ready"));
      })
      .catch((error) => {
        console.error("Failed to initialize Shopify privacy API:", error);
      });
  }, []);

  if (consent && consent !== "unknown") {
    return null;
  }

  // return (
  //   <div className="fixed bottom-5 right-5 z-[9999] w-[calc(100%-2rem)] max-w-[380px] rounded-2xl bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5 md:p-5">
  //     <p className="text-xs leading-5 text-[#3d1830] md:text-sm">
  //       We use cookies to improve your experience and understand how our website
  //       is used.
  //     </p>

  //     {error && (
  //       <p role="alert" className="mt-2 text-xs text-red-700">
  //         {error}
  //       </p>
  //     )}

  //     <div className="mt-3 flex gap-2 md:mt-4 md:gap-3">
  //       <button
  //         type="button"
  //         disabled={pending}
  //         onClick={() => handleConsent(false)}
  //         className="flex-1 rounded-full border border-[#a7194b] px-4 py-2.5 text-xs font-semibold text-[#a7194b] transition hover:bg-[#a7194b]/5 disabled:opacity-50 md:text-sm"
  //       >
  //         Reject All
  //       </button>

  //       <button
  //         type="button"
  //         disabled={pending}
  //         onClick={() => handleConsent(true)}
  //         className="flex-1 rounded-full bg-[#a7194b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#8f1640] disabled:opacity-50 md:text-sm"
  //       >
  //         {pending ? "Saving..." : "Accept All"}
  //       </button>
  //     </div>
  //   </div>
  // );

  const buttonClass =
    "w-full rounded-xl px-4 py-3 text-base font-bold transition disabled:opacity-60 sm:text-lg";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {preferencesOpen && (
        <div className="pointer-events-auto fixed inset-0 z-[9998] bg-black/65" />
      )}
      {!preferencesOpen ? (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          className="pointer-events-auto fixed bottom-4 right-4 z-[9999] w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-5 text-[#24121a] shadow-xl sm:bottom-6 sm:right-6 sm:p-6"
        >
          <h2 id="cookie-consent-title" className="sr-only">
            Cookie consent
          </h2>

          <p className="text-xs leading-relaxed sm:text-sm">
            We use cookies to enhance your experience, analyze traffic, and
            personalize content. Some cookies are essential, while others help
            us understand how you interact with our site. You can manage your
            preferences at any time.{" "}
            <a href="/policies" className="underline underline-offset-4">
              Privacy Policy
            </a>
          </p>

          {error && (
            <p role="alert" className="mt-4 text-xs text-red-800">
              {error}
            </p>
          )}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={pending}
              onClick={() => handleConsent("accept")}
              className="rounded-full bg-[#a7194b] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#8f1640] disabled:opacity-60"
            >
              {pending ? "Saving..." : "Accept"}
            </button>

            <button
              type="button"
              disabled={pending}
              onClick={() => {
                setError("");
                setPreferencesOpen(true);
              }}
              className="rounded-full border border-[#a7194b] px-3 py-2 text-sm font-semibold text-[#a7194b] transition hover:bg-[#a7194b]/5 disabled:opacity-60"
            >
              Preferences
            </button>
          </div>
        </section>
      ) : (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="pointer-events-auto fixed inset-0 z-[10000] m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl bg-[#f6f29a] text-[#a7194b] shadow-2xl"
        >
          <header className="flex items-start justify-between gap-4 border-b border-[#a7194b]/15 px-5 py-5 sm:px-8">
            <h2
              id="cookie-preferences-title"
              className="text-lg font-bold sm:text-xl"
            >
              Select the Types of Cookies You Accept
            </h2>

            <button
              type="button"
              aria-label="Close preferences"
              disabled={pending}
              onClick={() => setPreferencesOpen(false)}
              className="text-3xl leading-none"
            >
              ×
            </button>
          </header>

          <div className="px-5 py-4 sm:px-8 sm:py-5">
            <p className="text-sm leading-relaxed sm:text-base">
              Choose which cookies we can use. Necessary cookies are always on.
              You can change your choices at any time in the cookie settings.
            </p>

            <div className="mt-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-bold">Necessary</span>
                <span
                  aria-label="Necessary cookies always enabled"
                  className="flex h-8 w-14 items-center justify-end rounded-full bg-[#858565] p-1"
                >
                  <span className="h-6 w-6 rounded-full bg-[#fffde1]" />
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed sm:text-sm">
                Essential for the website to function properly, these cookies
                enable security, navigation, and access to secure areas. They
                cannot be disabled.
              </p>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="statistics-consent"
                  className="text-lg font-bold"
                >
                  Statistics
                </label>

                <button
                  id="statistics-consent"
                  type="button"
                  role="switch"
                  aria-checked={statisticsEnabled}
                  disabled={pending}
                  onClick={() => setStatisticsEnabled((enabled) => !enabled)}
                  className={`flex h-8 w-14 items-center rounded-full p-1 transition ${
                    statisticsEnabled
                      ? "justify-end bg-[#a7194b]"
                      : "justify-start bg-[#c8c8c8]"
                  }`}
                >
                  <span className="h-6 w-6 rounded-full bg-white shadow" />
                </button>
              </div>

              <p className="mt-3 text-xs leading-relaxed sm:text-sm">
                These cookies help us understand how visitors use our website so
                we can improve their experience.
              </p>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm text-red-800">
                {error}
              </p>
            )}

            <div className="mt-5 grid gap-2.5">
              <button
                type="button"
                disabled={pending}
                onClick={() => handleConsent("accept")}
                className={`${buttonClass} bg-[#a7194b] text-[#f6f29a] hover:bg-[#8f1640]`}
              >
                Accept All
              </button>

              <button
                type="button"
                disabled={pending}
                onClick={() => handleConsent("reject")}
                className={`${buttonClass} bg-[#f5a04b] text-white hover:bg-[#e88d36]`}
              >
                Reject All
              </button>

              <button
                type="button"
                disabled={pending}
                onClick={() => handleConsent("custom")}
                className={`${buttonClass} border-2 border-[#a7194b] hover:bg-[#a7194b]/5`}
              >
                {pending ? "Saving..." : "Save my choice"}
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-[#858565]">
              Cookie preferences
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
