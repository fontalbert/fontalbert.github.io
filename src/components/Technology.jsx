import React from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import Tag from "./ui/Tag";
import content from "../data/content";

// Tecnologías agrupadas en una sola caja, una fila por grupo: amplitud sin lista interminable
export default function Technology() {
  const t = content.technology;
  return (
    <Section id="technology" phase={6} label={t.label}>
      <Reveal className="border-[1.5px] border-current rounded-box overflow-hidden">
        {t.groups.map((group, i) => (
          <div
            key={group.name}
            className={`grid md:grid-cols-[200px_1fr] gap-x-8 gap-y-3 px-[clamp(20px,3vw,32px)] py-5 ${
              i > 0 ? "border-t border-hairline" : ""
            }`}
          >
            <h3 className="m-0 text-[13px] tracking-[0.2em] uppercase opacity-70 font-semibold self-center">
              {group.name}
            </h3>
            <ul className="list-none m-0 p-0 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag as="li" key={item}>
                  {item}
                </Tag>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
