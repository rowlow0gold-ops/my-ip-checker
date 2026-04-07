"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IpInfo } from "@/types/ip";
import { LangProvider, useLang } from "@/context/LangContext";
import IpHeader from "@/components/IpHeader";
import IpInfoCard from "@/components/IpInfoCard";
import Skeleton from "@/components/Skeleton";
import Footer from "@/components/Footer";
import LangSwitcher from "@/components/LangSwitcher";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

function HomeContent() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { lang, t } = useLang();

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch("/api/ip");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setIpInfo(data);
      } catch {
        setError(t("error"));
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
          <button onClick={() => window.location.reload()} className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
            <span className="text-white font-mono font-bold text-sm">IP</span>
          </button>
          <h1 className="text-lg font-bold text-white">{t("siteTitle")}</h1>
          <div className="ml-auto">
            <LangSwitcher />
          </div>
        </div>
      </header>

      {/* Content with side ads */}
      <div className="flex-1 flex justify-center gap-8">
        {/* Left Ad - desktop only */}
        <aside className="hidden xl:flex shrink-0 pt-8 pl-6">
          <div className="sticky top-8 w-[200px] h-[600px] bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white/30 text-xs">
            {t("ad")}
          </div>
        </aside>

        {/* Main Content */}
        <div className="max-w-5xl w-full px-4 py-8 flex flex-col gap-6">
          {error && (
            <div className="bg-red-400/20 border border-red-300/30 rounded-xl px-6 py-4 text-white text-sm">
              {error}
            </div>
          )}

          {loading && <Skeleton />}

          {ipInfo && (
            <>
              {/* IP Header - full width */}
              <IpHeader ip={ipInfo.ip} />

              {/* Info + Map side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IpInfoCard info={ipInfo} />

                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden min-h-[356px]">
                  <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span>🗺️</span> {t("mapTitle")}
                    </h2>
                  </div>
                  <Map lat={ipInfo.lat} lon={ipInfo.lon} lang={lang} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Ad - desktop only */}
        <aside className="hidden xl:flex shrink-0 pt-8 pr-6">
          <div className="sticky top-8 w-[200px] h-[600px] bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white/30 text-xs">
            {t("ad")}
          </div>
        </aside>
      </div>

      {/* Mobile bottom ad */}
      <div className="xl:hidden p-4">
        <div className="w-full h-[90px] bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white/30 text-xs">
          {t("ad")}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <HomeContent />
    </LangProvider>
  );
}
