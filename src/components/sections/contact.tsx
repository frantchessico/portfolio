import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section id="contact" aria-label="Contacto" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[300px] sm:w-[800px] sm:h-[500px] bg-primary/20 rounded-full blur-[80px] sm:blur-[120px] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-card border border-border rounded-3xl sm:rounded-[3rem] p-8 sm:p-14 lg:p-20 text-center overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-4 sm:mb-6">Contacto</p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-5 sm:mb-8 leading-[1.05]">
              Vamos construir <br className="hidden sm:block" /> algo incrível
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed">
              Pronto para transformar a tua ideia numa plataforma escalável e de alta performance? Fala comigo sobre arquitectura, produto e código.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                className="rounded-full h-12 sm:h-16 px-6 sm:px-10 text-sm sm:text-lg w-full sm:w-auto gap-2 sm:gap-3"
                asChild
              >
                <a href="mailto:franciscoinoque@gmail.com">
                  <Mail size={18} />
                  <span className="truncate">franciscoinoque@gmail.com</span>
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 sm:h-16 px-6 sm:px-10 text-sm sm:text-lg border-border hover:bg-secondary w-full sm:w-auto gap-2 sm:gap-3"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={18} />
                  LinkedIn
                  <ArrowRight size={16} />
                </a>
              </Button>
            </div>

            <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-border flex items-center justify-center gap-6">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                <Github size={18} />
                GitHub
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
