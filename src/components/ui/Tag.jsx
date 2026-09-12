import React from "react";

// Etiqueta en forma de píldora con borde fino (tecnologías, ejemplos)
export default function Tag({ as: Comp = "span", className = "", children }) {
  return (
    <Comp
      className={`inline-block border border-current opacity-80 px-3 py-1 rounded-full text-[12.5px] font-medium leading-[1.4] whitespace-nowrap ${className}`}
    >
      {children}
    </Comp>
  );
}
