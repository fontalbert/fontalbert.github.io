import React from "react";
import useReveal from "../lib/useReveal";

// Aparición suave al entrar en el viewport (una sola vez). Sin librería: la transición
// vive en .reveal (index.css) y solo se oculta cuando hay JS. Respeta prefers-reduced-motion.
export default function Reveal({ children, delay = 0, className = "", style, as: Tag = "div", ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ ...style, "--reveal-delay": `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
