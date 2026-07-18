import React, { useState } from "react";
import { useLang } from "../lib/contexts";

const LANGS = ["es", "en"];

function LangToggle({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center gap-1 text-[12px] font-semibold tracking-[0.08em] ${className}`}>
      {LANGS.map((code, i) => (
        <React.Fragment key={code}>
          {i > 0 && <span className="opacity-40">/</span>}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`uppercase px-1 py-0.5 transition-opacity ${
              lang === code ? "opacity-100 border-b-[1.5px] border-current" : "opacity-45 hover:opacity-80"
            }`}
          >
            {code}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Nav() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between py-5 px-6 md:px-12">
        <a href="#inicio" className="flex items-center gap-2.5 font-bold text-[17px] tracking-[-0.01em]">
          <span className="flex flex-col leading-[1.05]">
            <span>Albert Font</span>
            <span className="text-[10px] font-medium tracking-[0.24em] uppercase opacity-55">
              {t.nav.role}
            </span>
          </span>
        </a>

        {/* Enlaces escritorio */}
        <div className="hidden md:flex items-center gap-7 text-[14px] font-medium">
          {t.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="hover:opacity-70 transition-opacity">
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="border-[1.5px] border-current rounded-full px-[18px] py-2 hover:opacity-70 transition-opacity"
          >
            {t.nav.contact}
          </a>
          <LangToggle />
        </div>

        {/* Hamburguesa móvil */}
        <div className="md:hidden flex items-center gap-4">
          <LangToggle />
          <button
            type="button"
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            aria-label={menuOpen ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-transform ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span className={`block w-6 h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`block w-6 h-0.5 bg-current transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil (fondo fijo para ser legible en cualquier fase del cielo) */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-1 mx-4 px-5 py-4 rounded-2xl bg-[rgba(253,251,247,0.95)] text-[#232936] font-medium shadow-lg backdrop-blur">
          {[...t.nav.links, { href: "#contacto", label: t.nav.contact }].map((link) => (
            <li key={link.href}>
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
