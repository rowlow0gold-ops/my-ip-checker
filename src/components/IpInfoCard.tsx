"use client";

import { IpInfo } from "@/types/ip";
import { useLang } from "@/context/LangContext";

interface IpInfoCardProps {
  info: IpInfo;
}

const rows: { tKey: string; key: keyof IpInfo; icon: string }[] = [
  { tKey: "country", key: "country", icon: "🌍" },
  { tKey: "location", key: "region", icon: "📍" },
  { tKey: "timezone", key: "timezone", icon: "🕐" },
  { tKey: "isp", key: "isp", icon: "🌐" },
];

export default function IpInfoCard({ info }: IpInfoCardProps) {
  const { t } = useLang();

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden min-h-[356px]">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <span>📋</span> {t("infoTitle")}
        </h2>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map(({ tKey, key, icon }) => (
          <div
            key={key}
            className="flex items-center px-6 py-4 hover:bg-violet-50/50 transition-colors"
          >
            <span className="text-lg mr-3">{icon}</span>
            <span className="text-slate-400 text-sm font-medium min-w-20 shrink-0 mr-3">
              {t(tKey)}
            </span>
            <span className="text-slate-800 text-sm font-semibold font-mono">
              {String(info[key])}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
