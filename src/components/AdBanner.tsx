"use client";

interface AdBannerProps {
  slot: string;
  className?: string;
}

export default function AdBanner({ slot, className = "" }: AdBannerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      {/* Placeholder until AdSense is approved */}
      <div className="w-full h-full min-h-[250px] bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white/30 text-xs">
        광고 영역
      </div>
    </div>
  );
}
