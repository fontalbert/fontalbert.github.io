import React from "react";
import Reveal from "./Reveal";
import SunPhase from "./SunPhase";
import { useLang } from "../lib/contexts";

export default function Projects() {
  const { t } = useLang();
  const p = t.projects;
  return (
    <section id="proyectos" className="max-w-[1060px] mx-auto px-6 pt-[140px] pb-[60px] box-border">
      <SunPhase phase={4} title={p.title} />
      <div className="flex flex-col gap-[clamp(70px,9vw,110px)]">
        {p.items.map((project, i) => {
          const imgFirst = i % 2 === 0;
          const media = project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="block w-full max-w-full h-[clamp(240px,30vw,400px)] object-cover object-top grayscale contrast-[1.02] transition-[filter,transform] duration-700 hover:grayscale-0 hover:scale-[1.025]"
            />
          ) : (
            <span
              className="flex items-center justify-center w-full h-[clamp(240px,30vw,400px)]"
              style={{
                background:
                  "repeating-linear-gradient(-45deg, rgba(128,128,128,0.22) 0 1px, transparent 1px 14px)",
              }}
            >
              <span className="italic text-[19px] opacity-65 px-4 text-center">{p.internalUse}</span>
            </span>
          );
          return (
            <Reveal key={project.title}>
              <article
                className={`grid md:grid-cols-2 gap-8 md:gap-[clamp(28px,4vw,64px)] items-center ${
                  imgFirst ? "" : "md:[direction:rtl]"
                }`}
              >
                <div className="md:[direction:ltr] min-w-0 border-[1.5px] border-current rounded-[22px] overflow-hidden">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                      {media}
                    </a>
                  ) : (
                    media
                  )}
                </div>
                <div className="md:[direction:ltr] min-w-0">
                  <p className="m-0 mb-3.5 text-[12px] tracking-[0.24em] opacity-45 font-semibold">
                    P.0{i + 1}
                  </p>
                  <h3 className="m-0 mb-4 text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.03em] leading-[1.05]">
                    {project.title}
                  </h3>
                  <p className="m-0 mb-[18px] leading-[1.65] opacity-75 max-w-[46ch] [text-wrap:pretty]">
                    {project.description}
                  </p>
                  <p className="m-0 mb-6 text-[13px] tracking-[0.08em] opacity-55">{project.tagLine}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.04em] border-b-[1.5px] border-current pb-1 transition-all hover:gap-4"
                    >
                      {p.viewProject}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M1 11 L11 1 M4 1 H11 V8" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
