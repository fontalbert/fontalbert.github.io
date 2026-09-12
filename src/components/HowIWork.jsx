import React from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { useLang } from "../lib/contexts";

// Cinco pasos sobre la misma línea vertical que la cronología de Experiencia
export default function HowIWork() {
  const { t } = useLang();
  const p = t.process;
  return (
    <Section id="how-i-work" phase={3} label={p.label} title={p.title}>
      <div className="relative pl-[clamp(28px,4vw,44px)]">
        <span className="absolute left-2 top-2 bottom-2 w-px bg-current opacity-30" aria-hidden="true" />
        <ol className="list-none m-0 p-0 flex flex-col gap-12">
          {p.steps.map((step) => (
            <Reveal as="li" key={step.number} className="relative grid md:grid-cols-[88px_1fr] gap-x-6 gap-y-2 items-start">
              <span
                className="absolute top-[9px] w-2.5 h-2.5 rounded-full bg-current"
                style={{ left: "calc(8px - clamp(28px, 4vw, 44px) - 4.5px)" }}
                aria-hidden="true"
              />
              <span
                className="text-[clamp(28px,3vw,40px)] font-extrabold tracking-[-0.03em] leading-none tabular-nums text-accent"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <div>
                <h3 className="m-0 mb-2 text-[clamp(22px,2.6vw,30px)] font-extrabold tracking-[-0.025em]">
                  <span className="sr-only">{step.number} </span>
                  {step.title}
                </h3>
                <p className="m-0 leading-[1.7] opacity-[0.78] max-w-[60ch] [text-wrap:pretty]">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
