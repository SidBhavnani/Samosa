import { AnimatedSection } from "@/app/_components/AnimatedSection";

import articulateGame from "@/public/assets/articulate-game.jpg";
import playtestingPhoto from "@/public/assets/playtesting-photo.png";
import prototypePhoto from "@/public/assets/prototype-board.jpg";
import founderPhoto from "@/public/assets/founder-photo.jpg";
import Image from "next/image";

export function OurStorySection() {
  return (
    <>
      {/* Chapter 1 - The Spark */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Text */}
            <div>
              <AnimatedSection variant="fade-right">
                <h3 className="text-[53px] font-bystander uppercase leading-[1.1] tracking-normal text-primary mb-8">
                  It started with a
                  <br />
                  <span className="text-secondary">game of Articulate.</span>
                </h3>
              </AnimatedSection>

              <AnimatedSection variant="fade-right" delay={200}>
                <div className="space-y-4 text-muted-foreground leading-relaxed font-sans font-semibold">
                  <p>
                    My family and I were playing, and word after word came up —
                    &quot;Christopher Wren&quot;, &quot;Teasmaid&quot;,
                    &quot;Halibut&quot;… We were completely stuck.
                  </p>
                  <p>
                    The game was so westernised that we were just stumbling our
                    way through it. And I remember thinking — I grew up in the
                    UK… if I&apos;m struggling, how are my parents supposed to
                    enjoy this?
                  </p>
                  <p>That moment stuck with me.</p>
                  <p>
                    Because it wasn&apos;t just about one game, it was the
                    realisation that there wasn&apos;t anything out there that
                    truly reflected the world we grew up in. We were trying to
                    force ourselves into games that were never really made for
                    us.
                  </p>
                  <p className="text-primary font-bold text-lg">
                    So I decided to create one that was.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right - Articulate Photo */}
            <AnimatedSection variant="fade-left" delay={300}>
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-secondary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative aspect-[4/4] bg-muted rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={articulateGame}
                    alt="Friends playing Articulate board game"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Chapter 2 - Play-testing (Grid layout) */}
      <section className="bg-primary overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:[&>*]:min-h-[350px]">
          {/* Row 1 */}
          <AnimatedSection variant="fade-right">
            <div className="aspect-square lg:aspect-auto lg:h-full bg-samosa-yellow-green overflow-hidden relative">
              <Image
                src={prototypePhoto}
                alt="Early rough prototype of SAMOSA"
                fill
                className="object-cover scale-105"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade-left" delay={100}>
            <div className="bg-primary p-10 md:p-14 lg:p-16 flex flex-col justify-center h-full">
              <p className="text-secondary font-sans font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                01 — The Prototype
              </p>
              <h3 className="text-samosa-cream font-bystander text-2xl md:text-3xl lg:text-[36px] uppercase leading-[1.1] mb-4">
                I started with a (very) rough prototype.
              </h3>
            </div>
          </AnimatedSection>

          {/* Row 2 */}
          <AnimatedSection variant="fade-right" delay={100}>
            <div className="bg-primary/70 p-10 md:p-14 lg:p-16 flex flex-col justify-center h-full">
              <p className="text-secondary font-sans font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                02 — Play-testing
              </p>
              <h3 className="text-samosa-cream font-bystander text-2xl md:text-3xl lg:text-[36px] uppercase leading-[1.1] mb-6">
                From there, it became months of constant play-testing.
              </h3>
              <div className="space-y-5 text-samosa-cream/80 leading-relaxed font-sans font-semibold">
                <p className="text-base md:text-lg">
                  With friends, with family, with people of different ages and
                  backgrounds across the South Asian diaspora.
                </p>
                <p className="text-base md:text-lg">
                  I even hosted play-testing events where I invited complete
                  strangers to play, because I wanted honest reactions, not
                  polite ones.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade-left" delay={200}>
            <div className="aspect-square lg:aspect-auto lg:h-full overflow-hidden">
              <video
                src="/assets/videos/playtesting-gif.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>

        {/* Pull quote divider */}
        <AnimatedSection variant="fade-up">
          <div className="py-12 md:py-16 bg-muted">
            <div className="container mx-auto px-4 lg:px-8">
              <p className="text-secondary font-bystander text-3xl md:text-4xl lg:text-5xl uppercase leading-snug text-center max-w-4xl mx-auto">
                Some things worked instantly.
                <br />
                Others didn&apos;t work at all.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:[&>*]:min-h-[420px]">
          <AnimatedSection variant="fade-right">
            <div className="aspect-square lg:aspect-auto lg:h-full bg-primary/60 overflow-hidden">
              <video
                src="/assets/videos/samosa-game.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-[1.5]"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade-left" delay={100}>
            <div className="bg-primary p-10 md:p-14 lg:p-16 flex flex-col justify-center h-full">
              <p className="text-secondary font-sans font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                03 — The Game
              </p>
              <h3 className="text-samosa-cream font-bystander text-2xl md:text-3xl lg:text-[36px] uppercase leading-[1.1] mb-4">
                But slowly, the game started to take shape
              </h3>
              <p className="text-samosa-cream/80 font-sans font-semibold text-base md:text-lg leading-relaxed">
                — guided by the people it was being built for.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Chapter 3 - The Launch & Impact */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left - Text */}
            <div>
              <AnimatedSection variant="fade-right">
                <h3 className="text-[53px] font-bystander uppercase leading-[1.1] tracking-normal text-primary mb-8">
                  In August 2025,
                  <br />
                  <span className="text-secondary">
                    I finally launched SAMOSA.
                  </span>
                </h3>
              </AnimatedSection>

              <AnimatedSection variant="fade-right" delay={200}>
                <div className="space-y-4 text-muted-foreground leading-relaxed font-sans font-semibold">
                  <p>
                    Since then, the most rewarding part hasn&apos;t been sales
                    or milestones — it&apos;s hearing the laughter, witnessing
                    the playful chaos, and seeing generations connect in ways
                    only SAMOSA can spark in people&apos;s homes.
                  </p>
                  <p>That&apos;s always been the goal.</p>
                  <p className="text-primary font-bold text-lg">
                    To create something that feels familiar, effortless, and
                    genuinely fun — for us.
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-2xl font-bystander text-primary">
                    Aanchal
                  </p>
                  <p className="text-muted-foreground text-sm font-sans mt-1">
                    Founder and Creator of SAMOSA
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right - Founder Photo */}
            <AnimatedSection variant="fade-left" delay={300}>
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
                <div className="relative aspect-[4/5] bg-muted rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={founderPhoto}
                    alt="Aanchal holding up SAMOSA"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
