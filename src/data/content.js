// Todo el contenido de la web en ambos idiomas: castellano por defecto, inglés con el selector del menú.
// Editar aquí los textos; los componentes solo leen content[lang].
// Regla: nada inventado — sin clientes, cifras ni resultados que no sean reales. Lo pendiente se marca como "próximamente".

const EMAIL = "albert.font@outlook.com";
const LINKEDIN = "https://www.linkedin.com/in/albertfontdev/";
const GITHUB = "https://github.com/fontalbert";
const mailto = (subject) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

// Datos compartidos entre idiomas
const PHOTO = { src: "/albert-font_avatar-360.jpg", width: 360, height: 490 };
const TRAIN_MOVEMENT = {
  url: "https://www.trainmovementapp.com",
  image: { src: "/images/proyectos/trainmovementapp.jpg", width: 1652, height: 902 },
};
// visual: "workflow" | "platform" | "legacy" | "image"  ·  status: "coming-soon" | "case-study-soon" | "live"
const PROJECT_META = [
  { number: "01", status: "coming-soon", visual: "workflow", featured: true },
  { number: "02", status: "case-study-soon", visual: "platform" },
  { number: "03", status: "case-study-soon", visual: "legacy" },
  { number: "04", status: "live", visual: "image", url: TRAIN_MOVEMENT.url },
];
const FOOTER_LINKS = (emailLabel) => [
  { label: "LinkedIn", href: LINKEDIN, external: true },
  { label: "GitHub", href: GITHUB, external: true },
  { label: emailLabel, href: `mailto:${EMAIL}` },
];
const CONTACT_ROWS = (emailLabel) => [
  { label: emailLabel, href: `mailto:${EMAIL}`, text: EMAIL },
  { label: "LinkedIn", href: LINKEDIN, text: "linkedin.com/in/albertfontdev", external: true },
  { label: "GitHub", href: GITHUB, text: "github.com/fontalbert", external: true },
];

