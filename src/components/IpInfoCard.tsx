"use client";

import { IpInfo } from "@/types/ip";

interface IpInfoCardProps {
  info: IpInfo;
}

const rows: { label: string; key: keyof IpInfo; icon: string }[] = [
  { label: "국가", key: "country", icon: "🌍" },
  { label: "위치", key: "region", icon: "📍" },
  { label: "시간대", key: "timezone", icon: "🕐" },
  { label: "ISP", key: "isp", icon: "🌐" },
];

export default function IpInfoCard({ info }: IpInfoCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <span>📋</span> IP 상세 정보
        </h2>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map(({ label, key, icon }) => (
          <div
            key={key}
            className="flex items-center px-6 py-4 hover:bg-violet-50/50 transition-colors"
          >
            <span className="text-lg mr-3">{icon}</span>
            <span className="text-slate-400 text-sm font-medium w-20 shrink-0">
              {label}
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
