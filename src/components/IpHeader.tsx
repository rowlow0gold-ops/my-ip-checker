"use client";

import CopyButton from "@/components/CopyButton";
import { useLang } from "@/context/LangContext";

interface IpHeaderProps {
  ip: string;
}

export default function IpHeader({ ip }: IpHeaderProps) {
  const { t } = useLang();

  return (
    <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl shadow-xl px-6 py-8 text-center">
      <p className="text-white/70 text-sm font-medium mb-2">
        {t("yourIp")}
      </p>
      <div className="flex items-center justify-center gap-3">
        <p className="text-white text-3xl font-mono font-bold tracking-wide">
          {ip}
        </p>
        <CopyButton text={ip} />
      </div>
    </div>
  );
}
