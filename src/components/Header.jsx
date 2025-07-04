import React from "react";

const Header = () => (
  <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur z-50 shadow-sm">
    <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
      <span className="font-bold text-xl text-gray-800 flex items-center gap-2">
        <img src="/swallow-logo.webp" alt="Swallow Development" width="35" />
        <span>Developer</span>
      </span>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li><a href="#inicio" className="hover:text-blue-600 transition-colors">Inicio</a></li>
        <li><a href="#tecnologias" className="hover:text-blue-600 transition-colors">Tecnologías</a></li>
        <li><a href="#experiencia" className="hover:text-blue-600 transition-colors">Experiencia</a></li>
        <li><a href="#proyectos" className="hover:text-blue-600 transition-colors">Proyectos</a></li>
      </ul>
    </nav>
  </header>
);

export default Header; 