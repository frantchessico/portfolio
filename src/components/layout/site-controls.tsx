import { useEffect, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type SiteControlsProps = {
  mobile?: boolean;
  showLanguage?: boolean;
  showTheme?: boolean;
};

export default function SiteControls({
  mobile = false,
  showLanguage = true,
  showTheme = true,
}: SiteControlsProps) {
  const { locale, setLocale, t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme !== "light" : true;
  const themeLabel = isDark ? t.controls.dark : t.controls.light;
  const toggleThemeLabel = isDark
    ? t.controls.switchToLight
    : t.controls.switchToDark;
  const nextLocale = locale === "en" ? "pt-BR" : "en";

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        mobile ? "flex-col items-stretch" : "justify-end",
      )}
    >
      {showLanguage ? (
        <button
          type="button"
          onClick={() => setLocale(nextLocale)}
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-card/85 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-secondary",
            mobile ? "w-full" : "",
          )}
          aria-label={t.controls.language}
          title={t.controls.language}
        >
          {t.controls.locales[locale]}
        </button>
      ) : null}

      {showTheme ? (
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full bg-card/85 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-secondary",
            mobile ? "w-full" : "",
          )}
          aria-label={toggleThemeLabel}
          title={toggleThemeLabel}
        >
          {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
          <span className={cn(mobile ? "" : "hidden lg:inline")}>{themeLabel}</span>
        </button>
      ) : null}
    </div>
  );
}
