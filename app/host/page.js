import partyVibes from "@/public/assets/host-feed-banner.jpg";
import boardSetup from "@/public/assets/photos/board-setup.jpg";
import friendsPlaying from "@/public/assets/photos/friends-playing.jpg";
import gameNightGroup from "@/public/assets/photos/game-night-group.jpg";
import gameplayAction from "@/public/assets/photos/gameplay-action.gif";
import boxFlatlay from "@/public/assets/photos/box-flatlay.jpg";
import competitionBanner from "@/public/assets/host-competition-banner.png";
import boardStrip from "@/public/assets/host-board-strip.png";
import { AnimatedSection } from "../_components/AnimatedSection";
import Image from "next/image";
import { Button } from "../_components/ui/button";
import { Download, ExternalLink, Music, Trophy } from "lucide-react";
import Link from "next/link";

const playlists = [
  {
    title: "Bollywood Bangers",
    vibe: "High Energy",
    perfect: "Competitive groups, younger crowds, party vibes",
    description: "Upbeat, dance-worthy, gets everyone hyped",
    emoji: "🎉",
  },
  {
    title: "Desi Classics",
    vibe: "Feel-Good Nostalgia",
    perfect: "Mixed generations, family game nights, chill vibes",
    description: "Timeless hits everyone knows and loves",
    emoji: "💛",
  },
  {
    title: "Lo-fi Desi Beats",
    vibe: "Laid-Back",
    perfect: "Intimate gatherings, late-night sessions, cozy vibes",
    description:
      "Modern remixes and instrumentals that won't overpower conversation",
    emoji: "🌙",
  },
];

const noFussSnacks = [
  "Namkeen mix (chevda, sev, peanuts)",
  "Samosas (store-bought, air-fried or microwave – we won't judge)",
  "Chakli & mathri from your local Indian shop",
  "Bhujia with lime and chaat masala",
  "Mango pickle & papad",
  "Cut fruit with chaat masala (nostalgia in a bowl)",
  "Chai (because obviously)",
];

const impressFriends = {
  savory: [
    "Pani puri station (fill-your-own keeps people entertained)",
    "Chaat platter (samosa chaat, papdi chaat, dahi bhalla)",
    "Pakora spread (onion, paneer, mix veg)",
    "Kachori with chutneys",
    "Vada pav sliders",
  ],
  sweet: [
    "Jalebi (warm from the sweet shop = game changer)",
    "Gulab jamun (store-bought is perfectly acceptable)",
    "Kulfi popsicles (easy to grab between rounds)",
  ],
  drinks: [
    "Masala chai bar (spices, milk, sugar ready for custom cups)",
    "Mango lassi",
    "Nimbu pani (fresh lime soda)",
    "Thandai (if you're feeling fancy)",
  ],
};

const eliteTier = {
  menu: [
    { course: "Starter", items: "Paneer tikka or tandoori chicken" },
    {
      course: "Mains",
      items: "Butter chicken or paneer butter masala + dal makhani",
    },
    { course: "Sides", items: "Garlic naan, jeera rice, raita" },
    { course: "Dessert", items: "Ras malai or kheer" },
  ],
  strategy: [
    "Serve dinner first (6:30–7:30pm)",
    "Clear the table together (builds team bonding 😉)",
    "Bring out dessert + chai",
    "Start SAMOSA while people are still at the table (7:45–8pm)",
    "Keep snacks nearby for mid-game munchies",
  ],
};

const adultDrinks = [
  "Gin + tonic with curry leaves & chili",
  "Kingfisher beer (classic)",
  "Mango margaritas",
  "Whiskey with nimbu",
  "Wine (Riesling or Gewürztraminer pair beautifully with spice)",
];

const everyoneDrinks = [
  "Masala chai (always)",
  "Rooh Afza sharbat",
  "Fresh coconut water",
  "Jaljeera",
  "Rose milk",
];

