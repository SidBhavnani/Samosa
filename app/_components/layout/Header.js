"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { useCart } from "@/app/_contexts/CartContext";
import { cn } from "@/app/_hooks/utils";

import samosaLogo from "@/public/assets/samosa-logo.png";
import { PrismicNextImage } from "@prismicio/next";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "How to Play", path: "/how-to-play" },
  { name: "Host Game Night", path: "/host" },
  { name: "Our Story", path: "/founder" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
];

export function Header({ data }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 max-w-screen z-50 bg-primary">
      {/* Marquee */}
      <div className="bg-secondary/80 overflow-hidden py-2 md:py-2.5">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-secondary-foreground/90 text-xs md:text-sm font-bold uppercase mx-1"
            >
              {data.header_text}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <div
        className={cn(
          "transition-all duration-300 bg-primary",
          isScrolled ? "py-3" : "py-5",
        )}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <PrismicNextImage
              field={data.header_logo}
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled ? "h-10 md:h-12" : "h-12 md:h-16",
              )}
              preload
            />
          </Link>

          {/* Right */}
          <div className="flex items-center gap-1">
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "text-primary-foreground bg-primary-foreground/10"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-primary-foreground hover:bg-primary-foreground/10 ml-1 h-8 w-8 p-0"
              onClick={openCart}
            >
              <ShoppingCart className="h-6 w-6 scale-140" />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <Menu className="h-8 w-8 scale-140" size={32} />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                          isActive(link.path)
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted",
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
