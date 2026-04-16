import { motion } from "framer-motion";
import { Database, GitBranch, Layout, Server, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const { t } = useI18n();
  const skillGroups = [
    {
      id: "frontend",
      ...t.skills.groups[0],
      icon: <Layout className="text-primary" size={22} />,
    },
    {
      id: "backend",
      ...t.skills.groups[1],
      icon: <Server className="text-primary" size={22} />,
    },
    {
      id: "database",
      ...t.skills.groups[2],
      icon: <Database className="text-primary" size={22} />,
    },
    {
      id: "tools-architecture",
      ...t.skills.groups[3],
      icon: <Wrench className="text-primary" size={22} />,
    },
    {
      id: "enterprise-integration",
      ...t.skills.groups[4],
      icon: <GitBranch className="text-primary" size={22} />,
    },
  ];

  return (
    <section id="skills" aria-label={t.skills.ariaLabel} className="py-20 sm:py-28 lg:py-32 bg-secondary/30 relative border-y border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-4">{t.skills.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4 sm:mb-6">{t.skills.title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {t.skills.description}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.id}
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
