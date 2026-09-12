import React from "react";

// Visuales abstractos de trazo fino (sin capturas ficticias) para los proyectos sin imagen.
// platform: plataforma web (barra lateral, paneles, tabla). legacy: sistema antiguo conectado a uno moderno.
const PLATFORM = (
  <g>
    <rect x="16" y="20" width="288" height="160" rx="12" />
    <line x1="16" y1="48" x2="304" y2="48" />
    <circle cx="32" cy="34" r="3" fill="currentColor" stroke="none" />
    <circle cx="44" cy="34" r="3" fill="currentColor" stroke="none" opacity="0.6" />
    <circle cx="56" cy="34" r="3" fill="currentColor" stroke="none" opacity="0.35" />
    <line x1="88" y1="48" x2="88" y2="180" />
    <rect x="30" y="66" width="44" height="5" rx="2.5" fill="currentColor" stroke="none" opacity="0.7" />
    <rect x="30" y="82" width="36" height="5" rx="2.5" fill="currentColor" stroke="none" opacity="0.4" />
    <rect x="30" y="98" width="40" height="5" rx="2.5" fill="currentColor" stroke="none" opacity="0.4" />
    <rect x="30" y="114" width="30" height="5" rx="2.5" fill="currentColor" stroke="none" opacity="0.4" />
    <rect x="104" y="64" width="86" height="46" rx="8" />
    <rect x="202" y="64" width="86" height="46" rx="8" />
    <rect x="114" y="92" width="7" height="10" fill="currentColor" stroke="none" opacity="0.55" />
    <rect x="126" y="84" width="7" height="18" fill="currentColor" stroke="none" opacity="0.55" />
    <rect x="138" y="76" width="7" height="26" fill="var(--accent)" stroke="none" />
    <rect x="150" y="88" width="7" height="14" fill="currentColor" stroke="none" opacity="0.55" />
    <path d="M212 96 L228 84 L244 90 L262 74 L278 80" strokeWidth="1.5" />
    <line x1="104" y1="128" x2="288" y2="128" strokeDasharray="2 5" />
    <line x1="104" y1="146" x2="288" y2="146" strokeDasharray="2 5" />
    <line x1="104" y1="164" x2="288" y2="164" strokeDasharray="2 5" />
    <rect x="110" y="133" width="50" height="5" rx="2.5" fill="currentColor" stroke="none" opacity="0.5" />
    <rect x="110" y="151" width="70" height="5" rx="2.5" fill="currentColor" stroke="none" opacity="0.5" />
    <rect x="240" y="133" width="40" height="5" rx="2.5" fill="currentColor" stroke="none" opacity="0.5" />
    <rect x="250" y="151" width="30" height="5" rx="2.5" fill="currentColor" stroke="none" opacity="0.5" />
  </g>
);

const LEGACY = (
  <g>
    {/* Sistema existente: bloques rígidos */}
    <rect x="20" y="40" width="112" height="120" rx="3" />
    <line x1="20" y1="64" x2="132" y2="64" />
    <line x1="20" y1="88" x2="132" y2="88" strokeDasharray="2 5" />
    <line x1="20" y1="112" x2="132" y2="112" strokeDasharray="2 5" />
    <line x1="20" y1="136" x2="132" y2="136" strokeDasharray="2 5" />
    <line x1="58" y1="64" x2="58" y2="160" strokeDasharray="2 5" />
    <line x1="96" y1="64" x2="96" y2="160" strokeDasharray="2 5" />
    <rect x="28" y="48" width="30" height="6" rx="1" fill="currentColor" stroke="none" opacity="0.7" />
    <rect x="28" y="72" width="22" height="6" rx="1" fill="currentColor" stroke="none" opacity="0.4" />
    <rect x="66" y="96" width="22" height="6" rx="1" fill="currentColor" stroke="none" opacity="0.4" />
    <rect x="104" y="120" width="20" height="6" rx="1" fill="currentColor" stroke="none" opacity="0.4" />
    <rect x="28" y="144" width="22" height="6" rx="1" fill="currentColor" stroke="none" opacity="0.4" />
    {/* Puente: integración */}
    <path d="M132 100 C 150 100, 154 100, 172 100" strokeDasharray="2 5" />
    <path d="M172 100 C 186 100, 190 100, 200 100" strokeDasharray="2 5" />
    <circle cx="172" cy="100" r="5.5" fill="var(--accent)" stroke="none" />
    <circle cx="172" cy="100" r="11" strokeDasharray="2 4" />
    {/* Sistema moderno: paneles redondeados */}
    <rect x="200" y="52" width="100" height="96" rx="14" />
    <rect x="214" y="68" width="60" height="7" rx="3.5" fill="currentColor" stroke="none" opacity="0.7" />
    <rect x="214" y="86" width="72" height="7" rx="3.5" fill="currentColor" stroke="none" opacity="0.4" />
    <rect x="214" y="104" width="50" height="7" rx="3.5" fill="currentColor" stroke="none" opacity="0.4" />
    <rect x="214" y="122" width="36" height="12" rx="6" />
    {/* Conexiones que se conservan */}
    <path d="M250 148 C 250 170, 200 170, 76 170 L 76 160" strokeDasharray="2 5" />
  </g>
);

const VARIANTS = { platform: PLATFORM, legacy: LEGACY };

export default function AbstractVisual({ variant = "platform" }) {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block w-full h-auto"
      aria-hidden="true"
      focusable="false"
    >
      {VARIANTS[variant] || PLATFORM}
    </svg>
  );
}
