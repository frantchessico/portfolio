import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Locale = "en" | "pt-BR";

const STORAGE_KEY = "portfolio-locale";

const messages = {
  en: {
    meta: {
      lang: "en",
      title: "Francisco Inoque - Fullstack Developer | Node.js, React, SaaS",
      description:
        "Francisco Inoque is a fullstack developer building scalable platforms across SaaS, fintech, and automation with Node.js and React.",
      keywords:
        "Francisco Inoque, Fullstack Developer, Node.js, React, SaaS, Fintech, Automation, Software Engineer",
      ogLocale: "en_US",
      siteName: "Francisco Inoque Portfolio",
    },
    controls: {
      language: "Language",
      theme: "Theme",
      locales: {
        en: "EN",
        "pt-BR": "PT-BR",
      },
      light: "Light",
      dark: "Dark",
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
    },
    nav: {
      ariaLabel: "Primary navigation",
      homeLabel: "Francisco Inoque home",
      links: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
      ],
      cta: "Let's talk",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      ariaLabel: "Introduction",
      availability: "Available for opportunities",
      role: "Fullstack Developer",
      summary:
        "I build digital platforms, scalable systems, and automation solutions that move businesses forward.",
      primaryCta: "View Projects",
      secondaryCta: "Get in touch",
      stack: [
        "Node.js",
        "React",
        "Nest.js",
        "Go",
        "Python",
        "Java",
        "Expo",
        "TypeScript",
      ],
      profileBadge: "Fullstack",
      profileSummary:
        "Building scalable digital products and automation systems.",
      backend: "Backend",
      frontend: "Frontend",
      saasBuilder: "SaaS Builder",
    },
    about: {
      ariaLabel: "About me",
      eyebrow: "About me",
      titleTop: "Beyond just code.",
      titleBottom: "Building products.",
      paragraphs: [
        "Francisco is a fullstack developer and digital product builder with hands-on experience across real platforms, from edtech and fintech to SaaS and process automation.",
        "He works across the entire stack, from backend systems to polished interfaces, with a strong understanding of both the technology and the business behind it. The goal is not just to write code, but to ship scalable, reliable software that solves real problems.",
      ],
      highlights: [
        "Fullstack Development",
        "API Design",
        "SaaS Architecture",
        "Product Thinking",
        "Process Automation",
      ],
    },
    skills: {
      ariaLabel: "Technical skills",
      eyebrow: "Technical stack",
      title: "Technical Arsenal",
      description:
        "A deep and versatile stack chosen for reliability, scalability, and performance.",
      groups: [
        {
          title: "Frontend",
          skills: [
            "React",
            "Next.js",
            "JavaScript",
            "TypeScript",
            "HTML5",
            "CSS3",
            "jQuery",
          ],
        },
        {
          title: "Backend",
          skills: [
            "Go",
            "Node.js",
            "Nest.js",
            "Express",
            "Fastify",
            "Python",
            "Java",
          ],
        },
        {
          title: "Database",
          skills: [
            "MongoDB",
            "MySQL",
            "PostgreSQL",
            "Redis",
            "FaunaDB",
            "Microsoft SQL Server",
            "SQLite",
          ],
        },
        {
          title: "Tools & Architecture",
          skills: [
            "Docker",
            "Firebase",
            "REST APIs",
            "WebSockets",
            "Apache Kafka",
            "AWS S3",
            "Microservices",
            "Real-time systems",
          ],
        },
        {
          title: "Enterprise Integration",
          skills: [
            "Oracle SOA Suite",
            "Oracle Service Bus (OSB)",
            "BPEL",
            "BPM",
            "Systems Integration",
            "Functional Analysis",
            "Technical Analysis",
          ],
        },
      ],
    },
    projects: {
      ariaLabel: "Featured projects",
      eyebrow: "Selected work",
      title: "Selected Work",
      description:
        "Real platforms built for production. Not just concepts, but functional software solving real business needs.",
      detailsCta: "View details",
      challenge: "The Challenge",
      businessValue: "Business Value",
      items: [
        {
          title: "Waza Cursos",
          category: "EdTech Platform",
          description:
            "Online learning platform with free and paid content, checkout flows, subscriptions, and scalable architecture.",
          problem:
            "A reliable platform was needed to host educational content, manage subscriptions, and deliver a strong learning experience.",
          stack: ["React", "Node.js", "MongoDB", "Payment Gateway"],
          value:
            "Secure subscription processing with the scalability to support a growing number of simultaneous learners.",
        },
        {
          title: "Genesis",
          category: "Fintech / Payments",
          description:
            "Fintech platform with deposits, withdrawals, transfers, commission logic, and a business core engineered for high-volume financial operations.",
          problem:
            "The platform required a resilient core for financial rules, real-time transaction flows, document processing, and reliable storage across multiple data patterns.",
          stack: [
            "Go",
            "Node.js",
            "Python",
            "PostgreSQL",
            "MongoDB",
            "Redis",
            "FaunaDB",
            "Apache Kafka",
            "WebSockets",
            "AWS S3",
          ],
          value:
            "A robust financial core with business logic written in Go, Python-driven document workflows, low-latency realtime channels, and storage architecture optimized for consistency, speed, and scale.",
        },
        {
          title: "Metigan",
          category: "SaaS / Email Marketing",
          description:
            "SaaS email marketing and transactional communication platform with automation, APIs, and high deliverability.",
          problem:
            "Companies needed an automated way to manage bulk and transactional email with strong deliverability and easy API integration.",
          stack: ["React", "Go", "Redis", "Message Queues"],
          value:
            "Scalable communication infrastructure capable of processing millions of emails with detailed analytics and automated flows.",
        },
      ],
    },
    experience: {
      ariaLabel: "Professional experience",
      eyebrow: "Journey",
      title: "Experience & Journey",
      items: [
        {
          role: "Founder & Developer",
          company: "Waza Cursos",
          type: "EdTech",
          description:
            "Built and launched an edtech platform from scratch, owning the entire stack from database design to frontend experience and payment integrations.",
        },
        {
          role: "Developer",
          company: "Genesis",
          type: "Fintech",
          description:
            "Built core financial operations for deposits, withdrawals, transfers, and commissions, using Go for the business core, Python for document workflows, and a multi-database architecture with PostgreSQL, MongoDB, Redis, and FaunaDB.",
        },
        {
          role: "Founder & Developer",
          company: "Metigan",
          type: "SaaS",
          description:
            "Built and scaled an email marketing SaaS platform. Architected the infrastructure for high-volume email delivery, automation flows, and comprehensive APIs.",
        },
      ],
    },
    differentials: {
      ariaLabel: "What sets Francisco apart",
      eyebrow: "Differentials",
      title: "Why Francisco stands out",
      description:
        "More than a programmer. A partner in building digital products that scale and perform.",
      items: [
        {
          title: "Production-grade",
          description:
            "Builds real and scalable products, not just prototypes.",
        },
        {
          title: "Business context",
          description:
            "Understands the strategic and commercial goals behind the software.",
        },
        {
          title: "System design",
          description:
            "Strong experience in automation and resilient systems architecture.",
        },
        {
          title: "True fullstack",
          description:
            "Hands-on across backend, frontend, and product thinking in one profile.",
        },
        {
          title: "Analytical thinker",
          description:
            "Turns abstract ideas into concrete, functional software solutions.",
        },
      ],
    },
    contact: {
      ariaLabel: "Contact",
      eyebrow: "Contact",
      titleTop: "Let's build",
      titleBottom: "something remarkable",
      description:
        "Ready to turn your idea into a scalable, high-performance platform? Let's talk about architecture, product, and code.",
      linkedinCta: "LinkedIn",
      emailCta: "Email me directly",
      formTitle: "Start the conversation",
      formDescription:
        "Share a few details about your idea and I'll store it securely, send you a confirmation email, and notify my inbox right away.",
      formNote:
        "Your submission is saved in MongoDB, confirmed by email, and forwarded to my team via Resend.",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "you@example.com",
        companyLabel: "Company",
        companyPlaceholder: "Company or brand",
        projectLabel: "Project type",
        projectPlaceholder: "SaaS, landing page, fintech, automation...",
        messageLabel: "Project details",
        messagePlaceholder:
          "Tell me what you want to build, your goals, and any relevant context.",
        submit: "Send message",
        submitting: "Sending message...",
      },
      validation: {
        nameRequired: "Please enter your name.",
        emailInvalid: "Please enter a valid email.",
        projectRequired: "Please describe the project type.",
        messageMin: "Please share a bit more detail.",
      },
      toast: {
        successTitle: "Message sent",
        successDescription:
          "Your message was saved and a confirmation email is on the way.",
        errorTitle: "Submission failed",
        errorDescription:
          "I couldn't save your message right now. Please try again in a moment.",
      },
    },
    footer: {
      tagline: "Fullstack Developer & Product Builder",
      rights: "All rights reserved.",
    },
    notFound: {
      title: "404 Page Not Found",
      description: "The page you tried to access does not exist in this app.",
    },
  },
  "pt-BR": {
    meta: {
      lang: "pt-BR",
      title: "Francisco Inoque - Desenvolvedor Fullstack | Node.js, React, SaaS",
      description:
        "Francisco Inoque é um desenvolvedor fullstack que constrói plataformas escaláveis em SaaS, fintech e automação com Node.js e React.",
      keywords:
        "Francisco Inoque, Desenvolvedor Fullstack, Node.js, React, SaaS, Fintech, Automação, Engenheiro de Software",
      ogLocale: "pt_BR",
      siteName: "Portfólio Francisco Inoque",
    },
    controls: {
      language: "Idioma",
      theme: "Tema",
      locales: {
        en: "EN",
        "pt-BR": "PT-BR",
      },
      light: "Claro",
      dark: "Escuro",
      switchToLight: "Mudar para o modo claro",
      switchToDark: "Mudar para o modo escuro",
    },
    nav: {
      ariaLabel: "Navegação principal",
      homeLabel: "Página inicial de Francisco Inoque",
      links: [
        { name: "Início", href: "#home" },
        { name: "Sobre", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projetos", href: "#projects" },
        { name: "Experiência", href: "#experience" },
        { name: "Contato", href: "#contact" },
      ],
      cta: "Falar comigo",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      ariaLabel: "Apresentação",
      availability: "Disponível para oportunidades",
      role: "Desenvolvedor Fullstack",
      summary:
        "Construo plataformas digitais, sistemas escaláveis e soluções de automação que impulsionam negócios.",
      primaryCta: "Ver projetos",
      secondaryCta: "Entrar em contato",
      stack: [
        "Node.js",
        "React",
        "Nest.js",
        "Go",
        "Python",
        "Java",
        "Expo",
        "TypeScript",
      ],
      profileBadge: "Fullstack",
      profileSummary:
        "Construindo produtos digitais escaláveis e sistemas de automação.",
      backend: "Backend",
      frontend: "Frontend",
      saasBuilder: "Criador de SaaS",
    },
    about: {
      ariaLabel: "Sobre mim",
      eyebrow: "Sobre mim",
      titleTop: "Além do código.",
      titleBottom: "Construindo produtos.",
      paragraphs: [
        "Francisco é desenvolvedor fullstack e construtor de produtos digitais, com experiência prática em plataformas reais, de edtech e fintech até SaaS e automação de processos.",
        "Atua em toda a stack, do backend a interfaces refinadas, entendendo tanto a tecnologia quanto o negócio por trás dela. O objetivo não é apenas escrever código, mas entregar software escalável e confiável que resolve problemas reais.",
      ],
      highlights: [
        "Desenvolvimento Fullstack",
        "Design de APIs",
        "Arquitetura SaaS",
        "Visão de Produto",
        "Automação de Processos",
      ],
    },
    skills: {
      ariaLabel: "Skills técnicas",
      eyebrow: "Stack técnica",
      title: "Arsenal Técnico",
      description:
        "Uma stack profunda e versátil, escolhida por confiabilidade, escalabilidade e performance.",
      groups: [
        {
          title: "Frontend",
          skills: [
            "React",
            "Next.js",
            "JavaScript",
            "TypeScript",
            "HTML5",
            "CSS3",
            "jQuery",
          ],
        },
        {
          title: "Backend",
          skills: [
            "Go",
            "Node.js",
            "Nest.js",
            "Express",
            "Fastify",
            "Python",
            "Java",
          ],
        },
        {
          title: "Banco de dados",
          skills: [
            "MongoDB",
            "MySQL",
            "PostgreSQL",
            "Redis",
            "FaunaDB",
            "Microsoft SQL Server",
            "SQLite",
          ],
        },
        {
          title: "Ferramentas & Arquitetura",
          skills: [
            "Docker",
            "Firebase",
            "APIs REST",
            "WebSockets",
            "Apache Kafka",
            "AWS S3",
            "Microsserviços",
            "Sistemas em tempo real",
          ],
        },
        {
          title: "Integração Enterprise",
          skills: [
            "Oracle SOA Suite",
            "Oracle Service Bus (OSB)",
            "BPEL",
            "BPM",
            "Integração de Sistemas",
            "Análise Funcional",
            "Análise Técnica",
          ],
        },
      ],
    },
    projects: {
      ariaLabel: "Projetos em destaque",
      eyebrow: "Trabalho selecionado",
      title: "Projetos em Destaque",
      description:
        "Plataformas reais, construídas para produção. Não apenas conceitos, mas software funcional resolvendo necessidades reais de negócio.",
      detailsCta: "Ver detalhes",
      challenge: "O desafio",
      businessValue: "Valor de negócio",
      items: [
        {
          title: "Waza Cursos",
          category: "Plataforma EdTech",
          description:
            "Plataforma de cursos online com conteúdo gratuito e pago, checkout, assinaturas e arquitetura escalável.",
          problem:
            "Era necessária uma plataforma confiável para hospedar conteúdo educacional, gerenciar assinaturas e entregar uma experiência de aprendizagem de qualidade.",
          stack: ["React", "Node.js", "MongoDB", "Gateway de Pagamento"],
          value:
            "Processamento seguro de assinaturas com escalabilidade para suportar um número crescente de alunos simultâneos.",
        },
        {
          title: "Genesis",
          category: "Fintech / Pagamentos",
          description:
            "Fintech com depósitos, saques, transferências, lógica de comissões e um core de negócio desenhado para operações financeiras de alto volume.",
          problem:
            "Era necessário um core resiliente para regras financeiras, fluxos transacionais em tempo real, processamento documental e persistência confiável em múltiplos padrões de dados.",
          stack: [
            "Go",
            "Node.js",
            "Python",
            "PostgreSQL",
            "MongoDB",
            "Redis",
            "FaunaDB",
            "Apache Kafka",
            "WebSockets",
            "AWS S3",
          ],
          value:
            "Core financeiro robusto com regras de negócio escritas em Go, workflows documentais em Python, canais realtime de baixa latência e arquitetura de dados otimizada para consistência, velocidade e escala.",
        },
        {
          title: "Metigan",
          category: "SaaS / Email Marketing",
          description:
            "Plataforma SaaS de email marketing e comunicação transacional com automação, APIs e alta entregabilidade.",
          problem:
            "Empresas precisavam de uma forma automatizada de gerenciar emails em massa e transacionais com alta entregabilidade e integração simples por API.",
          stack: ["React", "Go", "Redis", "Filas de Mensagens"],
          value:
            "Infraestrutura de comunicação escalável capaz de processar milhões de emails com analytics detalhados e fluxos automatizados.",
        },
      ],
    },
    experience: {
      ariaLabel: "Experiência profissional",
      eyebrow: "Jornada",
      title: "Experiência & Jornada",
      items: [
        {
          role: "Fundador & Desenvolvedor",
          company: "Waza Cursos",
          type: "EdTech",
          description:
            "Construiu e lançou uma plataforma edtech do zero, liderando toda a stack, do design do banco de dados à experiência frontend e integrações de pagamento.",
        },
        {
          role: "Desenvolvedor",
          company: "Genesis",
          type: "Fintech",
          description:
            "Desenvolveu operações financeiras centrais para depósitos, saques, transferências e comissões, usando Go no core de negócio, Python para workflows documentais e uma arquitetura multi-banco com PostgreSQL, MongoDB, Redis e FaunaDB.",
        },
        {
          role: "Fundador & Desenvolvedor",
          company: "Metigan",
          type: "SaaS",
          description:
            "Construiu e escalou uma plataforma SaaS de email marketing. Arquitetou a infraestrutura para envio em alto volume, fluxos automatizados e APIs abrangentes.",
        },
      ],
    },
    differentials: {
      ariaLabel: "Diferenciais",
      eyebrow: "Diferenciais",
      title: "Por que Francisco se destaca",
      description:
        "Mais do que um programador. Um parceiro na construção de produtos digitais que escalam e performam.",
      items: [
        {
          title: "Nível de produção",
          description:
            "Constrói produtos reais e escaláveis, não apenas protótipos.",
        },
        {
          title: "Contexto de negócio",
          description:
            "Entende os objetivos estratégicos e comerciais por trás do software.",
        },
        {
          title: "System design",
          description:
            "Experiência sólida em automação e arquitetura de sistemas resilientes.",
        },
        {
          title: "Fullstack de verdade",
          description:
            "Atuação prática em backend, frontend e visão de produto em um só perfil.",
        },
        {
          title: "Pensamento analítico",
          description:
            "Transforma ideias abstratas em soluções de software concretas e funcionais.",
        },
      ],
    },
    contact: {
      ariaLabel: "Contato",
      eyebrow: "Contato",
      titleTop: "Vamos construir",
      titleBottom: "algo marcante",
      description:
        "Pronto para transformar sua ideia em uma plataforma escalável e de alta performance? Vamos conversar sobre arquitetura, produto e código.",
      linkedinCta: "LinkedIn",
      emailCta: "Enviar email direto",
      formTitle: "Comece a conversa",
      formDescription:
        "Compartilhe alguns detalhes da sua ideia e eu salvo tudo com segurança, envio um email de confirmação para você e notifico minha caixa de entrada na hora.",
      formNote:
        "Sua submissão é salva no MongoDB, confirmada por email e encaminhada para minha equipe via Resend.",
      form: {
        nameLabel: "Nome",
        namePlaceholder: "Seu nome",
        emailLabel: "Email",
        emailPlaceholder: "voce@exemplo.com",
        companyLabel: "Empresa",
        companyPlaceholder: "Empresa ou marca",
        projectLabel: "Tipo de projeto",
        projectPlaceholder: "SaaS, landing page, fintech, automação...",
        messageLabel: "Detalhes do projeto",
        messagePlaceholder:
          "Conte o que você quer construir, seus objetivos e qualquer contexto relevante.",
        submit: "Enviar mensagem",
        submitting: "Enviando mensagem...",
      },
      validation: {
        nameRequired: "Informe seu nome.",
        emailInvalid: "Informe um email válido.",
        projectRequired: "Descreva o tipo de projeto.",
        messageMin: "Compartilhe um pouco mais de contexto.",
      },
      toast: {
        successTitle: "Mensagem enviada",
        successDescription:
          "Sua mensagem foi salva e um email de confirmação está a caminho.",
        errorTitle: "Falha no envio",
        errorDescription:
          "Não consegui salvar sua mensagem agora. Tente novamente em instantes.",
      },
    },
    footer: {
      tagline: "Desenvolvedor Fullstack & Product Builder",
      rights: "Todos os direitos reservados.",
    },
    notFound: {
      title: "404 Página não encontrada",
      description: "A página que você tentou acessar não existe neste app.",
    },
  },
} as const;

