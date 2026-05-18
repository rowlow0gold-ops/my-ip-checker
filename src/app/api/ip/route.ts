import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  // Local-dev debug override: ?ip=1.2.3.4
  const debugIp = new URL(request.url).searchParams.get("ip");

  // Cloudflare always sets cf-connecting-ip in production.
  const cf = request.headers.get("cf-connecting-ip");
  const fwd = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");
  const detectedIp =
    cf || (fwd ? fwd.split(",")[0].trim() : null) || real || "127.0.0.1";
  const ip = debugIp || detectedIp;

  try {
    const geoRes = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`,
      { next: { revalidate: 0 } }
    );
    const geoData = await geoRes.json();

    const failed = geoData.status === "fail";
    let lat = failed ? 37.5665 : geoData.lat;
    let lon = failed ? 126.978 : geoData.lon;

    // Geocode the city name → city-center coords (replaces approximate IP coords)
    if (!failed && geoData.city) {
      try {
        const q = encodeURIComponent(`${geoData.city}, ${geoData.country}`);
        const nomRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`,
          {
            headers: {
              "User-Agent": "my-ip-checker (minhojan-world.site)",
            },
            next: { revalidate: 86400 },
          }
        );
        const nom = await nomRes.json();
        if (Array.isArray(nom) && nom.length > 0) {
          lat = parseFloat(nom[0].lat);
          lon = parseFloat(nom[0].lon);
        }
      } catch {
        // Fall back to IP coords if Nominatim fails
      }
    }

    const result = failed
      ? {
          ip,
          country: "-",
          countryCode: "-",
          region: "-",
          city: "-",
          zip: "-",
          lat,
          lon,
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
          lat,
          lon,
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
