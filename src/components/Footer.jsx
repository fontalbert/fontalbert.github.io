import React from "react";
import { useLang } from "../lib/contexts";

// Propinas: Stripe Payment Link alojado (USD). Con cadena vacía el enlace no se muestra.
const TIP_URL = "https://buy.stripe.com/aFacN78c527I2y6buWd3i01";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="text-center px-6 pt-10 pb-[34px] text-[12.5px] opacity-55">
      © {new Date().getFullYear()} Albert Font Sala — {t.footer.handmade} ·{" "}
      <a href="#inicio" className="border-b border-current hover:opacity-70 transition-opacity">
        {t.footer.backToTop}
      </a>
      {TIP_URL && (
        <>
          {" · "}
          <a
            href={TIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-current hover:opacity-70 transition-opacity"
          >
            ☕ {t.footer.tip}
          </a>
        </>
      )}
    </footer>
  );
};

export default Footer;
