import React from "react";
import Reveal from "./Reveal";
import SunPhase from "./SunPhase";
import Button from "./ui/Button";
import content from "../data/content";

export default function Hero() {
  const h = content.hero;
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-[120px] pb-20 box-border relative"
      aria-labelledby="hero-heading"
    >
      <SunPhase phase={0} title={h.eyebrow} as="p" center className="mb-8" />
      <h1
        id="hero-heading"
        className="max-w-[17ch] text-[clamp(40px,6.6vw,88px)] font-extrabold tracking-[-0.04em] leading-[1.02] m-0 mb-7 [text-wrap:balance]"
      >
        <Reveal as="span" className="block">
          {h.titleA}
          <em className="italic font-normal text-accent">{h.titleAccent}</em>
          {h.titleB}
        </Reveal>
      </h1>
      <Reveal delay={0.1}>
        <p className="max-w-[600px] text-[clamp(17px,2vw,20px)] leading-[1.65] m-0 mb-10 opacity-[0.78] [text-wrap:pretty]">
          {h.description}
        </p>
      </Reveal>
      <Reveal delay={0.16} className="flex gap-3.5 flex-wrap justify-center mb-6">
        <Button href={h.ctaPrimary.href} variant="primary">
          {h.ctaPrimary.label}
        </Button>
        <Button href={h.ctaSecondary.href} variant="secondary">
          {h.ctaSecondary.label}
        </Button>
      </Reveal>
      <Reveal delay={0.22}>
        <p className="m-0 text-[13px] tracking-[0.16em] uppercase opacity-70">{h.credibility}</p>
      </Reveal>
      <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 w-max max-w-[90vw]">
        <p className="m-0 text-[12.5px] italic opacity-70 text-center">{h.gameTip}</p>
        <p className="m-0 text-[12px] tracking-[0.2em] uppercase opacity-70">{h.scrollHint}</p>
      </div>
    </section>
  );
}
