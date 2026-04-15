import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Waza Cursos",
    category: "Edtech Platform",
    description: "Plataforma de cursos online com conteúdo gratuito e pago, checkout, subscrições e arquitectura escalável.",
    problem: "Necessidade de uma plataforma fiável para hospedar conteúdo educacional, gerir subscrições e proporcionar uma experiência de aprendizagem de qualidade.",
    stack: ["React", "Node.js", "MongoDB", "Payment Gateway"],
    value: "Processamento seguro de subscrições com escalabilidade para suportar um crescente número de alunos simultâneos.",
  },
  {
    title: "Gênesis",
    category: "Fintech / Payments",
    description: "Fintech com depósitos, levantamentos, transferências, lógica de comissões e arquitectura para operações financeiras.",
    problem: "Backend altamente seguro e ACID-compliant para operações financeiras em tempo real e estruturas complexas de comissões.",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Microservices"],
    value: "Core transaccional robusto com zero perda de dados e comissões automáticas multi-nível.",
  },
  {
    title: "Metigan",
    category: "SaaS / Email Marketing",
    description: "Plataforma SaaS de email marketing e comunicação transaccional — automação, APIs e alta entregabilidade.",
    problem: "Empresas precisavam de uma forma automatizada de gerir emails em massa e transaccionais com alta entregabilidade e integração simples por API.",
    stack: ["React", "Go", "Redis", "Message Queues"],
    value: "Infraestrutura de comunicação escalável capaz de processar milhões de emails com analytics detalhados e fluxos automatizados.",
  },
];

export default function Projects() {
  return (
    <section id="projects" aria-label="Projectos em destaque" className="py-20 sm:py-28 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-4">Trabalho seleccionado</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4 sm:mb-6">Selected Work</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Plataformas reais, construídas para produção. Não apenas conceitos, mas software funcional que resolve necessidades reais de negócio.
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
                      Ver Detalhes
                      <ExternalLink size={14} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                </div>

                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl">
                  {project.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-5 sm:gap-8 mb-6 sm:mb-8">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 sm:mb-3">O Desafio</h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 sm:mb-3">Valor de Negócio</h4>
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
