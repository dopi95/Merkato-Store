"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LangContext = createContext({ lang: "en", setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
