"use client";

import Image from "next/image";
import { AnimatedSection } from "../AnimatedSection";
import { Button } from "../ui/button";
import { Check, Copy, ShoppingCart, Mail } from "lucide-react";
import { useCart } from "@/app/_contexts/CartContext";

import { useRef, useState } from "react";
import { useProduct } from "../ProductProvider";

export default function CTASection({ data, globalNav }) {
  const { addItem, adding } = useCart();
  // const [product, setProduct] = useState(null);
  const { product } = useProduct();

  const ctaSectionRef = useRef(null);

  const handleAddToCart = () => {
    addItem(product.variants.edges[0].node.id, 1);
  };

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        globalNav.email_subscribed_coupon_code,
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy coupon code:", error);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    // console.log(data);

    if (data.success) {
      setSubmittedSuccess(true);
    } else {
      setSubmittedSuccess(false);
    }

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubscribed(true);
  };

  const submitted = !submittedSuccess ? (
    <>
      <Mail className="h-12 w-12 text-primary mb-2 md:mb-4 mx-auto" />
      <p className="text-foreground font-semibold text-xl text-center mx-auto">
        {submittedSuccess
          ? "Thanks for subscribing!"
          : "Oops, something went wrong."}
      </p>
      <p className="text-muted-foreground text-lg font-sans text-center mb-2 md:mb-4 mx-auto">
        {submittedSuccess
          ? "Check your inbox for a welcome surprise 🎉"
          : "Please try again later!"}
      </p>
    </>
  ) : (
    <>
      <p className="text-center font-bystander text-xl md:text-3xl w-4/5 md:w-3/4 mx-auto md:mb-4 text-samosa-magenta">
        {globalNav.email_subscribed_heading}
      </p>
      <p className="text-center text-sm md:text-lg w-full px-2 mx-auto mb-2 md:mb-4 text-samosa-magenta">
        {globalNav.email_subscribed_text_line_1}
        <br />
        {globalNav.email_subscribed_text_line_2}
      </p>

      <div className="mb-2 md:mb-4 w-9/10 md:w-4/5 mx-auto">
        <div className="flex w-full mb-2 md:mb-4 rounded-full items-center bg-samosa-cream px-5 shadow-sm">
          {/* Coupon code */}
          <input
            type="text"
            value={globalNav.email_subscribed_coupon_code}
            readOnly
            className="min-w-0 flex-1 py-3 bg-transparent text-foreground font-bystander outline-none"
          />

          {/* Copy button */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Coupon copied" : "Copy coupon code"}
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-foreground transition-colors cursor-pointer"
          >
            {copied ? (
              <Check size={20} strokeWidth={2.5} />
            ) : (
              <Copy size={20} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </>
  );

  // console.log(product.variants.edges[0].node.id);

  const formatPrice = (price, currencyCode = "GBP") =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currencyCode,
    }).format(price);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const p = await getProduct("samosa", "GB");
  //     setProduct(p);
  //   };

  //   fetchProduct();
  // }, []);

  if (!product) return null;

  return (
    <section
      ref={ctaSectionRef}
      className="py-20 md:py-28 bg-muted relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <AnimatedSection variant="fade-right" className="relative">
              <div className="relative flex justify-center">
                {/* Floating badges */}
                <div className="absolute -top-4 -left-4 md:left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-float z-10">
                  {data.cta_badge_1}
                </div>

                <div className="absolute -bottom-2 -right-4 md:right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-float animation-delay-300 z-10">
                  {data.cta_badge_2}
                </div>

                <div className="absolute top-1/2 -right-8 md:-right-4 bg-background text-foreground px-3 py-2 rounded-full font-bold text-xs shadow-lg animate-float animation-delay-500 z-10 hidden md:block">
                  {data.cta_badge_3}
                </div>

                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl scale-75" />

                {/* Image */}
                <div className="relative w-full max-w-xs md:max-w-sm aspect-square">
                  <Image
                    src={product.images.edges[0].node.url}
                    alt="SAMOSA Game Box"
                    fill
                    className="object-contain drop-shadow-2xl hover:rotate-[-3deg] hover:scale-105 transition-all duration-500"
                    priority
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Right */}
            <AnimatedSection variant="fade-left" delay={200}>
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bystander uppercase mb-4">
                  <span className="text-primary">{data.cta_title}</span>
                </h2>

                <p className="text-lg text-secondary font-semibold mb-8 max-w-md mx-auto lg:mx-0">
                  {data.cta_subtitle}
                </p>

                {/* Price box */}
                <div className="bg-background rounded-2xl p-6 shadow-lg mb-6 max-w-sm mx-auto lg:mx-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-3xl font-bold">
                        {formatPrice(
                          product.variants.edges[0].node.price.amount,
                          product.variants.edges[0].node.price.currencyCode,
                        )}
                      </p>
                    </div>

                    <div className="text-right">
                      {data.minimum_shipping > 0 ? (
                        <>
                          <p className="text-sm text-muted-foreground">
                            Shipping
                          </p>
                          <p className="text-sm font-bold text-accent">
                            FREE over {formatPrice(data.minimum_shipping)}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-bold text-muted-foreground">
                            Free UK & US
                          </p>
                          <p className="text-sm font-bold text-muted-foreground">
                            Shipping
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-bold shadow-xl hover:scale-[1.02] rounded-xl"
                    onClick={handleAddToCart}
                    disabled={adding}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>

                {/* Trust */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    In Stock
                  </span>

                  <span className="flex items-center gap-1.5">
                    📦 Ships in 24h
                  </span>

                  <span className="flex items-center gap-1.5">
                    🔒 Secure checkout
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
          {/* Email Subscribe */}
          {isSubscribed ? (
            <div className="bg-primary/10 rounded-xl mt-12 max-w-3xl mx-auto p-6">
              {submitted}
            </div>
          ) : (
            <>
              <div className="w-full flex flex-col justify-center items-center mt-12">
                <p className="text-center font-extrabold text-lg md:text-xl w-4/5 md:w-3/4 mx-auto text-samosa-magenta">
                  {globalNav.email_pop_up_heading}
                </p>
                <p className="text-center text-sm md:text-lg w-9/10 md:w-4/5 mx-auto mb-2 text-samosa-magenta">
                  {globalNav.email_pop_up_subheading}
                </p>
              </div>
              <form
                onSubmit={handleSubscribe}
                className="flex gap-3 mb-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-3 rounded-full bg-samosa-cream text-foreground font-sans text-sm border-none outline-none shadow-sm"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-sans font-bold"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-primary/50 font-sans text-xs mx-auto text-center font-semibold">
                {globalNav.email_pop_up_footer}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
