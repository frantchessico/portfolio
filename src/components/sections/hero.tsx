import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();
  const stack = t.hero.stack;
  const floatingTechs = [
    {
      name: "Nest.js",
      className:
        "hidden md:block absolute left-6 top-10 rounded-xl border border-primary/25 bg-card/90 px-3 py-2 text-xs font-semibold text-primary shadow-xl backdrop-blur-sm",
    },
    {
      name: "Go",
      className:
        "hidden lg:block absolute -left-2 bottom-8 rounded-xl border border-primary/25 bg-card/90 px-3 py-2 text-xs font-semibold text-primary shadow-xl backdrop-blur-sm",
    },
    {
      name: "Expo",
      className:
        "hidden md:block absolute right-6 top-24 rounded-xl border border-primary/25 bg-card/90 px-3 py-2 text-xs font-semibold text-primary shadow-xl backdrop-blur-sm",
    },
  ];

  return (
    <section
      id="home"
      aria-label={t.hero.ariaLabel}
      className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] bg-primary/18 dark:bg-primary/15 rounded-full blur-[100px] sm:blur-[140px] opacity-70 dark:opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] bg-primary/12 dark:bg-primary/10 rounded-full blur-[80px] sm:blur-[100px] opacity-60 dark:opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-12 lg:py-16 min-h-[calc(100dvh-80px)]">

          {/* Text content — always first in DOM, first on mobile */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-muted-foreground">
                {t.hero.availability}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.02] mb-3"
            >
              Francisco<br />
              Inoque<span className="text-primary">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.13 }}
              className="mb-5"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-muted-foreground tracking-tight">
                {t.hero.role}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {t.hero.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-10"
            >
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <Terminal size={11} className="text-primary" />
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <Button
                size="lg"
                className="rounded-full h-12 sm:h-14 px-7 sm:px-8 text-sm sm:text-base group font-semibold w-full sm:w-auto"
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
                className="rounded-full h-12 sm:h-14 px-7 sm:px-8 text-sm sm:text-base border-border hover:bg-secondary hover:border-primary/40 transition-all w-full sm:w-auto"
                asChild
              >
                <a href="#contact">{t.hero.secondaryCta}</a>
              </Button>
            </motion.div>
          </div>

          {/* Photo — below text on mobile, right column on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-primary/20 animate-pulse" />
              {/* Glow */}
              <div className="absolute -inset-5 sm:-inset-6 rounded-full bg-primary/15 dark:bg-primary/10 blur-2xl" />

              {/* Profile circle */}
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-primary/40 shadow-2xl shadow-primary/20 bg-gradient-to-br from-primary/30 via-background to-primary/10">
                <img
                  src="/profile.png"
                  alt="Francisco Inoque"
                  className="h-full w-full object-cover object-top scale-[1.03]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_38%),linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.12)_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_42%),linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.28)_100%)]" />
              </div>

              {/* Floating badge — Node.js */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-2 sm:-left-4 top-1/4 bg-card border border-border rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-xl backdrop-blur-sm"
              >
                <span className="text-xs font-semibold text-primary">Node.js</span>
                <div className="text-xs text-muted-foreground">{t.hero.backend}</div>
              </motion.div>

              {/* Floating badge — React */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-2 sm:-right-4 bottom-1/4 bg-card border border-border rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-xl backdrop-blur-sm"
              >
                <span className="text-xs font-semibold text-primary">React</span>
                <div className="text-xs text-muted-foreground">{t.hero.frontend}</div>
              </motion.div>

              {/* Floating tag — SaaS */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-1 top-3 sm:-right-2 sm:top-4 bg-primary rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-lg shadow-primary/30"
              >
                <span className="text-xs font-bold text-primary-foreground">{t.hero.saasBuilder}</span>
              </motion.div>

              {floatingTechs.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  animate={{ y: [0, index % 2 === 0 ? -6 : 6, 0] }}
                  transition={{
                    duration: 3.2 + index * 0.45,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.35 * index,
                  }}
                  className={tech.className}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
