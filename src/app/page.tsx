"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IpInfo } from "@/types/ip";
import IpInfoCard from "@/components/IpInfoCard";
import Footer from "@/components/Footer";

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
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-white">내 IP 확인</h1>
        </div>
      </header>

      {/* Content with side ads */}
      <div className="flex-1 flex justify-center">
        {/* Left Ad - desktop only */}
        <aside className="hidden xl:flex w-[160px] shrink-0 pt-8 pl-4">
          <div className="sticky top-8 w-[160px] h-[600px] bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white/30 text-xs">
            광고 영역
          </div>
        </aside>

        {/* Main Content */}
        <div className="max-w-5xl w-full px-4 py-8 flex flex-col gap-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              <p className="text-white/70 text-sm">IP 정보를 불러오는 중...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-400/20 border border-red-300/30 rounded-xl px-6 py-4 text-white text-sm">
              {error}
            </div>
          )}

          {ipInfo && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: IP Info Card */}
                <IpInfoCard info={ipInfo} />

                {/* Right: Map */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span>🗺️</span> 위치 지도
                    </h2>
                  </div>
                  <Map lat={ipInfo.lat} lon={ipInfo.lon} />
                </div>
              </div>

              {/* Bottom Ad - desktop only */}
              <div className="hidden md:block">
                <div className="w-full h-[90px] bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white/30 text-xs">
                  광고 영역
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Ad - desktop only */}
        <aside className="hidden xl:flex w-[160px] shrink-0 pt-8 pr-4">
          <div className="sticky top-8 w-[160px] h-[600px] bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white/30 text-xs">
            광고 영역
          </div>
        </aside>
      </div>

      {/* Mobile sticky bottom ad */}
      <div className="md:hidden sticky bottom-0 z-50 p-2">
        <div className="w-full h-[50px] bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-lg flex items-center justify-center text-slate-400 text-xs">
          광고 영역
        </div>
      </div>

      <Footer />
    </main>
  );
}
