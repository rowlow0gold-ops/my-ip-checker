"use client";

interface MapProps {
  lat: number;
  lon: number;
  lang?: string;
}

export default function Map({ lat, lon }: MapProps) {
  // ~30km bounding box around the point (city-level view)
  const delta = 0.15;
  const bbox = `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}`;
  // No &marker= → no pin. Interactive map (pan, +/- zoom) is iframe default.
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;

  return (
    <iframe
      src={src}
      style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      loading="lazy"
      title="Location map"
    />
  );
}
