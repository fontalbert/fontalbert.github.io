import React, { useEffect, useRef, useState } from "react";
import { LanguageContext, SkyContext } from "./lib/contexts";
import content from "./data/content";
import Murmuration from "./components/Murmuration";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhatIDo from "./components/WhatIDo";
import Work from "./components/Work";
import HowIWork from "./components/HowIWork";
import About from "./components/About";
import Experience from "./components/Experience";
import Technology from "./components/Technology";
import Philosophy from "./components/Philosophy";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Fases del día: [progreso de scroll, cielo-arriba, cielo-abajo]
const SKY_STOPS = [
  [0.0, "#f2e0d8", "#fdfbf7"],
  [0.18, "#d8e8f6", "#fdfdfb"],
  [0.42, "#eaf2f8", "#ffffff"],
  [0.6, "#f6e2c4", "#fbeede"],
  [0.78, "#75566a", "#a5685f"],
  [1.0, "#232a40", "#54445c"],
];

// Acento (el sol de noviembre del favicon): ámbar profundo de día y dorado de noche,
// cada uno legible sobre su cielo. [color, halo suave]
const ACCENT = {
  day: ["#a5661a", "rgba(165,102,26,0.18)"],
  night: ["#e0a755", "rgba(224,167,85,0.22)"],
};

// Anclas de la web anterior → secciones actuales
const LEGACY_HASHES = {
  "#inicio": "#home",
  "#sobre-mi": "#about",
  "#tecnologias": "#technology",
  "#experiencia": "#experience",
  "#proyectos": "#work",
  "#contacto": "#contact",
};

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const mix = (a, b, t) => {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  return pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
};
// Luminancia relativa (WCAG) de un color [r, g, b]
const luminance = ([r, g, b]) => {
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

// Castellano por defecto; se recuerda la elección del selector del menú
function detectLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* sin localStorage */
  }
  return "es";
}

const App = () => {
  const [lang, setLang] = useState(detectLang);
  const [dark, setDark] = useState(false);
  const rootRef = useRef(null);
  const darkRef = useRef(false);

  // Idioma: persistencia, atributo lang y metadatos del documento
  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* sin localStorage */
    }
    const t = content[lang];
    document.documentElement.lang = lang;
    document.title = t.seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.seo.description);
  }, [lang]);

  // El cielo avanza de alba a noche según el progreso de scroll
  useEffect(() => {
    const root = rootRef.current;
    let tick = null;
    const apply = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      const s = SKY_STOPS;
      let i = 0;
      while (i < s.length - 2 && p > s[i + 1][0]) i++;
      const t = Math.min(Math.max((p - s[i][0]) / (s[i + 1][0] - s[i][0]), 0), 1);
      const top = mix(s[i][1], s[i + 1][1], t);
      const bottom = mix(s[i][2], s[i + 1][2], t);
      root.style.background = `linear-gradient(rgb(${top.join(",")}), rgb(${bottom.join(",")}))`;
      // Texto claro en cuanto el cielo es lo bastante oscuro para que se lea mejor así
      // (luminancia media < 0.2): evita el tramo de texto claro sobre cielo aún pálido
      const isDark = (luminance(top) + luminance(bottom)) / 2 < 0.2;
      root.style.color = isDark ? "#f1ece3" : "#232936";
      root.style.setProperty("--flock", isDark ? "rgba(241,236,227,0.45)" : "rgba(35,41,54,0.38)");
      const [accent, halo] = isDark ? ACCENT.night : ACCENT.day;
      root.style.setProperty("--accent", accent);
      root.style.setProperty("--accent-soft", halo);
      if (isDark !== darkRef.current) {
        darkRef.current = isDark;
        setDark(isDark);
      }
    };
    const onScroll = () => {
      if (tick) return;
      tick = requestAnimationFrame(() => {
        tick = null;
        apply();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (tick) cancelAnimationFrame(tick);
    };
  }, []);

  // Enlaces antiguos (#contacto, #proyectos...): se reescriben y se desplaza hasta la sección nueva
  useEffect(() => {
    const redirect = () => {
      const target = LEGACY_HASHES[window.location.hash];
      if (!target) return;
      window.history.replaceState(null, "", target);
      const el = document.querySelector(target);
      if (el) el.scrollIntoView();
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <SkyContext.Provider value={dark}>
        <div
          ref={rootRef}
          data-phase={dark ? "night" : "day"}
          className="min-h-screen overflow-x-clip"
          style={{
            background: "linear-gradient(#f2e0d8, #fdfbf7)",
            color: "#232936",
            transition: "color 0.9s ease",
          }}
        >
          <a href="#main" className="skip-link">
            {content[lang].nav.skip}
          </a>
          <Murmuration />
          <div className="relative z-[1]">
            <Nav />
            <main id="main">
              <Hero />
              <WhatIDo />
              <Work />
              <HowIWork />
              <About />
              <Experience />
              <Technology />
              <Philosophy />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </SkyContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
