import { motion } from "framer-motion";

const experiences = [
  {
    role: "Fundador & Desenvolvedor",
    company: "Waza Cursos",
    type: "Edtech",
    description: "Construiu e lançou uma plataforma edtech de raiz, gerindo toda a stack desde o design da base de dados até à experiência frontend e integrações de pagamento.",
  },
  {
    role: "Desenvolvedor",
    company: "Gênesis",
    type: "Fintech",
    description: "Desenvolveu as operações financeiras core e sistemas de transacção. Engenharia de serviços backend de alta fiabilidade para processar depósitos, levantamentos e lógica de transferências complexa.",
  },
  {
    role: "Fundador & Desenvolvedor",
    company: "Metigan",
    type: "SaaS",
    description: "Construiu e escalou uma plataforma SaaS de email marketing. Arquitectou a infraestrutura para entrega de emails em alto volume, fluxos automatizados e APIs abrangentes.",
  },
];

export default function Experience() {
  return (
    <section id="experience" aria-label="Experiência profissional" className="py-20 sm:py-28 lg:py-32 bg-secondary/30 relative border-y border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-4">Percurso</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Experience &amp; Journey</h2>
          </div>

          <div className="relative">
            {/* Timeline line — left edge on all screens */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />

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

                  <div className="p-5 sm:p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <h3 className="text-lg sm:text-xl font-bold">{exp.role}</h3>
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full self-start sm:self-auto">
                        {exp.type}
                      </span>
                    </div>
                    <span className="text-primary font-semibold text-base sm:text-lg block mb-3">{exp.company}</span>
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