type Translation = (typeof messages)["en"];

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "pt-BR";
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY);

  if (isLocale(storedLocale)) {
    return storedLocale;
  }

  return window.navigator.language.toLowerCase().startsWith("pt")
    ? "pt-BR"
    : "en";
}

function updateMetaTag(
  selector: string,
  content: string,
  createTag: () => HTMLMetaElement,
) {
  const tag = document.querySelector<HTMLMetaElement>(selector) ?? createTag();
  tag.content = content;
}

function applyMetadata(locale: Locale) {
  const meta = messages[locale].meta;

  document.documentElement.lang = meta.lang;
  document.title = meta.title;

  updateMetaTag('meta[name="description"]', meta.description, () => {
    const tag = document.createElement("meta");
    tag.name = "description";
    document.head.appendChild(tag);
    return tag;
  });

  updateMetaTag('meta[name="keywords"]', meta.keywords, () => {
    const tag = document.createElement("meta");
    tag.name = "keywords";
    document.head.appendChild(tag);
    return tag;
  });

  updateMetaTag('meta[property="og:title"]', meta.title, () => {
    const tag = document.createElement("meta");
    tag.setAttribute("property", "og:title");
    document.head.appendChild(tag);
    return tag;
  });

  updateMetaTag('meta[property="og:description"]', meta.description, () => {
    const tag = document.createElement("meta");
    tag.setAttribute("property", "og:description");
    document.head.appendChild(tag);
    return tag;
  });

  updateMetaTag('meta[property="og:locale"]', meta.ogLocale, () => {
    const tag = document.createElement("meta");
    tag.setAttribute("property", "og:locale");
    document.head.appendChild(tag);
    return tag;
  });

  updateMetaTag('meta[property="og:site_name"]', meta.siteName, () => {
    const tag = document.createElement("meta");
    tag.setAttribute("property", "og:site_name");
    document.head.appendChild(tag);
    return tag;
  });

  updateMetaTag('meta[name="twitter:title"]', meta.title, () => {
    const tag = document.createElement("meta");
    tag.name = "twitter:title";
    document.head.appendChild(tag);
    return tag;
  });

  updateMetaTag('meta[name="twitter:description"]', meta.description, () => {
    const tag = document.createElement("meta");
    tag.name = "twitter:description";
    document.head.appendChild(tag);
    return tag;
  });
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    applyMetadata(locale);
  }, [locale]);

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t: messages[locale] as Translation }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider.");
  }

  return context;
}
