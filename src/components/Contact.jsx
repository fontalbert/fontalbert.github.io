import React, { useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import Swallow from "./Swallow";
import Button from "./ui/Button";
import { useDark, useLang } from "../lib/contexts";

const WIRE_SLOTS = 26;
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" };

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
  const dark = useDark();
  const { t } = useLang();
  const c = t.contact;
  // La distribución se calcula una sola vez
  const [perched] = useState(generatePerched);

  return (
    <Section id="contact" phase={8} label={c.label} title={c.title} subtitle={c.description} titleSize="lg" center>
      <Reveal delay={0.14} className="flex gap-3.5 flex-wrap justify-center mb-8">
        <Button href={c.ctaTalk.href} variant="primary">
          {c.ctaTalk.label}
        </Button>
        <Button href={c.ctaLinkedin.href} variant="secondary" {...EXTERNAL}>
          {c.ctaLinkedin.label}
          <span className="sr-only"> {t.a11y.newTab}</span>
        </Button>
      </Reveal>
      <Reveal delay={0.2}>
        <dl className="inline-grid grid-cols-[auto_auto] gap-x-6 gap-y-2.5 text-left text-[14px] m-0">
          {c.rows.map((row) => (
            <React.Fragment key={row.label}>
              <dt className="font-semibold tracking-[0.06em] uppercase text-[12px] opacity-70 self-center">{row.label}</dt>
              <dd className="m-0">
                <a
                  href={row.href}
                  {...(row.external ? EXTERNAL : {})}
                  className="border-b-[1.5px] border-current pb-0.5 hover:opacity-70 transition-opacity font-semibold"
                >
                  {row.text}
                  {row.external && <span className="sr-only"> {t.a11y.newTab}</span>}
                </a>
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </Reveal>

      {/* Las golondrinas vuelven al cable */}
      <div className="relative h-[130px] mt-[90px]" aria-hidden="true">
        <img
          src="/wire.svg"
          alt=""
          width="1000"
          height="20"
          draggable={false}
          className="absolute left-0 top-1/2 w-full h-auto -translate-y-1/2 opacity-80 transition-[filter] duration-[900ms]"
          style={{ filter: dark ? "invert(0.92)" : "none" }}
        />
        {perched.map((bird, i) => (
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
        <p className="absolute left-1/2 -bottom-3.5 -translate-x-1/2 m-0 text-[12px] italic opacity-70 whitespace-nowrap">
          {c.wireCaption}
        </p>
      </div>
    </Section>
  );
}
