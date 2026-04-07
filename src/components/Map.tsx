"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLang } from "@/context/LangContext";

interface MapProps {
  lat: number;
  lon: number;
  lang?: string;
}

const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

const LANG_MAP: Record<string, string> = {
  ko: "name:ko",
  en: "name:en",
  ja: "name:ja",
  zh: "name:zh",
  ru: "name:ru",
};

function setStyleLanguage(style: maplibregl.StyleSpecification, lang: string): maplibregl.StyleSpecification {
  const nameField = LANG_MAP[lang] || "name:en";
  const updated = JSON.parse(JSON.stringify(style));

  for (const layer of updated.layers) {
    if (layer.layout?.["text-field"]) {
      const tf = layer.layout["text-field"];
      // Replace name references with the target language, fallback to original name
      if (typeof tf === "string" && tf.includes("name")) {
        layer.layout["text-field"] = [
          "coalesce",
          ["get", nameField],
          ["get", "name"],
        ];
      } else if (Array.isArray(tf)) {
        layer.layout["text-field"] = [
          "coalesce",
          ["get", nameField],
          ["get", "name"],
        ];
      }
    }
  }

  return updated;
}

export default function Map({ lat, lon, lang = "ko" }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const styleRef = useRef<maplibregl.StyleSpecification | null>(null);
  const [locating, setLocating] = useState(false);
  const [located, setLocated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { t } = useLang();

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      const res = await fetch(STYLE_URL);
      const baseStyle = await res.json();
      styleRef.current = baseStyle;

      const localizedStyle = setStyleLanguage(baseStyle, lang);

      const map = new maplibregl.Map({
        container: mapRef.current!,
        style: localizedStyle,
        center: [lon, lat],
        zoom: 11,
        attributionControl: {},
      });

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lon]);

  // Update language without re-creating map
  useEffect(() => {
    const map = mapInstanceRef.current;
    const baseStyle = styleRef.current;
    if (!map || !baseStyle) return;

    const localizedStyle = setStyleLanguage(baseStyle, lang);
    map.setStyle(localizedStyle);
  }, [lang]);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setErrorMsg(t("noGeolocation"));
      return;
    }

    setLocating(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const map = mapInstanceRef.current;
        if (!map) return;

        if (markerRef.current) {
          markerRef.current.remove();
        }

        map.flyTo({ center: [longitude, latitude], zoom: 15 });

        const el = document.createElement("div");
        el.style.cssText =
          "width:20px;height:20px;background:#ef4444;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);";

        markerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat([longitude, latitude])
          .setPopup(new maplibregl.Popup().setText(t("myLocation")))
          .addTo(map);

        markerRef.current.togglePopup();

        setLocating(false);
        setLocated(true);
        setErrorMsg(null);
      },
      (error) => {
        setLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMsg(t("permissionDenied"));
        } else if (error.code === error.TIMEOUT) {
          setErrorMsg(t("timeout"));
        } else {
          setErrorMsg(t("positionUnavailable"));
        }
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
    );
  };

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[300px] rounded-xl z-0" />

      {isMobile && (
        <button
          onClick={handleLocate}
          disabled={locating}
          className="absolute top-3 right-3 z-[1000] inline-flex items-center gap-2 px-3 py-2 bg-white text-slate-700 text-xs font-medium rounded-lg shadow-md border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          {locating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              {t("locating")}
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t("locateBtn")}
            </>
          )}
        </button>
      )}

      {errorMsg && (
        <div className="absolute bottom-3 left-3 right-3 z-[1000] bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-700 text-xs flex items-start gap-2">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>{errorMsg}</span>
          <button
            onClick={() => setErrorMsg(null)}
            className="ml-auto shrink-0 text-red-400 hover:text-red-600"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
