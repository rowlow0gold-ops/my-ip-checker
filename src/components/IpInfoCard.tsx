"use client";

import { IpInfo } from "@/types/ip";

interface IpInfoCardProps {
  info: IpInfo;
}

const rows: { label: string; key: keyof IpInfo }[] = [
  { label: "국가", key: "country" },
  { label: "지역", key: "region" },
  { label: "도시", key: "city" },
  { label: "우편번호", key: "zip" },
  { label: "위도", key: "lat" },
  { label: "경도", key: "lon" },
  { label: "시간대", key: "timezone" },
  { label: "ISP", key: "isp" },
  { label: "조직", key: "org" },
  { label: "AS", key: "as" },
];

export default function IpInfoCard({ info }: IpInfoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* IP Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-center">
        <p className="text-blue-200 text-sm font-medium mb-1">
          당신의 공인 IP 주소
        </p>
        <p className="text-white text-3xl font-mono font-bold tracking-wide">
          {info.ip}
        </p>
      </div>

      {/* Info Table */}
      <div className="divide-y divide-slate-100">
        {rows.map(({ label, key }) => (
          <div
            key={key}
            className="flex items-center px-6 py-3 hover:bg-slate-50 transition-colors"
          >
            <span className="text-slate-500 text-sm font-medium w-24 shrink-0">
              {label}
            </span>
            <span className="text-slate-900 text-sm font-mono">
              {String(info[key])}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
