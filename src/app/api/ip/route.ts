import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  // Cloudflare always sets cf-connecting-ip to the real client IP.
  // Fall back to x-forwarded-for (other proxies) then x-real-ip.
  const cf = request.headers.get("cf-connecting-ip");
  const fwd = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");
  const ip = cf || (fwd ? fwd.split(",")[0].trim() : null) || real || "127.0.0.1";

  try {
    const geoRes = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`,
      { next: { revalidate: 0 } }
    );
    const geoData = await geoRes.json();

    const result =
      geoData.status === "fail"
        ? {
            ip,
            country: "-",
            countryCode: "-",
            region: "-",
            city: "-",
            zip: "-",
            lat: 37.5665,
            lon: 126.978,
            timezone: "-",
            isp: "-",
            org: "-",
            as: "-",
          }
        : {
            ip: geoData.query || ip,
            country: geoData.country,
            countryCode: geoData.countryCode,
            region: geoData.regionName,
            city: geoData.city,
            zip: geoData.zip,
            lat: geoData.lat,
            lon: geoData.lon,
            timezone: geoData.timezone,
            isp: geoData.isp,
            org: geoData.org,
            as: geoData.as,
          };

    // Log visit to Supabase (fire and forget, don't block the response)
    supabase
      .from("visits")
      .insert({
        ip: result.ip,
        country: result.country,
        region: result.region,
        city: result.city,
        isp: result.isp,
        page: "my-ip-checker",
      })
      .then();

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "IP 정보를 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
