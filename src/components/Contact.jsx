import React, { useRef } from "react";
import Reveal from "./Reveal";
import SunPhase from "./SunPhase";
import Swallow from "./Swallow";
import { useLang, useDark } from "../lib/contexts";

const WIRE_SLOTS = 26;

function generatePerched() {
  // Distribución con huecos aleatorios, como el cable de la web original
  return Array.from({ length: WIRE_SLOTS }, (_, i) => i)
    .filter(() => Math.random() < 0.55)
    .map((slot) => ({
      left: `${(slot * 100) / (WIRE_SLOTS - 1) + (Math.random() - 0.5) * 1.6}%`,
      variant: Math.floor(Math.random() * 3),
      facing: Math.random() < 0.5 ? -1 : 1,
      rotation: (Math.random() - 0.5) * 10,
    }));
}

export default function Contact() {
  const { t } = useLang();
  const dark = useDark();
  const c = t.contact;
  const perched = useRef(generatePerched());

  return (
    <section id="contacto" className="max-w-[1060px] mx-auto px-6 pt-[150px] pb-10 box-border text-center">
      <SunPhase phase={5} title={c.title} center />
      <Reveal>
        <h2 className="text-[clamp(38px,6.5vw,84px)] font-extrabold tracking-[-0.04em] leading-[1.02] m-0 mb-6">
          {c.headlineA}
          <br />
          <span className="font-light">
            {c.headlineB}
            <em className="italic font-normal">{c.headlineEm}</em>.
          </span>
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="max-w-[480px] mx-auto mb-10 leading-[1.65] opacity-[0.72] [text-wrap:pretty]">
          {c.description}
        </p>
      </Reveal>
      <Reveal delay={0.14} className="flex gap-3.5 flex-wrap justify-center mb-7">
        <a
          href="mailto:albert.font@outlook.com"
          className="px-8 py-[15px] rounded-full font-semibold text-[15.5px] transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5"
          style={{
            background: dark ? "#f1ece3" : "#232936",
            color: dark ? "#232936" : "#fdfbf7",
          }}
        >
          albert.font@outlook.com
        </a>
        <a
          href="/albert-font-cv.pdf"
          download="albert-font-cv.pdf"
          className="border-[1.5px] border-current px-8 py-[13.5px] rounded-full font-semibold text-[15.5px] hover:opacity-70 transition-opacity"
        >
          {c.cv}
        </a>
      </Reveal>
      <Reveal delay={0.2} className="flex gap-6 justify-center text-[14px] font-semibold">
        <a
          href="https://www.linkedin.com/in/albertfontdev/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-[1.5px] border-current pb-0.5 hover:opacity-70 transition-opacity"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/fontalbert"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b-[1.5px] border-current pb-0.5 hover:opacity-70 transition-opacity"
        >
          GitHub
        </a>
      </Reveal>

      {/* Las golondrinas vuelven al cable */}
      <div className="relative h-[130px] mt-[90px]" aria-hidden="true">
        <img
          src="/wire.svg"
          alt=""
          draggable={false}
          className="absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-80 transition-[filter] duration-[900ms]"
          style={{ filter: dark ? "invert(0.92)" : "none" }}
        />
        {perched.current.map((bird, i) => (
          <span
            key={i}
            className="absolute w-[34px] h-[34px] pointer-events-none transition-[filter] duration-[900ms]"
            style={{
              left: bird.left,
              top: "30%",
              transform: `rotate(${bird.rotation}deg)`,
              filter: dark ? "invert(0.92)" : "none",
            }}
          >
            <Swallow variant={bird.variant} facing={bird.facing} size={34} />
          </span>
        ))}
        <p className="absolute left-1/2 -bottom-3.5 -translate-x-1/2 m-0 text-[12px] italic opacity-55 whitespace-nowrap">
          {c.wireCaption}
        </p>
      </div>
    </section>
  );
}
