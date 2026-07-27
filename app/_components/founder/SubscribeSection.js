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

export default function SubscribeSection({ data }) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
  };

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
                  {data.social_links.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      <DynamicIcon name={social.icon} className="h-5 w-5" />
                    </a>
                  ))}
                </div>

                {/* Newsletter */}
                <div className="max-w-sm">
                  {isSubscribed ? (
                    <div className="bg-primary/10 rounded-xl p-6">
                      <Mail className="h-8 w-8 text-primary mb-2" />
                      <p className="text-foreground font-semibold">
                        Thanks for subscribing!
                      </p>
                      <p className="text-muted-foreground text-sm font-sans">
                        Check your inbox for a welcome surprise 🎉
                      </p>
                    </div>
                  ) : (
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
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                      >
                        Subscribe
                      </Button>
                    </form>
                  )}
                  <p className="text-muted-foreground text-xs mt-3 font-sans">
                    {data.subscribe_text}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
