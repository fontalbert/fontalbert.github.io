// src/App.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, User, Briefcase, Code, Mail, Phone, MapPin, 
  Github, Linkedin, Twitter, Globe, Calendar, Award,
  ExternalLink, ChevronRight, Menu, X, Download
} from 'lucide-react';
import { Profile, Experience, Project, Skill } from './types/index';
import { profileAPI, experienceAPI, projectsAPI, skillsAPI } from './services/api';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  // Navegación
  const navigation = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'about', label: 'Sobre mí', icon: User },
    { id: 'experience', label: 'Experiencia', icon: Briefcase },
    { id: 'projects', label: 'Proyectos', icon: Code }
  ];

  // Cargar datos del backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [profileRes, experienceRes, projectsRes, skillsRes] = await Promise.all([
          profileAPI.get(),
          experienceAPI.getAll(),
          projectsAPI.getAll(),
          skillsAPI.getAll()
        ]);

        setProfile(profileRes.data);
        setExperience(experienceRes.data);
        setProjects(projectsRes.data);
        setSkills(skillsRes.data);
      } catch (error) {
        console.error('Error cargando datos:', error);
        // En caso de error, usar datos de ejemplo
        setProfile({
          name: "Tu Nombre",
          title: "Tu Título Profesional",
          email: "tu-email@example.com",
          summary: "Añade tu resumen profesional aquí...",
          social: {
            linkedin: "https://linkedin.com",
            github: "https://github.com",
            twitter: "https://twitter.com"
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Scroll suave a sección
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero Section
  const HeroSection = () => (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
              style={{
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={profile?.avatar || 'https://via.placeholder.com/150'}
            alt={profile?.name || 'Avatar'}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 shadow-2xl ring-4 ring-white object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {profile?.name || 'Tu Nombre'}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            {profile?.title || 'Tu Título Profesional'}
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
          {profile?.social && Object.entries(profile.social).map(([platform, url]) => {
            if (!url) return null;
            const Icon = platform === 'linkedin' ? Linkedin : 
                      platform === 'github' ? Github : 
                      platform === 'twitter' ? Twitter : Globe;
            return (
              <motion.a
                key={platform}
                href={url as string}  // <-- Añade "as string" aquí
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5 text-gray-700" />
              </motion.a>
            );
          })}
          </div>
          
          <motion.button
            onClick={() => scrollToSection('about')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Conoce más
          </motion.button>
        </motion.div>
      </div>
    </section>
  );

  // About Section
  const AboutSection = () => (
    <section id="about" className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Sobre mí
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {profile?.summary || 'Añade tu resumen profesional aquí...'}
              </p>
              
              <div className="space-y-4">
                {profile?.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{profile.email}</span>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{profile.phone}</span>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{profile.location}</span>
                  </div>
                )}
              </div>
              
              <motion.button
                className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Descargar CV
              </motion.button>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Habilidades</h3>
              {['Frontend', 'Backend', 'Database', 'DevOps'].map(category => {
                const categorySkills = skills.filter(s => s.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-3">
                    <h4 className="font-semibold text-gray-700">{category}</h4>
                    <div className="space-y-2">
                      {categorySkills.map(skill => (
                        <div key={skill._id} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{skill.name}</span>
                            <span className="text-gray-500">{skill.yearsOfExperience} años</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // Experience Section
  const ExperienceSection = () => (
    <section id="experience" className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Experiencia
          </h2>
          
          <div className="space-y-8">
            {experience.length === 0 ? (
              <p className="text-center text-gray-600">No hay experiencias registradas aún.</p>
            ) : (
              experience.map((exp, index) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-lg text-blue-600">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 mt-2 md:mt-0">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(exp.startDate).getFullYear()} - 
                        {exp.current ? 'Actualidad' : exp.endDate ? new Date(exp.endDate).getFullYear() : 'Presente'}
                      </span>
                    </div>
                  </div>
                  
                  {exp.description && <p className="text-gray-700 mb-4">{exp.description}</p>}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Logros destacados:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );

  // Projects Section
  const ProjectsSection = () => {
    const [filter, setFilter] = useState('all');
    const filteredProjects = filter === 'all' 
      ? projects 
      : projects.filter(p => p.type === filter);

    return (
      <section id="projects" className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">
              Proyectos
            </h2>
            
            <div className="flex justify-center gap-4 mb-12">
              {['all', 'professional', 'personal'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    filter === type
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type === 'all' ? 'Todos' : type === 'professional' ? 'Profesionales' : 'Personales'}
                </button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.length === 0 ? (
                <p className="col-span-2 text-center text-gray-600">No hay proyectos registrados aún.</p>
              ) : (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.thumbnail || 'https://via.placeholder.com/800x600'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          Destacado
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.shortDescription}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map(tech => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span className="text-sm">Código</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm">Ver proyecto</span>
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                            <span className="text-sm">Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Navigation Bar
  const NavigationBar = () => (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-xl text-gray-900"
          >
            {profile?.name?.split(' ')[0] || 'Portfolio'}
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  // Effect para detectar sección activa en scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }));
      
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections.reverse()) {
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">© 2024 {profile?.name || 'Tu Nombre'}. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4">
            {profile?.social && Object.entries(profile.social).map(([platform, url]) => {
              if (!url) return null;
              const Icon = platform === 'linkedin' ? Linkedin : 
                         platform === 'github' ? Github : 
                         platform === 'twitter' ? Twitter : Globe;
              return (
                <a
                  key={platform}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-blue-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;