const badges = [
  {
    emoji: "🧡",
    name: "Dil Se Desi",
    desc: "In their element when playing the game",
  },
  { emoji: "🔥", name: "Bolly Boss", desc: "Dominates the Bollywood category" },
  { emoji: "❓", name: "Guessing Guru", desc: "The most skilled guesser" },
  { emoji: "👑", name: "Samosa Sultan", desc: "Pro at the SAMOSA round" },
  { emoji: "🍋", name: "Kaccha Nimbu", desc: "Newbie to the game" },
];

const photoIdeas = [
  "Flat lay: Game board + snacks + chai cups",
  "Action shot: Someone mid-description (peak chaos)",
  "Winner's podium moment with badges",
  "The final leaderboard reveal",
  "Team celebrations",
];

export default function HostGameNightPage() {
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
                  Your blueprint for the most legendary desi game night — the
                  one your friends will replay in the group chat for weeks.
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
                      <Image
                        src={boxFlatlay}
                        alt="SAMOSA box flatlay"
                        className="w-full h-full object-cover"
                        fill
                      />
                    </div>
                  </div>
                  {/* Front card — opposite tilt */}
                  <div className="absolute bottom-0 right-0 w-[60%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-samosa-cream rotate-[5deg]">
                    <div className="w-full h-full relative">
                      <Image
                        src={gameNightGroup}
                        alt="Friends at SAMOSA game night"
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
      <section id="vibe" className="py-16 md:py-24 bg-samosa-cream">
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
                Set the Vibe 🎵
              </h2>
              <p className="text-base md:text-lg text-foreground/80 font-sans max-w-2xl">
                The right playlist changes everything. Pick your energy:
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playlists.map((p, i) => (
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
                    <a
                      href="https://open.spotify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                Start with lo-fi during setup, switch to classics during
                gameplay, bring out the bangers when competition heats up!
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Full-bleed image strip after Step 1 */}
      <AnimatedSection variant="fade-up">
        <div className="w-full h-[200px] md:h-[280px] overflow-hidden">
          <div className="w-full h-full relative">
            <Image
              src={partyVibes}
              alt="Desi fun and flavour stickers"
              className="w-full h-full object-cover"
              fill
            />
          </div>
        </div>
      </AnimatedSection>

      {/* STEP 2 - Feed Your People */}
      <section
        id="feed"
        className="py-12 md:py-16 bg-samosa-blue text-samosa-cream"
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
                <span className="text-secondary">Feed Your </span>
                <span className="text-samosa-cream">People 🍽️</span>
              </h2>
              <p className="text-base md:text-lg font-sans max-w-2xl text-samosa-cream/85">
                Choose your effort level:
              </p>
            </div>
          </AnimatedSection>

          {/* No Fuss */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <AnimatedSection variant="fade-up">
              <div className="bg-samosa-cream text-foreground rounded-2xl p-6 md:p-8 h-full">
                <div className="text-4xl mb-3">😌</div>
                <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                  No-Fuss Snacks
                </h3>
                <p className="text-secondary font-sans font-bold text-xs uppercase tracking-wider mb-5">
                  Ready in 10 mins
                </p>
                <p className="text-sm font-sans text-foreground/70 mb-4 italic">
                  For when you&apos;re keeping it simple:
                </p>
                <ul className="space-y-2">
                  {noFussSnacks.map((s) => (
                    <li
                      key={s}
                      className="text-sm font-sans text-foreground/85 flex gap-2"
                    >
                      <span className="text-secondary">▸</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fade-up" delay={100}>
              <div className="bg-samosa-cream text-foreground rounded-2xl p-6 md:p-8 h-full">
                <div className="text-4xl mb-3">👨‍🍳</div>
                <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                  Impress Your Friends
                </h3>
                <p className="text-secondary font-sans font-bold text-xs uppercase tracking-wider mb-5">
                  30–45 mins prep
                </p>
                <p className="text-sm font-sans text-foreground/70 mb-4 italic">
                  When you want to look like you have your life together:
                </p>
                {["savory", "sweet", "drinks"].map((cat) => (
                  <div key={cat} className="mb-4 last:mb-0">
                    <p className="text-xs font-sans font-black uppercase tracking-wider text-primary mb-2">
                      {cat}
                    </p>
                    <ul className="space-y-1.5">
                      {impressFriends[cat].map((s) => (
                        <li
                          key={s}
                          className="text-sm font-sans text-foreground/85 flex gap-2"
                        >
                          <span className="text-secondary">▸</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fade-up" delay={200}>
              <div className="bg-secondary text-secondary-foreground rounded-2xl p-6 md:p-8 h-full">
                <div className="text-4xl mb-3">🔥</div>
                <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                  Elite Tier
                </h3>
                <p className="text-primary font-sans font-bold text-xs uppercase tracking-wider mb-5">
                  Full dinner + game night
                </p>
                <p className="text-sm font-sans text-secondary-foreground/80 mb-4 italic">
                  When you&apos;re going ALL IN:
                </p>
                <p className="text-xs font-sans font-black uppercase tracking-wider text-primary mb-2">
                  The Menu
                </p>
                <ul className="space-y-1.5 mb-4">
                  {eliteTier.menu.map((m) => (
                    <li key={m.course} className="text-sm font-sans">
                      <span className="font-bold text-primary">
                        {m.course}:
                      </span>{" "}
                      <span className="text-secondary-foreground/85">
                        {m.items}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-sans font-black uppercase tracking-wider text-primary mb-2">
                  The Strategy
                </p>
                <ul className="space-y-1.5">
                  {eliteTier.strategy.map((s) => (
                    <li
                      key={s}
                      className="text-sm font-sans flex gap-2 text-secondary-foreground/85"
                    >
                      <span className="text-primary">▸</span>
                      <span>{s}</span>
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
                Order takeout and plate it nicely. Your secret&apos;s safe with
                us 🤫
              </p>
            </div>
          </AnimatedSection>

          {/* Drinks */}
          {/* <AnimatedSection variant="fade-up">
            <div className="text-left mb-8">
              <p className="text-secondary font-sans font-black text-sm uppercase tracking-[0.2em] mb-2">
                Bonus
              </p>
              <h3 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-[0.03em] mb-3 text-samosa-cream">
                Drink Pairings 🍷
              </h3>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection variant="fade-up">
              <div className="bg-samosa-cream/10 backdrop-blur rounded-2xl p-6 md:p-8 border border-samosa-cream/20">
                <h4 className="text-xl font-bystander uppercase text-secondary mb-4 leading-[1.1]">
                  For the Adults
                </h4>
                <ul className="space-y-2">
                  {adultDrinks.map((d) => (
                    <li
                      key={d}
                      className="text-sm md:text-base font-sans flex gap-2 text-samosa-cream/90"
                    >
                      <span className="text-secondary">▸</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="fade-up" delay={100}>
              <div className="bg-samosa-cream/10 backdrop-blur rounded-2xl p-6 md:p-8 border border-samosa-cream/20">
                <h4 className="text-xl font-bystander uppercase text-secondary mb-4 leading-[1.1]">
                  For Everyone
                </h4>
                <ul className="space-y-2">
                  {everyoneDrinks.map((d) => (
                    <li
                      key={d}
                      className="text-sm md:text-base font-sans flex gap-2 text-samosa-cream/90"
                    >
                      <span className="text-secondary">▸</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div> */}
        </div>
      </section>

      {/* "Remove SAMOSA LEADERBOARD and ACHIEVEMENT BADGES in Step 3 BRING THE COMPETITION 🏆



Change Step 3 text to: 


""A little friendly rivalry goes a long way.

Choose your game night stakes:

☕️ Chai Stakes

Loser makes the next round of chai.

🍨 Dessert Stakes

Winner gets first pick of dessert.

📱 Bragging Rights Stakes

Winner gets to update the group chat name until the next game night.

🎤 Speech Stakes

Last place must give a 30-second acceptance speech explaining what went wrong.""" */}

      {/* STEP 3 - Bring the Competition */}
      <section id="compete" className="py-16 md:py-24 bg-samosa-cream">
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
                Bring the Competition 🏆
              </h2>
              <p className="text-base md:text-lg text-foreground/80 font-sans max-w-2xl">
                A little friendly rivalry goes a long way. Choose your game
                night stakes:
              </p>
            </div>
          </AnimatedSection>

          {/* Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <AnimatedSection variant="fade-up">
              <div className="bg-samosa-cream/60 backdrop-blur-sm border border-primary/15 rounded-2xl p-6 md:p-8 h-full flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                  ☕️ Chai Stakes
                </h3>
                <p className="text-sm md:text-base uppercase font-bystander text-secondary">
                  Loser makes the next round of chai.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="fade-up">
              <div className="bg-samosa-cream/60 backdrop-blur-sm border border-primary/15 rounded-2xl p-6 md:p-8 h-full flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                  🍨 Dessert Stakes
                </h3>
                <p className="text-sm md:text-base uppercase font-bystander text-secondary">
                  Winner gets first pick of dessert.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="fade-up">
              <div className="bg-samosa-cream/60 backdrop-blur-sm border border-primary/15 rounded-2xl p-6 md:p-8 h-full flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                  📱 Bragging Rights Stakes
                </h3>
                <p className="text-sm md:text-base uppercase font-bystander text-secondary">
                  Winner gets to update the group chat name until the next game
                  night.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="fade-up">
              <div className="bg-samosa-cream/60 backdrop-blur-sm border border-primary/15 rounded-2xl p-6 md:p-8 h-full flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bystander uppercase text-primary leading-[1.1] mb-1">
                  🎤 Speech Stakes
                </h3>
                <p className="text-sm md:text-base uppercase font-bystander text-secondary">
                  Last place must give a 30-second acceptance speech explaining
                  what went wrong.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Instagram-worthy */}
          <AnimatedSection variant="fade-up">
            <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left: Title + CTA card */}
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <h3 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase text-primary leading-[1.1] tracking-[0.03em] mb-4">
                  Make It{" "}
                  <span className="text-secondary">Instagram-Worthy</span> 📸
                </h3>
                <p className="text-sm md:text-base font-sans text-foreground/70 mb-8 max-w-md">
                  Five shots that will absolutely pop off in the group chat.
                </p>

                <div className="bg-primary text-primary-foreground p-6 md:p-8 rounded-sm">
                  <p className="font-bystander uppercase text-2xl md:text-3xl leading-[1.05] mb-5">
                    Tag <span className="text-secondary">@playsamosa</span> —
                    get featured on our feed 🧡
                  </p>
                  <Button
                    asChild
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-sans font-bold rounded-none"
                  >
                    <a
                      href="https://instagram.com/playsamosa"
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
                {photoIdeas.map((idea, i) => (
                  <li
                    key={idea}
                    className="flex items-start gap-5 md:gap-7 py-5 md:py-6 border-t border-primary/15 last:border-b"
                  >
                    <span className="font-bystander text-5xl md:text-6xl leading-none text-secondary tabular-nums w-14 md:w-16 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 pt-1">
                      <span className="text-2xl md:text-3xl mr-3 align-middle">
                        {["📸", "🎬", "🏆", "📊", "🥳"][i % 5]}
                      </span>
                      <span className="font-sans text-base md:text-lg text-foreground/85 align-middle">
                        {idea}
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
            <Image
              src={boardStrip}
              alt="SAMOSA board game closeup"
              className="w-full h-full object-cover"
              fill
            />
          </div>
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <AnimatedSection variant="fade-up">
            <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-[0.03em] mb-6">
              <span className="text-samosa-cream">Ready to </span>
              <span className="text-secondary">Host?</span>
            </h2>
            <p className="text-base md:text-lg text-samosa-cream/90 font-sans max-w-2xl mx-auto mb-8">
              Grab the game, follow the guide, and you&apos;re set for the most
              legendary night your friends will talk about for weeks.
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
