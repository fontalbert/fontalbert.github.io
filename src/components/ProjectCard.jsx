import React from "react";
import Reveal from "./Reveal";
import Swallow from "./Swallow";
import Tag from "./ui/Tag";
import WorkflowVisual from "./visuals/WorkflowVisual";
import AbstractVisual from "./visuals/AbstractVisual";
import { useDark, useLang } from "../lib/contexts";

// Arco del sol (mismo motivo que SunPhase): el punto avanza con cada proyecto
function ArcSun({ index, total }) {
  const t = total > 1 ? index / (total - 1) : 0;
  const a = Math.PI * (1 - t);
  const cx = 150 + Math.cos(a) * 132;
  const cy = 84 - Math.sin(a) * 66;
  return (
    <svg width="120" height="37" viewBox="0 0 300 92" fill="none" aria-hidden="true" className="opacity-70">
      <path d="M18 84 A 132 66 0 0 1 282 84" stroke="currentColor" strokeWidth="2" strokeDasharray="4 10" fill="none" />
      <circle cx={cx} cy={cy} r="7" fill="currentColor" />
    </svg>
  );
}

// Cable con golondrinas posadas (las mismas del cable de Contacto): una por número de proyecto
function WireSwallows({ count, dark, className = "" }) {
  const W = 260;
  const H = 72;
  const wireY = 46;
  const sag = 7;
  const birds = Array.from({ length: count }, (_, k) => {
    const t = (k + 1) / (count + 1);
    const y = (1 - t) * (1 - t) * wireY + 2 * (1 - t) * t * (wireY + sag) + t * t * wireY;
    return {
      left: t * 100,
      top: y - 21,
      variant: k % 3,
      facing: k % 2 === 0 ? 1 : -1,
      rot: ((k * 37) % 9) - 4,
    };
  });
  return (
    <div className={`relative ${className}`} style={{ width: W, height: H }} aria-hidden="true">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="absolute inset-0">
        <path
          d={`M3 ${wireY} Q ${W / 2} ${wireY + sag} ${W - 3} ${wireY}`}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      {birds.map((b, k) => (
        <span
          key={k}
          className="absolute w-8 h-8 pointer-events-none transition-[filter] duration-[900ms]"
          style={{
            left: `${b.left}%`,
            top: b.top,
            transform: `translateX(-50%) rotate(${b.rot}deg)`,
            filter: dark ? "invert(0.92)" : "none",
          }}
        >
          <Swallow variant={b.variant} facing={b.facing} size={32} />
        </span>
      ))}
    </div>
  );
}

function Visual({ project, labels }) {
  if (project.visual === "workflow") {
    return <WorkflowVisual title={labels.workflow.title} steps={labels.workflow.steps} />;
  }
  if (project.visual === "image" && project.image) {
    const img = project.image;
    return (
      <img
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        loading="lazy"
        decoding="async"
        className="block w-full h-full object-cover grayscale contrast-[1.02] transition-[filter] duration-700 group-hover:grayscale-0"
      />
    );
  }
  return <AbstractVisual variant={project.visual} />;
}

// Postal de proyecto: categoría · título · descripción · tags · visual · enlace o estado
export default function ProjectCard({ project, index, total, labels, className = "" }) {
  const dark = useDark();
  const { t } = useLang();
  const featured = !!project.featured;
  const headingId = `project-${project.number}`;
  const statusLabel = project.status === "coming-soon" ? labels.comingSoon : labels.caseStudySoon;

  return (
    <Reveal
      as="article"
      delay={(index % 3) * 0.06}
      className={`flex flex-col ${className}`}
      aria-labelledby={headingId}
    >
      <div className="flex items-end justify-between px-1 mb-3">
        <span className="text-[12px] tracking-[0.24em] font-semibold opacity-70">P.{project.number}</span>
        <ArcSun index={index} total={total} />
      </div>

      <div
        className={`group flex-1 border-[1.5px] border-current rounded-card overflow-hidden transition-transform duration-500 hover:-translate-y-1 ${
          featured ? "grid md:grid-cols-2" : "flex flex-col"
        }`}
      >
        <div
          className={`bg-card text-ink ${
            featured
              ? "md:order-2 border-t-[1.5px] md:border-t-0 md:border-l-[1.5px] border-current"
              : "border-b-[1.5px] border-current aspect-[16/10] flex items-center justify-center"
          } ${project.visual === "image" ? "" : "p-[clamp(18px,2.5vw,28px)]"}`}
        >
          <Visual project={project} labels={labels} />
        </div>

        <div className={`p-[clamp(22px,3vw,36px)] flex flex-col gap-3 ${featured ? "md:order-1" : ""}`}>
          <p className="m-0 text-[12px] tracking-[0.2em] uppercase font-semibold opacity-70">{project.category}</p>
          <h3
            id={headingId}
            className={`m-0 font-extrabold tracking-[-0.03em] leading-[1.08] [text-wrap:balance] ${
              featured ? "text-[clamp(28px,3.4vw,44px)]" : "text-[clamp(24px,2.6vw,32px)]"
            }`}
          >
            {project.title}
          </h3>
          <p className="m-0 leading-[1.65] opacity-[0.78] [text-wrap:pretty]">{project.description}</p>
          {project.flow && (
            <p className="m-0 text-[13px] tracking-[0.06em] font-medium opacity-80">
              {project.flow.map((step, i) => (
                <React.Fragment key={step}>
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-1.5 opacity-60">
                      →
                    </span>
                  )}
                  {step}
                </React.Fragment>
              ))}
            </p>
          )}
          <ul className="list-none m-0 p-0 mt-1 flex flex-wrap gap-2" aria-label={t.a11y.technologies}>
            {project.tags.map((tag) => (
              <Tag as="li" key={tag}>
                {tag}
              </Tag>
            ))}
          </ul>
          <div className="mt-auto pt-3">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.04em] border-b-[1.5px] border-current pb-1 transition-all hover:gap-4"
              >
                {labels.viewProject}
                <span className="sr-only"> {t.a11y.newTab}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M1 11 L11 1 M4 1 H11 V8" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>
            ) : (
              <p className="m-0 inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.06em] opacity-80">
                <span className="w-2 h-2 rounded-full border-[1.5px] border-current" aria-hidden="true" />
                {statusLabel}
              </p>
            )}
          </div>
        </div>
      </div>

      <WireSwallows count={index + 1} dark={dark} className="mt-3 self-center max-w-full" />
    </Reveal>
  );
}
