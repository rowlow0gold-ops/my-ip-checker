"use client";

import { useLang } from "@/context/LangContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-auto py-6 text-center text-white/40 text-xs">
      <p>&copy; {new Date().getFullYear()} {t("footer")}</p>
    </footer>
  );
}
