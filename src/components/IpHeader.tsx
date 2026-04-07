"use client";

import CopyButton from "@/components/CopyButton";

interface IpHeaderProps {
  ip: string;
}

export default function IpHeader({ ip }: IpHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl shadow-xl px-6 py-8 text-center">
      <p className="text-white/70 text-sm font-medium mb-2">
        당신의 공인 IP 주소
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
