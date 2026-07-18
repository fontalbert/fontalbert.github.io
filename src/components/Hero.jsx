import React from "react";
import Reveal from "./Reveal";
import { useLang } from "../lib/contexts";

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-[120px] pb-20 box-border relative"
    >
      <Reveal className="flex items-center gap-3 mb-8 text-[13px] font-medium tracking-[0.22em] uppercase opacity-60">
        <svg width="44" height="24" viewBox="0 0 44 24" fill="none" aria-hidden="true">
          <path
            d="M2 22 A20 20 0 0 1 42 22"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
            fill="none"
          />
          <circle cx="6" cy="14" r="3" fill="currentColor" />
        </svg>
        {t.phases[0]} — {h.eyebrow}
      </Reveal>
      <h1 className="text-[clamp(56px,9.5vw,130px)] font-extrabold tracking-[-0.045em] leading-[0.95] m-0 mb-7">
        <Reveal className="block">{h.titleA}</Reveal>
        <Reveal
          className="block font-light tracking-[-0.03em] text-[clamp(30px,4.6vw,64px)] leading-[1.15] mt-2"
          delay={0.1}
        >
          {h.titleB}
          <em className="italic font-normal">{h.titleEm}</em>
          {h.titleC}
        </Reveal>
      </h1>
      <Reveal delay={0.15}>
        <p className="max-w-[560px] text-[clamp(17px,2vw,20px)] leading-[1.65] m-0 mb-10 opacity-[0.78] [text-wrap:pretty]">
          {h.description}
        </p>
      </Reveal>
      <Reveal delay={0.2} className="flex gap-3.5 flex-wrap justify-center mb-6">
        <a
          href="#proyectos"
          className="bg-[#232936] text-[#fdfbf7] px-[30px] py-3.5 rounded-full font-semibold text-[15px] transition-transform hover:-translate-y-0.5"
        >
          {h.ctaProjects}
        </a>
        <a
          href="/albert-font-cv.pdf"
          download="albert-font-cv.pdf"
          className="border-[1.5px] border-current px-[30px] py-3 rounded-full font-semibold text-[15px] hover:opacity-70 transition-opacity"
        >
          {h.ctaCv}
        </a>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="m-0 text-[13px] tracking-[0.16em] uppercase opacity-50">{h.stack}</p>
      </Reveal>
      <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 w-max max-w-[90vw]">
        <p className="m-0 text-[12.5px] italic opacity-55 text-center">{h.gameTip}</p>
        <p className="m-0 text-[12px] tracking-[0.2em] uppercase opacity-45">{h.scrollHint}</p>
      </div>
    </section>
  );
}
