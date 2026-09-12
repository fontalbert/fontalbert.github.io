import React, { useEffect, useState } from "react";
import content from "../data/content";

export default function Nav() {
  const n = content.nav;
  const [menuOpen, setMenuOpen] = useState(false);

  // Escape cierra el menú móvil
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40" aria-label="Main">
      <div className="flex items-center justify-between py-5 px-6 md:px-12">
        <a href="#home" className="flex items-center gap-2.5 font-bold text-[17px] tracking-[-0.01em]">
          <span className="flex flex-col leading-[1.05]">
            <span>{n.name}</span>
            <span className="text-[10px] font-medium tracking-[0.24em] uppercase opacity-75">{n.role}</span>
          </span>
        </a>

        {/* Enlaces escritorio */}
        <div className="hidden md:flex items-center gap-7 text-[14px] font-medium">
          {n.links.map((link) => (
            <a key={link.href} href={link.href} className="hover:opacity-70 transition-opacity">
              {link.label}
            </a>
          ))}
          <a
            href={n.cta.href}
            className="border-[1.5px] border-current rounded-full px-[18px] py-2 hover:opacity-70 transition-opacity"
          >
            {n.cta.label}
          </a>
        </div>

        {/* Hamburguesa móvil */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5"
          aria-label={menuOpen ? n.menuClose : n.menuOpen}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span className={`block w-6 h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span
            className={`block w-6 h-0.5 bg-current transition-transform ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Menú desplegable móvil (fondo fijo para ser legible en cualquier fase del cielo) */}
      {menuOpen && (
        <ul
          id="mobile-menu"
          className="md:hidden flex flex-col gap-1 mx-4 px-5 py-4 rounded-2xl bg-[rgba(253,251,247,0.95)] text-ink font-medium shadow-lg backdrop-blur list-none m-0"
        >
          {[...n.links, n.cta].map((link) => (
            <li key={link.href + link.label}>
              <a
                href={link.href}
                className="block py-2 hover:opacity-70 transition-opacity"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
