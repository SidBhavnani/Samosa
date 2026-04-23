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

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "How to Play", path: "/how-to-play" },
  { name: "Our Story", path: "/founder" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary">
      {/* Marquee */}
      <div className="bg-secondary/80 overflow-hidden py-1">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-secondary-foreground/90 text-[10px] font-medium mx-8"
            >
              🎉 Game Night Bundle – Save 15% When You Buy 2+ Games • Free
              Shipping On $30+ 🎉
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
            <Image
              src={samosaLogo}
              alt="SAMOSA"
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled ? "h-10 md:h-12" : "h-12 md:h-16",
              )}
              priority
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
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
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
              <ShoppingCart className="h-4 w-4" />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce-in">
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
                    <Menu className="h-6 w-6" />
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
