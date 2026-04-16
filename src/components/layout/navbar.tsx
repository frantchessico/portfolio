import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteControls from "@/components/layout/site-controls";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLinkClick = () => setMobileMenuOpen(false);
  const navLinks = t.nav.links;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-background/85 backdrop-blur-md border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav
        aria-label={t.nav.ariaLabel}
        className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between"
      >
        <a
          href="#home"
          className="text-xl sm:text-2xl font-bold tracking-tighter hover:text-primary transition-colors"
          aria-label={t.nav.homeLabel}
        >
          FI<span className="text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <ul className="flex items-center gap-5 lg:gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
          </ul>
          <SiteControls showLanguage={false} />
          <Button asChild variant="default" className="rounded-full px-5 h-9 text-sm">
            <a href="#contact">{t.nav.cta}</a>
          </Button>
          <SiteControls showTheme={false} />
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2 -mr-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-background/97 backdrop-blur-lg border-b border-border"
          >
            <div className="container mx-auto px-4 py-5 flex flex-col gap-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={handleLinkClick}
                      className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors block py-2.5 px-3 rounded-lg hover:bg-secondary"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <SiteControls mobile showLanguage={false} />
              <Button asChild className="w-full rounded-full">
                <a href="#contact" onClick={handleLinkClick}>
                  {t.nav.cta}
                </a>
              </Button>
              <SiteControls mobile showTheme={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
