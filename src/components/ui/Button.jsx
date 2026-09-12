import React from "react";

// Enlace con forma de píldora. primary: relleno tinta (se invierte de noche, ver .btn-primary en
// index.css); secondary: solo borde fino.
export default function Button({ href, variant = "primary", className = "", children, ...rest }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[15px] leading-none transition-[transform,opacity,background-color,color] duration-300 hover:-translate-y-0.5";
  const look =
    variant === "primary"
      ? "btn-primary px-[30px] py-[17px]"
      : "border-[1.5px] border-current px-[30px] py-[15.5px] hover:opacity-70";
  return (
    <a href={href} className={`${base} ${look} ${className}`} {...rest}>
      {children}
    </a>
  );
}
