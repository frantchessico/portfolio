import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border bg-card/30 py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-lg sm:text-xl font-bold tracking-tighter">
              Francisco Inoque<span className="text-primary">.</span>
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground mt-1">
              {t.footer.tagline}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a href="https://github.com/frantchessico" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary text-muted-foreground transition-colors p-2 rounded-lg hover:bg-secondary">
              <FaGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/francisco-inoque" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary text-muted-foreground transition-colors p-2 rounded-lg hover:bg-secondary">
              <FaLinkedin size={18} />
            </a>
            <a href="https://x.com/Franciscolnoque" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="hover:text-primary text-muted-foreground transition-colors p-2 rounded-lg hover:bg-secondary">
              <FaXTwitter size={18} />
            </a>
          </div>

          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
            &copy; {new Date().getFullYear()} Francisco Inoque. <br className="sm:hidden" />
            {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
