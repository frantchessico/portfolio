import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export default function Contact() {
  const { locale, t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);

  type ContactFormValues = {
    name: string;
    email: string;
    company: string;
    projectType: string;
    message: string;
  };

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      message: "",
    },
  });

  const handleSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/contact`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          locale,
          source: "portfolio_contact_form",
        }),
        },
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast({
        title: t.contact.toast.successTitle,
        description: t.contact.toast.successDescription,
      });

      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: t.contact.toast.errorTitle,
        description: t.contact.toast.errorDescription,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" aria-label={t.contact.ariaLabel} className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[300px] sm:w-[800px] sm:h-[500px] bg-primary/20 rounded-full blur-[80px] sm:blur-[120px] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto bg-card border border-border rounded-3xl sm:rounded-[3rem] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-18 xl:px-20 xl:py-20 text-center overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(61,43,31,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(61,43,31,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-4 sm:mb-6">{t.contact.eyebrow}</p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-5 sm:mb-8 leading-[1.05]">
              {t.contact.titleTop} <br className="hidden sm:block" /> {t.contact.titleBottom}
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.contact.description}
            </p>

            <div className="grid gap-8 border-t border-border pt-8 text-left lg:gap-10 lg:pt-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-14 xl:pt-12 xl:items-start">
              <div className="space-y-6 xl:space-y-7">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl xl:text-[2rem]">
                    {t.contact.formTitle}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base xl:text-lg">
                    {t.contact.formDescription}
                  </p>
                </div>

                <div className="flex max-w-xl flex-col gap-3">
                  <Button
                    size="lg"
                    className="rounded-full h-12 sm:h-14 px-6 text-sm sm:text-base w-full justify-start gap-3"
                    asChild
                  >
                    <a href="mailto:hello@franciscoinoque.site">
                      <Mail size={18} />
                      <span className="truncate">hello@franciscoinoque.site</span>
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-12 sm:h-14 px-6 text-sm sm:text-base border-border hover:bg-secondary w-full justify-start gap-3"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/francisco-inoque" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin size={18} />
                      {t.contact.linkedinCta}
                      <ArrowRight size={16} />
                    </a>
                  </Button>
                </div>

                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {t.contact.formNote}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <a href="https://github.com/frantchessico" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <FaGithub size={18} />
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/francisco-inoque" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <FaLinkedin size={18} />
                    {t.contact.linkedinCta}
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border bg-background/70 p-5 backdrop-blur-sm sm:p-7 xl:p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="grid gap-4 sm:grid-cols-2 xl:gap-5"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{
                        required: t.contact.validation.nameRequired,
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.nameLabel}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t.contact.form.namePlaceholder}
                              className="h-11 rounded-2xl bg-card/70 px-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: t.contact.validation.emailInvalid,
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t.contact.validation.emailInvalid,
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.emailLabel}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t.contact.form.emailPlaceholder}
                              className="h-11 rounded-2xl bg-card/70 px-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.companyLabel}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t.contact.form.companyPlaceholder}
                              className="h-11 rounded-2xl bg-card/70 px-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectType"
                      rules={{
                        required: t.contact.validation.projectRequired,
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.contact.form.projectLabel}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t.contact.form.projectPlaceholder}
                              className="h-11 rounded-2xl bg-card/70 px-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      rules={{
                        required: t.contact.validation.messageMin,
                        minLength: {
                          value: 12,
                          message: t.contact.validation.messageMin,
                        },
                      }}
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>{t.contact.form.messageLabel}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t.contact.form.messagePlaceholder}
                              className="min-h-36 resize-none rounded-[1.5rem] bg-card/70 px-4 py-3"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="sm:col-span-2 pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="h-12 w-full rounded-full text-sm sm:text-base"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? t.contact.form.submitting
                          : t.contact.form.submit}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
