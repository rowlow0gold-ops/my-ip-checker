"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  lat: number;
  lon: number;
}

export default function Map({ lat, lon }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [locating, setLocating] = useState(false);
  const [located, setLocated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current).setView([lat, lon], 11);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lon]);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setErrorMsg("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
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

        map.setView([latitude, longitude], 15);

        const icon = L.divIcon({
          className: "gps-marker",
          html: `<div style="
            width: 20px; height: 20px;
            background: #ef4444;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        markerRef.current = L.marker([latitude, longitude], { icon })
          .addTo(map)
          .bindPopup("내 실제 위치")
          .openPopup();

        setLocating(false);
        setLocated(true);
        setErrorMsg(null);
      },
      (error) => {
        setLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMsg("위치 정보 접근이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해 주세요.");
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMsg("위치 정보를 사용할 수 없습니다. 기기의 위치 서비스가 꺼져 있을 수 있습니다.");
            break;
          case error.TIMEOUT:
            setErrorMsg("서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.");
            break;
          default:
            setErrorMsg("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
    );
  };

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[300px] rounded-xl z-0" />

      {/* Only show button on mobile */}
      {isMobile && (
        <button
          onClick={handleLocate}
          disabled={locating}
          className="absolute top-3 right-3 z-[1000] inline-flex items-center gap-2 px-3 py-2 bg-white text-slate-700 text-xs font-medium rounded-lg shadow-md border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          {locating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              위치 확인 중...
            </>
          ) : located ? (
            <>
              <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              내 실제 위치 보기
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              내 실제 위치 보기
            </>
          )}
        </button>
      )}

      {/* Error message banner */}
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
