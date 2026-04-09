<section
  id="try-cards"
  className="pt-16 md:pt-[4.5rem] pb-12 md:pb-14 bg-background relative overflow-hidden"
>
  {/* Pink strip - top */}
  <img
    src={pinkStrip}
    alt=""
    aria-hidden="true"
    className="absolute top-0 left-0 right-0 w-full pointer-events-none select-none"
    style={{ zIndex: 2 }}
  />
  {/* Background illustration */}
  <img
    src={playSectionBg}
    alt=""
    aria-hidden="true"
    className="absolute top-7 left-0 w-full h-auto pointer-events-none select-none"
    style={{ zIndex: 0 }}
  />
  <div className="container mx-auto px-4 lg:px-8 relative z-10">
    <div className="max-w-3xl mx-auto text-center relative">
      {/* Centered section background circle */}
      <img
        src={tableCircle}
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] max-w-[550px] pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />
      <AnimatedSection variant="fade-up" delay={150}>
        <h2 className="relative z-10 mb-6 md:mb-8 text-[36px] md:text-[42px] lg:text-[50px] font-bystander uppercase leading-[1.1] tracking-normal whitespace-nowrap -translate-y-3 md:-translate-y-4">
          <span className="text-primary">Play a Round of Samosa</span>
          <br />
          <span className="text-accent">in 20 Seconds</span>
        </h2>
      </AnimatedSection>
      <AnimatedSection variant="zoom-in" delay={200}>
        <div
          className="min-h-[520px] md:min-h-[560px] flex flex-col items-center justify-center max-w-lg mx-auto relative overflow-visible"
          style={{ perspective: "1000px" }}
        >
          {/* Content aligned to the same visual center as the table circle */}
          <div className="relative z-10 flex w-full flex-col items-center pt-16 md:pt-20">
            {/* Card flip container */}
            <div
              className="relative w-full max-w-xs transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform: demoStep >= 2 ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front of card - Samosa card */}
              <div className="w-full" style={{ backfaceVisibility: "hidden" }}>
                <img
                  src={samosaCard}
                  alt="SAMOSA game card"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>

              {/* Back of card - Categories card */}
              <div
                className="absolute inset-0 w-full bg-card rounded-xl shadow-lg p-6 md:p-8 flex flex-col justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="space-y-4">
                  {cardCategories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const isRevealed = demoStep === 4;
                    const showAnswer = isSelected || isRevealed;
                    const IconComp = cat.icon;

                    return (
                      <button
                        key={cat.id}
                        onClick={() =>
                          demoStep === 2 && handleCategorySelect(cat.id)
                        }
                        disabled={demoStep !== 2}
                        className={cn(
                          "flex items-center gap-3 w-full text-left transition-all duration-300",
                          demoStep === 2 && "hover:scale-105 cursor-pointer",
                        )}
                      >
                        <IconComp
                          className={cn("h-5 w-5 shrink-0", cat.color)}
                        />
                        <span
                          className={cn(
                            "font-black text-sm uppercase tracking-wide",
                            cat.color,
                          )}
                        >
                          {cat.label}:
                        </span>
                        <span
                          className={cn(
                            "font-black text-foreground text-base uppercase tracking-wide transition-all duration-500",
                            !showAnswer && "blur-md select-none",
                          )}
                        >
                          {showAnswer ? cat.answer : cat.clue}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Timer bar */}
                {demoStep === 3 && (
                  <div className="mt-6 animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{timerSeconds}s</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all duration-100"
                        style={{ width: `${timerProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* All revealed state */}
                {demoStep === 4 && (
                  <div className="mt-6 text-center animate-fade-in">
                    <div className="flex items-center justify-center gap-2 text-samosa-green mb-3">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-bold text-sm">
                        All Answers Revealed!
                      </span>
                    </div>
                    <button
                      onClick={handleDemoReset}
                      className="text-sm text-primary font-semibold hover:underline transition-all"
                    >
                      Play again →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Floating speech bubble */}
            {demoStep === 1 && (
              <button
                onClick={handleTryMe}
                className="animate-float group mt-4 relative z-30"
                style={{ transform: "rotate(8deg)" }}
              >
                <div className="relative bg-secondary text-secondary-foreground px-6 py-3 rounded-lg shadow-lg font-black italic text-lg uppercase tracking-wide group-hover:scale-110 group-hover:animate-wiggle transition-all duration-300">
                  Try Me! 👆
                  <div className="absolute -bottom-2 left-6 w-4 h-4 bg-secondary rotate-45" />
                </div>
              </button>
            )}

            {demoStep === 2 && (
              <div
                className="animate-float group mt-4 relative z-30"
                style={{ transform: "rotate(-5deg)" }}
              >
                <div className="relative bg-secondary text-secondary-foreground px-6 py-3 rounded-lg shadow-lg font-black italic text-lg uppercase tracking-wide">
                  Choose a Category! 👆
                  <div className="absolute -bottom-2 left-8 w-4 h-4 bg-secondary rotate-45" />
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Subtle CTA below demo */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <p className="text-muted-foreground text-sm font-semibold">
          Love it? The real game has{" "}
          <span className="font-bold text-foreground">1800+ challenges</span>.
        </p>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 h-12 px-8 font-bold rounded-full shadow-lg"
          onClick={handleAddToCart}
        >
          Add to Cart
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>

  {/* Pink strip - bottom (reflected) */}
  <img
    src={pinkStrip}
    alt=""
    aria-hidden="true"
    className="absolute bottom-0 left-0 right-0 w-full pointer-events-none select-none"
    style={{ zIndex: 2, transform: "scaleY(-1)" }}
  />
</section>;
