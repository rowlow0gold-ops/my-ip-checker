"use client";

export default function Skeleton() {
  return (
    <>
      {/* IP Header skeleton */}
      <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-xl px-6 py-8 text-center animate-pulse">
        <div className="h-4 w-32 bg-white/20 rounded-full mx-auto mb-3" />
        <div className="h-9 w-64 bg-white/30 rounded-full mx-auto" />
      </div>

      {/* Info + Map skeleton side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Info card skeleton */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden animate-pulse">
          <div className="px-6 py-4 border-b border-white/10">
            <div className="h-4 w-24 bg-white/20 rounded-full" />
          </div>
          <div className="divide-y divide-white/10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center px-6 py-4 gap-3">
                <div className="w-6 h-6 bg-white/15 rounded-full" />
                <div className="h-4 w-12 bg-white/15 rounded-full" />
                <div className="h-4 w-32 bg-white/20 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Map skeleton */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden animate-pulse">
          <div className="px-6 py-4 border-b border-white/10">
            <div className="h-4 w-20 bg-white/20 rounded-full" />
          </div>
          <div className="h-[300px] bg-white/10" />
        </div>
      </div>
    </>
  );
}
