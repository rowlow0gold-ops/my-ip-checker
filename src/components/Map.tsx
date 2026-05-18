"use client";

interface MapProps {
  lat: number;
  lon: number;
  lang?: string;
}

const TILE = 256;
const ZOOM = 11; // city-level (~30km wide)

// Slippy map tile math (returns float, so we can position marker precisely)
function lonLatToTile(lat: number, lon: number, zoom: number) {
  const n = 2 ** zoom;
  const x = ((lon + 180) / 360) * n;
  const latRad = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n;
  return { x, y };
}

export default function Map({ lat, lon }: MapProps) {
  const { x: tx, y: ty } = lonLatToTile(lat, lon, ZOOM);
  const cx = Math.floor(tx);
  const cy = Math.floor(ty);
  const fracX = tx - cx;
  const fracY = ty - cy;

  // 3x3 grid centered on (cx, cy), total 768x768 px
  const tiles: { x: number; y: number; dx: number; dy: number }[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      tiles.push({ x: cx + dx, y: cy + dy, dx, dy });
    }
  }

  const gridSize = 3 * TILE;
  // Marker position inside the grid (relative to top-left of 3x3)
  const markerLeft = (1 + fracX) * TILE;
  const markerTop = (1 + fracY) * TILE;

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-100">
      <div
        className="absolute"
        style={{
          width: `${gridSize}px`,
          height: `${gridSize}px`,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {tiles.map((t) => (
          <img
            key={`${t.x},${t.y}`}
            src={`https://tile.openstreetmap.org/${ZOOM}/${t.x}/${t.y}.png`}
            alt=""
            width={TILE}
            height={TILE}
            loading="lazy"
            style={{
              position: "absolute",
              left: `${(t.dx + 1) * TILE}px`,
              top: `${(t.dy + 1) * TILE}px`,
              display: "block",
            }}
          />
        ))}

        {/* Marker (CSS pin, anchored at bottom-center) */}
        <div
          style={{
            position: "absolute",
            left: `${markerLeft}px`,
            top: `${markerTop}px`,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            fontSize: "32px",
            filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))",
          }}
        >
          📍
        </div>
      </div>

      {/* OSM attribution (required by tile usage policy) */}
      <div
        className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-white/80 rounded text-[10px] text-slate-700"
        style={{ pointerEvents: "none" }}
      >
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" style={{ color: "#0066cc" }}>OpenStreetMap</a>
      </div>
    </div>
  );
}
