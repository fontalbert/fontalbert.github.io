// Todo el contenido de la web en ambos idiomas.
// Editar aquí los textos; los componentes solo leen content[lang].

const years = new Date().getFullYear() - 2008;

// Años de experiencia por tecnología (compartido entre idiomas)
const TECH = {
  frontend: [
    ["HTML/CSS", 17],
    ["Javascript", 13],
    ["jQuery.js", 15],
    ["Bootstrap", 11],
    ["React", 8],
  ],
  backend: [
    ["C#", 17],
    ["ASP.NET", 16],
    ["DotnetNuke", 15],
    ["ASP MVC", 8],
    ["Node.js", 6],
  ],
  database: [
    ["SQL Server", 16],
    ["PostgreSQL", 2],
    ["Supabase", null],
    ["MongoDB", null],
    ["Redis", null],
  ],
  devops: [
    ["Git", 9],
    ["Azure DevOps", 8],
    ["TortoiseSVN", 5],
    ["Docker", null],
    ["AWS", null],
  ],
};

const PROJECT_META = [
  {
    image: "/images/proyectos/wcs_impactmap.jpg",
    url: "https://impact.wcs.org/en-us/impactApp",
    tagLine: "React · C# · SQL Server · ArcGIS · DNN",
  },
  {
    image: "/images/proyectos/udg_voluntariat.jpg",
    url: "https://apps.udg.edu/UCSOP",
    tagLine: "Razor · MVC · SQL Server · SSO · Bootstrap",
  },
  {
    image: null,
    url: "",
    tagLine: "React · TypeScript · PostgreSQL · Supabase · Vercel",
  },
  {
    image: "/images/proyectos/preventing_wildlife_crime.jpg",
    url: "https://collaborations.wcs.org/snappwildlifecrime",
    tagLine: "HTML · CSS · Razor · SQL Server · Bootstrap 5",
  },
];

