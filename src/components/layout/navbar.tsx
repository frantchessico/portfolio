import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, LockKeyhole, Menu, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SiteControls from "@/components/layout/site-controls";
import { useI18n } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export default function Navbar() {
  const { locale, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvDialogOpen, setCvDialogOpen] = useState(false);
  const [cvEmail, setCvEmail] = useState("");
  const [isSubmittingCv, setIsSubmittingCv] = useState(false);

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
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isCvEmailValid = emailPattern.test(cvEmail.trim());

  const triggerCvDownload = () => {
    const link = document.createElement("a");
    link.href = "/francisco-inoque-cv.pdf";
    link.download = "Francisco-Inoque-CV.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleOpenCvDialog = () => {
    setMobileMenuOpen(false);
    setCvDialogOpen(true);
  };

  const handleCvSubmit = async () => {
    if (!emailPattern.test(cvEmail.trim())) {
      toast({
        variant: "destructive",
        title: t.nav.cvEmailInvalid,
      });
      return;
    }

    setIsSubmittingCv(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/cv-download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cvEmail.trim(),
          locale,
          source: "portfolio_cv_download_modal",
        }),
      });

      if (!response.ok) {
        throw new Error("CV download request failed");
      }

      triggerCvDownload();
      setCvDialogOpen(false);
      setCvEmail("");
      toast({
        title: t.nav.cvSuccessTitle,
        description: t.nav.cvSuccessDescription,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: t.nav.cvErrorTitle,
        description: t.nav.cvErrorDescription,
      });
    } finally {
      setIsSubmittingCv(false);
    }
  };

  return (
    <>
      <Dialog open={cvDialogOpen} onOpenChange={setCvDialogOpen}>
        <DialogContent className="overflow-hidden border-border bg-background/95 p-0 backdrop-blur-xl sm:max-w-md sm:rounded-[2rem]">
          <div className="border-b border-border bg-[linear-gradient(135deg,rgba(253,106,20,0.12),rgba(253,106,20,0.02))] px-6 py-6 sm:px-7">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <LockKeyhole className="size-5" />
            </div>
            <DialogHeader>
              <DialogTitle>{t.nav.cvDialogTitle}</DialogTitle>
              <DialogDescription>{t.nav.cvDialogDescription}</DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-5 px-6 py-6 sm:px-7 sm:py-7">
            <div className="rounded-2xl border border-border bg-card/60 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-4 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t.nav.cvDialogNote}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="cv-email">
                {t.nav.cvEmailLabel}
              </label>
              <Input
                id="cv-email"
                type="email"
                value={cvEmail}
                onChange={(event) => setCvEmail(event.target.value)}
                placeholder={t.nav.cvEmailPlaceholder}
                className="h-12 rounded-2xl bg-card/70 px-4"
                disabled={isSubmittingCv}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void handleCvSubmit();
                  }
                }}
              />
            </div>

            <DialogFooter className="gap-3 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setCvDialogOpen(false)}
                disabled={isSubmittingCv}
              >
                {t.nav.cvCancel}
              </Button>
              <Button
                type="button"
                className="rounded-full"
                onClick={() => void handleCvSubmit()}
                disabled={isSubmittingCv || !isCvEmailValid}
              >
                {isSubmittingCv ? t.nav.cvSubmitting : t.nav.cvSubmit}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

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
            <Button
              variant="outline"
              className="rounded-full px-4 h-9 text-sm border-border hover:border-primary/40 hover:bg-secondary"
              onClick={handleOpenCvDialog}
            >
              <Download className="mr-2 size-4" />
              {t.nav.downloadCv}
            </Button>
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
                <Button
                  variant="outline"
                  className="w-full rounded-full border-border hover:border-primary/40 hover:bg-secondary"
                  onClick={handleOpenCvDialog}
                >
                  <Download className="mr-2 size-4" />
                  {t.nav.downloadCv}
                </Button>
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
    </>
  );
}
