import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, Network, Workflow } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const featureIcons = [Workflow, Network, Boxes];

export default function EnterpriseIntegration() {
  const { t } = useI18n();
  const items = t.enterpriseIntegration.items;

  return (
    <section
      id="enterprise-integration"
      aria-label={t.enterpriseIntegration.ariaLabel}
      className="relative overflow-hidden border-y border-primary/15 bg-[#0d0b10] py-18 text-stone-50 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 opacity-55">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:52px_52px]" />
        <div className="absolute left-[-10%] top-[8%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,111,61,0.11),transparent_64%)]" />
        <div className="absolute bottom-[-18%] right-[-10%] h-[20rem] w-[20rem] rounded-full border border-primary/8" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary sm:text-sm">
              {t.enterpriseIntegration.eyebrow}
            </p>
            <h2 className="max-w-4xl text-3xl font-black leading-[0.95] tracking-[-0.04em] text-stone-50 sm:text-5xl lg:text-[3.5rem]">
              {t.enterpriseIntegration.titleTop} {t.enterpriseIntegration.titleBottom}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
              {t.enterpriseIntegration.description}
            </p>
          </motion.div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.04fr)_minmax(19rem,0.96fr)] xl:items-start">
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-[1.8rem] border border-primary/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-7 lg:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <div className="mb-6 flex items-center gap-3 text-primary">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/12">
                  <ArrowUpRight size={15} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
                    {t.enterpriseIntegration.spotlightLabel}
                  </p>
                  <h3 className="text-lg font-semibold text-stone-100 sm:text-xl">
                    {t.enterpriseIntegration.spotlightTitle}
                  </h3>
                </div>
              </div>

              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
                {t.enterpriseIntegration.spotlightDescription}
              </p>

              <div className="grid gap-3 md:grid-cols-2">
                {items.map((item, index) => {
                  const Icon = featureIcons[index % featureIcons.length];

                  return (
                    <div
                      key={item}
                      className="group rounded-[1.2rem] border border-white/10 bg-white/5 p-4 transition-colors hover:border-primary/40 hover:bg-primary/[0.08]"
                    >
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                        <Icon size={16} />
                      </div>
                      <p className="text-sm font-semibold leading-tight text-stone-100 sm:text-base">
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.aside
              variants={itemVariants}
              className="relative overflow-hidden rounded-[1.8rem] border border-primary/20 bg-[linear-gradient(180deg,rgba(255,112,67,0.08),rgba(255,255,255,0.02))] p-5 sm:p-7"
            >
              <div className="space-y-3">
                <div className="inline-flex rounded-full border border-primary/35 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-primary">
                  {t.enterpriseIntegration.stackLabel}
                </div>
                <p className="text-lg font-bold tracking-tight text-stone-50 sm:text-xl">
                  {t.enterpriseIntegration.sideTitle}
                </p>
                <p className="text-sm leading-6 text-stone-300">
                  {t.enterpriseIntegration.sideDescription}
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                {t.enterpriseIntegration.highlights.map((item, index) => (
                  <div
                    key={`${item}-highlight`}
                    className={`rounded-2xl border px-4 py-3 text-xs font-medium leading-relaxed sm:text-sm ${
                      index % 2 === 0
                        ? "border-primary/35 bg-primary/12 text-primary"
                        : "border-white/12 bg-white/6 text-stone-100"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
