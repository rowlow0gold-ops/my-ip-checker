"use client";

interface MapProps {
  lat: number;
  lon: number;
  lang?: string;
}

export default function Map({ lat, lon }: MapProps) {
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
