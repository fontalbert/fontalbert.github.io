import React from "react";
import Reveal from "./Reveal";
import SunPhase from "./SunPhase";

// Sección estándar: cabecera con arco del sol ("Fase — etiqueta") y, opcionalmente, título grande
// y subtítulo. Si no hay título grande, la etiqueta de fase es el h2 de la sección.
export default function Section({
  id,
  phase,
  label,
  title,
  subtitle,
  titleSize = "md",
  center = false,
  className = "",
  children,
}) {
  const headingId = `${id}-heading`;
  const titleClass =
    titleSize === "lg"
      ? "text-[clamp(38px,6.5vw,84px)] tracking-[-0.04em] leading-[1.02]"
      : "text-[clamp(32px,4.6vw,56px)] tracking-[-0.035em] leading-[1.05]";
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`max-w-site mx-auto px-6 pt-[140px] pb-[60px] box-border ${center ? "text-center" : ""} ${className}`}
    >
      <SunPhase
        phase={phase}
        title={label}
        center={center}
        as={title ? "p" : "h2"}
        id={title ? undefined : headingId}
        className={title ? "mb-5" : "mb-14"}
      />
      {title && (
        <Reveal>
          <h2
            id={headingId}
            className={`m-0 font-extrabold [text-wrap:balance] ${titleClass} ${subtitle ? "mb-4" : "mb-14"}`}
          >
            {title}
          </h2>
        </Reveal>
      )}
      {subtitle && (
        <Reveal delay={0.06}>
          <p
            className={`m-0 mb-14 text-[17px] leading-[1.65] opacity-[0.78] max-w-[60ch] [text-wrap:pretty] ${
              center ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
      {children}
    </section>
  );
}
