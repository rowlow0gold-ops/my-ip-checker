"use client";

export default function Skeleton() {
  return (
    <>
      {/* IP Header skeleton — inline styles so sizes are instant, no waiting for CSS */}
      <div
        style={{ padding: "32px 24px", minHeight: 132, textAlign: "center", borderRadius: 24 }}
        className="bg-gradient-to-r from-violet-500/50 via-purple-500/50 to-fuchsia-500/50 shadow-xl"
      >
        <div style={{ height: 20, width: 144, borderRadius: 9999, margin: "0 auto 8px" }} className="skeleton-shimmer" />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ height: 36, width: 224, borderRadius: 9999 }} className="skeleton-shimmer" />
          <div style={{ width: 40, height: 40, borderRadius: 9999 }} className="skeleton-shimmer" />
        </div>
      </div>

      {/* Info + Map side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Info card skeleton */}
        <div
          style={{ minHeight: 356, borderRadius: 24, overflow: "hidden" }}
          className="bg-white/95 backdrop-blur-sm shadow-xl"
        >
          <div style={{ padding: "16px 24px", borderBottom: "1px solid rgb(241 245 249)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4 }} className="skeleton-shimmer-light" />
            <div style={{ height: 16, width: 96, borderRadius: 9999 }} className="skeleton-shimmer-light" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "16px 24px", gap: 12, borderBottom: i < 4 ? "1px solid rgb(241 245 249)" : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 9999, flexShrink: 0 }} className="skeleton-shimmer-light" />
              <div style={{ height: 16, width: 48, borderRadius: 9999, flexShrink: 0 }} className="skeleton-shimmer-light" />
              <div style={{ height: 16, width: 128, borderRadius: 9999 }} className="skeleton-shimmer-light" />
            </div>
          ))}
        </div>

        {/* Map skeleton */}
        <div
          style={{ minHeight: 356, borderRadius: 24, overflow: "hidden" }}
          className="bg-white/95 backdrop-blur-sm shadow-xl"
        >
          <div style={{ padding: "16px 24px", borderBottom: "1px solid rgb(241 245 249)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4 }} className="skeleton-shimmer-light" />
            <div style={{ height: 16, width: 80, borderRadius: 9999 }} className="skeleton-shimmer-light" />
          </div>
          <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }} className="skeleton-shimmer-light">
            <svg style={{ width: 48, height: 48, color: "rgb(226 232 240)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
        </div>
      </div>

    </>
  );
}
