import { createContext, useContext } from "react";
import content from "../data/content";

// Idioma activo ('es' | 'en') + setter
export const LanguageContext = createContext({ lang: "es", setLang: () => {} });

// Devuelve { lang, setLang, t } donde t es el contenido en el idioma activo
export function useLang() {
  const { lang, setLang } = useContext(LanguageContext);
  return { lang, setLang, t: content[lang] };
}

// true cuando el cielo entra en la fase nocturna (texto claro)
export const SkyContext = createContext(false);
export const useDark = () => useContext(SkyContext);
