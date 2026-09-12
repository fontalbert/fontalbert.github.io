import React from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import content from "../data/content";

// Declaración breve en la caja de trazo fino (misma pieza que el antiguo destacado de IA)
export default function Philosophy() {
  const ph = content.philosophy;
  return (
    <Section id="philosophy" phase={7} label={ph.label}>
      <Reveal className="border-[1.5px] border-current rounded-box p-[clamp(28px,4vw,48px)]">
        <div className="grid md:grid-cols-[1.25fr_1fr] gap-8 md:gap-12 items-center">
          <p className="m-0 text-[clamp(28px,4vw,46px)] font-extrabold tracking-[-0.03em] leading-[1.08] [text-wrap:balance]">
            {ph.statement}
          </p>
          <p className="m-0 text-[17px] leading-[1.65] opacity-[0.78] [text-wrap:pretty]">{ph.description}</p>
        </div>
      </Reveal>
    </Section>
  );
}
