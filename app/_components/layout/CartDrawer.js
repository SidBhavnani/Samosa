"use client";

import Image from "next/image";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";

import { useCart } from "@/app/_contexts/CartContext";
import { cn } from "@/app/_hooks/utils";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    isOpen,
    closeCart,
    clearCart,
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Add some fun to your game night!
            </p>
            <Button onClick={closeCart} className="bg-gradient-primary">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-muted/50 rounded-lg animate-fade-in"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">
                      {item.name}
                    </h4>

                    <p className="text-primary font-bold mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Remove */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>

              <Button
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 h-12 text-lg font-semibold"
                onClick={() => {
                  alert(
                    "Checkout functionality coming soon! For now, contact us to place an order.",
                  );
                }}
              >
                Checkout
              </Button>

              <Button variant="ghost" className="w-full" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
