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
import { AnimatedSection } from "@/app/_components/AnimatedSection";
import ContactForm from "../_components/ContactForm";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

export default async function ContactPage() {
  const client = createClient();
  const page = await client.getSingle("contact");

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[400px] md:h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-samosa-blue" />

        {/* Image */}
        <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full overflow-hidden">
          <PrismicNextImage
            field={page.data.hero_image}
            className="object-cover scale-125"
            fill
            preload
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
              {page.data.hero_text_line_1}
              <br />
              {page.data.hero_text_line_2}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Contact Form */}
            <ContactForm />

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
                        href={`mailto:${page.data.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {page.data.email}
                      </a>
                    </div>
                  </div>
                  {/* <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
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
                  </div> */}
                </div>

                {/* Social Links */}
                <div className="mb-10">
                  <h3 className="font-semibold mb-4 text-foreground">
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {page.data.social_links.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                        aria-label={social.name}
                      >
                        {/* <social.icon className="h-5 w-5" /> */}
                        <PrismicNextImage
                          field={social.icon}
                          className="h-5 w-5"
                        />
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
      {/* <section className="py-20 md:py-28 bg-samosa-yellow-green">
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
      </section> */}
    </div>
  );
}
