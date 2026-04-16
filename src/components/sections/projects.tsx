import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";

export default function Projects() {
  const { t } = useI18n();
  const projects = t.projects.items;

  return (
    <section id="projects" aria-label={t.projects.ariaLabel} className="py-20 sm:py-28 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-4">{t.projects.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4 sm:mb-6">{t.projects.title}</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t.projects.description}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group relative p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-[2.5rem] bg-card border border-border overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 sm:mb-6">
                  <div>
                    <Badge
                      variant="outline"
                      className="mb-3 bg-secondary text-primary border-primary/20 rounded-full px-3 py-1 text-xs"
                    >
                      {project.category}
                    </Badge>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{project.title}</h3>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full gap-2 self-start shrink-0 group/btn text-sm"
                    asChild
                  >
                    <a href="#contact">
                      {t.projects.detailsCta}
                      <ExternalLink size={14} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                </div>

                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl">
                  {project.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-5 sm:gap-8 mb-6 sm:mb-8">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 sm:mb-3">{t.projects.challenge}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 sm:mb-3">{t.projects.businessValue}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{project.value}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md bg-secondary text-xs sm:text-sm font-medium text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
