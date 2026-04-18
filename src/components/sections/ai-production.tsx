import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

export default function AiProduction() {
  const { t } = useI18n();
  const cards = t.aiProduction.cards;

  return (
    <section
      id="ai-production"
      aria-label={t.aiProduction.ariaLabel}
      className="py-20 sm:py-28 lg:py-32 relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 max-w-3xl sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
            {t.aiProduction.eyebrow}
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl sm:mb-6">
            {t.aiProduction.title}
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            {t.aiProduction.description}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t.aiProduction.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="h-full"
            >
              <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:rounded-[2rem]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <CardHeader className="relative z-10 p-5 sm:p-6 lg:p-7">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-full border-primary/20 bg-secondary px-3 py-1 text-xs text-primary"
                    >
                      {card.badge}
                    </Badge>
                    <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {t.aiProduction.status}
                    </span>
                  </div>

                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                    <Sparkles className="size-3.5" />
                    <span>{t.aiProduction.applicationLabel}</span>
                  </div>

                  <CardTitle className="text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                    {card.title}
                  </CardTitle>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {card.description}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10 flex flex-1 flex-col px-5 pb-5 pt-0 sm:px-6 sm:pb-6 lg:px-7 lg:pb-7">
                  <ul className="space-y-3">
                    {card.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl border border-border bg-secondary/40 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                      {t.aiProduction.poweredByLabel}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t.aiProduction.focusLabel}: {card.focus}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="relative z-10 mt-auto flex-col items-start gap-3 border-t border-border/80 px-5 py-5 sm:px-6 sm:py-6 lg:px-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                    {t.aiProduction.technologiesLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {card.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground sm:text-sm"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
