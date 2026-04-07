"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Lang, translations } from "@/lib/i18n";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType | null>(null);

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "ko";
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  const langMap: Record<string, Lang> = { ko: "ko", en: "en", ja: "ja", zh: "zh", ru: "ru" };
  return langMap[browserLang] || "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang);

  const t = (key: string) => translations[lang][key] || key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within LangProvider");
  return context;
}
