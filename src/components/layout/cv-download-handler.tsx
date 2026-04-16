import { useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

function triggerDownload(fileUrl: string) {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = "Francisco-Inoque-CV.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function CvDownloadHandler() {
  const { t } = useI18n();
  const handledTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const token = currentUrl.searchParams.get("cv")?.trim() ?? "";

    if (!token || handledTokenRef.current === token) {
      return;
    }

    handledTokenRef.current = token;

    const cleanUrl = () => {
      currentUrl.searchParams.delete("cv");
      const nextUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
      window.history.replaceState({}, "", nextUrl || "/");
    };

    const run = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/cv-download/resolve?token=${encodeURIComponent(token)}`,
        );

        if (!response.ok) {
          throw new Error("Invalid CV token");
        }

        const data = (await response.json()) as { ok?: boolean; fileUrl?: string };

        if (!data.ok || !data.fileUrl) {
          throw new Error("Invalid CV token");
        }

        triggerDownload(data.fileUrl);
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
        cleanUrl();
      }
    };

    void run();
  }, [t]);

  return null;
}
