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
      title: "Francisco Inoque - Fullstack Developer | TypeScript, Go, Python, Java",
      description:
        "Francisco Inoque is a fullstack developer building SaaS platforms, financial systems, and scalable digital products oriented around business impact.",
      keywords:
        "Francisco Inoque, Fullstack Developer, TypeScript, Go, Python, Java, SaaS, Fintech, Automation, Software Engineer",
      ogLocale: "en_US",
      siteName: "Francisco Inoque Portfolio",
    },
    controls: {
      language: "Language",
      theme: "Theme",
      backToTop: "Back to top",
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
        { name: "Stack", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
      ],
      cta: "Let's talk",
      downloadCv: "Download CV",
      cvDialogTitle: "Download my CV",
      cvDialogDescription:
        "Enter your email and I'll send your private CV download link to your inbox.",
      cvDialogNote:
        "Your email is stored securely as a CV lead and used to send the file link.",
      cvEmailLabel: "Email",
      cvEmailPlaceholder: "you@example.com",
      cvSubmit: "Send link",
      cvSubmitting: "Sending link...",
      cvCancel: "Cancel",
      cvEmailInvalid: "Please enter a valid email.",
      cvSuccessTitle: "Check your inbox",
      cvSuccessDescription: "Your CV download link has been sent to your email.",
      cvErrorTitle: "Download unavailable",
      cvErrorDescription:
        "I couldn't process your request right now. Please try again in a moment.",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      ariaLabel: "Introduction",
      availability: "Available for opportunities",
      eyebrow: "Software Developer & Product Builder",
      role: "Fullstack Developer",
      roleTechs: ["TypeScript", "Go", "Python", "Java"],
      rotatingPhrases: [
        "Node.js for scalable APIs",
        "React for modern interfaces",
        "Go for high-performance services",
        "Python for intelligent automation",
        "Java for robust systems",
      ],
      summary:
        "I build SaaS platforms, financial systems, and scalable digital products with a focus on performance, automation, and business impact.",
      primaryCta: "View Projects",
      secondaryCta: "Let's talk",
      stack: [
        "SaaS Platforms",
        "Payment Systems",
        "API Design",
        "Automation",
        "Real-time Systems",
        "Product Thinking",
      ],
      profileBadge: "Fullstack",
      profileSummary:
        "Building scalable digital products, financial systems, and process automation.",
      backend: "Backend",
      frontend: "Frontend",
      saasBuilder: "Product Builder",
    },
    about: {
      ariaLabel: "About me",
      eyebrow: "About me",
      titleTop: "Beyond code.",
      titleBottom: "Building systems for business.",
      paragraphs: [
        "I do not just build interfaces or isolated APIs. I develop complete solutions designed to automate processes, integrate systems, scale operations, and create real impact.",
        "My work lives at the intersection of software engineering, product, and business, turning real needs into software that is functional, reliable, and ready to grow.",
      ],
      highlights: [
        "Built for scale and performance",
        "Ready for integrations",
        "Automation-first thinking",
        "Product-oriented engineering",
        "Solutions with real impact",
      ],
    },
    skills: {
      ariaLabel: "Technical skills",
      eyebrow: "Technical stack",
      title: "Technical Arsenal",
      description:
        "Technologies and tools I use to build modern applications that are scalable, reliable, and performance-oriented.",
      groups: [
        {
          title: "Frontend",
          skills: [
            "React",
            "Next.js",
            "Angular",
            "React Native",
            "Expo",
            "TypeScript",
            "Vite",
            "shadcn/ui",
            "Material UI",
          ],
        },
        {
          title: "Backend",
          skills: [
            "Node.js",
            "Express",
            "Fastify",
            "Go",
            "Python",
            "Java",
          ],
        },
        {
          title: "Database",
          skills: [
            "MongoDB",
            "PostgreSQL",
            "MySQL",
            "Cassandra",
            "SQLite",
            "Microsoft SQL Server",
            "Firebase",
          ],
        },
        {
          title: "Tools & Architecture",
          skills: [
            "REST APIs",
            "GraphQL",
            "WebSockets",
            "Docker",
            "AWS",
            "Supabase",
            "Clerk",
            "Microservices",
            "Real-time Systems",
            "API Integrations",
          ],
        },
      ],
    },
    enterpriseIntegration: {
      ariaLabel: "Enterprise integration capabilities",
      eyebrow: "Integration & architecture",
      titleTop: "Built for",
      titleBottom: "integration",
      description:
        "I build systems prepared to connect services, automate flows, and support digital operations with consistency and scale.",
      spotlightLabel: "Integration ecosystem",
      spotlightTitle: "Enterprise integration layer",
      spotlightDescription:
        "Enterprise integration capabilities that help complex systems communicate, orchestrate business flows, and remain governable across legacy and modern environments.",
      stackLabel: "Core capabilities",
      sideTitle: "Designed for scalable integrations",
      sideDescription:
        "Architecture shaped for service communication, process automation, dependable APIs, and systems that can evolve without operational friction.",
      highlights: [
        "Architecture for scalable integrations",
        "Communication between services",
        "Structure for process automation",
        "Reliable API design",
        "Systems prepared for growth",
      ],
      items: [
        "Oracle SOA Suite",
        "Oracle Service Bus (OSB)",
        "BPEL",
        "BPM",
        "Systems Integration",
        "Functional Analysis",
        "Technical Analysis",
      ],
    },
    projects: {
      ariaLabel: "Featured projects",
      eyebrow: "Selected work",
      title: "Featured Projects",
      description:
        "Products and systems built with a focus on real utility, scalability, and alignment with business needs.",
      detailsCta: "Let's talk",
      challenge: "What was built",
      businessValue: "Business Value",
      stackLabel: "Stack",
      items: [
        {
          title: "Waza Cursos",
          category: "EdTech Platform",
          description:
            "Online course platform focused on accessibility, digital learning, and knowledge distribution.",
          problem:
            "I structured a platform capable of supporting free and paid courses, with checkout, subscriptions, user management, and a foundation for product growth.",
          stack: ["Node.js", "React", "Next.js", "MongoDB", "TypeScript"],
          value:
            "The project was designed to combine learning experience, technical scalability, and commercial viability within a digital education model.",
        },
        {
          title: "Genesis",
          category: "Fintech / Payments",
          description:
            "Digital financial system focused on deposits, withdrawals, transfers, and operations designed for efficiency.",
          problem:
            "I developed service structures and business rules to support financial operations, including commissions, transactional flows, and critical process organization.",
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
            "The system was designed to support reliable, automated, and scalable operations inside a real financial context.",
        },
        {
          title: "Metigan",
          category: "SaaS / Email Marketing",
          description:
            "Communication SaaS platform focused on email, automation, performance, and deliverability.",
          problem:
            "I structured solutions for transactional email delivery, communication automation, integration APIs, and components focused on operational consistency.",
          stack: ["Node.js", "APIs", "Automation", "Email Infrastructure", "SaaS Architecture"],
          value:
            "The project was designed to help companies communicate at scale, automate flows, and operate with greater efficiency and control.",
        },
      ],
    },
    experience: {
      ariaLabel: "Professional experience",
      eyebrow: "Journey",
      title: "Experience & Journey",
      description:
        "Experience shaped by real products, complete systems, and business challenges solved with software.",
      companiesTitle: "Companies & teams",
      companiesDescription:
        "Professional contributions as a Fullstack Developer / Software Engineer across different products, teams, and business contexts.",
      companies: [
        "SavanaPoint",
        "Fumane Films",
        "Mawonelo",
        "CFEP",
        "Neshely",
        "High Mastery Academy",
        "Shore",
        "Humanit",
      ],
      items: [
        {
          role: "Founder & Developer",
          company: "Waza Cursos",
          type: "EdTech",
          description:
            "Technical leadership and development of an EdTech platform focused on online courses, digital monetization, user experience, and product scalability.",
        },
        {
          role: "Developer",
          company: "Genesis",
          type: "Fintech",
          description:
            "Design and development of solutions for payments, financial operations, and process automation inside a digital system oriented toward reliability.",
        },
        {
          role: "Founder & Developer",
          company: "Metigan",
          type: "SaaS",
          description:
            "Creation and evolution of a communication SaaS platform integrating automation, APIs, and an operational structure built for performance and scale.",
        },
      ],
    },
    differentials: {
      ariaLabel: "What sets Francisco apart",
      eyebrow: "Differentials",
      title: "Why Francisco stands out",
      description:
        "More than writing code, I work on building products and systems that connect technology, operations, and business.",
      items: [
        {
          title: "Real products",
          description:
            "Experience building platforms and systems applied to real market contexts.",
        },
        {
          title: "Technical and business vision",
          description:
            "Ability to think about software through architecture, operations, utility, and measurable outcomes.",
        },
        {
          title: "SaaS and fintech experience",
          description:
            "Practical experience with digital products shaped by automation, monetization, and scale.",
        },
        {
          title: "Process automation",
          description:
            "Development of solutions that reduce manual effort and improve operational efficiency.",
        },
        {
          title: "Fullstack end-to-end",
          description:
            "Complete execution from frontend to backend, from user experience to business logic.",
        },
        {
          title: "Analytical thinking",
          description:
            "Structured problem-solving for complex requirements with clarity and consistency.",
        },
      ],
    },
    contact: {
      ariaLabel: "Contact",
      eyebrow: "Contact",
      titleTop: "Let's build",
      titleBottom: "something useful and scalable",
      description:
        "I am open to opportunities, collaborations, and relevant projects. If you are looking for someone to build digital products, solid systems, and impact-oriented solutions, let's talk.",
      linkedinCta: "LinkedIn",
      emailCta: "Email me directly",
      formTitle: "Start the conversation",
      formDescription:
        "Share a few details about what you are building and I will come back with context, structure, and a practical next step.",
      formNote:
        "Available for opportunities, collaborations, and meaningful new challenges.",
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
      tagline: "Fullstack Developer · Digital products · Scalable systems",
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
      title: "Francisco Inoque - Desenvolvedor Fullstack | TypeScript, Go, Python, Java",
      description:
        "Francisco Inoque é um desenvolvedor fullstack que constrói plataformas SaaS, sistemas financeiros e produtos digitais escaláveis orientados a negócio.",
      keywords:
        "Francisco Inoque, Desenvolvedor Fullstack, TypeScript, Go, Python, Java, SaaS, Fintech, Automação, Engenheiro de Software",
      ogLocale: "pt_BR",
      siteName: "Portfólio Francisco Inoque",
    },
    controls: {
      language: "Idioma",
      theme: "Tema",
      backToTop: "Voltar ao topo",
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
        { name: "Stack", href: "#skills" },
        { name: "Projetos", href: "#projects" },
        { name: "Experiência", href: "#experience" },
        { name: "Contacto", href: "#contact" },
      ],
      cta: "Falar comigo",
      downloadCv: "Baixar CV",
      cvDialogTitle: "Baixar meu CV",
      cvDialogDescription:
        "Informe o seu email e eu envio um link privado para baixar o CV na sua caixa de entrada.",
      cvDialogNote:
        "Seu email é armazenado com segurança como lead de CV e usado para enviar o link do arquivo.",
      cvEmailLabel: "Email",
      cvEmailPlaceholder: "voce@exemplo.com",
      cvSubmit: "Enviar link",
      cvSubmitting: "Enviando link...",
      cvCancel: "Cancelar",
      cvEmailInvalid: "Informe um email válido.",
      cvSuccessTitle: "Verifique o seu email",
      cvSuccessDescription: "O link para baixar o CV foi enviado para a sua caixa de entrada.",
      cvErrorTitle: "Download indisponível",
      cvErrorDescription:
        "Não consegui processar o pedido agora. Tente novamente em instantes.",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      ariaLabel: "Apresentação",
      availability: "Disponível para oportunidades",
      eyebrow: "Software Developer & Product Builder",
      role: "Desenvolvedor Fullstack",
      roleTechs: ["TypeScript", "Go", "Python", "Java"],
      rotatingPhrases: [
        "Node.js para APIs escaláveis",
        "React para interfaces modernas",
        "Go para serviços performáticos",
        "Python para automação inteligente",
        "Java para sistemas robustos",
      ],
      summary:
        "Construo plataformas SaaS, sistemas financeiros e produtos digitais escaláveis, com foco em performance, automação e impacto no negócio.",
      primaryCta: "Ver projetos",
      secondaryCta: "Falar comigo",
      stack: [
        "Plataformas SaaS",
        "Sistemas de pagamento",
        "Design de APIs",
        "Automação",
        "Sistemas em tempo real",
        "Pensamento de produto",
      ],
      profileBadge: "Fullstack",
      profileSummary:
        "Construindo produtos digitais escaláveis, sistemas financeiros e automação de processos.",
      backend: "Backend",
      frontend: "Frontend",
      saasBuilder: "Product Builder",
    },
    about: {
      ariaLabel: "Sobre mim",
      eyebrow: "Sobre mim",
      titleTop: "Além do código.",
      titleBottom: "Construindo sistemas de negócio.",
      paragraphs: [
        "Não construo apenas interfaces ou APIs isoladas. Desenvolvo soluções completas, pensadas para automatizar processos, integrar sistemas, escalar operações e gerar impacto real.",
        "Trabalho na interseção entre engenharia de software, produto e negócio, transformando necessidades reais em software funcional, confiável e preparado para crescer.",
      ],
      highlights: [
        "Pensado para escala e performance",
        "Sistemas prontos para integração",
        "Foco em automação",
        "Engenharia orientada a produto",
        "Soluções com impacto real",
      ],
    },
    skills: {
      ariaLabel: "Skills técnicas",
      eyebrow: "Stack técnica",
      title: "Arsenal Técnico",
      description:
        "Tecnologias e ferramentas que utilizo para construir aplicações modernas, escaláveis e orientadas a performance.",
      groups: [
        {
          title: "Frontend",
          skills: [
            "React",
            "Next.js",
            "Angular",
            "React Native",
            "Expo",
            "TypeScript",
            "Vite",
            "shadcn/ui",
            "Material UI",
          ],
        },
        {
          title: "Backend",
          skills: [
            "Node.js",
            "Express",
            "Fastify",
            "Go",
            "Python",
            "Java",
          ],
        },
        {
          title: "Banco de dados",
          skills: [
            "MongoDB",
            "PostgreSQL",
            "MySQL",
            "Cassandra",
            "SQLite",
            "Microsoft SQL Server",
            "Firebase",
          ],
        },
        {
          title: "Ferramentas & Arquitetura",
          skills: [
            "APIs REST",
            "GraphQL",
            "WebSockets",
            "Docker",
            "AWS",
            "Supabase",
            "Clerk",
            "Microsserviços",
            "Sistemas em tempo real",
            "Integrações de API",
          ],
        },
      ],
    },
    enterpriseIntegration: {
      ariaLabel: "Capacidades de integração enterprise",
      eyebrow: "Integração e arquitetura",
      titleTop: "Feito para",
      titleBottom: "integração",
      description:
        "Desenvolvo sistemas preparados para conectar serviços, automatizar fluxos e sustentar operações digitais com consistência e escalabilidade.",
      spotlightLabel: "Ecossistema de integração",
      spotlightTitle: "Camada de integração enterprise",
      spotlightDescription:
        "Capacidades de integração enterprise que ajudam sistemas complexos a comunicar, orquestrar processos de negócio e permanecer governáveis entre legados e modernos.",
      stackLabel: "Capacidades principais",
      sideTitle: "Pensado para integrações escaláveis",
      sideDescription:
        "Arquitetura desenhada para comunicação entre serviços, automação de processos, APIs confiáveis e sistemas preparados para crescer sem fricção operacional.",
      highlights: [
        "Arquitetura para integrações escaláveis",
        "Comunicação entre serviços",
        "Estrutura para automação de processos",
        "Design de APIs confiáveis",
        "Sistemas preparados para crescimento",
      ],
      items: [
        "Oracle SOA Suite",
        "Oracle Service Bus (OSB)",
        "BPEL",
        "BPM",
        "Integração de Sistemas",
        "Análise Funcional",
        "Análise Técnica",
      ],
    },
    projects: {
      ariaLabel: "Projetos em destaque",
      eyebrow: "Trabalho selecionado",
      title: "Projetos em Destaque",
      description:
        "Produtos e sistemas desenvolvidos com foco em utilidade real, escalabilidade e alinhamento com o negócio.",
      detailsCta: "Falar comigo",
      challenge: "O que foi construído",
      businessValue: "Valor de negócio",
      stackLabel: "Stack",
      items: [
        {
          title: "Waza Cursos",
          category: "Plataforma EdTech",
          description:
            "Plataforma de cursos online com foco em acessibilidade, aprendizagem digital e distribuição de conhecimento.",
          problem:
            "Estruturei uma plataforma capaz de suportar cursos gratuitos e pagos, com sistema de checkout, subscrição, gestão de utilizadores e base para crescimento do produto educacional.",
          stack: ["Node.js", "React", "Next.js", "MongoDB", "TypeScript"],
          value:
            "O projeto foi pensado para unir experiência de aprendizagem, escalabilidade técnica e viabilidade comercial dentro de um modelo digital de educação.",
        },
        {
          title: "Genesis",
          category: "Fintech / Pagamentos",
          description:
            "Sistema financeiro digital com foco em depósitos, levantamentos, transferências e operações orientadas a eficiência.",
          problem:
            "Desenvolvi a estrutura de serviços e regras de negócio para suportar operações financeiras, incluindo lógica de comissões, fluxos transacionais e organização de processos críticos.",
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
            "O sistema foi desenhado para dar suporte a operações confiáveis, automatizadas e escaláveis dentro de um contexto financeiro real.",
        },
        {
          title: "Metigan",
          category: "SaaS / Email Marketing",
          description:
            "Plataforma SaaS de comunicação e email com foco em automação, performance e entregabilidade.",
          problem:
            "Estruturei soluções para envio de emails transacionais, automação de comunicação, APIs de integração e componentes voltados a consistência operacional.",
          stack: ["Node.js", "APIs", "Automation", "Email Infrastructure", "SaaS Architecture"],
          value:
            "O projeto foi orientado para ajudar empresas a comunicar em escala, automatizar fluxos e operar com mais eficiência e controle.",
        },
      ],
    },
    experience: {
      ariaLabel: "Experiência profissional",
      eyebrow: "Jornada",
      title: "Experiência & Jornada",
      description:
        "Experiência construída a partir de produtos reais, sistemas completos e desafios de negócio resolvidos com software.",
      companiesTitle: "Empresas & equipas",
      companiesDescription:
        "Contribuições profissionais como Desenvolvedor Fullstack / Software Engineer em diferentes produtos, equipas e contextos de negócio.",
      companies: [
        "SavanaPoint",
        "Fumane Films",
        "Mawonelo",
        "CFEP",
        "Neshely",
        "High Mastery Academy",
        "Shore",
        "Humanit",
      ],
      items: [
        {
          role: "Fundador & Desenvolvedor",
          company: "Waza Cursos",
          type: "EdTech",
          description:
            "Liderança técnica e desenvolvimento de uma plataforma EdTech com foco em cursos online, estrutura de monetização digital, experiência do utilizador e escalabilidade do produto.",
        },
        {
          role: "Desenvolvedor",
          company: "Genesis",
          type: "Fintech",
          description:
            "Concepção e desenvolvimento de soluções para pagamentos, operações financeiras e automação de processos dentro de um sistema digital orientado a confiabilidade.",
        },
        {
          role: "Fundador & Desenvolvedor",
          company: "Metigan",
          type: "SaaS",
          description:
            "Criação e evolução de uma plataforma SaaS de comunicação, integrando automação, APIs e estrutura operacional voltada a performance e escala.",
        },
      ],
    },
    differentials: {
      ariaLabel: "Diferenciais",
      eyebrow: "Diferenciais",
      title: "Por que Francisco se destaca",
      description:
        "Mais do que escrever código, atuo na construção de produtos e sistemas que conectam tecnologia, operação e negócio.",
      items: [
        {
          title: "Produtos reais",
          description:
            "Experiência na construção de plataformas e sistemas aplicados a contextos reais de mercado.",
        },
        {
          title: "Visão técnica e de negócio",
          description:
            "Capacidade de pensar software com foco em arquitetura, operação, utilidade e resultado.",
        },
        {
          title: "Experiência com SaaS e fintech",
          description:
            "Vivência prática em produtos digitais orientados a automação, monetização e escala.",
        },
        {
          title: "Automação de processos",
          description:
            "Desenvolvimento de soluções que reduzem esforço manual e aumentam eficiência operacional.",
        },
        {
          title: "Fullstack end-to-end",
          description:
            "Atuação completa do frontend ao backend, da experiência do utilizador à lógica de negócio.",
        },
        {
          title: "Pensamento analítico",
          description:
            "Abordagem estruturada para resolver problemas complexos com clareza e consistência.",
        },
      ],
    },
    contact: {
      ariaLabel: "Contacto",
      eyebrow: "Contacto",
      titleTop: "Vamos construir",
      titleBottom: "algo útil e escalável",
      description:
        "Estou aberto a oportunidades, colaborações e projetos relevantes. Se você procura alguém para construir produtos digitais, sistemas sólidos e soluções orientadas a impacto, vamos conversar.",
      linkedinCta: "LinkedIn",
      emailCta: "Enviar email direto",
      formTitle: "Comece a conversa",
      formDescription:
        "Compartilhe alguns detalhes do que você está a construir e eu retorno com contexto, estrutura e um próximo passo prático.",
      formNote:
        "Disponível para oportunidades, colaborações e novos desafios relevantes.",
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
      tagline: "Desenvolvedor Fullstack · Produtos digitais · Sistemas escaláveis",
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
