// seed.js - Script para poblar la base de datos con datos de ejemplo
require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./models/Profile');
const Experience = require('./models/Experience');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

// Datos de ejemplo
const profileData = {
  name: "Albert Font Sala",
  title: "Full Stack Developer",
  email: "albert@example.com",
  phone: "+34 600 000 000",
  location: "Barcelona, España",
  summary: "Desarrollador Full Stack apasionado por crear soluciones web innovadoras. Experiencia en React, Node.js, MongoDB y arquitecturas cloud. Me encanta aprender nuevas tecnologías y enfrentar desafíos técnicos complejos.",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  social: {
    linkedin: "https://linkedin.com/in/albert-font-sala",
    github: "https://github.com",
    twitter: "https://twitter.com"
  },
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Catalán", level: "Nativo" },
    { name: "Inglés", level: "Fluido" }
  ]
};

const experienceData = [
  {
    type: "work",
    company: "Tech Solutions Barcelona",
    position: "Senior Full Stack Developer",
    location: "Barcelona, España",
    startDate: new Date("2022-01-15"),
    current: true,
    description: "Liderando el desarrollo de aplicaciones web escalables para clientes enterprise usando React, Node.js y AWS.",
    achievements: [
      "Implementé una arquitectura de microservicios que mejoró el rendimiento en un 40%",
      "Lideré un equipo de 5 desarrolladores en proyectos críticos",
      "Reduje el tiempo de despliegue en un 60% implementando CI/CD con GitHub Actions"
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker", "Kubernetes"]
  },
  {
    type: "work",
    company: "Digital Innovation Lab",
    position: "Full Stack Developer",
    location: "Barcelona, España",
    startDate: new Date("2020-03-01"),
    endDate: new Date("2021-12-31"),
    description: "Desarrollo de plataformas SaaS innovadoras desde la conceptualización hasta el despliegue.",
    achievements: [
      "Desarrollé un MVP completo en 3 meses que consiguió 1000 usuarios en el primer mes",
      "Implementé sistema de pagos con Stripe procesando más de 50k€/mes",
      "Optimicé queries de base de datos reduciendo el tiempo de carga en un 70%"
    ],
    technologies: ["Vue.js", "Express", "PostgreSQL", "Redis", "Stripe API"]
  },
  {
    type: "education",
    company: "Universidad Politécnica de Cataluña",
    position: "Grado en Ingeniería Informática",
    location: "Barcelona, España",
    startDate: new Date("2016-09-01"),
    endDate: new Date("2020-06-30"),
    description: "Especialización en Ingeniería del Software y Sistemas de Información.",
    achievements: [
      "Proyecto final: Sistema de recomendación con Machine Learning (Nota: 9.5/10)",
      "Beca de excelencia académica durante 2 años",
      "Participación en hackathons universitarios (2 primeros puestos)"
    ],
    technologies: ["Java", "Python", "C++", "SQL", "Machine Learning"]
  }
];

const projectsData = [
  {
    title: "E-Commerce Platform",
    shortDescription: "Plataforma completa de comercio electrónico con panel de administración",
    description: "Desarrollé una plataforma de e-commerce moderna con funcionalidades avanzadas como búsqueda en tiempo real, sistema de recomendaciones basado en IA, y panel de administración completo. La plataforma maneja más de 10,000 productos y 1,000 transacciones diarias.",
    type: "professional",
    status: "completed",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-06-30"),
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS S3", "ElasticSearch"],
    features: [
      "Carrito de compras en tiempo real",
      "Sistema de pagos seguro con Stripe",
      "Panel de administración completo",
      "Sistema de recomendaciones con IA",
      "Búsqueda avanzada con filtros"
    ],
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    demoUrl: "https://demo-ecommerce.example.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    featured: true
  },
  {
    title: "Task Management System",
    shortDescription: "Sistema de gestión de tareas con colaboración en tiempo real",
    description: "Aplicación web para gestión de proyectos y tareas con características de colaboración en tiempo real usando WebSockets. Incluye chat integrado, notificaciones push y sincronización offline.",
    type: "personal",
    status: "completed",
    technologies: ["React", "Socket.io", "Express", "PostgreSQL", "Redis", "PWA"],
    features: [
      "Colaboración en tiempo real",
      "Drag & drop para organizar tareas",
      "Chat integrado por proyecto",
      "Notificaciones push",
      "Modo offline con sincronización"
    ],
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    liveUrl: "https://tasks.example.com",
    githubUrl: "https://github.com/username/task-manager"
  },
  {
    title: "Weather Dashboard",
    shortDescription: "Dashboard meteorológico con visualizaciones interactivas",
    description: "Dashboard interactivo que muestra información meteorológica en tiempo real con gráficos y mapas interactivos. Utiliza múltiples APIs y muestra predicciones detalladas.",
    type: "personal",
    status: "completed",
    technologies: ["React", "D3.js", "OpenWeather API", "Mapbox", "Chart.js"],
    features: [
      "Datos meteorológicos en tiempo real",
      "Mapas interactivos",
      "Gráficos de tendencias",
      "Predicción a 7 días",
      "Alertas meteorológicas"
    ],
    thumbnail: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
    liveUrl: "https://weather.example.com",
    featured: true
  }
];

const skillsData = [
  // Frontend
  { category: "Frontend", name: "React", level: 5, yearsOfExperience: 4 },
  { category: "Frontend", name: "Vue.js", level: 4, yearsOfExperience: 2 },
  { category: "Frontend", name: "TypeScript", level: 4, yearsOfExperience: 3 },
  { category: "Frontend", name: "HTML/CSS", level: 5, yearsOfExperience: 6 },
  { category: "Frontend", name: "Tailwind CSS", level: 5, yearsOfExperience: 2 },
  
  // Backend
  { category: "Backend", name: "Node.js", level: 5, yearsOfExperience: 5 },
  { category: "Backend", name: "Express", level: 5, yearsOfExperience: 5 },
  { category: "Backend", name: "Python", level: 3, yearsOfExperience: 2 },
  { category: "Backend", name: "GraphQL", level: 3, yearsOfExperience: 1 },
  
  // Database
  { category: "Database", name: "MongoDB", level: 4, yearsOfExperience: 4 },
  { category: "Database", name: "PostgreSQL", level: 4, yearsOfExperience: 3 },
  { category: "Database", name: "Redis", level: 3, yearsOfExperience: 2 },
  
  // DevOps
  { category: "DevOps", name: "Docker", level: 4, yearsOfExperience: 3 },
  { category: "DevOps", name: "AWS", level: 3, yearsOfExperience: 2 },
  { category: "DevOps", name: "CI/CD", level: 4, yearsOfExperience: 3 },
  { category: "DevOps", name: "Git", level: 5, yearsOfExperience: 6 }
];

// Función para poblar la base de datos
async function seedDatabase() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Conectado a MongoDB');

    // Limpiar datos existentes
    await Promise.all([
      Profile.deleteMany({}),
      Experience.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({})
    ]);
    console.log('🧹 Base de datos limpiada');

    // Insertar nuevos datos
    await Profile.create(profileData);
    console.log('✅ Perfil creado');

    await Experience.insertMany(experienceData);
    console.log('✅ Experiencias creadas');

    await Project.insertMany(projectsData);
    console.log('✅ Proyectos creados');

    await Skill.insertMany(skillsData);
    console.log('✅ Habilidades creadas');

    console.log('🎉 Base de datos poblada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('👋 Conexión cerrada');
  }
}

// Ejecutar el script
seedDatabase();