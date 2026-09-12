import { createContext, useContext } from "react";

// true cuando el cielo entra en la fase nocturna (texto claro)
export const SkyContext = createContext(false);
export const useDark = () => useContext(SkyContext);
