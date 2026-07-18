import React, { useState } from "react";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#tecnologias", label: "Tecnologías" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos", label: "Proyectos" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur z-50 shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <a href="#inicio" className="font-bold text-xl text-gray-800 flex items-center gap-2">
          <img src="/swallow-logo.webp" alt="Swallow Development" width="35" height="35" />
          <span className="hidden sm:inline">Developer</span>
        </a>

        {/* Navegación escritorio */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-blue-600 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa (móvil) */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-transform ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-1 pb-4 px-6 bg-white/95 text-gray-700 font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
