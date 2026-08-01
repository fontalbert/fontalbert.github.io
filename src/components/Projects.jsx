import React, { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import SunPhase from "./SunPhase";
import Swallow from "./Swallow";
import { useLang, useDark } from "../lib/contexts";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function useMedia(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

// Contenido de texto de un proyecto (compartido entre slider y tarjetas)
function ProjectInfo({ project, index, p, big = false }) {
  return (
    <>
      <p className="m-0 mb-3.5 text-[12px] tracking-[0.24em] opacity-45 font-semibold">
        P.0{index + 1}
      </p>
      <h3
        className={`m-0 mb-4 font-extrabold tracking-[-0.03em] leading-[1.05] ${
          big ? "text-[clamp(32px,4vw,60px)]" : "text-[clamp(28px,3.4vw,44px)]"
        }`}
      >
        {project.title}
      </h3>
      <p
        className={`m-0 mb-[18px] leading-[1.65] opacity-75 max-w-[46ch] [text-wrap:pretty] ${
          big ? "text-[clamp(15px,1.3vw,18px)]" : ""
        }`}
      >
        {project.description}
      </p>
      <p className="m-0 mb-6 text-[13px] tracking-[0.08em] opacity-55">{project.tagLine}</p>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.04em] border-b-[1.5px] border-current pb-1 transition-all hover:gap-4"
        >
          {p.viewProject}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 11 L11 1 M4 1 H11 V8" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </a>
      ) : (
        <p className="m-0 italic text-[14px] opacity-55">{p.internalUse}</p>
      )}
    </>
  );
}

// Arco del sol (mismo motivo que SunPhase): el punto avanza con cada proyecto
function ArcSun({ index, total }) {
  const t = total > 1 ? index / (total - 1) : 0;
  const a = Math.PI * (1 - t);
  const cx = 150 + Math.cos(a) * 132;
  const cy = 84 - Math.sin(a) * 66;
  return (
    <svg width="300" height="92" viewBox="0 0 300 92" fill="none" aria-hidden="true" className="opacity-70">
      <path
        d="M18 84 A 132 66 0 0 1 282 84"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 5"
        fill="none"
      />
      <circle cx={cx} cy={cy} r="3.5" fill="currentColor" />
    </svg>
  );
}

// Cable con golondrinas posadas (las mismas del cable de Contacto): una por
// número de proyecto — P.01 tiene una, P.06 tiene seis.
function WireSwallows({ count, dark }) {
  const W = 260;
  const H = 72;
  const wireY = 46;
  const sag = 7;
  const birds = Array.from({ length: count }, (_, k) => {
    const t = (k + 1) / (count + 1);
    const y = (1 - t) * (1 - t) * wireY + 2 * (1 - t) * t * (wireY + sag) + t * t * wireY;
    return {
      left: t * 100,
      top: y - 21,
      variant: k % 3,
      facing: k % 2 === 0 ? 1 : -1,
      rot: ((k * 37) % 9) - 4,
    };
  });
  return (
    <div className="relative" style={{ width: W, height: H }} aria-hidden="true">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="absolute inset-0">
        <path
          d={`M3 ${wireY} Q ${W / 2} ${wireY + sag} ${W - 3} ${wireY}`}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      {birds.map((b, k) => (
        <span
          key={k}
          className="absolute w-8 h-8 pointer-events-none transition-[filter] duration-[900ms]"
          style={{
            left: `${b.left}%`,
            top: b.top,
            transform: `translateX(-50%) rotate(${b.rot}deg)`,
            filter: dark ? "invert(0.92)" : "none",
          }}
        >
          <Swallow variant={b.variant} facing={b.facing} size={32} />
        </span>
      ))}
    </div>
  );
}

// Slider contenido (escritorio): la sección mantiene el contenedor y la
// cabecera de siempre; solo se fija una caja de ~68vh mientras el scroll
// nativo avanza los proyectos (cada 100vh cambia de slide). Las dos mitades
// se desplazan en direcciones opuestas (double vertical slider) con el
// lenguaje de línea de la web: arco del sol, marco fino y golondrinas.
const STICKY_TOP = 0.16; // fracción de viewport por encima de la caja

