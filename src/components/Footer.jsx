import React from "react";
import { useLang } from "../lib/contexts";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="text-center px-6 pt-10 pb-[34px] text-[12.5px] opacity-55">
      © {new Date().getFullYear()} Albert Font Sala — {t.footer.handmade} ·{" "}
      <a href="#inicio" className="border-b border-current hover:opacity-70 transition-opacity">
        {t.footer.backToTop}
      </a>
    </footer>
  );
};

export default Footer;
