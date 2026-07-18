import React, { useEffect, useRef, useState } from "react";
import { LanguageContext, SkyContext } from "./lib/contexts";
import Murmuration from "./components/Murmuration";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";

// Fases del día: [progreso de scroll, cielo-arriba, cielo-abajo]
const SKY_STOPS = [
  [0.0, "#f2e0d8", "#fdfbf7"],
  [0.18, "#d8e8f6", "#fdfdfb"],
  [0.42, "#eaf2f8", "#ffffff"],
  [0.6, "#f6e2c4", "#fbeede"],
  [0.78, "#75566a", "#a5685f"],
  [1.0, "#232a40", "#54445c"],
];

const hexMix = (a, b, t) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
};

function detectLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* sin localStorage */
  }
  return (navigator.language || "es").startsWith("es") ? "es" : "en";
}

const App = () => {
  const [lang, setLang] = useState(detectLang);
  const [dark, setDark] = useState(false);
  const rootRef = useRef(null);
  const darkRef = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* sin localStorage */
    }
    document.documentElement.lang = lang;
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
      root.style.background = `linear-gradient(${hexMix(s[i][1], s[i + 1][1], t)}, ${hexMix(
        s[i][2],
        s[i + 1][2],
        t
      )})`;
      const isDark = p > 0.66;
      root.style.color = isDark ? "#f1ece3" : "#232936";
      root.style.setProperty("--flock", isDark ? "rgba(241,236,227,0.45)" : "rgba(35,41,54,0.38)");
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

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <SkyContext.Provider value={dark}>
        <div
          ref={rootRef}
          className="min-h-screen overflow-x-clip"
          style={{
            background: "linear-gradient(#f2e0d8, #fdfbf7)",
            color: "#232936",
            transition: "color 0.9s ease",
          }}
        >
          <Murmuration />
          <div className="relative z-[1]">
            <Nav />
            <main>
              <Hero />
              <AboutSection />
              <Technologies />
              <Experience />
              <Projects />
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
