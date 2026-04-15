import { motion } from "framer-motion";
import { User, Code2, Cpu, Rocket, GitBranch } from "lucide-react";

const highlights = [
  { text: "Fullstack Development", icon: <Code2 size={20} /> },
  { text: "API Design", icon: <GitBranch size={20} /> },
  { text: "SaaS Architecture", icon: <Cpu size={20} /> },
  { text: "Product Thinking", icon: <User size={20} /> },
  { text: "Process Automation", icon: <Rocket size={20} /> },
];

export default function About() {
  return (
    <section id="about" aria-label="Sobre mim" className="py-20 sm:py-28 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-4">Sobre mim</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-6 sm:mb-8">
              Beyond just code.<br />
              <span className="text-muted-foreground">Building products.</span>
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Francisco é desenvolvedor fullstack e construtor de produtos digitais, com experiência em plataformas reais — desde edtech e fintech até SaaS e automação de processos.
              </p>
              <p>
                Trabalha em toda a stack, do backend aos UIs mais polidos, e compreende tanto a tecnologia como o negócio por trás dela. O objectivo não é escrever código, é entregar software escalável e confiável que resolve problemas reais.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="grid gap-3"
          >
            {highlights.map((highlight) => (
              <div
                key={highlight.text}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {highlight.icon}
                </div>
                <span className="text-base sm:text-lg font-medium">{highlight.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
