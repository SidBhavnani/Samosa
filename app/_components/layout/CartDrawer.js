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
  const { cart, updateQuantity, updating, totalItems, isOpen, closeCart } =
    useCart();

  const formatPrice = (price, currencyCode = "GBP") => {
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: currencyCode,
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

        {cart?.lines.edges.length === 0 ? (
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
              {cart.lines.edges.map((item) => (
                <div
                  key={item.node.id}
                  className="flex gap-4 p-4 bg-muted/50 rounded-lg animate-fade-in"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={
                        item.node.merchandise.product.images.edges[0].node.url
                      }
                      alt={item.node.merchandise.product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">
                      {item.node.merchandise.product.title}
                    </h4>

                    <p className="text-primary font-bold mt-1">
                      {formatPrice(
                        item.node.merchandise.price.amount,
                        item.node.merchandise.price.currencyCode,
                      )}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.node.id, item.node.quantity - 1)
                        }
                        disabled={updating}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center text-sm font-medium">
                        {item.node.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.node.id, item.node.quantity + 1)
                        }
                        disabled={updating}
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
                    onClick={() => updateQuantity(item.node.id, 0)}
                    disabled={updating}
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
                  {formatPrice(
                    cart.cost.subtotalAmount.amount,
                    cart.cost.subtotalAmount.currencyCode,
                  )}
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
