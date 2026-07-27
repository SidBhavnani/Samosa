import { AnimatedSection } from "@/app/_components/AnimatedSection";

import { PrismicNextImage } from "@prismicio/next";

export function OurStorySection({ data }) {
  return (
    <>
      {/* Chapter 1 - The Spark */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Text */}
            <div>
              <AnimatedSection variant="fade-right">
                <h3 className="hidden md:block text-[53px] font-bystander uppercase leading-[1.1] tracking-normal text-primary mb-8">
                  {data.the_spark_title_line_1}
                  <br />
                  <span className="text-secondary">
                    {data.the_spark_title_line_2}
                  </span>
                </h3>
                {/* <h3 className="md:hidden text-[53px] font-bystander uppercase leading-[1.1] tracking-normal text-primary mb-8">
                  It started
                  <br /> with a{" "}
                  <span className="text-secondary">
                    game
                    <br /> of Articulate.
                  </span>
                </h3> */}
              </AnimatedSection>

              <AnimatedSection variant="fade-right" delay={200}>
                <div className="space-y-4 text-muted-foreground leading-relaxed font-sans font-semibold">
                  {data.the_spark_paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={
                        index === data.the_spark_paragraphs.length - 1
                          ? "text-primary font-bold text-lg"
                          : ""
                      }
                    >
                      {paragraph.paragraph}
                    </p>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right - Articulate Photo */}
            <AnimatedSection variant="fade-left" delay={300}>
              <div className="relative">
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-secondary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative aspect-[4/4] bg-muted rounded-2xl overflow-hidden shadow-2xl">
                  <PrismicNextImage
                    field={data.the_spark_image}
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
              <PrismicNextImage
                field={data.prototype_image}
                fill
                className="object-cover scale-105"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade-left" delay={100}>
            <div className="bg-primary p-10 md:p-14 lg:p-16 flex flex-col justify-center h-full">
              <p className="text-secondary font-sans font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                {data.prototype_title}
              </p>
              <h3 className="text-samosa-cream font-bystander text-2xl md:text-3xl lg:text-[36px] uppercase leading-[1.1] mb-4">
                {data.prototype_text}
              </h3>
            </div>
          </AnimatedSection>

          {/* Row 2 */}
          <AnimatedSection variant="fade-right" delay={100}>
            <div className="bg-primary/70 p-10 md:p-14 lg:p-16 flex flex-col justify-center h-full">
              <p className="text-secondary font-sans font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                {data.play_testing_title}
              </p>
              <h3 className="text-samosa-cream font-bystander text-2xl md:text-3xl lg:text-[36px] uppercase leading-[1.1] mb-6">
                {data.play_testing_text}
              </h3>
              <div className="space-y-5 text-samosa-cream/80 leading-relaxed font-sans font-semibold">
                {data.play_testing_paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-base md:text-lg">
                    {paragraph.paragraph}
                  </p>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade-left" delay={200}>
            <div className="relative aspect-square lg:aspect-auto lg:h-full overflow-hidden">
              {/* <video
                src="/assets/videos/playtesting-gif.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              /> */}
              <PrismicNextImage
                field={data.play_testing_image}
                fill
                className="object-cover"
              />
            </div>
          </AnimatedSection>
        </div>

        {/* Pull quote divider */}
        <AnimatedSection variant="fade-up">
          <div className="py-12 md:py-16 bg-muted">
            <div className="container mx-auto px-4 lg:px-8">
              <p className="text-secondary font-bystander text-3xl md:text-4xl lg:text-5xl uppercase leading-snug text-center max-w-4xl mx-auto">
                {data.divider_quote_line_1}
                <br />
                {data.divider_quote_line_2}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:[&>*]:min-h-[420px]">
          <AnimatedSection variant="fade-right">
            <div className="relative aspect-square lg:aspect-auto lg:h-full bg-primary/60 overflow-hidden">
              {/* <video
                src="/assets/videos/samosa-game.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-[1.5]"
              /> */}
              <PrismicNextImage
                field={data.the_game_image}
                fill
                className="object-cover"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade-left" delay={100}>
            <div className="bg-primary p-10 md:p-14 lg:p-16 flex flex-col justify-center h-full">
              <p className="text-secondary font-sans font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                {data.the_game_title}
              </p>
              <h3 className="text-samosa-cream font-bystander text-2xl md:text-3xl lg:text-[36px] uppercase leading-[1.1] mb-4">
                {data.the_game_text}
              </h3>
              {data.the_game_paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-samosa-cream/80 font-sans font-semibold text-base md:text-lg leading-relaxed"
                >
                  {paragraph.paragraph}
                </p>
              ))}
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
                  {data.launch_title_line_1}
                  <br />
                  <span className="text-secondary">
                    {data.launch_title_line_2}
                  </span>
                </h3>
              </AnimatedSection>

              <AnimatedSection variant="fade-right" delay={200}>
                <div className="space-y-4 text-muted-foreground leading-relaxed font-sans font-semibold">
                  {data.launch_paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className={
                        index === data.launch_paragraphs.length - 1
                          ? "text-primary font-bold text-lg"
                          : ""
                      }
                    >
                      {paragraph.paragraph}
                    </p>
                  ))}
                </div>

                {/* Signature */}
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-2xl font-bystander text-primary">
                    {data.signature_line_1}
                  </p>
                  <p className="text-muted-foreground text-sm font-sans mt-1">
                    {data.signature_line_2}
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
                  <PrismicNextImage
                    field={data.launch_image}
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
