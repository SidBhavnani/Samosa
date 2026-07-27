"use client";

import Link from "next/link";

import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

import { PrismicNextImage } from "@prismicio/next";
import { DynamicIcon } from "lucide-react/dynamic";

const footerLinks = {
  shop: [
    { name: "Products", path: "/shop" },
    { name: "SAMOSA Game", path: "/product" },
  ],
  support: [
    { name: "FAQ", path: "/faq" },
    { name: "Contact Us", path: "/contact" },
    { name: "Shipping Info", path: "/policies/shipping-policy" },
    { name: "Returns", path: "/policies/refund-policy" },
  ],
  company: [
    { name: "About", path: "/founder" },
    { name: "Our Story", path: "/founder" },
    { name: "Privacy Policy", path: "/policies/privacy-policy" },
    { name: "Terms of Service", path: "/policies/terms-of-service" },
  ],
};

export function Footer({ data }) {
  return (
    <footer className="bg-magenta-glow-soft text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <PrismicNextImage
                field={data.footer_logo}
                className="h-12 w-auto"
                preload
              />
            </Link>

            <p className="text-primary-foreground/80 text-sm mb-6 mt-4">
              {data.footer_text}
            </p>

            <div className="flex gap-4">
              {data.social_links.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  aria-label={social.name}
                >
                  <DynamicIcon name={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm">
              © {new Date().getFullYear()} SAMOSA Game. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-primary-foreground/50 text-xs">
                Secure payments accepted
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