const content = {
  es: {
    meta: { code: "es", label: "ES" },
    years,
    nav: {
      role: "Fullstack Dev",
      links: [
        { href: "#sobre-mi", label: "Sobre mí" },
        { href: "#tecnologias", label: "Tecnologías" },
        { href: "#experiencia", label: "Experiencia" },
        { href: "#proyectos", label: "Proyectos" },
      ],
      contact: "Contacto",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
    },
    phases: ["Alba", "Mañana", "Mediodía", "Tarde", "Atardecer", "Anochecer"],
    hero: {
      eyebrow: "Girona, España",
      titleA: "Albert Font",
      titleB: "hace webs ",
      titleEm: "ligeras",
      titleC: ".",
      description: `Desarrollador fullstack con más de ${years} años de experiencia. Claro, limpio y con personalidad: cada detalle tiene un propósito. La IA es mi herramienta principal de trabajo.`,
      ctaProjects: "Ver proyectos",
      ctaCv: "Descargar CV",
      stack: "IA · React · Node.js · C# · ASP.NET · SQL Server",
      gameTip: "¿Jugamos? Haz doble clic en el cielo y las golondrinas se posarán en tu cable.",
      scrollHint: "El día empieza — desliza ↓",
    },
    about: {
      title: "Sobre mí",
      statementParts: [
        "Soy Albert, diseñador y desarrollador web enfocado en la simplicidad, la elegancia y la eficiencia. Me gusta crear páginas ",
        "ligeras",
        ", ",
        "bien estructuradas",
        " y ",
        "visualmente cuidadas",
        ".",
      ],
      philosophy:
        "Mi innovación nace de la capacidad de profundizar en los problemas, entender su origen y transformarlos en soluciones claras, eficientes y sostenibles. No busco innovar por tendencia, sino aportar cambios que simplifiquen procesos y mejoren el día a día de las personas.",
      location: "Girona, España",
    },
    ia: {
      titleA: "La IA, mi herramienta principal ",
      titleB: "desde hace un año.",
      description:
        "Integro la IA generativa en todo mi flujo de trabajo diario: desarrollo asistido, revisión de código y automatización.",
      pills: ["Desarrollo asistido", "IA generativa", "Agentes"],
    },
    tech: {
      title: "Tecnologías",
      cellsNote: "1 celda = 1 año de experiencia",
      recent: "en el stack",
      categories: [
        { name: "Frontend", items: TECH.frontend },
        { name: "Backend", items: TECH.backend },
        { name: "Bases de datos", items: TECH.database },
        { name: "DevOps", items: TECH.devops },
      ],
      yearLabel: (y) => (y === 1 ? "1 año" : `${y} años`),
    },
    experience: {
      title: "Experiencia",
      items: [
        {
          period: "2011 — hoy",
          company: "Disgrafic",
          title: "Full Stack Developer",
          description:
            "Desarrollo web y aplicaciones online con DotNetNuke como CMS, o aplicaciones basadas en React + Node.js y MVC .NET.",
          highlights: [
            "Responsable de planificación, desarrollo y entrega de proyectos web, de la definición técnica a producción.",
            "Diseño de arquitectura, elección de tecnologías y decisiones clave en coordinación directa con la dirección.",
            "Creación y optimización de bases de datos adaptadas a cada cliente y proyecto.",
            "Azure DevOps para control de versiones, seguimiento de tareas y despliegue continuo.",
            "Frontend en React y backend en Node.js y .NET MVC, con buenas prácticas.",
          ],
          tags: ["React", "Node.js", ".NET", "SQL Server", "Azure DevOps"],
        },
        {
          period: "2011 — 2018",
          company: "Proyecto propio",
          title: "Fundador · PSDtoDNN",
          description:
            "Servicio de conversión de diseños PSD a themes HTML/CSS y JavaScript optimizados para la plataforma DNN.",
          highlights: [
            "Diseños medios y avanzados optimizados para DNN.",
            "Reduje el tiempo de desarrollo un 40% con SCSS y un sistema mixto de Bootstrap y framework propio.",
          ],
          tags: ["HTML/CSS", "SCSS", "Bootstrap", "DNN"],
        },
        {
          period: "2007 — 2008",
          company: "Pasiona · Banc Sabadell",
          title: "Consultant Junior",
          description: "Aplicación en C# orientada a los directivos del Banc Sabadell.",
          highlights: [
            "Desarrollo, verificaciones y tests en C#.",
            "Optimicé queries de base de datos reduciendo el tiempo de carga un 70%.",
          ],
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
    projects: {
      title: "Proyectos",
      viewProject: "Ver proyecto",
      internalUse: "Uso interno — Clínica Girona",
      items: [
        {
          ...PROJECT_META[0],
          title: "WCS Impact Map",
          description:
            "Mapa interactivo del estado de las áreas biológicas protegidas del planeta, para Wildlife Conservation Society.",
        },
        {
          ...PROJECT_META[1],
          title: "UdG Voluntariat",
          description:
            "Plataforma completa de voluntariado para estudiantes de la Universitat de Girona.",
        },
        {
          ...PROJECT_META[2],
          title: "Diàlisis App",
          description:
            "Gestión diaria de pacientes de diálisis para la Clínica Girona.",
        },
        {
          ...PROJECT_META[3],
          title: "Preventing Wildlife Crime",
          description:
            "Evaluación del impacto real de las intervenciones contra el tráfico de vida silvestre (marco EMMIE).",
        },
      ],
    },
    contact: {
      title: "Contacto",
      headlineA: "El día se acaba.",
      headlineB: "Tu proyecto, ",
      headlineEm: "empieza",
      description:
        "Cuéntame qué necesitas y te propongo una solución clara, ligera y bien construida.",
      cv: "Descargar CV",
      wireCaption: "Las golondrinas vuelven al cable. Hasta mañana.",
    },
    footer: {
      handmade: "Diseñado y construido a mano",
      backToTop: "Volver al alba ↑",
    },
    game: {
      score: "Golondrinas posadas",
      best: "Récord",
    },
  },

  en: {
    meta: { code: "en", label: "EN" },
    years,
    nav: {
      role: "Fullstack Dev",
      links: [
        { href: "#sobre-mi", label: "About" },
        { href: "#tecnologias", label: "Technologies" },
        { href: "#experiencia", label: "Experience" },
        { href: "#proyectos", label: "Projects" },
      ],
      contact: "Contact",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    phases: ["Dawn", "Morning", "Midday", "Afternoon", "Sunset", "Nightfall"],
    hero: {
      eyebrow: "Girona, Spain",
      titleA: "Albert Font",
      titleB: "builds ",
      titleEm: "light",
      titleC: " websites.",
      description: `Fullstack developer with over ${years} years of experience. Clear, clean and with personality: every detail has a purpose. AI is my main working tool.`,
      ctaProjects: "View projects",
      ctaCv: "Download CV",
      stack: "AI · React · Node.js · C# · ASP.NET · SQL Server",
      gameTip: "Fancy a game? Double-click the sky and the swallows will perch on your wire.",
      scrollHint: "The day begins — scroll ↓",
    },
    about: {
      title: "About me",
      statementParts: [
        "I'm Albert, a web designer and developer focused on simplicity, elegance and efficiency. I like building pages that are ",
        "light",
        ", ",
        "well structured",
        " and ",
        "visually polished",
        ".",
      ],
      philosophy:
        "My innovation comes from digging deep into problems, understanding their origin and turning them into clear, efficient and sustainable solutions. I don't innovate to follow trends — I bring changes that simplify processes and improve people's daily lives.",
      location: "Girona, Spain",
    },
    ia: {
      titleA: "AI, my main tool ",
      titleB: "for the past year.",
      description:
        "I integrate generative AI across my entire daily workflow: assisted development, code review and automation.",
      pills: ["AI-assisted development", "Generative AI", "Agents"],
    },
    tech: {
      title: "Technologies",
      cellsNote: "1 cell = 1 year of experience",
      recent: "in the stack",
      categories: [
        { name: "Frontend", items: TECH.frontend },
        { name: "Backend", items: TECH.backend },
        { name: "Databases", items: TECH.database },
        { name: "DevOps", items: TECH.devops },
      ],
      yearLabel: (y) => (y === 1 ? "1 year" : `${y} years`),
    },
    experience: {
      title: "Experience",
      items: [
        {
          period: "2011 — today",
          company: "Disgrafic",
          title: "Full Stack Developer",
          description:
            "Web development and online applications using DotNetNuke as CMS, or applications built with React + Node.js and .NET MVC.",
          highlights: [
            "Responsible for planning, development and delivery of web projects, from technical definition to production.",
            "Architecture design, technology choices and key decisions in direct coordination with management.",
            "Creation and optimization of databases tailored to each client and project.",
            "Azure DevOps for version control, task tracking and continuous deployment.",
            "React frontend and Node.js / .NET MVC backend, following best practices.",
          ],
          tags: ["React", "Node.js", ".NET", "SQL Server", "Azure DevOps"],
        },
        {
          period: "2011 — 2018",
          company: "Own venture",
          title: "Founder · PSDtoDNN",
          description:
            "A service converting PSD designs into HTML/CSS and JavaScript themes optimized for the DNN platform.",
          highlights: [
            "Mid and advanced designs optimized for DNN.",
            "Cut development time by 40% using SCSS and a hybrid Bootstrap + custom framework system.",
          ],
          tags: ["HTML/CSS", "SCSS", "Bootstrap", "DNN"],
        },
        {
          period: "2007 — 2008",
          company: "Pasiona · Banc Sabadell",
          title: "Junior Consultant",
          description: "A C# application for the executives of Banc Sabadell.",
          highlights: [
            "Development, verification and testing in C#.",
            "Optimized database queries, cutting load times by 70%.",
          ],
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
    projects: {
      title: "Projects",
      viewProject: "View project",
      internalUse: "Internal use — Clínica Girona",
      items: [
        {
          ...PROJECT_META[0],
          title: "WCS Impact Map",
          description:
            "Interactive map of the state of the planet's protected biological areas, for the Wildlife Conservation Society.",
        },
        {
          ...PROJECT_META[1],
          title: "UdG Voluntariat",
          description:
            "Complete volunteering platform for students of the University of Girona.",
        },
        {
          ...PROJECT_META[2],
          title: "Diàlisis App",
          description:
            "Daily management of dialysis patients for Clínica Girona.",
        },
        {
          ...PROJECT_META[3],
          title: "Preventing Wildlife Crime",
          description:
            "Assessment of the real impact of interventions against wildlife trafficking (EMMIE framework).",
        },
      ],
    },
    contact: {
      title: "Contact",
      headlineA: "The day ends.",
      headlineB: "Your project ",
      headlineEm: "begins",
      description:
        "Tell me what you need and I'll propose a clear, light, well-built solution.",
      cv: "Download CV",
      wireCaption: "The swallows are back on the wire. See you tomorrow.",
    },
    footer: {
      handmade: "Designed and built by hand",
      backToTop: "Back to dawn ↑",
    },
    game: {
      score: "Perched swallows",
      best: "Best",
    },
  },
};

export default content;
