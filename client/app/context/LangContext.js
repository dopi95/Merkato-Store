"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LangContext = createContext({ lang: "en", setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("en");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("merkato_lang");
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  function setLang(l) {
    setLangState(l);
    localStorage.setItem("merkato_lang", l);
  }

  useEffect(() => {
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
