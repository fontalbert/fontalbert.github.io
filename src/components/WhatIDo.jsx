import React from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import Tag from "./ui/Tag";
import content from "../data/content";

// Cuatro áreas de servicio en cajas de trazo fino
export default function WhatIDo() {
  const s = content.services;
  return (
    <Section id="what-i-do" phase={1} label={s.label} title={s.title}>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {s.items.map((item, i) => (
          <Reveal
            as="article"
            key={item.title}
            delay={(i % 2) * 0.08}
            className="border-[1.5px] border-current rounded-box p-[clamp(24px,3.5vw,40px)] flex flex-col gap-4 transition-transform duration-500 hover:-translate-y-1"
          >
            <p className="m-0 text-[12px] tracking-[0.24em] font-semibold opacity-70" aria-hidden="true">
              0{i + 1}
            </p>
            <h3 className="m-0 text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.02em] leading-[1.1] [text-wrap:balance]">
              {item.title}
            </h3>
            <p className="m-0 leading-[1.65] opacity-[0.78] [text-wrap:pretty]">{item.description}</p>
            <ul className="list-none m-0 p-0 mt-auto pt-2 flex flex-wrap gap-2" aria-label={`Examples — ${item.title}`}>
              {item.examples.map((example) => (
                <Tag as="li" key={example}>
                  {example}
                </Tag>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
