import React from "react";
import Reveal from "./Reveal";
import { useLang } from "../lib/contexts";

// Posición del sol sobre el arco para cada fase del día (índice 0..5)
const SUN = [
  [6, 14],
  [10.5, 5.6],
  [22, 2.5],
  [32, 4.7],
  [39.3, 12],
  [41.8, 19.2],
];

// Cabecera de sección: arco del sol + "Fase — Título"
export default function SunPhase({ phase, title, center = false }) {
  const { t } = useLang();
  const [cx, cy] = SUN[phase];
  return (
    <Reveal
      className={`flex items-center gap-3 mb-14 text-[13px] font-medium tracking-[0.22em] uppercase opacity-60 ${
        center ? "justify-center" : ""
      }`}
    >
      <svg width="44" height="24" viewBox="0 0 44 24" fill="none" aria-hidden="true">
        <path
          d="M2 22 A20 20 0 0 1 42 22"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 4"
          fill="none"
        />
        <circle cx={cx} cy={cy} r="3" fill="currentColor" />
      </svg>
      <span>
        {t.phases[phase]} — {title}
      </span>
    </Reveal>
  );
}
