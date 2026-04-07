"use client";

import { IpInfo } from "@/types/ip";
import CopyButton from "@/components/CopyButton";

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
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
      {/* IP Header */}
      <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 px-6 py-6 text-center">
        <p className="text-white/70 text-sm font-medium mb-2">
          당신의 공인 IP 주소
        </p>
        <div className="flex items-center justify-center gap-3">
          <p className="text-white text-3xl font-mono font-bold tracking-wide">
            {info.ip}
          </p>
          <CopyButton text={info.ip} />
        </div>
      </div>

      {/* Info Table */}
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
