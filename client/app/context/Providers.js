"use client";
import { LangProvider } from "./LangContext";
import { CurrencyProvider } from "./CurrencyContext";

export default function Providers({ children }) {
  return (
    <LangProvider>
      <CurrencyProvider>
        {children}
      </CurrencyProvider>
    </LangProvider>
  );
}
