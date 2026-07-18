import React from "react";
import Reveal from "./Reveal";
import SunPhase from "./SunPhase";
import { useLang } from "../lib/contexts";

const MAX_CELLS = 18;

// Cuadrícula de la Opción B: 1 celda = 1 año de experiencia
function YearCells({ years, recentLabel }) {
  if (years == null) {
    return <span className="text-[12px] italic opacity-50 whitespace-nowrap">{recentLabel}</span>;
  }
  return (
    <span className="flex gap-[3px] flex-wrap" aria-hidden="true">
      {Array.from({ length: MAX_CELLS }, (_, i) => (
        <span
          key={i}
          className="w-[9px] h-[9px] rounded-[2px] border border-current box-border shrink-0"
          style={{
            background: i < years ? "currentColor" : "transparent",
            opacity: i < years ? 0.8 : 0.22,
          }}
        />
      ))}
    </span>
  );
}

export default function Technologies() {
  const { t } = useLang();
  const tech = t.tech;
  const ia = t.ia;
  return (
    <section id="tecnologias" className="max-w-[1060px] mx-auto px-6 pt-[140px] pb-[60px] box-border">
      <SunPhase phase={2} title={tech.title} />

      {/* Destacado IA */}
      <Reveal className="border-[1.5px] border-current rounded-[26px] p-[clamp(28px,4vw,48px)] mb-16 relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <h3 className="m-0 text-[clamp(30px,4vw,46px)] font-extrabold tracking-[-0.03em] leading-[1.05]">
            {ia.titleA}
            <span className="font-light">{ia.titleB}</span>
          </h3>
          <div>
            <p className="m-0 mb-[18px] leading-[1.65] opacity-[0.78] [text-wrap:pretty]">{ia.description}</p>
            <div className="flex flex-wrap gap-[9px]">
              {ia.pills.map((pill) => (
                <span
                  key={pill}
                  className="border-[1.5px] border-current opacity-85 px-4 py-[7px] rounded-full text-[13.5px] font-medium"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <p className="text-[12px] tracking-[0.18em] uppercase opacity-45 mb-8">{tech.cellsNote}</p>

      <div className="grid md:grid-cols-2 gap-y-12 gap-x-[clamp(40px,6vw,90px)]">
        {tech.categories.map((cat) => (
          <Reveal key={cat.name}>
            <h4 className="m-0 mb-5 text-[13px] tracking-[0.2em] uppercase opacity-55 font-semibold">
              {cat.name}
            </h4>
            <div className="flex flex-col">
              {cat.items.map(([name, years]) => (
                <div
                  key={name}
                  className="grid grid-cols-[minmax(96px,120px)_1fr_auto] items-center gap-3.5 py-[11px] border-b border-[rgba(128,128,128,0.25)]"
                >
                  <span className="text-[16px] font-semibold tracking-[-0.01em]">{name}</span>
                  <YearCells years={years} recentLabel={tech.recent} />
                  <span className="text-[13px] opacity-60 tabular-nums whitespace-nowrap text-right">
                    {years == null ? "—" : tech.yearLabel(years)}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
