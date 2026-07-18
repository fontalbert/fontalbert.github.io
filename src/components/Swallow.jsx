import React from "react";

// Siluetas de golondrina dibujadas inline (viewBox 40x40, mirando a la derecha).
// Al ser SVG inline podemos animar las alas con CSS cuando el pájaro vuela.
const BODY = "#1b2735"; // azul pizarra oscuro, encaja con el fondo azulado
const WING = "#0e1620";
const CHEST = "#eef3f8";

// --- Posturas posadas en el cable (cola forcada colgando bajo el cable) ---
const PERCHED = [
  // Pose 1: erguida, atenta
  <g key="p1">
    <path d="M15 24 L3 36 L11 27 L6 39 L14 28 Z" fill={BODY} />
    <path
      d="M14 27 C12 22 14 15 19 11 C21 6 27 4 30 7 C33 9 33 12 31 14 C33 18 30 23 25 27 C21 30 16 30 14 27 Z"
      fill={BODY}
    />
    <path d="M31 9 L37 10.5 L31 12 Z" fill={BODY} />
    <path d="M19 25 C17 21 19 16 23 14 C25 18 24 23 21 26 Z" fill={CHEST} opacity="0.92" />
    <path d="M16 22 C18 16 24 12 29 13 C27 18 22 23 17 25 Z" fill={WING} opacity="0.55" />
    <circle cx="28" cy="9" r="0.9" fill="#fff" opacity="0.9" />
  </g>,
  // Pose 2: compacta, cabeza baja (descansando)
  <g key="p2">
    <path d="M16 25 L6 37 L12 27 L9 39 L16 29 Z" fill={BODY} />
    <path
      d="M15 27 C13 22 14 17 18 13 C20 9 26 7 29 10 C31 12 31 15 29 16 C31 20 28 24 24 27 C20 30 16 30 15 27 Z"
      fill={BODY}
    />
    <path d="M29 12 L35 13.5 L29 15 Z" fill={BODY} />
    <path d="M19 25 C18 21 19 18 22 16 C24 19 23 23 21 26 Z" fill={CHEST} opacity="0.92" />
    <path d="M17 23 C19 18 24 15 28 16 C26 20 22 24 18 25 Z" fill={WING} opacity="0.55" />
    <circle cx="27" cy="11.5" r="0.9" fill="#fff" opacity="0.9" />
  </g>,
  // Pose 3: esbelta, cola más vertical
  <g key="p3">
    <path d="M17 25 L10 39 L15 28 L14 40 L18 28 Z" fill={BODY} />
    <path
      d="M15 26 C13 20 16 13 21 10 C22 5 28 4 31 7 C33 9 32 12 30 13 C32 18 28 23 24 27 C20 30 16 29 15 26 Z"
      fill={BODY}
    />
    <path d="M31 8.5 L37 10 L31 11.5 Z" fill={BODY} />
    <path d="M19 24 C18 20 20 15 23 13 C25 17 24 22 21 25 Z" fill={CHEST} opacity="0.92" />
    <path d="M17 21 C19 15 25 12 29 13 C27 18 22 22 18 24 Z" fill={WING} opacity="0.55" />
    <circle cx="28.5" cy="8.5" r="0.9" fill="#fff" opacity="0.9" />
  </g>,
];

// --- Postura de vuelo: las alas son grupos separados que aletean por CSS ---
const FLIGHT = (
  <g>
    {/* Cola forcada, arrastrando hacia atrás */}
    <path d="M10 19 L1 12 L8 20 L1 27 L10 22 Z" fill={BODY} />
    {/* Ala lejana (detrás del cuerpo) */}
    <g className="swallow-wing-far" style={{ transformOrigin: "19px 20px" }}>
      <path d="M19 20 C23 13 29 8 35 6 C31 13 26 18 20 21 Z" fill={WING} opacity="0.6" />
    </g>
    {/* Cuerpo en dardo, pico integrado en la punta */}
    <path
      d="M8 20 C13 17 20 16 26 17 C31 17.5 35 19 37 20 C35 21 31 22.5 26 23 C20 24 13 23 8 20 Z"
      fill={BODY}
    />
    <path d="M14 21.5 C18 22.5 23 22.5 27 21.8 C23 23.2 18 23.2 14 21.5 Z" fill={CHEST} opacity="0.7" />
    <circle cx="32" cy="19" r="0.8" fill="#fff" opacity="0.9" />
    {/* Ala cercana (delante), la que más se ve aletear */}
    <g className="swallow-wing-near" style={{ transformOrigin: "18px 20px" }}>
      <path d="M18 20 C21 12 27 6 34 4 C30 12 25 18 19 22 Z" fill={BODY} />
    </g>
  </g>
);

export default function Swallow({ variant = 0, flying = false, facing = 1, flapDuration = 0.2, size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible", "--flap": `${flapDuration}s` }}
    >
      <g transform={facing === -1 ? "translate(40 0) scale(-1 1)" : undefined}>
        {flying ? FLIGHT : PERCHED[variant % PERCHED.length]}
      </g>
    </svg>
  );
}
