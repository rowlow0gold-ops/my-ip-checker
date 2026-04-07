"use client";

import { useLang } from "@/context/LangContext";
import { languages } from "@/lib/i18n";

export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-1">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-2 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
            lang === code
              ? "bg-white/30 text-white"
              : "text-white/50 hover:text-white/80 hover:bg-white/10"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
