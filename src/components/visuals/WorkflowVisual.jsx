import React from "react";

// Flujo de automatización del proyecto 01: seis nodos unidos por líneas de trazo discontinuo.
// La animación (nodos que se iluminan en secuencia, líneas que fluyen) vive en index.css (.wf-*)
// y se desactiva con prefers-reduced-motion.
export default function WorkflowVisual({ title, steps }) {
  return (
    <ol className="list-none m-0 p-0 flex flex-col items-stretch" aria-label={title}>
      {steps.map(([label, note], i) => (
        <li key={label} className="flex flex-col items-center" style={{ "--i": i }}>
          <div className="wf-node w-full border-[1.5px] border-current rounded-[14px] px-4 py-2.5 grid grid-cols-[auto_1fr] gap-x-3 items-baseline">
            <span className="text-[11px] tracking-[0.2em] font-semibold opacity-70 tabular-nums" aria-hidden="true">
              0{i + 1}
            </span>
            <span className="text-[13.5px] font-semibold tracking-[0.08em] uppercase leading-[1.3]">{label}</span>
            <span className="col-start-2 text-[13px] opacity-75 leading-[1.4]">{note}</span>
          </div>
          {i < steps.length - 1 && (
            <svg className="wf-line block" width="2" height="26" viewBox="0 0 2 26" aria-hidden="true">
              <line
                x1="1"
                y1="1"
                x2="1"
                y2="25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="2 5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
}