const content = {
  es: {
    seo: {
      title: "Albert Font | AI Software Engineer y automatización con IA",
      description:
        "Albert Font es AI Software Engineer especializado en automatización con IA, software de negocio a medida, integraciones de sistemas y optimización de procesos de negocio.",
    },
    // Textos de accesibilidad (etiquetas aria)
    a11y: {
      mainNav: "Principal",
      footerNav: "Pie de página",
      language: "Idioma",
      newTab: "(se abre en una pestaña nueva)",
      examples: "Ejemplos",
      technologies: "Tecnologías",
    },
    // Fases del día: una por sección, en el orden de la página (arco del sol en SunPhase.jsx)
    phases: ["Alba", "Mañana", "Mediodía", "Tarde", "Media tarde", "Atardecer", "Crepúsculo", "Anochecer", "Noche"],

    nav: {
      name: "Albert Font",
      role: "AI Software Engineer",
      links: [
        { href: "#home", label: "Inicio" },
        { href: "#what-i-do", label: "Qué hago" },
        { href: "#work", label: "Proyectos" },
        { href: "#about", label: "Sobre mí" },
        { href: "#experience", label: "Experiencia" },
        { href: "#contact", label: "Contacto" },
      ],
      cta: { href: "#contact", label: "Hablemos" },
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      skip: "Saltar al contenido",
    },

    hero: {
      eyebrow: "Albert Font · AI Software Engineer",
      titleA: "Construyo software que ",
      titleAccent: "automatiza",
      titleB: " procesos de negocio reales.",
      description:
        "Ayudo a las empresas a convertir procesos manuales, sistemas desconectados y trabajo repetitivo en software inteligente y flujos de trabajo automatizados con IA.",
      ctaPrimary: { href: "#work", label: "Ver mi trabajo" },
      ctaSecondary: { href: "#contact", label: "Hablemos" },
      credibility: "Más de 15 años de experiencia en ingeniería de software",
      gameTip: "¿Jugamos? Haz doble clic en el cielo y las golondrinas se posarán en tu cable.",
      scrollHint: "El día empieza — desliza ↓",
    },

    services: {
      label: "Qué hago",
      title: "En qué ayudo a las empresas",
      items: [
        {
          title: "IA y automatización de negocio",
          description:
            "Automatizar flujos de trabajo repetitivos y procesos operativos con IA, software y toma de decisiones inteligente.",
          examples: [
            "Automatización de flujos de trabajo",
            "Procesamiento de documentos",
            "Clasificación de correos",
            "Procesamiento de datos",
            "Tareas administrativas repetitivas",
          ],
        },
        {
          title: "Software de negocio a medida",
          description: "Diseñar y construir software en torno a cómo funciona realmente un negocio.",
          examples: [
            "Aplicaciones internas de negocio",
            "Plataformas de gestión",
            "Aplicaciones SaaS",
            "Cuadros de mando a medida",
            "Herramientas de negocio",
          ],
        },
        {
          title: "Agentes de IA y flujos inteligentes",
          description:
            "Conectar modelos de IA con los datos, las APIs y el software de la empresa para que la IA participe en procesos de negocio reales.",
          examples: [
            "Agentes de IA",
            "Flujos de trabajo inteligentes",
            "Decisiones asistidas por IA",
            "Sistemas de conocimiento de negocio",
            "Acciones automatizadas",
          ],
        },
        {
          title: "Integraciones y modernización de sistemas legacy",
          description:
            "Conectar sistemas existentes y modernizar aplicaciones heredadas sin sustituir innecesariamente lo que ya funciona.",
          examples: ["APIs REST", "Bases de datos", "Aplicaciones heredadas", "Integraciones de sistemas", "Modernización"],
        },
      ],
    },

    work: {
      label: "Proyectos",
      title: "Trabajo seleccionado",
      subtitle:
        "Proyectos y experimentos que exploran la IA, la automatización y la ingeniería de software en el mundo real.",
      viewProject: "Ver proyecto",
      comingSoon: "Próximamente",
      caseStudySoon: "Caso de estudio próximamente",
      // Pasos del visual de flujo del proyecto 01 (WorkflowVisual.jsx): [etiqueta, nota breve]
      workflow: {
        title: "Flujo de automatización",
        steps: [
          ["Entrada", "Correos, formularios, documentos, eventos"],
          ["Agente de IA", "Lee e interpreta la petición"],
          ["Entender y clasificar", "Intención, entidades, prioridad"],
          ["Lógica de negocio", "Reglas, validaciones, decisiones"],
          ["Base de datos / API", "Sistemas y datos existentes"],
          ["Acción automatizada", "Responder, registrar, avisar, ejecutar"],
        ],
      },
      items: [
        {
          ...PROJECT_META[0],
          category: "IA / Automatización",
          title: "Automatización de negocio con IA",
          description:
            "Una demostración práctica de cómo la IA puede entender la información entrante, aplicar lógica de negocio y desencadenar acciones automáticas en los sistemas existentes.",
          flow: ["Entrada", "IA", "Clasificación", "Lógica de negocio", "Base de datos", "Acción"],
          tags: ["IA", "LLMs", "Automatización", "APIs", "Node.js", "SQL"],
        },
        {
          ...PROJECT_META[1],
          category: "Software a medida",
          title: "Plataforma de gestión empresarial",
          description:
            "Software a medida diseñado para gestionar procesos de negocio complejos, datos y flujos de trabajo desde una plataforma web integrada.",
          tags: ["React", "C#", ".NET", "SQL Server", "APIs REST"],
        },
        {
          ...PROJECT_META[2],
          category: "Software empresarial",
          title: "Modernización de sistemas legacy",
          description:
            "Modernizar el software de negocio existente conservando los sistemas, los datos y los procesos de los que la empresa sigue dependiendo.",
          tags: ["Sistemas legacy", "C#", "SQL Server", "APIs", "Modernización"],
        },
        {
          ...PROJECT_META[3],
          category: "Producto / SaaS",
          title: "Plataforma de fitness y nutrición",
          description:
            "Un proyecto de software personal que explora el entrenamiento personalizado, la nutrición y las recomendaciones asistidas por IA.",
          tags: ["React", "Node.js", "IA", "Base de datos", "SaaS"],
          image: {
            ...TRAIN_MOVEMENT.image,
            alt: "Página de inicio de Train Movement con la app móvil mostrando una sesión de entrenamiento diaria",
          },
        },
      ],
    },

    process: {
      label: "Proceso",
      title: "Cómo trabajo",
      steps: [
        {
          number: "01",
          title: "Entender",
          description: "Entender el proceso de negocio, los requisitos y dónde están los cuellos de botella reales.",
        },
        {
          number: "02",
          title: "Diseñar",
          description:
            "Diseñar la arquitectura, el flujo de trabajo y la experiencia de usuario en torno a las necesidades reales del negocio.",
        },
        {
          number: "03",
          title: "Construir",
          description: "Construir software fiable con prácticas de desarrollo modernas e ingeniería asistida por IA.",
        },
        {
          number: "04",
          title: "Automatizar",
          description: "Conectar IA, APIs, bases de datos y sistemas existentes para automatizar trabajo con sentido.",
        },
        {
          number: "05",
          title: "Mejorar",
          description: "Medir, refinar y mejorar continuamente la solución.",
        },
      ],
    },

    about: {
      label: "Sobre mí",
      // El primer párrafo se muestra grande, como declaración
      paragraphs: [
        "Soy ingeniero de software con más de 15 años de experiencia construyendo aplicaciones web, plataformas digitales y software de negocio para organizaciones, universidades, ONG y empresas privadas.",
        "A lo largo de mi carrera he trabajado en todo el ciclo de vida del software: desde entender los requisitos de negocio y diseñar soluciones hasta el desarrollo, las integraciones, el despliegue y el mantenimiento a largo plazo.",
        "Hoy aplico esa experiencia a una nueva generación de software centrada en la IA, la automatización de negocio y el software a medida.",
        "Mi trayectoria con sistemas empresariales, bases de datos, APIs, aplicaciones heredadas e infraestructura me permite abordar la tecnología desde una perspectiva más amplia: no solo escribir código, sino entender cómo encaja el software en el negocio.",
      ],
      location: "Girona, España · Trabajo en remoto para todo el mundo",
      // Copia reducida del retrato (el original de 600px sigue siendo la imagen Open Graph)
      photo: { ...PHOTO, alt: "Albert Font" },
    },

    experience: {
      label: "Experiencia",
      items: [
        {
          period: "Diciembre 2025 — Actualidad",
          company: "Disgrafic · Girona, España",
          title: "AI Software Engineer",
          subtitle: "Automatización con IA e ingeniería de procesos de negocio",
          description:
            "Ingeniero de software centrado en aplicar la Inteligencia Artificial al desarrollo de software, la automatización de negocio y la optimización de procesos.",
          highlights: [
            "Diseño e implemento soluciones de IA prácticas que automatizan procesos repetitivos, conectan los sistemas de negocio existentes y mejoran la eficiencia operativa.",
            "Mi trabajo combina ingeniería de software, análisis de procesos de negocio y tecnologías de IA.",
          ],
          tags: ["IA", "Automatización", "Integraciones", "Node.js", ".NET"],
        },
        {
          period: "2011 — Diciembre 2025",
          company: "Disgrafic · Girona, España",
          title: "Senior Web Programmer",
          description:
            "Desarrollo full-stack de aplicaciones web empresariales y software de negocio, desde la definición técnica hasta producción.",
          highlights: [
            "Aplicaciones web y plataformas online sobre DotNetNuke, React + Node.js y .NET MVC.",
            "Diseño y optimización de bases de datos adaptadas a cada cliente y proyecto.",
            "APIs, integraciones de sistemas y aplicaciones heredadas de larga vida.",
            "Despliegue e infraestructura con Azure DevOps: control de versiones, seguimiento de tareas y entrega continua.",
          ],
          tags: ["React", "Node.js", ".NET", "SQL Server", "DNN", "Azure DevOps"],
        },
        {
          period: "2011 — 2018",
          company: "Proyecto propio",
          title: "Fundador · PSDtoDNN",
          description:
            "Servicio de conversión de diseños PSD a themes HTML/CSS y JavaScript optimizados para la plataforma DNN.",
          highlights: [],
          tags: ["HTML/CSS", "SCSS", "Bootstrap", "DNN"],
        },
        {
          period: "2007 — 2008",
          company: "Pasiona · Banc Sabadell",
          title: "Consultor júnior",
          description:
            "Desarrollo, verificación y pruebas de una aplicación en C# para los directivos del Banc Sabadell.",
          highlights: [],
          tags: ["C#", "SQL"],
        },
        {
          period: "2005 — 2008",
          company: "EU Informàtica Tomàs Cerdà",
          title: "Grado en Ingeniería Informática",
          description: "Especialización en Ingeniería del Software y Sistemas de Información.",
          highlights: [],
          tags: ["Ingeniería del software"],
        },
      ],
    },

    technology: {
      label: "Tecnología",
      groups: [
        {
          name: "IA y automatización",
          items: ["IA", "LLMs", "Agentes de IA", "Automatización con IA", "Desarrollo asistido por IA"],
        },
        { name: "Frontend", items: ["React", "JavaScript", "HTML5", "CSS3"] },
        { name: "Backend", items: ["Node.js", "C#", ".NET", "APIs REST"] },
        { name: "Datos", items: ["SQL Server", "SQL", "Diseño de bases de datos", "Procedimientos almacenados"] },
        { name: "Empresa", items: ["DNN", "Sistemas legacy", "Cloud", "Infraestructura"] },
      ],
    },

    philosophy: {
      label: "Filosofía",
      statement: "La tecnología debe resolver problemas, no crear más.",
      description:
        "Me centro en soluciones prácticas que encajan con el negocio, se integran con los sistemas existentes y generan mejoras medibles.",
    },

    contact: {
      label: "Contacto",
      title: "¿Tienes un proceso que merece automatizarse?",
      description:
        "Hablemos de lo que haces hoy y de dónde el software o la IA podrían hacerlo más rápido, más simple o más escalable.",
      ctaTalk: { href: mailto("Hablemos de automatizar un proceso"), label: "Hablemos" },
      ctaLinkedin: { href: LINKEDIN, label: "LinkedIn" },
      rows: CONTACT_ROWS("Email"),
      wireCaption: "Las golondrinas vuelven al cable. Hasta mañana.",
    },

    footer: {
      name: "Albert Font",
      role: "AI Software Engineer",
      specialty: "Automatización con IA e ingeniería de procesos de negocio",
      links: FOOTER_LINKS("Email"),
      backToTop: "Volver al alba ↑",
      tip: "Invítame a un café",
    },

    // Marcador del juego de la murmuración (Murmuration.jsx)
    game: {
      score: "Golondrinas posadas",
      best: "Récord",
      wires: "Cables",
    },
  },

  en: {
    seo: {
      title: "Albert Font | AI Software Engineer & AI Automation",
      description:
        "Albert Font is an AI Software Engineer specializing in AI automation, custom business software, system integrations and business process optimization.",
    },
    a11y: {
      mainNav: "Main",
      footerNav: "Footer",
      language: "Language",
      newTab: "(opens in a new tab)",
      examples: "Examples",
      technologies: "Technologies",
    },
    phases: ["Dawn", "Morning", "Midday", "Afternoon", "Late afternoon", "Sunset", "Dusk", "Evening", "Nightfall"],

    nav: {
      name: "Albert Font",
      role: "AI Software Engineer",
      links: [
        { href: "#home", label: "Home" },
        { href: "#what-i-do", label: "What I Do" },
        { href: "#work", label: "Work" },
        { href: "#about", label: "About" },
        { href: "#experience", label: "Experience" },
        { href: "#contact", label: "Contact" },
      ],
      cta: { href: "#contact", label: "Let's talk" },
      menuOpen: "Open menu",
      menuClose: "Close menu",
      skip: "Skip to content",
    },

    hero: {
      eyebrow: "Albert Font · AI Software Engineer",
      titleA: "Building software that ",
      titleAccent: "automates",
      titleB: " real business processes.",
      description:
        "I help businesses turn manual processes, disconnected systems and repetitive work into intelligent software and AI-powered workflows.",
      ctaPrimary: { href: "#work", label: "View my work" },
      ctaSecondary: { href: "#contact", label: "Let's talk" },
      credibility: "15+ years of software engineering experience",
      gameTip: "Fancy a game? Double-click the sky and the swallows will perch on your wire.",
      scrollHint: "The day begins — scroll ↓",
    },

    services: {
      label: "What I do",
      title: "What I Help Businesses With",
      items: [
        {
          title: "AI & Business Automation",
          description:
            "Automating repetitive workflows and operational processes using AI, software and intelligent decision-making.",
          examples: [
            "Workflow automation",
            "Document processing",
            "Email classification",
            "Data processing",
            "Repetitive administrative tasks",
          ],
        },
        {
          title: "Custom Business Software",
          description: "Designing and building software around the way a business actually works.",
          examples: [
            "Internal business applications",
            "Management platforms",
            "SaaS applications",
            "Custom dashboards",
            "Business tools",
          ],
        },
        {
          title: "AI Agents & Intelligent Workflows",
          description:
            "Connecting AI models with business data, APIs and software so AI can participate in real business processes.",
          examples: [
            "AI agents",
            "Intelligent workflows",
            "AI-assisted decisions",
            "Business knowledge systems",
            "Automated actions",
          ],
        },
        {
          title: "Integrations & Legacy Modernization",
          description:
            "Connecting existing systems and modernizing legacy applications without unnecessarily replacing what already works.",
          examples: ["REST APIs", "Databases", "Legacy applications", "System integrations", "Modernization"],
        },
      ],
    },

    work: {
      label: "Work",
      title: "Selected Work",
      subtitle: "Projects and experiments exploring AI, automation and real-world software engineering.",
      viewProject: "View project",
      comingSoon: "Coming soon",
      caseStudySoon: "Case study coming soon",
      workflow: {
        title: "Automation workflow",
        steps: [
          ["Input", "Emails, forms, documents, events"],
          ["AI agent", "Reads and interprets the request"],
          ["Understand & classify", "Intent, entities, priority"],
          ["Business logic", "Rules, validations, decisions"],
          ["Database / API", "Existing systems and data"],
          ["Automated action", "Reply, record, notify, trigger"],
        ],
      },
      items: [
        {
          ...PROJECT_META[0],
          category: "AI / Automation",
          title: "AI Business Automation",
          description:
            "A practical demonstration of how AI can understand incoming information, apply business logic and trigger automated actions across existing systems.",
          flow: ["Input", "AI", "Classification", "Business Logic", "Database", "Action"],
          tags: ["AI", "LLMs", "Automation", "APIs", "Node.js", "SQL"],
        },
        {
          ...PROJECT_META[1],
          category: "Custom Software",
          title: "Business Management Platform",
          description:
            "Custom software designed to manage complex business processes, data and workflows through an integrated web platform.",
          tags: ["React", "C#", ".NET", "SQL Server", "REST APIs"],
        },
        {
          ...PROJECT_META[2],
          category: "Enterprise Software",
          title: "Legacy System Modernization",
          description:
            "Modernizing existing business software while preserving the systems, data and processes that the business still depends on.",
          tags: ["Legacy Systems", "C#", "SQL Server", "APIs", "Modernization"],
        },
        {
          ...PROJECT_META[3],
          category: "Product / SaaS",
          title: "Fitness & Nutrition Platform",
          description:
            "A personal software project exploring personalized training, nutrition and AI-assisted recommendations.",
          tags: ["React", "Node.js", "AI", "Database", "SaaS"],
          image: {
            ...TRAIN_MOVEMENT.image,
            alt: "Train Movement landing page showing the mobile app with a daily training session",
          },
        },
      ],
    },

    process: {
      label: "Process",
      title: "How I Work",
      steps: [
        {
          number: "01",
          title: "Understand",
          description: "Understand the business process, requirements and where the real bottlenecks are.",
        },
        {
          number: "02",
          title: "Design",
          description: "Design the architecture, workflow and user experience around the actual business needs.",
        },
        {
          number: "03",
          title: "Build",
          description: "Build reliable software using modern development practices and AI-assisted engineering.",
        },
        {
          number: "04",
          title: "Automate",
          description: "Connect AI, APIs, databases and existing systems to automate meaningful work.",
        },
        {
          number: "05",
          title: "Improve",
          description: "Measure, refine and continuously improve the solution.",
        },
      ],
    },

    about: {
      label: "About me",
      paragraphs: [
        "I'm a Software Engineer with 15+ years of experience building web applications, digital platforms and business software for organizations, universities, NGOs and private companies.",
        "Throughout my career, I've worked across the full software development lifecycle — from understanding business requirements and designing solutions to development, integrations, deployment and long-term maintenance.",
        "Today, I'm applying that experience to a new generation of software focused on AI, business automation and custom software.",
        "My background working with enterprise systems, databases, APIs, legacy applications and infrastructure allows me to approach technology from a broader perspective: not just writing code, but understanding how software fits into the business.",
      ],
      location: "Based in Girona, Spain · Working remotely worldwide",
      photo: { ...PHOTO, alt: "Albert Font" },
    },

    experience: {
      label: "Experience",
      items: [
        {
          period: "December 2025 — Present",
          company: "Disgrafic · Girona, Spain",
          title: "AI Software Engineer",
          subtitle: "AI Automation & Business Process Engineering",
          description:
            "AI Software Engineer focused on applying Artificial Intelligence to software development, business automation and process optimization.",
          highlights: [
            "I design and implement practical AI solutions that automate repetitive processes, connect existing business systems and improve operational efficiency.",
            "My work combines software engineering, business process analysis and AI technologies.",
          ],
          tags: ["AI", "Automation", "Integrations", "Node.js", ".NET"],
        },
        {
          period: "2011 — December 2025",
          company: "Disgrafic · Girona, Spain",
          title: "Senior Web Programmer",
          description:
            "Full-stack development of enterprise web applications and business software, from technical definition to production.",
          highlights: [
            "Web applications and online platforms built on DotNetNuke, React + Node.js and .NET MVC.",
            "Database design and optimization tailored to each client and project.",
            "APIs, system integrations and long-lived legacy applications.",
            "Deployment and infrastructure with Azure DevOps: version control, task tracking and continuous delivery.",
          ],
          tags: ["React", "Node.js", ".NET", "SQL Server", "DNN", "Azure DevOps"],
        },
        {
          period: "2011 — 2018",
          company: "Own venture",
          title: "Founder · PSDtoDNN",
          description:
            "A service converting PSD designs into HTML/CSS and JavaScript themes optimized for the DNN platform.",
          highlights: [],
          tags: ["HTML/CSS", "SCSS", "Bootstrap", "DNN"],
        },
        {
          period: "2007 — 2008",
          company: "Pasiona · Banc Sabadell",
          title: "Junior Consultant",
          description: "Development, verification and testing of a C# application for the executives of Banc Sabadell.",
          highlights: [],
          tags: ["C#", "SQL"],
        },
        {
          period: "2005 — 2008",
          company: "EU Informàtica Tomàs Cerdà",
          title: "Degree in Computer Engineering",
          description: "Specialization in Software Engineering and Information Systems.",
          highlights: [],
          tags: ["Software engineering"],
        },
      ],
    },

    technology: {
      label: "Technology",
      groups: [
        { name: "AI & Automation", items: ["AI", "LLMs", "AI Agents", "AI Automation", "AI-assisted Development"] },
        { name: "Frontend", items: ["React", "JavaScript", "HTML5", "CSS3"] },
        { name: "Backend", items: ["Node.js", "C#", ".NET", "REST APIs"] },
        { name: "Data", items: ["SQL Server", "SQL", "Database Design", "Stored Procedures"] },
        { name: "Enterprise", items: ["DNN", "Legacy Systems", "Cloud", "Infrastructure"] },
      ],
    },

    philosophy: {
      label: "Philosophy",
      statement: "Technology should solve problems — not create more of them.",
      description:
        "I focus on practical solutions that fit the business, integrate with existing systems and create measurable improvements.",
    },

    contact: {
      label: "Contact",
      title: "Have a process worth automating?",
      description:
        "Let's talk about what you're doing today and where software or AI could make it faster, simpler or more scalable.",
      ctaTalk: { href: mailto("Let's talk about automating a process"), label: "Let's talk" },
      ctaLinkedin: { href: LINKEDIN, label: "LinkedIn" },
      rows: CONTACT_ROWS("Email"),
      wireCaption: "The swallows are back on the wire. See you tomorrow.",
    },

    footer: {
      name: "Albert Font",
      role: "AI Software Engineer",
      specialty: "AI Automation & Business Process Engineering",
      links: FOOTER_LINKS("Email"),
      backToTop: "Back to dawn ↑",
      tip: "Buy me a coffee",
    },

    game: {
      score: "Perched swallows",
      best: "Best",
      wires: "Wires",
    },
  },
};

export default content;
