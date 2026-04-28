"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Clock,
  Send,
  Package,
  Users,
  FileText,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { Label } from "@/app/_components/ui/label";
import { AnimatedSection } from "@/app/_components/AnimatedSection";
import contactHero from "@/public/assets/photos/contact-hero.jpg";

const supportCategories = [
  {
    title: "Order Support",
    description: "Track your order, returns, and delivery issues",
    icon: Package,
    link: "mailto:orders@samosagame.com",
    linkText: "orders@samosagame.com",
    emoji: "📦",
  },
  {
    title: "Wholesale Inquiries",
    description: "Bulk orders, retail partnerships, and events",
    icon: Users,
    link: "mailto:wholesale@samosagame.com",
    linkText: "wholesale@samosagame.com",
    emoji: "🤝",
  },
  {
    title: "Press & Media",
    description: "Press kits, interviews, and media requests",
    icon: FileText,
    link: "mailto:press@samosagame.com",
    linkText: "press@samosagame.com",
    emoji: "📰",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/samosagame",
  },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/samosagame" },
  { name: "Facebook", icon: Facebook, url: "https://facebook.com/samosagame" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-samosa-blue" />

        {/* Image */}
        <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full overflow-hidden">
          <Image
            src={contactHero}
            alt="SAMOSA board game setup"
            fill
            className="object-cover scale-125"
            priority
          />
        </div>

        {/* Text */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-16">
          <AnimatedSection>
            <h1 className="text-[53px] font-bystander uppercase mb-6">
              <span className="text-secondary">Get in </span>
              <span className="text-samosa-cream">Touch.</span>
            </h1>

            <p className="text-samosa-cream/80 max-w-xl text-lg font-semibold">
              Have questions, feedback, or just want to say hi?
              <br />
              We&apos;d love to hear from you!
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Contact Form */}
            <div>
              <AnimatedSection variant="fade-right">
                <h2 className="text-[50px] font-bystander uppercase leading-[1.1] tracking-normal mb-8">
                  <span className="text-primary">Send us a </span>
                  <span className="text-secondary">Message.</span>
                </h2>
              </AnimatedSection>

              <AnimatedSection variant="fade-up" delay={200}>
                {isSubmitted ? (
                  <div className="bg-muted rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thanks for reaching out. We&apos;ll get back to you within
                      24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="rounded-full"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us what's on your mind..."
                        rows={5}
                        className="rounded-lg"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 font-semibold rounded-full shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </AnimatedSection>
            </div>

            {/* Right - Contact Info */}
            <div>
              <AnimatedSection variant="fade-left" delay={200}>
                <h2 className="text-[50px] font-bystander uppercase leading-[1.1] tracking-normal mb-8">
                  <span className="text-primary">Other ways to</span>
                  <br />
                  <span className="text-secondary">Reach Us.</span>
                </h2>
              </AnimatedSection>

              <AnimatedSection variant="fade-left" delay={300}>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a
                        href="mailto:hello@samosagame.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        hello@samosagame.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        Business Hours
                      </p>
                      <p className="text-muted-foreground">
                        Mon - Fri: 9am - 6pm IST
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mb-10">
                  <h3 className="font-semibold mb-4 text-foreground">
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                        aria-label={social.name}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="p-6 bg-muted rounded-xl">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Looking for quick answers?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Check our FAQ page for answers to common questions.
                  </p>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/faq">Visit FAQ</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-20 md:py-28 bg-samosa-yellow-green">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection variant="fade-up" className="text-center mb-14">
            <h2 className="text-[50px] font-bystander uppercase leading-[1.1] tracking-normal">
              <span className="text-primary">Direct </span>
              <span className="text-secondary">Lines.</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {supportCategories.map((category, index) => (
              <AnimatedSection
                key={category.title}
                variant="fade-up"
                delay={index * 100}
              >
                <div className="bg-background rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="text-4xl mb-4">{category.emoji}</div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>
                  <a
                    href={category.link}
                    className="text-primary font-medium hover:underline text-sm"
                  >
                    {category.linkText}
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
