import { AnimatedSection } from "../AnimatedSection";
import { PrismicNextImage } from "@prismicio/next";

export default function AboutSection({ data }) {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left - GIF */}
          <AnimatedSection variant="zoom-in" className="h-full lg:self-stretch">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[440px] lg:h-full lg:min-h-0">
              <PrismicNextImage
                field={data.about_image}
                fill
                className="object-cover object-top"
                preload
                unoptimized
              />
            </div>
          </AnimatedSection>

          {/* Right - Content */}
          <div className="h-full">
            <AnimatedSection variant="fade-left">
              <h2
                className="text-3xl text-primary md:text-4xl lg:text-5xl font-bystander uppercase leading-[1.1] tracking-normal mb-4"
                style={{ fontSize: "50px" }}
                dangerouslySetInnerHTML={{ __html: data.about_title }}
              />
            </AnimatedSection>

            <AnimatedSection variant="fade-left" delay={200}>
              {data.about_paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-muted-foreground leading-snug mb-4 font-sans font-semibold"
                  dangerouslySetInnerHTML={{ __html: paragraph.paragraph }}
                />
              ))}
            </AnimatedSection>

            <AnimatedSection variant="fade-left" delay={300} className="mt-6">
              <div className="grid grid-cols-2 gap-4">
                {data.about_features.map((feature, index) => (
                  <div key={index} className="border-l-2 border-secondary pl-4">
                    <PrismicNextImage
                      field={feature.icon}
                      alt=""
                      className="mb-2"
                      width={50}
                      height={50}
                    />
                    <p className="font-bold text-primary text-base mb-1">
                      {feature.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
