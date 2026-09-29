"use client";

import { PrismicNextImage } from "@prismicio/next";

import { AnimatedSection } from "../AnimatedSection";
import { Button } from "../ui/button";
import { DynamicIcon } from "lucide-react/dynamic";
import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";

export default function ConnectWithUs({ data, globalNav }) {
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

  return (
    <>
      {/* Connect on Instagram */}
      <section className="py-16 md:py-20 bg-samosa-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection
            variant="fade-up"
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-[36px] md:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-4">
              <span className="text-secondary">Connect </span>
              <span className="text-primary">With Us</span>
            </h2>
            <p className="text-muted-foreground font-sans font-semibold text-base max-w-md mx-auto">
              {data.connect_with_us_text}
            </p>
          </AnimatedSection>

          {/* Instagram-style photo grid */}
          <AnimatedSection variant="fade-up" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
              {data.connect_with_us_gallery.map((item, index) => (
                <a
                  key={index}
                  href={data.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                >
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
                    <PrismicNextImage
                      field={item.image}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      fill
                    />
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-samosa-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection
            variant="fade-up"
            delay={400}
            className="text-center mt-10"
          >
            <Button
              asChild
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-10 py-6 font-sans font-bold uppercase tracking-[0.1em] text-base"
            >
              <a
                href={data.instagram_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.instagram_label}
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Be Part of the SAMOSA Family */}
      <section className="pt-10 md:pt-14 pb-20 md:pb-28 bg-samosa-cream">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
          <AnimatedSection variant="fade-up">
            <h2 className="text-[36px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-4">
              <span className="text-primary">{data.cta_title_line_1}</span>
              <br />
              <span className="text-secondary">{data.cta_title_line_2}</span>
            </h2>
            <p className="text-primary/70 font-sans font-semibold text-base md:text-lg mb-8">
              {data.cta_text}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8 justify-center">
              {globalNav.social_links.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label={social.name}
                >
                  {/* <DynamicIcon name={social.icon} className="w-6 h-6" /> */}
                  <PrismicNextImage field={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Email Subscribe */}
            {isSubscribed ? (
              <div className="bg-primary/10 rounded-xl mb-3 p-6">
                {submitted}
              </div>
            ) : (
              <>
                <div className="w-full flex flex-col justify-center items-center">
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
                <p className="text-primary/50 font-sans text-xs font-semibold">
                  {data.subscribe_text}
                </p>
              </>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
