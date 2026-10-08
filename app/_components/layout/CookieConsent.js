"use client";

import { useSyncExternalStore } from "react";

const CONSENT_KEY = "cookie-consent";

function getConsent() {
  return localStorage.getItem(CONSENT_KEY);
}

function subscribe(callback) {
  const handleChange = () => {
    callback();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener("cookie-consent-updated", handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("cookie-consent-updated", handleChange);
  };
}

// Server-side value
function getServerSnapshot() {
  return "unknown";
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribe,
    getConsent,
    getServerSnapshot,
  );

  const handleConsent = (value) => {
    localStorage.setItem(CONSENT_KEY, value);

    // Notify this tab as well
    window.dispatchEvent(new Event("cookie-consent-updated"));
  };

  // Don't show anything if the user has already made a choice
  if (consent && consent !== "unknown") {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[9999] w-[calc(100%-2rem)] max-w-[380px] rounded-2xl bg-white p-4 md:p-5 shadow-[0_8px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
      <p className="text-xs md:text-sm leading-5 text-[#3d1830]">
        We use cookies to improve your experience and understand how our website
        is used.
      </p>

      <div className="mt-2 md:mt-4 flex gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => handleConsent("rejected")}
          className="flex-1 rounded-full border border-[#a7194b] px-4 py-2.5 text-xs md:text-sm font-semibold text-[#a7194b] transition hover:bg-[#a7194b]/5"
        >
          Reject All
        </button>

        <button
          type="button"
          onClick={() => handleConsent("accepted")}
          className="flex-1 rounded-full bg-[#a7194b] px-4 py-2.5 text-xs md:text-sm font-semibold text-white transition hover:bg-[#8f1640]"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