function ProjectsSlider({ p }) {
  const items = p.items;
  const N = items.length;
  const dark = useDark();
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const el = wrapRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const idx = clamp(
        Math.round((vh * STICKY_TOP - el.getBoundingClientRect().top) / vh),
        0,
        N - 1
      );
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [N]);

  const goTo = (i) => {
    const el = wrapRef.current;
    if (!el) return;
    const vh = window.innerHeight;
    window.scrollTo({
      top: window.scrollY + el.getBoundingClientRect().top - vh * STICKY_TOP + i * vh,
      behavior: "smooth",
    });
  };

  const slide = { transition: "transform 0.9s cubic-bezier(0.77,0,0.175,1)" };

  return (
    <div className="max-w-[1060px] mx-auto px-6 pt-[140px] box-border">
      <SunPhase phase={4} title={p.title} />
      <div ref={wrapRef} style={{ height: `${N * 100}vh` }}>
        <div className="sticky top-[16vh] h-[68vh] min-h-[440px]">
          <div className="grid grid-cols-2 h-full">
            {/* Mitad izquierda: postal del proyecto (sube al avanzar) */}
            <div className="relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{ ...slide, transform: `translateY(${-active * 100}%)` }}
              >
                {items.map((project, i) => {
                  const media = project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`block w-full h-auto max-h-[34vh] object-contain contrast-[1.02] transition-[filter] duration-700 hover:grayscale-0 ${
                        i === active ? "grayscale-0" : "grayscale"
                      }`}
                    />
                  ) : (
                    <span className="flex items-center justify-center w-full h-[clamp(180px,26vh,260px)] text-[#232936]">
                      <span className="italic text-[19px] opacity-65 px-4 text-center">
                        {p.comingSoon}
                      </span>
                    </span>
                  );
                  return (
                    <div
                      key={project.title}
                      className="absolute inset-x-0 h-full flex items-center justify-center px-[clamp(8px,2vw,28px)]"
                      style={{ top: `${i * 100}%` }}
                    >
                      <div className="w-full max-w-[480px] flex flex-col items-center gap-3">
                        <ArcSun index={i} total={N} />
                        <div className="w-full border-[1.5px] border-current rounded-[22px] overflow-hidden bg-[#f5f2ee]">
                          {project.url ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              {media}
                            </a>
                          ) : (
                            media
                          )}
                        </div>
                        <WireSwallows count={i + 1} dark={dark} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mitad derecha: textos apilados en orden inverso (baja al avanzar) */}
            <div className="relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{ ...slide, transform: `translateY(${-(N - 1 - active) * 100}%)` }}
              >
                {items.map((project, i) => (
                  <div
                    key={project.title}
                    className="absolute inset-x-0 h-full"
                    style={{ top: `${(N - 1 - i) * 100}%` }}
                  >
                    {/* Número fantasma de fondo, solo trazo */}
                    <span
                      aria-hidden="true"
                      className="absolute right-1 top-1/2 -translate-y-1/2 font-extrabold leading-none select-none pointer-events-none"
                      style={{
                        fontSize: "clamp(96px,10vw,168px)",
                        WebkitTextStrokeWidth: "1.5px",
                        WebkitTextStrokeColor: "currentColor",
                        WebkitTextFillColor: "transparent",
                        opacity: 0.16,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <div className="relative z-[1] h-full flex flex-col justify-center pl-[clamp(20px,3.5vw,52px)] pr-[clamp(28px,4vw,56px)]">
                      <ProjectInfo project={project} index={i} p={p} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navegación por puntos */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
            {items.map((project, i) => (
              <button
                key={project.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`P.0${i + 1} — ${project.title}`}
                aria-current={i === active}
                className={`w-2.5 h-2.5 rounded-full border-[1.5px] border-current transition-all duration-300 ${
                  i === active ? "bg-current scale-125" : "opacity-40 hover:opacity-75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Tarjetas apiladas (móvil y prefers-reduced-motion)
function ProjectCards({ p }) {
  return (
    <div className="max-w-[1060px] mx-auto px-6 pt-[140px] pb-[60px] box-border">
      <SunPhase phase={4} title={p.title} />
      <div className="flex flex-col gap-[clamp(70px,9vw,110px)]">
        {p.items.map((project, i) => {
          const imgFirst = i % 2 === 0;
          const media = project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="block w-full max-w-full h-[clamp(240px,30vw,400px)] object-contain grayscale contrast-[1.02] transition-[filter,transform] duration-700 hover:grayscale-0 hover:scale-[1.025]"
            />
          ) : (
            <span
              className="flex items-center justify-center w-full h-[clamp(240px,30vw,400px)]"
              style={{
                background:
                  "repeating-linear-gradient(-45deg, rgba(128,128,128,0.22) 0 1px, transparent 1px 14px)",
              }}
            >
              <span className="italic text-[19px] opacity-65 px-4 text-center">
                {project.url ? p.comingSoon : p.internalUse}
              </span>
            </span>
          );
          return (
            <Reveal key={project.title}>
              <article
                className={`grid md:grid-cols-2 gap-8 md:gap-[clamp(28px,4vw,64px)] items-center ${
                  imgFirst ? "" : "md:[direction:rtl]"
                }`}
              >
                <div className="md:[direction:ltr] min-w-0 border-[1.5px] border-current rounded-[22px] overflow-hidden bg-[#f5f2ee]">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                      {media}
                    </a>
                  ) : (
                    media
                  )}
                </div>
                <div className="md:[direction:ltr] min-w-0">
                  <ProjectInfo project={project} index={i} p={p} />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();
  const p = t.projects;
  const desktop = useMedia("(min-width: 768px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  return (
    <section id="proyectos">
      {desktop && !reduced ? <ProjectsSlider p={p} /> : <ProjectCards p={p} />}
    </section>
  );
}
