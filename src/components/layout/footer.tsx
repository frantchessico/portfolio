import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-lg sm:text-xl font-bold tracking-tighter">
              Francisco Inoque<span className="text-primary">.</span>
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground mt-1">
              Fullstack Developer &amp; Product Builder
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a href="#" aria-label="GitHub" className="hover:text-primary text-muted-foreground transition-colors p-2 rounded-lg hover:bg-secondary">
              <Github size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary text-muted-foreground transition-colors p-2 rounded-lg hover:bg-secondary">
              <Linkedin size={18} />
            </a>
            <a href="#" aria-label="Twitter / X" className="hover:text-primary text-muted-foreground transition-colors p-2 rounded-lg hover:bg-secondary">
              <Twitter size={18} />
            </a>
          </div>

          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
            &copy; {new Date().getFullYear()} Francisco Inoque. <br className="sm:hidden" />Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
