import React from "react";
import Reveal from "./Reveal";
import SunPhase from "./SunPhase";
import { useLang } from "../lib/contexts";

export default function Experience() {
  const { t } = useLang();
  const exp = t.experience;
  return (
    <section id="experiencia" className="max-w-[1060px] mx-auto px-6 pt-[140px] pb-[60px] box-border">
      <SunPhase phase={3} title={exp.title} />
      <div className="relative pl-[clamp(28px,4vw,44px)]">
        {/* Línea vertical de la cronología */}
        <span className="absolute left-2 top-2 bottom-2 w-px bg-current opacity-30" aria-hidden="true" />
        <div className="flex flex-col gap-16">
          {exp.items.map((item) => (
            <Reveal key={item.period + item.company} className="relative">
              <span
                className="absolute top-[7px] w-2.5 h-2.5 rounded-full bg-current"
                style={{ left: "calc(8px - clamp(28px, 4vw, 44px) - 4.5px)" }}
                aria-hidden="true"
              />
              <p className="m-0 mb-1.5 text-[13px] font-semibold tracking-[0.18em] uppercase opacity-55">
                {item.period} — {item.company}
              </p>
              <h3 className="m-0 mb-3 text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.025em]">
                {item.title}
              </h3>
              <p className="m-0 mb-4 leading-[1.7] opacity-[0.78] max-w-[68ch] [text-wrap:pretty]">
                {item.description}
              </p>
              {item.highlights.length > 0 && (
                <ul className="list-none m-0 mb-4 p-0 flex flex-col gap-2 max-w-[68ch]">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="leading-[1.6] opacity-[0.68] text-[15.5px] pl-5 relative">
                      <span
                        className="absolute left-0 top-[0.68em] w-[11px] h-[1.5px] bg-current"
                        aria-hidden="true"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-current opacity-60 px-3 py-1 rounded-full text-[12.5px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
