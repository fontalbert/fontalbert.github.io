import React from "react";
import Reveal from "./Reveal";
import content from "../data/content";

// Cabecera de sección: arco del sol + "Fase — Título". El sol avanza por el arco según
// la fase (0 = alba, última = anochecer). `as` decide la etiqueta: h2 cuando es el título
// de la sección, p cuando solo acompaña a un título grande.
export default function SunPhase({ phase, title, center = false, as: Tag = "h2", id, className = "mb-14" }) {
  const total = content.phases.length;
  const t = total > 1 ? 0.1 + 0.85 * (phase / (total - 1)) : 0.5;
  const a = Math.PI * (1 - t);
  const cx = (22 + Math.cos(a) * 20).toFixed(1);
  const cy = (22 - Math.sin(a) * 20).toFixed(1);
  return (
    <Reveal
      className={`flex items-center gap-3 text-[13px] font-medium tracking-[0.22em] uppercase opacity-70 ${
        center ? "justify-center" : ""
      } ${className}`}
    >
      <svg width="44" height="24" viewBox="0 0 44 24" fill="none" aria-hidden="true" className="shrink-0">
        <path d="M2 22 A20 20 0 0 1 42 22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" fill="none" />
        <circle cx={cx} cy={cy} r="3" fill="currentColor" />
      </svg>
      <Tag id={id} className="m-0 text-[13px] font-medium tracking-[0.22em] uppercase">
        <span aria-hidden="true">{content.phases[phase]} — </span>
        {title}
      </Tag>
    </Reveal>
  );
}
