import React from "react";
import { useLang } from "../lib/contexts";

// Propinas: Stripe Payment Link alojado (USD). Con cadena vacía el enlace no se muestra.
const TIP_URL = "https://buy.stripe.com/aFacN78c527I2y6buWd3i01";
const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" };

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  return (
    <footer className="text-center px-6 pt-10 pb-[34px] text-[13px]">
      <p className="m-0 font-bold text-[16px]">{f.name}</p>
      <p className="m-0 opacity-85">{f.role}</p>
      <p className="m-0 mb-5 opacity-85">{f.specialty}</p>
      <nav aria-label={t.a11y.footerNav} className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-5 font-semibold">
        {f.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? EXTERNAL : {})}
            className="border-b border-current pb-0.5 hover:opacity-70 transition-opacity"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p className="m-0 opacity-75">
        © {new Date().getFullYear()} {f.name} ·{" "}
        <a href="#home" className="border-b border-current hover:opacity-70 transition-opacity">
          {f.backToTop}
        </a>
        {TIP_URL && (
          <>
            {" · "}
            <a href={TIP_URL} {...EXTERNAL} className="border-b border-current hover:opacity-70 transition-opacity">
              ☕ {f.tip}
            </a>
          </>
        )}
      </p>
    </footer>
  );
}
