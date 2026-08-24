import { createClient } from "@/prismicio";
import { AnimatedSection } from "../_components/AnimatedSection";
import YouTubeShort from "../_components/how-to-play/YouTubeShort";

export default async function Tutorial() {
  const client = createClient();
  const page = await client.getSingle("how_to_play");

  return (
    <section className="pt-36 pb-16 lg:pt-48 md:pb-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <AnimatedSection variant="fade-up">
            <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-4">
              <span className="text-primary">See it </span>
              <span className="text-secondary">in Action.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection variant="fade-up" delay={200}>
            <p className="text-base md:text-lg text-muted-foreground leading-snug font-sans font-semibold">
              Watch our quick tutorial to see how a round plays out.
              <br />
              <span className="text-secondary">Spoiler: it gets loud.</span>
            </p>
          </AnimatedSection>
        </div>

        {/* Video placeholder */}
        <AnimatedSection variant="zoom-in" delay={300}>
          <div className="aspect-[9/16] md:aspect-video max-w-7xl mx-auto rounded-2xl overflow-hidden relative shadow-xl bg-muted flex items-center justify-center">
            {/* <p className="text-muted-foreground font-semibold">
                    Video coming soon
                  </p> */}
            <YouTubeShort videoId={page.data.youtube_video_id} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
