// Todo el contenido de la web (en inglés). Editar aquí los textos; los componentes solo leen content.*
// Regla: nada inventado — sin clientes, cifras ni resultados que no sean reales. Lo pendiente se marca como "coming soon".

const EMAIL = "albert.font@outlook.com";
const LINKEDIN = "https://www.linkedin.com/in/albertfontdev/";
const GITHUB = "https://github.com/fontalbert";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Let's talk about automating a process")}`;

const content = {
  // Fases del día: una por sección, en el orden de la página (arco del sol en SunPhase.jsx)
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
    // Pasos del visual de flujo del proyecto 01 (WorkflowVisual.jsx): [etiqueta, nota breve]
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
    // visual: "workflow" | "platform" | "legacy" | "image"  ·  status: "coming-soon" | "case-study-soon" | "live"
    items: [
      {
        number: "01",
        category: "AI / Automation",
        title: "AI Business Automation",
        description:
          "A practical demonstration of how AI can understand incoming information, apply business logic and trigger automated actions across existing systems.",
        flow: ["Input", "AI", "Classification", "Business Logic", "Database", "Action"],
        tags: ["AI", "LLMs", "Automation", "APIs", "Node.js", "SQL"],
        status: "coming-soon",
        visual: "workflow",
        featured: true,
      },
      {
        number: "02",
        category: "Custom Software",
        title: "Business Management Platform",
        description:
          "Custom software designed to manage complex business processes, data and workflows through an integrated web platform.",
        tags: ["React", "C#", ".NET", "SQL Server", "REST APIs"],
        status: "case-study-soon",
        visual: "platform",
      },
      {
        number: "03",
        category: "Enterprise Software",
        title: "Legacy System Modernization",
        description:
          "Modernizing existing business software while preserving the systems, data and processes that the business still depends on.",
        tags: ["Legacy Systems", "C#", "SQL Server", "APIs", "Modernization"],
        status: "case-study-soon",
        visual: "legacy",
      },
      {
        number: "04",
        category: "Product / SaaS",
        title: "Fitness & Nutrition Platform",
        description:
          "A personal software project exploring personalized training, nutrition and AI-assisted recommendations.",
        tags: ["React", "Node.js", "AI", "Database", "SaaS"],
        status: "live",
        url: "https://www.trainmovementapp.com",
        image: {
          src: "/images/proyectos/trainmovementapp.jpg",
          alt: "Train Movement landing page showing the mobile app with a daily training session",
          width: 1652,
          height: 902,
        },
        visual: "image",
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
    // El primer párrafo se muestra grande, como declaración
    paragraphs: [
      "I'm a Software Engineer with 15+ years of experience building web applications, digital platforms and business software for organizations, universities, NGOs and private companies.",
      "Throughout my career, I've worked across the full software development lifecycle — from understanding business requirements and designing solutions to development, integrations, deployment and long-term maintenance.",
      "Today, I'm applying that experience to a new generation of software focused on AI, business automation and custom software.",
      "My background working with enterprise systems, databases, APIs, legacy applications and infrastructure allows me to approach technology from a broader perspective: not just writing code, but understanding how software fits into the business.",
    ],
    location: "Based in Girona, Spain · Working remotely worldwide",
    // Copia reducida del retrato (el original de 600px sigue siendo la imagen Open Graph)
    photo: { src: "/albert-font_avatar-360.jpg", alt: "Albert Font", width: 360, height: 490 },
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
    ctaTalk: { href: MAILTO, label: "Let's talk" },
    ctaLinkedin: { href: LINKEDIN, label: "LinkedIn" },
    rows: [
      { label: "Email", href: `mailto:${EMAIL}`, text: EMAIL },
      { label: "LinkedIn", href: LINKEDIN, text: "linkedin.com/in/albertfontdev", external: true },
      { label: "GitHub", href: GITHUB, text: "github.com/fontalbert", external: true },
    ],
    wireCaption: "The swallows are back on the wire. See you tomorrow.",
  },

  footer: {
    name: "Albert Font",
    role: "AI Software Engineer",
    specialty: "AI Automation & Business Process Engineering",
    links: [
      { label: "LinkedIn", href: LINKEDIN, external: true },
      { label: "GitHub", href: GITHUB, external: true },
      { label: "Email", href: `mailto:${EMAIL}` },
    ],
    backToTop: "Back to dawn ↑",
    tip: "Buy me a coffee",
  },

  // Marcador del juego de la murmuración (Murmuration.jsx)
  game: {
    score: "Perched swallows",
    best: "Best",
    wires: "Wires",
  },
};

export default content;
