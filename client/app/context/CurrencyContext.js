"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const rates = {
  USD: 1,
  NGN: 1620,
  ETB: 57,
  KES: 130,
  AED: 3.67,
  EGP: 48.5,
  SAR: 3.75,
};

export const currencies = [
  { code: "USD", sign: "$",   label: "US Dollar",       labelAR: "دولار أمريكي" },
  { code: "NGN", sign: "₦",   label: "Nigerian Naira",  labelAR: "نايرا نيجيري" },
  { code: "ETB", sign: "Br",  label: "Ethiopian Birr",  labelAR: "بير إثيوبي" },
  { code: "KES", sign: "KSh", label: "Kenyan Shilling", labelAR: "شلن كيني" },
  { code: "AED", sign: "د.إ", label: "UAE Dirham",      labelAR: "درهم إماراتي" },
  { code: "EGP", sign: "E£",  label: "Egyptian Pound",  labelAR: "جنيه مصري" },
  { code: "SAR", sign: "SR",  label: "Saudi Riyal",     labelAR: "ريال سعودي" },
];

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState("USD");

  useEffect(() => {
    const saved = localStorage.getItem("merkato_currency");
    if (saved && rates[saved]) setCurrencyState(saved);
  }, []);

  const setCurrency = useCallback((val) => {
    setCurrencyState(val);
    localStorage.setItem("merkato_currency", val);
  }, []);

  const convertPrice = useCallback((usdPrice) => {
    const converted = usdPrice * rates[currency];
    return converted >= 100 ? Math.round(converted) : +converted.toFixed(2);
  }, [currency]);

  const currentCurrency = currencies.find(c => c.code === currency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, sign: currentCurrency.sign, currentCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
};
