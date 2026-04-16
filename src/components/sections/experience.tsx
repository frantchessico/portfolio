import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Experience() {
  const { t } = useI18n();
  const experiences = t.experience.items;

  return (
    <section id="experience" aria-label={t.experience.ariaLabel} className="py-20 sm:py-28 lg:py-32 bg-secondary/30 relative border-y border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-4">{t.experience.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">{t.experience.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
              {t.experience.description}
            </p>
          </div>

          <div className="relative">
            {/* Timeline line — left edge on all screens */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border sm:left-6" />

            <div className="space-y-8 sm:space-y-10">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-14 sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 sm:left-2 top-5 w-8 h-8 sm:w-9 sm:h-9 bg-background border-2 border-primary/40 rounded-full flex items-center justify-center z-10">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 sm:p-7">
                    <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-black tracking-tight sm:text-2xl">{exp.role}</h3>
                        <span className="mt-2 block text-base font-semibold text-primary sm:text-lg">{exp.company}</span>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full self-start sm:self-auto">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
