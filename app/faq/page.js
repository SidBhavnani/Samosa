import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { AnimatedSection } from "@/app/_components/AnimatedSection";

import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

export async function generateMetadata() {
  const client = createClient();
  const metadata = await client.getSingle("metadata");

  return {
    title: metadata?.data.faq_title,
    description: metadata?.data.faq_description,
  };
}

export default async function FAQPage() {
  const client = createClient();
  const page = await client.getSingle("faq");

  // FAQ Data (unchanged)
  const faqCategories = [
    {
      title: "About the Game",
      questions: page.data.about_the_game,
    },
    {
      title: "Gameplay & Comparisons",
      questions: page.data.gameplay_comparisons,
    },
    {
      title: "Social & Gifting",
      questions: page.data.social_gifting,
    },
    {
      title: "Orders & Shipping",
      id: "shipping",
      questions: page.data.orders_shipping,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[360px] md:h-[480px] overflow-hidden pt-32 md:pt-48 pb-16 md:pb-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <PrismicNextImage
            field={page.data.hero_banner_image}
            className="object-cover"
            fill
            preload
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <AnimatedSection variant="fade-up" delay={100}>
            <h1 className="text-[53px] font-bystander uppercase leading-[1.1] tracking-normal text-left">
              <span className="text-secondary">Got Questions?</span>
              <br />
              <span className="text-samosa-cream">We&apos;ve Got Answers.</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="py-20 md:py-28 overflow-hidden bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <AnimatedSection variant="fade-up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bystander uppercase mb-4">
              <span className="text-primary">Frequently Asked </span>
              <span className="text-secondary">Questions</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-10">
            {faqCategories.map((category, categoryIndex) => (
              <AnimatedSection
                key={category.title}
                variant="fade-up"
                delay={categoryIndex * 80}
              >
                <div id={category.id}>
                  <p className="text-secondary font-bold tracking-[0.15em] uppercase mb-3">
                    {category.title}
                  </p>

                  <Accordion type="single" collapsible>
                    {category.questions.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.title}-${index}`}
                        id={item.id}
                        className="border-b border-border"
                      >
                        <AccordionTrigger className="text-left font-semibold text-sm">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm">
                          <p
                            dangerouslySetInnerHTML={{ __html: item.answer }}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* STILL NEED HELP */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <PrismicNextImage
            field={page.data.cta_image}
            className="object-cover"
            fill
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-secondary-foreground" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bystander uppercase mb-6">
              <span className="text-samosa-cream">We&apos;re Here </span>
              <span className="text-secondary">For You.</span>
            </h2>

            <p className="text-primary-foreground/80 mb-8 text-lg">
              {page.data.cta_text}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {/* Next Link */}
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">Contact Us</Link>
              </Button>

              {/* Mail link stays anchor */}
              <Button asChild size="lg" className="rounded-full px-8">
                <a href={`mailto:${page.data.cta_email}`}>
                  {page.data.cta_email}
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
