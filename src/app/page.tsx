"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IpInfo } from "@/types/ip";
import IpInfoCard from "@/components/IpInfoCard";
import CopyButton from "@/components/CopyButton";
import Footer from "@/components/Footer";

// Leaflet needs to be loaded client-side only (no SSR)
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch("/api/ip");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setIpInfo(data);
      } catch {
        setError("IP 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchIp();
  }, []);

  return (
    <main className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-slate-900">내 IP 확인</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">IP 정보를 불러오는 중...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {ipInfo && (
          <>
            {/* Copy Button */}
            <div className="flex justify-center">
              <CopyButton text={ipInfo.ip} />
            </div>

            {/* IP Info Card */}
            <IpInfoCard info={ipInfo} />

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-sm font-semibold text-slate-700">
                  위치 지도
                </h2>
              </div>
              <Map lat={ipInfo.lat} lon={ipInfo.lon} city={ipInfo.city} />
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
