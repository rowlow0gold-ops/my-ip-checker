"use client";

export default function Skeleton() {
  return (
    <>
      {/* IP Header skeleton - fixed height matching IpHeader */}
      <div className="bg-gradient-to-r from-violet-500/50 via-purple-500/50 to-fuchsia-500/50 rounded-3xl shadow-xl px-6 py-8 text-center h-[120px] flex flex-col items-center justify-center">
        <div className="h-4 w-36 rounded-full skeleton-shimmer mb-3" />
        <div className="flex items-center justify-center gap-3">
          <div className="h-9 w-56 rounded-full skeleton-shimmer" />
          <div className="w-10 h-10 rounded-full skeleton-shimmer" />
        </div>
      </div>

      {/* Info + Map skeleton side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Info card skeleton - fixed height matching IpInfoCard */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden h-[282px]">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <div className="w-5 h-5 rounded skeleton-shimmer-light" />
            <div className="h-4 w-20 rounded-full skeleton-shimmer-light" />
          </div>
          <div className="divide-y divide-slate-100">
            {["218.234.162.181", "South Korea", "Seoul", "Asia/Seoul"].map((text, i) => (
              <div key={i} className="flex items-center px-6 py-4 gap-3">
                <div className="w-6 h-6 rounded skeleton-shimmer-light" />
                <div className="h-4 w-12 rounded-full skeleton-shimmer-light" />
                <span className="text-slate-300 text-sm font-mono blur-[6px] select-none">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Map skeleton - fixed height matching Map */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden h-[282px]">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <div className="w-5 h-5 rounded skeleton-shimmer-light" />
            <div className="h-4 w-16 rounded-full skeleton-shimmer-light" />
          </div>
          <div className="h-[234px] relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer-light" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
