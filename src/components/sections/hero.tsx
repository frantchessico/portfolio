import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import TextPlugin from "gsap/TextPlugin";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { useI18n } from "@/lib/i18n";

gsap.registerPlugin(SplitText, ScrambleTextPlugin, TextPlugin);

export default function Hero() {
  const { t } = useI18n();
  const stack = t.hero.stack;
  const orderedGroups = [
    ...t.skills.groups.filter((group) => /backend/i.test(group.title)),
    ...t.skills.groups.filter((group) => !/backend/i.test(group.title)),
  ];
  const allTechs = Array.from(
    new Set(orderedGroups.flatMap((group) => group.skills)),
  );
  const longestTech = allTechs.reduce(
    (longest, tech) => (tech.length > longest.length ? tech : longest),
    "",
  );
  const rootRef = useRef<HTMLElement | null>(null);
  const availabilityRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const roleRef = useRef<HTMLDivElement | null>(null);
  const typewriterTextRef = useRef<HTMLSpanElement | null>(null);
  const typewriterPaintRef = useRef<HTMLSpanElement | null>(null);
  const typewriterHeadRef = useRef<HTMLSpanElement | null>(null);
  const typewriterCursorRef = useRef<HTMLSpanElement | null>(null);
  const summaryRef = useRef<HTMLParagraphElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const goBadgeRef = useRef<HTMLDivElement | null>(null);
  const typeScriptBadgeRef = useRef<HTMLDivElement | null>(null);
  const builderBadgeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const titleSplit = SplitText.create(titleRef.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "hero-title-line",
      });

      if (typewriterTextRef.current) {
        typewriterTextRef.current.textContent = "";
      }

      const syncTypewriterPaint = () => {
        const textEl = typewriterTextRef.current;
        const paintEl = typewriterPaintRef.current;
        const headEl = typewriterHeadRef.current;

        if (!textEl || !paintEl || !headEl) {
          return;
        }

        const textWidth = Math.max(textEl.getBoundingClientRect().width, 4);

        gsap.to(paintEl, {
          width: textWidth + 18,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(headEl, {
          x: textWidth + 7,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      syncTypewriterPaint();

      const resizeObserver =
        typeof ResizeObserver !== "undefined" && typewriterTextRef.current
          ? new ResizeObserver(syncTypewriterPaint)
          : null;

      if (resizeObserver && typewriterTextRef.current) {
        resizeObserver.observe(typewriterTextRef.current);
      }

      if (reduceMotion) {
        gsap.set(
          [
            ".hero-glow",
            availabilityRef.current,
            eyebrowRef.current,
            titleRef.current,
            roleRef.current,
            ".hero-typewriter",
            summaryRef.current,
            ".hero-stack-chip",
            ".hero-cta",
            photoRef.current,
            ".hero-float-card",
          ],
          { opacity: 1, clearProps: "all" },
        );

        syncTypewriterPaint();

        return () => {
          resizeObserver?.disconnect();
          titleSplit.revert();
        };
      }

      gsap.set(".hero-glow", { transformOrigin: "center center" });

      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      introTl
        .from(".hero-glow", {
          opacity: 0,
          scale: 0.92,
          duration: 0.8,
          stagger: 0.1,
        })
        .from(
          availabilityRef.current,
          {
            opacity: 0,
            y: 12,
            duration: 0.4,
          },
          0.08,
        )
        .from(
          eyebrowRef.current,
          {
            opacity: 0,
            y: 12,
            duration: 0.32,
          },
          0.16,
        )
        .to(
          eyebrowRef.current,
          {
            duration: 0.9,
            scrambleText: {
              text: t.hero.eyebrow,
              chars: "upperCase",
              speed: 0.45,
            },
          },
          0.18,
        )
        .from(
          titleSplit.lines,
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.95,
            stagger: 0.08,
          },
          0.24,
        )
        .from(
          roleRef.current,
          {
            opacity: 0,
            y: 18,
            duration: 0.5,
          },
          0.52,
        )
        .from(
          ".hero-typewriter",
          {
            opacity: 0,
            y: 12,
            duration: 0.42,
          },
          0.68,
        )
        .from(
          summaryRef.current,
          {
            opacity: 0,
            y: 18,
            duration: 0.5,
          },
          0.82,
        )
        .from(
          ".hero-stack-chip",
          {
            opacity: 0,
            y: 14,
            duration: 0.35,
            stagger: 0.04,
          },
          0.9,
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 14,
            scale: 0.98,
            duration: 0.38,
            stagger: 0.08,
          },
          0.98,
        )
        .from(
          photoRef.current,
          {
            opacity: 0,
            scale: 0.92,
            y: 18,
            duration: 0.78,
          },
          0.48,
        )
        .from(
          ".hero-float-card",
          {
            opacity: 0,
            y: 12,
            scale: 0.96,
            duration: 0.35,
            stagger: 0.08,
          },
          0.92,
        );

      const floatingAnimations = [
        gsap.to(goBadgeRef.current, {
          y: -8,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }),
        gsap.to(typeScriptBadgeRef.current, {
          y: 8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.35,
        }),
        gsap.to(builderBadgeRef.current, {
          y: -5,
          duration: 3.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.2,
        }),
      ];

      const rotatingTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.35,
        paused: true,
      });

      allTechs.forEach((tech) => {
        rotatingTl.to(typewriterTextRef.current, {
          duration: Math.max(0.45, tech.length * 0.045),
          text: tech,
          ease: "none",
        });
        rotatingTl.to({}, { duration: 0.95 });
        rotatingTl.to(typewriterTextRef.current, {
          duration: Math.max(0.28, tech.length * 0.028),
          text: "",
          ease: "none",
        });
        rotatingTl.to({}, { duration: 0.08 });
      });

      const cursorAnimation = gsap.to(typewriterCursorRef.current, {
        opacity: 0,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      introTl.call(() => rotatingTl.play(), [], 1.1);

      return () => {
        resizeObserver?.disconnect();
        rotatingTl.kill();
        cursorAnimation.kill();
        floatingAnimations.forEach((animation) => animation.kill());
        titleSplit.revert();
      };
    }, rootRef);

    return () => ctx.revert();
  }, [allTechs, t.hero.eyebrow]);

  return (
    <section
      ref={rootRef}
      id="home"
      aria-label={t.hero.ariaLabel}
      className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden"
    >
      {/* Background glows */}
      <div className="hero-glow absolute top-1/2 left-1/4 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/14 opacity-65 blur-[100px] pointer-events-none sm:h-[500px] sm:w-[500px] sm:blur-[140px] dark:bg-primary/12 dark:opacity-50 lg:h-[680px] lg:w-[680px]" />
      <div className="hero-glow absolute top-1/3 right-0 h-[180px] w-[180px] rounded-full bg-primary/10 opacity-55 blur-[80px] pointer-events-none sm:h-[300px] sm:w-[300px] sm:blur-[100px] dark:bg-primary/8 dark:opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-12 lg:py-16 min-h-[calc(100dvh-80px)]">

          {/* Text content — always first in DOM, first on mobile */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none text-center lg:text-left">
            <div
              ref={availabilityRef}
              className="mb-6 flex flex-col items-center gap-4 lg:items-start"
            >
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                </span>
                <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground sm:text-sm">
                  {t.hero.availability}
                </span>
              </div>
              <span
                ref={eyebrowRef}
                className="text-xs font-semibold uppercase tracking-[0.35em] text-primary sm:text-sm"
              >
                {t.hero.eyebrow}
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.02] mb-3"
            >
              Francisco<br />
              Inoque<span className="text-primary">.</span>
            </h1>

            <div
              ref={roleRef}
              className="mb-6"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-muted-foreground tracking-tight">
                {t.hero.role}
              </span>
            </div>

            <div className="hero-typewriter relative mb-6 h-[2.6rem] overflow-visible sm:h-[3.1rem] md:h-[3.4rem] lg:h-[4rem]">
              <p
                className="absolute inset-0 inline-flex items-center justify-center gap-1.5 overflow-visible text-2xl font-light leading-none tracking-tight text-muted-foreground sm:text-3xl md:text-4xl lg:justify-start lg:text-5xl"
                style={{
                  width: `${Math.max(longestTech.length + 2, 18)}ch`,
                  maxWidth: "100%",
                }}
              >
                <span className="relative inline-flex items-center">
                  <span
                    ref={typewriterPaintRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-1/2 h-[0.72em] w-0 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,rgba(253,106,20,0.3),rgba(253,106,20,0.08))] blur-[12px]"
                  />
                  <span
                    ref={typewriterHeadRef}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-1/2 h-[0.58em] w-[0.58em] -translate-y-1/2 rounded-full bg-[#FD6A14]/70 blur-[10px]"
                  />
                  <span
                    ref={typewriterTextRef}
                    className="relative z-10 inline-block min-w-0 whitespace-nowrap bg-[linear-gradient(90deg,#FD6A14_0%,#F06A1D_45%,#B84A11_100%)] bg-clip-text text-transparent [text-shadow:0_0_16px_rgba(253,106,20,0.22)] dark:bg-[linear-gradient(90deg,#FD6A14_0%,#FFB27D_55%,#FFE7D8_100%)] dark:[text-shadow:0_0_18px_rgba(253,106,20,0.16)]"
                  />
                </span>
                <span
                  ref={typewriterCursorRef}
                  aria-hidden="true"
                  className="relative z-10 inline-block h-[0.9em] w-[2px] rounded-full bg-primary"
                />
              </p>
            </div>

            <p
              ref={summaryRef}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {t.hero.summary}
            </p>

            <div
              className="mb-10 flex max-w-2xl flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="hero-stack-chip flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/5 sm:px-4 sm:py-2 sm:text-sm"
                >
                  <Terminal size={11} className="text-primary" />
                  {tech}
                </span>
              ))}
            </div>

            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <Button
                size="lg"
                className="hero-cta rounded-full h-12 sm:h-14 px-7 sm:px-8 text-sm sm:text-base group font-semibold w-full sm:w-auto"
                asChild
              >
                <a href="#projects">
                  {t.hero.primaryCta}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hero-cta rounded-full h-12 sm:h-14 px-7 sm:px-8 text-sm sm:text-base border-border hover:bg-secondary hover:border-primary/40 transition-all w-full sm:w-auto"
                asChild
              >
                <a href="#contact">{t.hero.secondaryCta}</a>
              </Button>
            </div>
          </div>

          {/* Photo — below text on mobile, right column on desktop */}
          <div
            ref={photoRef}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-primary/20 animate-pulse" />
              {/* Glow */}
              <div className="absolute -inset-5 rounded-full bg-primary/12 blur-2xl sm:-inset-6 dark:bg-primary/8" />

              {/* Profile circle */}
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-primary/35 bg-gradient-to-br from-primary/25 via-background to-primary/8 shadow-2xl shadow-primary/15 sm:h-76 sm:w-76 md:h-[22rem] md:w-[22rem] lg:h-[30rem] lg:w-[30rem]">
                <img
                  src="/profile.png"
                  alt="Francisco Inoque"
                  className="h-full w-full scale-[1.05] object-cover object-top contrast-110 saturate-110"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_38%),linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.12)_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%),linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.28)_100%)]" />
              </div>

              {/* Floating badge — Node.js */}
              <div
                ref={goBadgeRef}
                className="hero-float-card absolute -left-2 top-1/4 rounded-xl border border-border bg-card px-3 py-1.5 shadow-xl backdrop-blur-sm sm:-left-4 sm:rounded-2xl sm:px-4 sm:py-2"
              >
                <span className="text-xs font-semibold text-primary">Go</span>
                <div className="text-xs text-muted-foreground">{t.hero.backend}</div>
              </div>

              {/* Floating badge — React */}
              <div
                ref={typeScriptBadgeRef}
                className="hero-float-card absolute -right-2 bottom-1/4 rounded-xl border border-border bg-card px-3 py-1.5 shadow-xl backdrop-blur-sm sm:-right-4 sm:rounded-2xl sm:px-4 sm:py-2"
              >
                <span className="text-xs font-semibold text-primary">TypeScript</span>
                <div className="text-xs text-muted-foreground">{t.hero.frontend}</div>
              </div>

              <div
                ref={builderBadgeRef}
                className="hero-float-card absolute -right-1 top-3 rounded-xl bg-primary px-2.5 py-1 shadow-lg shadow-primary/30 sm:-right-2 sm:top-4 sm:px-3 sm:py-1.5"
              >
                <span className="text-xs font-bold text-primary-foreground">{t.hero.saasBuilder}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
