import React from "react";
import Reveal from "./Reveal";
import SunPhase from "./SunPhase";
import { useLang } from "../lib/contexts";

export default function AboutSection() {
  const { t } = useLang();
  const a = t.about;
  // statementParts alterna texto normal (índices pares) y palabras subrayadas (impares)
  return (
    <section id="sobre-mi" className="max-w-[1060px] mx-auto px-6 pt-[140px] pb-[60px] box-border">
      <SunPhase phase={1} title={a.title} />
      <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-[clamp(32px,5vw,72px)] items-start">
        <Reveal>
          <img
            src="/albert-font_avatar.jpg"
            alt="Albert Font Sala"
            className="w-[clamp(120px,16vw,180px)] h-[clamp(120px,16vw,180px)] object-cover rounded-full border-[1.5px] border-current p-[7px] box-border"
          />
        </Reveal>
        <div>
          <Reveal>
            <p className="text-[clamp(22px,3vw,32px)] font-medium tracking-[-0.02em] leading-[1.4] m-0 mb-8 [text-wrap:pretty]">
              {a.statementParts.map((part, i) =>
                i % 2 === 1 ? (
                  <span key={i} className="border-b-2 border-current">
                    {part}
                  </span>
                ) : (
                  <React.Fragment key={i}>{part}</React.Fragment>
                )
              )}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[17px] leading-[1.7] opacity-75 m-0 mb-6 max-w-[60ch] [text-wrap:pretty]">
              {a.philosophy}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="m-0 text-[14px] font-semibold tracking-[0.04em]">
              <a
                href="mailto:albert.font@outlook.com"
                className="border-b-[1.5px] border-current pb-0.5 hover:opacity-70 transition-opacity"
              >
                albert.font@outlook.com
              </a>
              <span className="opacity-55 font-normal"> — {a.location}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
