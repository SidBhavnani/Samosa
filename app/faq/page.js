"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { AnimatedSection } from "@/app/_components/AnimatedSection";

import boardCloseup from "@/public/assets/photos/board-closeup.jpg";
import faqHelpBg from "@/public/assets/faq-help-bg.jpg";

// FAQ Data (unchanged)
const faqCategories = [
  {
    title: "About the Game",
    questions: [
      {
        question: "What is SAMOSA board game?",
        answer:
          "SAMOSA is a party board game designed for South Asian groups. It's built around cultural references, inside jokes, and chaotic storytelling — turning everyday brown experiences into hilarious game night moments. It's perfect for dinner parties, birthdays, family gatherings, and pre-drinks.",
      },
      {
        question: "How many players can play SAMOSA?",
        answer: "SAMOSA is designed to be played with 4 to 20 people or more.",
      },
      {
        question: "What age is SAMOSA suitable for?",
        answer:
          "SAMOSA is recommended for ages 12 and above. The game includes cultural humour and references that adult players tend to understand and enjoy more. That said, younger players (around 8+) can still enjoy the game and have fun — especially when playing with family or in mixed-age groups.",
      },
      {
        question: "How long does a game take?",
        answer:
          "A game of SAMOSA lasts around 45–90 minutes — but most groups end up playing multiple rounds.",
      },
      {
        question: "Who is this game for?",
        answer:
          "SAMOSA is made for South Asian groups and families who love celebrating shared cultural moments. If you've grown up around brown culture, experienced family chaos, or enjoy inside jokes that only South Asians get, this game will feel instantly familiar.",
      },
    ],
  },
  {
    title: "Gameplay & Comparisons",
    questions: [
      {
        question: "What makes SAMOSA different from other board games?",
        answer:
          'SAMOSA isn\'t just a board game — it\'s a cultural experience. Unlike generic party games, SAMOSA is designed specifically for the South Asian community. Think "Fevicol", "Virat Kohli", "gulab jamun", and "Tussi ja rahe ho?" all wrapped into one competitive, playful, and hilarious night in with your friends and family. It\'s the game that turns shared cultural moments — from wedding drama to WhatsApp chaos — into hilarious, memorable nights with loved ones.',
      },
      {
        question: "Is SAMOSA like Articulate?",
        answer:
          "Yes — think of SAMOSA as the South Asian (Desi) version of Articulate. It takes the same word-guessing mechanics that make Articulate so fun and applies South Asian cultural references across the 300 cards in the game. This makes SAMOSA perfect for family and friends, including different generations — from parents and grandparents to cousins — so everyone can join in on the laughs.",
      },
      {
        question: "Is SAMOSA like Taboo?",
        answer:
          "Yes — SAMOSA is like a South Asian (Desi) version of Taboo. It takes the same word-guessing and wordplay mechanics that make Taboo so fun and applies South Asian cultural references across the 1,800 words in the game. One key difference is that SAMOSA includes a board and different categories, allowing players' knowledge in certain areas to really shine, adding extra strategy and variety to the game.",
      },
      {
        question: "Is SAMOSA suitable for non-South Asians?",
        answer:
          "SAMOSA is designed specifically for South Asian groups, so its humour and references resonate most with people who share that cultural background. That said, non-South Asians can play and enjoy it — especially with friends or family who understand or are curious about South Asian culture — but the references will land best for those who understand the context.",
      },
    ],
  },
  {
    title: "Social & Gifting",
    questions: [
      {
        question: "Is this good for parties?",
        answer:
          "Yes — that's exactly what it's designed for. SAMOSA works best in groups of friends where people are relaxed, loud, and ready to laugh. It's especially good for dinner parties, pre-drinks, and celebrations.",
      },
      {
        question: "Will it actually be funny?",
        answer:
          "If you and your friends share South Asian cultural references, it usually gets funny very quickly. The humour comes from recognising situations, not forcing jokes — which is why it tends to land harder than generic party games.",
      },
      {
        question: "Is it awkward to play?",
        answer:
          "Not at all — the game is designed to make things easy and flow naturally. After a couple of rounds, people usually get louder and more competitive without even trying.",
      },
      {
        question: "Is this a good gift?",
        answer:
          "Yes — especially for South Asians. It's a great gift for birthdays, housewarmings, or anyone who loves hosting. It's something people actually use, not just something that sits on a shelf.",
      },
      {
        question: "Why does this game exist?",
        answer:
          "Because most party games aren't made for South Asians. SAMOSA was created to bring cultural humour, shared experiences, and inside jokes into one place — so game nights actually feel personal.",
      },
    ],
  },
  {
    title: "Orders & Shipping",
    id: "shipping",
    questions: [
      {
        question: "Where can I buy SAMOSA?",
        answer: "You can buy SAMOSA on playsamosa.com, and on TikTok Shop.",
      },
      {
        question: "Does SAMOSA ship internationally?",
        answer:
          "Yes, SAMOSA ships internationally. Find international shipping options at the checkout.",
      },
      {
        question: "When will I receive my order?",
        answer: `UK orders: 3-5 working days.<br>
        US: 3-7 working days.<br>
        International orders take 7-14 working days depending on your location`,
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order ships, you'll receive an email with tracking information so you can follow your package's journey.",
      },
      {
        question: "What's your return policy?",
        id: "returns",
        answer:
          "You may request a refund within 14 days of receiving your goods. See our full returns policy here",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[480px] overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={boardCloseup}
            alt="Friends playing SAMOSA at a game night party"
            fill
            priority
            className="object-cover"
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
          <Image src={faqHelpBg} alt="" fill className="object-cover" />
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
              Our team typically responds within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {/* Next Link */}
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">Contact Us</Link>
              </Button>

              {/* Mail link stays anchor */}
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="mailto:hello@samosagame.com">hello@samosagame.com</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
