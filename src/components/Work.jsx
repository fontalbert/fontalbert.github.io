import React from "react";
import Section from "./Section";
import ProjectCard from "./ProjectCard";
import { useLang } from "../lib/contexts";

// Postales de proyecto: la destacada (01) ocupa toda la fila con el visual de flujo; el resto en rejilla
export default function Work() {
  const { t } = useLang();
  const w = t.work;
  const items = w.items;
  // En tablet (2 columnas) la última postal ocupa la fila entera si quedaría huérfana
  const orphanLast = items.filter((p) => !p.featured).length % 2 === 1;
  return (
    <Section id="work" phase={2} label={w.label} title={w.title} subtitle={w.subtitle}>
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {items.map((project, i) => {
          const isLast = i === items.length - 1;
          const span = project.featured
            ? "md:col-span-2 lg:col-span-3"
            : isLast && orphanLast
              ? "md:col-span-2 lg:col-span-1"
              : "";
          return (
            <ProjectCard
              key={project.number}
              project={project}
              index={i}
              total={items.length}
              labels={w}
              className={span}
            />
          );
        })}
      </div>
    </Section>
  );
}
