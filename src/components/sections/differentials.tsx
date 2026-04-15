import { motion } from "framer-motion";
import { Zap, Briefcase, Settings, Layers, BrainCircuit } from "lucide-react";

const differentials = [
  {
    title: "Production-grade",
    description: "Constrói produtos reais e escaláveis, não apenas protótipos.",
    icon: <Zap size={22} />,
  },
  {
    title: "Contexto de negócio",
    description: "Compreende os objectivos estratégicos e de negócio por trás do software.",
    icon: <Briefcase size={22} />,
  },
  {
    title: "System design",
    description: "Experiência profunda em automação e arquitectura de sistemas resilientes.",
    icon: <Settings size={22} />,
  },
  {
    title: "True fullstack",
    description: "Domínio do backend, frontend e visão de produto — num só perfil.",
    icon: <Layers size={22} />,
  },
  {
    title: "Analytical thinker",
    description: "Converte ideias abstractas em soluções de software concretas e funcionais.",
    icon: <BrainCircuit size={22} />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } },
};

export default function Differentials() {
  return (
    <section aria-label="Diferenciais" className="py-20 sm:py-28 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-4">Diferenciais</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4 sm:mb-6">
            Why Francisco stands out
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Mais do que um programador. Um parceiro na construção de produtos digitais que escalam e performam.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
        >
          {differentials.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-secondary/20 border border-border flex flex-col items-start hover:bg-secondary/40 hover:border-primary/30 transition-all"
            >
              <div className="h-11 w-11 rounded-xl bg-card border border-border flex items-center justify-center text-primary mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
