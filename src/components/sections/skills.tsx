import { motion } from "framer-motion";
import { Layout, Server, Database, Wrench } from "lucide-react";

const skillGroups = [
  {
    title: "Frontend",
    icon: <Layout className="text-primary" size={22} />,
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "jQuery"],
  },
  {
    title: "Backend",
    icon: <Server className="text-primary" size={22} />,
    skills: ["Node.js", "Express", "Fastify", "Go", "Python", "Java"],
  },
  {
    title: "Database",
    icon: <Database className="text-primary" size={22} />,
    skills: ["MongoDB", "MySQL", "Microsoft SQL Server"],
  },
  {
    title: "Tools & Architecture",
    icon: <Wrench className="text-primary" size={22} />,
    skills: ["Docker", "Firebase", "REST APIs", "WebSockets", "Microservices", "Real-time systems"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills técnicas" className="py-20 sm:py-28 lg:py-32 bg-secondary/30 relative border-y border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-4">Stack técnica</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4 sm:mb-6">Technical Arsenal</h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Uma stack profunda e versátil, escolhida pela sua fiabilidade, escalabilidade e performance.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={itemVariants}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                {group.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center text-sm sm:text-base text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-3 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
