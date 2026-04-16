import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function BackToTop() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 480);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-5 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#FD6A14]/40 bg-[#FD6A14] text-white shadow-lg shadow-[#FD6A14]/25 backdrop-blur-md transition-all hover:scale-[1.03] hover:bg-[#fd7a2d] sm:bottom-6 sm:right-6"
          aria-label={t.controls.backToTop}
          title={t.controls.backToTop}
        >
          <ChevronUp className="size-5 text-white" strokeWidth={2.4} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
