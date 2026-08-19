import { AnimatedSection } from "../_components/AnimatedSection";
import { Button } from "../_components/ui/button";
import { Download, ExternalLink, Music, Trophy } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

export async function generateMetadata() {
  const client = createClient();
  const metadata = await client.getSingle("metadata");

  return {
    title: metadata?.data.host_title,
    description: metadata?.data.host_description,
  };
}

export default async function HostGameNightPage() {
  const client = createClient();
  const page = await client.getSingle("host_game_night");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      {/* Hero — split editorial layout: bold copy block + photo collage with floating chips */}
      <section className="relative h-[480px] md:h-[520px] overflow-hidden bg-primary pt-28 md:pt-32">
        {/* Subtle radial accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 85% 30%, hsl(var(--secondary) / 0.35), transparent 55%)",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
            {/* LEFT — copy + scrolling step ticker */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <AnimatedSection variant="fade-up" delay={100}>
                <h1 className="text-[38px] w-3/4 md:w-auto md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-5">
                  <span className="text-secondary">Host the </span>
                  <span className="text-samosa-cream">Perfect </span>
                  <span className="text-secondary">Game Night.</span>
                </h1>
              </AnimatedSection>
              <AnimatedSection variant="fade-up" delay={200}>
                <p className="text-base md:text-lg text-samosa-cream font-sans font-semibold max-w-xl mb-6">
                  {page.data.hero_subtitle}
                </p>
              </AnimatedSection>
              <AnimatedSection variant="fade-up" delay={300}>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  {[
                    { n: "01", label: "Vibe", emoji: "🎵", link: "/host#vibe" },
                    { n: "02", label: "Feed", emoji: "🍽️", link: "/host#feed" },
                    {
                      n: "03",
                      label: "Compete",
                      emoji: "🏆",
                      link: "/host#compete",
                    },
                  ].map((s) => (
                    <Link key={s.n} href={s.link}>
                      <div className="flex items-center gap-2 bg-samosa-cream/10 border border-samosa-cream/25 backdrop-blur-sm rounded-full pl-2 pr-4 py-1.5 hover:bg-samosa-cream/20 hover:border-samosa-cream/30 transition-colors duration-300">
                        <span className="bg-secondary text-secondary-foreground font-sans font-black text-[10px] tracking-wider rounded-full h-6 w-6 flex items-center justify-center">
                          {s.n}
                        </span>
                        <span className="text-samosa-cream font-sans font-bold text-sm uppercase tracking-wider">
                          {s.label}
                        </span>
                        <span className="text-base">{s.emoji}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* RIGHT — photo collage with floating chips */}
            <div className="hidden lg:block lg:col-span-5 relative h-[400px]">
              <AnimatedSection variant="fade-up" delay={150}>
                <div className="relative h-[400px] w-full">
                  {/* Back card — tilted */}
                  <div className="absolute top-2 left-6 w-[58%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-samosa-cream rotate-[-6deg]">
                    <div className="w-full h-full relative">
                      <PrismicNextImage
                        field={page.data.hero_back_card}
                        className="w-full h-full object-cover"
                        fill
                      />
                    </div>
                  </div>
                  {/* Front card — opposite tilt */}
                  <div className="absolute bottom-0 right-0 w-[60%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-samosa-cream rotate-[5deg]">
                    <div className="w-full h-full relative">
                      <PrismicNextImage
                        field={page.data.hero_front_card}
                        className="w-full h-full object-cover"
                        fill
                      />
                    </div>
                  </div>

                  {/* Floating "live" chip */}
                  <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground rounded-full px-3 py-1.5 font-sans font-black text-[11px] uppercase tracking-wider shadow-xl flex items-center gap-1.5 rotate-[8deg]">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Pure Chaos
                  </div>
                  {/* Floating chai chip */}
                  <div className="absolute bottom-8 left-0 bg-samosa-yellow-green text-primary rounded-full px-3 py-1.5 font-sans font-black text-[11px] uppercase tracking-wider shadow-xl flex items-center gap-1.5 rotate-[-6deg]">
                    🍵 Chai Required
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 1 - Set the Vibe */}
      <section
        id="vibe"
        className="py-16 md:py-24 bg-samosa-cream scroll-mt-25.75 md:scroll-mt-28"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection variant="fade-up">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-secondary font-sans font-black text-sm uppercase tracking-[0.2em]">
                  Step 01
                </span>
                <span className="h-px flex-1 max-w-[120px] bg-secondary" />
              </div>
              <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-[0.03em] mb-3 text-primary">
                {page.data.vibe_title}
              </h2>
              <p className="text-base md:text-lg text-foreground/80 font-sans max-w-2xl">
                {page.data.vibe_subtitle}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {page.data.playlists.map((p, i) => (
              <AnimatedSection key={p.title} variant="fade-up" delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 md:p-8 h-full flex flex-col border-2 border-primary/10 hover:border-primary transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="text-4xl mb-4">{p.emoji}</div>
                    <div>
                      <h3 className="text-2xl font-bystander uppercase text-primary leading-[1.1] mb-2">
                        {p.title}
                      </h3>
                      <p className="text-secondary font-sans font-bold text-xs uppercase tracking-wider mb-4">
                        {p.vibe}
                      </p>
                    </div>
                  </div>
                  {/* <p className="text-sm text-foreground/70 font-sans mb-2">
                    <span className="font-bold text-foreground">
                      Perfect for:
                    </span>{" "}
                    {p.perfect}
                  </p>
                  <p className="text-sm text-foreground/70 font-sans mb-6 flex-1">
                    <span className="font-bold text-foreground">Vibe:</span>{" "}
                    {p.description}
                  </p> */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      <Music className="h-4 w-4 mr-2" />
                      Listen on Spotify
                    </a>
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection variant="fade-up" delay={400}>
            <div className="mt-10 bg-secondary/20 border-l-4 border-secondary rounded-r-lg p-5 md:p-6">
              <p className="text-sm md:text-base font-sans text-foreground">
                <span className="font-black text-primary uppercase">
                  Pro tip:
                </span>{" "}
                {page.data.vibe_pro_tip}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Full-bleed image strip after Step 1 */}
      <AnimatedSection variant="fade-up">
        <div className="w-full h-[200px] md:h-[280px] overflow-hidden">
          <div className="w-full h-full relative">
            <PrismicNextImage
              field={page.data.image_strip}
              className="w-full h-full object-cover"
              fill
            />
          </div>
        </div>
      </AnimatedSection>

      {/* STEP 2 - Feed Your People */}
      <section
        id="feed"
        className="py-12 md:py-16 bg-samosa-blue text-samosa-cream scroll-mt-25.75 md:scroll-mt-28"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection variant="fade-up">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-secondary font-sans font-black text-sm uppercase tracking-[0.2em]">
                  Step 02
                </span>
                <span className="h-px flex-1 max-w-[120px] bg-secondary" />
              </div>
              <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-[0.03em] mb-3">
                <span className="text-secondary">
                  {page.data.feed_title_highlight}{" "}
                </span>
                <span className="text-samosa-cream">
                  {page.data.feed_title}
                </span>
              </h2>
              <p className="text-base md:text-lg font-sans max-w-2xl text-samosa-cream/85">
                {page.data.feed_subtitle}
              </p>
            </div>
          </AnimatedSection>

          {/* No Fuss */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <AnimatedSection variant="fade-up">
              <div className="bg-samosa-cream text-foreground rounded-2xl p-6 md:p-8 h-full">
                <div className="text-4xl mb-3">{page.data.level_1_emoji}</div>
                <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                  {page.data.level_1_title}
                </h3>
                <p className="text-secondary font-sans font-bold text-xs uppercase tracking-wider mb-5">
                  {page.data.level_1_subtitle}
                </p>
                <p className="text-sm font-sans text-foreground/70 mb-4 italic">
                  {page.data.level_1_text}
                </p>
                <ul className="space-y-2">
                  {page.data.level_1_snacks.map((s) => (
                    <li
                      key={s.snack}
                      className="text-sm font-sans text-foreground/85 flex gap-2"
                    >
                      <span className="text-secondary">▸</span>
                      <span>{s.snack}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fade-up" delay={100}>
              <div className="bg-samosa-cream text-foreground rounded-2xl p-6 md:p-8 h-full">
                <div className="text-4xl mb-3">{page.data.level_2_emoji}</div>
                <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                  {page.data.level_2_title}
                </h3>
                <p className="text-secondary font-sans font-bold text-xs uppercase tracking-wider mb-5">
                  {page.data.level_2_subtitle}
                </p>
                <p className="text-sm font-sans text-foreground/70 mb-4 italic">
                  {page.data.level_2_text}
                </p>
                <div className="mb-4 last:mb-0">
                  <p className="text-xs font-sans font-black uppercase tracking-wider text-primary mb-2">
                    Savory
                  </p>
                  <ul className="space-y-1.5">
                    {page.data.level_2_savory.map((s) => (
                      <li
                        key={s.savory}
                        className="text-sm font-sans text-foreground/85 flex gap-2"
                      >
                        <span className="text-secondary">▸</span>
                        <span>{s.savory}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 last:mb-0">
                  <p className="text-xs font-sans font-black uppercase tracking-wider text-primary mb-2">
                    Sweet
                  </p>
                  <ul className="space-y-1.5">
                    {page.data.level_2_sweets.map((s) => (
                      <li
                        key={s.sweet}
                        className="text-sm font-sans text-foreground/85 flex gap-2"
                      >
                        <span className="text-secondary">▸</span>
                        <span>{s.sweet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 last:mb-0">
                  <p className="text-xs font-sans font-black uppercase tracking-wider text-primary mb-2">
                    Drinks
                  </p>
                  <ul className="space-y-1.5">
                    {page.data.level_2_drinks.map((d) => (
                      <li
                        key={d.drink}
                        className="text-sm font-sans text-foreground/85 flex gap-2"
                      >
                        <span className="text-secondary">▸</span>
                        <span>{d.drink}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fade-up" delay={200}>
              <div className="bg-secondary text-secondary-foreground rounded-2xl p-6 md:p-8 h-full">
                <div className="text-4xl mb-3">{page.data.level_3_emoji}</div>
                <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                  {page.data.level_3_title}
                </h3>
                <p className="text-primary font-sans font-bold text-xs uppercase tracking-wider mb-5">
                  {page.data.level_3_subtitle}
                </p>
                <p className="text-sm font-sans text-secondary-foreground/80 mb-4 italic">
                  {page.data.level_3_text}
                </p>
                <p className="text-xs font-sans font-black uppercase tracking-wider text-primary mb-2">
                  The Menu
                </p>
                <ul className="space-y-1.5 mb-4">
                  {page.data.level_3_menu.map((m) => (
                    <li key={m.course} className="text-sm font-sans">
                      <span className="font-bold text-primary">
                        {m.course}:
                      </span>{" "}
                      <span className="text-secondary-foreground/85">
                        {m.item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-sans font-black uppercase tracking-wider text-primary mb-2">
                  The Strategy
                </p>
                <ul className="space-y-1.5">
                  {page.data.level_3_strategy.map((s) => (
                    <li
                      key={s.step}
                      className="text-sm font-sans flex gap-2 text-secondary-foreground/85"
                    >
                      <span className="text-primary">▸</span>
                      <span>{s.step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection variant="fade-up">
            <div className="bg-samosa-cream/10 border-l-4 border-secondary rounded-r-lg p-5 md:p-6">
              <p className="text-sm md:text-base font-sans text-samosa-cream">
                <span className="font-black text-secondary uppercase">
                  Pro tip:
                </span>{" "}
                {page.data.feed_pro_tip}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* STEP 3 - Bring the Competition */}
      <section
        id="compete"
        className="py-16 md:py-24 bg-samosa-cream scroll-mt-25.75 md:scroll-mt-28"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection variant="fade-up">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-secondary font-sans font-black text-sm uppercase tracking-[0.2em]">
                  Step 03
                </span>
                <span className="h-px flex-1 max-w-[120px] bg-secondary" />
              </div>
              <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-[0.03em] mb-3 text-primary">
                {page.data.compete_title}
              </h2>
              <p className="text-base md:text-lg text-foreground/80 font-sans max-w-2xl">
                {page.data.compete_subtitle}
              </p>
            </div>
          </AnimatedSection>

          {/* Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {page.data.stakes.map((stake) => (
              <AnimatedSection key={stake.title} variant="fade-up">
                <div className="bg-samosa-cream/60 backdrop-blur-sm border border-primary/15 rounded-2xl p-6 md:p-8 h-full flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                    {stake.title}
                  </h3>
                  <p className="text-sm md:text-base uppercase font-bystander text-secondary">
                    {stake.subtitle}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Instagram-worthy */}
          <AnimatedSection variant="fade-up">
            <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left: Title + CTA card */}
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <h3 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase text-primary leading-[1.1] tracking-[0.03em] mb-4">
                  {page.data.instagram_title}{" "}
                  <span className="text-secondary">
                    {page.data.instagram_title_highlight}
                  </span>{" "}
                  📸
                </h3>
                <p className="text-sm md:text-base font-sans text-foreground/70 mb-8 max-w-md">
                  {page.data.instagram_subtitle}
                </p>

                <div className="bg-primary text-primary-foreground p-6 md:p-8 rounded-sm">
                  <p className="font-bystander uppercase text-2xl md:text-3xl leading-[1.05] mb-5">
                    Tag{" "}
                    <span className="text-secondary">
                      {page.data.instagram_account}
                    </span>{" "}
                    — get featured on our feed 🧡
                  </p>
                  <Button
                    asChild
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-sans font-bold rounded-none"
                  >
                    <a
                      href={page.data.instagram_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Follow on Instagram
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right: Editorial numbered list */}
              <ol className="lg:col-span-7 flex flex-col">
                {page.data.photo_ideas.map((idea, i) => (
                  <li
                    key={idea.idea}
                    className="flex items-start gap-5 md:gap-7 py-5 md:py-6 border-t border-primary/15 last:border-b"
                  >
                    <span className="font-bystander text-5xl md:text-6xl leading-none text-secondary tabular-nums w-14 md:w-16 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 pt-1">
                      <span className="text-2xl md:text-3xl mr-3 align-middle">
                        {idea.emoji}
                      </span>
                      <span className="font-sans text-base md:text-lg text-foreground/85 align-middle">
                        {idea.idea}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-center py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full relative">
            <PrismicNextImage
              field={page.data.cta_background_image}
              className="w-full h-full object-cover"
              fill
            />
          </div>
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <AnimatedSection variant="fade-up">
            <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-[0.03em] mb-6">
              <span className="text-samosa-cream">{page.data.cta_title} </span>
              <span className="text-secondary">
                {page.data.cta_title_highlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-samosa-cream/90 font-sans max-w-2xl mx-auto mb-8">
              {page.data.cta_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-bold"
              >
                <Link href="/shop">Shop SAMOSA</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-samosa-cream text-samosa-cream bg-transparent hover:bg-samosa-cream hover:text-primary font-sans font-bold"
              >
                <Link href="/how-to-play">
                  How to Play
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
