"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useLang } from "@/context/LangContext";

interface MapProps {
  lat: number;
  lon: number;
  lang?: string;
}

// Lazy-load the heavy interactive map only when user opts in.
// This keeps the initial JS bundle small (no maplibre-gl until needed).
const InteractiveMap = lazy(() => import("./InteractiveMap"));

function StaticMap({ lat, lon }: { lat: number; lon: number }) {
  // OpenStreetMap embed — instant, no API key, no JS overhead.
  // Bounding box ~5km around the point with a marker.
  const delta = 0.05;
  const bbox = `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  return (
    <iframe
      src={src}
      style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      loading="lazy"
      title="Location map"
    />
  );
}

export default function Map({ lat, lon, lang = "ko" }: MapProps) {
  const [interactive, setInteractive] = useState(false);
  const { t } = useLang();

  if (interactive) {
    return (
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-sm text-slate-400">Loading…</div>}>
        <InteractiveMap lat={lat} lon={lon} lang={lang} />
      </Suspense>
    );
  }

  return (
    <div className="relative w-full h-full">
      <StaticMap lat={lat} lon={lon} />
      <button
        onClick={() => setInteractive(true)}
        className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 hover:bg-white rounded-lg text-xs font-medium shadow-md text-slate-700 transition-colors z-10"
        aria-label={typeof t === "function" ? t("interactiveMap") || "Interactive map" : "Interactive map"}
      >
        🌐 {typeof t === "function" ? t("interactiveMap") || "Interactive" : "Interactive"} →
      </button>
    </div>
  );
}
