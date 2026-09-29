"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AnimatedSection } from "../AnimatedSection";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Quote,
  Check,
  Copy,
} from "lucide-react";
import { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { DynamicIcon } from "lucide-react/dynamic";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/samosagame",
  },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/samosagame" },
  { name: "Facebook", icon: Facebook, url: "https://facebook.com/samosagame" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@samosagame" },
];

export default function SubscribeSection({ data, globalNav }) {
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
      <p className="font-bystander text-xl md:text-2xl text-center w-full px-2 mb-2 text-samosa-magenta">
        {globalNav.email_subscribed_heading}
      </p>
      <p className="text-sm md:text-base text-center w-full px-2 mb-2 md:mb-4 text-samosa-magenta">
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
    <section className="py-20 md:py-28 bg-samosa-yellow-green">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Founder photo */}
            <AnimatedSection variant="fade-right">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden">
                <PrismicNextImage
                  field={data.cta_image}
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            {/* Right - CTA content */}
            <AnimatedSection variant="fade-left" delay={200}>
              <div>
                <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-4">
                  <span className="text-primary">{data.cta_title_line_1}</span>
                  <br />
                  <span className="text-secondary">
                    {data.cta_title_line_2}
                  </span>
                </h2>
                <p className="text-muted-foreground mb-8 text-lg font-sans font-semibold max-w-md">
                  {data.cta_text}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 mb-8">
                  {globalNav.social_links.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      {/* <DynamicIcon
                        name={social.icon_name}
                        className="h-5 w-5"
                      /> */}
                      <PrismicNextImage
                        field={social.icon}
                        className="h-5 w-5"
                      />
                    </a>
                  ))}
                </div>

                {/* Newsletter */}
                <div className="max-w-sm">
                  {isSubscribed ? (
                    <div className="bg-primary/10 rounded-xl p-2">
                      {submitted}
                    </div>
                  ) : (
                    <>
                      <div className="w-full">
                        <p className="font-extrabold md:text-lg text-samosa-magenta">
                          {globalNav.email_pop_up_heading}
                        </p>
                        <p className="text-sm mb-2 text-samosa-magenta">
                          {globalNav.email_pop_up_subheading}
                        </p>
                      </div>
                      <form onSubmit={handleSubscribe} className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="rounded-full"
                        />
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                        >
                          Subscribe
                        </Button>
                      </form>
                      <p className="text-muted-foreground text-xs mt-3 font-sans">
                        {data.subscribe_text}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
