import React from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import content from "../data/content";

export default function About() {
  const a = content.about;
  const [statement, ...rest] = a.paragraphs;
  return (
    <Section id="about" phase={4} label={a.label}>
      <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-[clamp(32px,5vw,72px)] items-start">
        <Reveal>
          <img
            src={a.photo.src}
            alt={a.photo.alt}
            width={a.photo.width}
            height={a.photo.height}
            loading="lazy"
            decoding="async"
            className="w-[clamp(120px,16vw,180px)] h-[clamp(120px,16vw,180px)] object-cover rounded-full border-[1.5px] border-current p-[7px] box-border"
          />
        </Reveal>
        <div>
          <Reveal>
            <p className="text-[clamp(22px,3vw,32px)] font-medium tracking-[-0.02em] leading-[1.4] m-0 mb-8 [text-wrap:pretty]">
              {statement}
            </p>
          </Reveal>
          {rest.map((paragraph, i) => (
            <Reveal key={i} delay={0.06 + i * 0.04}>
              <p className="text-[17px] leading-[1.7] opacity-[0.78] m-0 mb-5 max-w-[62ch] [text-wrap:pretty]">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="m-0 mt-2 text-[14px] font-semibold tracking-[0.04em] opacity-85">{a.location}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
