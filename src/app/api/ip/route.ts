import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get the client IP from headers (works behind proxies/Vercel)
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

  try {
    // Use ip-api.com for geolocation (free, no key needed, 45 req/min)
    const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`, {
      next: { revalidate: 0 },
    });
    const geoData = await geoRes.json();

    if (geoData.status === "fail") {
      return NextResponse.json({
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
      });
    }

    return NextResponse.json({
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
    });
  } catch {
    return NextResponse.json(
      { error: "IP 정보를 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
