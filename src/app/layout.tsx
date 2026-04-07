import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whats-my-ip.minhojan-world.site"),
  title: "내 IP 확인 | My IP Checker - Check Your Public IP Address",
  description:
    "내 공인 IP 주소와 위치 정보를 빠르게 확인하세요. Quickly check your public IP address, location, timezone, and ISP. Supports Korean, English, Japanese, Chinese, and Russian.",
  keywords: [
    "IP address",
    "my IP",
    "IP checker",
    "내 IP",
    "IP 확인",
    "공인 IP",
    "IP 주소",
    "what is my IP",
    "IP location",
    "IP 위치",
    "IPアドレス",
    "IP地址",
  ],
  alternates: {
    canonical: "https://whats-my-ip.minhojan-world.site",
  },
  openGraph: {
    title: "내 IP 확인 | My IP Checker",
    description:
      "내 공인 IP 주소와 위치 정보를 빠르게 확인하세요. Check your public IP address, location & ISP instantly.",
    type: "website",
    url: "https://whats-my-ip.minhojan-world.site",
    siteName: "My IP Checker",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "내 IP 확인 | My IP Checker",
    description: "내 공인 IP 주소와 위치 정보를 빠르게 확인하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "내 IP 확인 | My IP Checker",
              url: "https://whats-my-ip.minhojan-world.site",
              description:
                "내 공인 IP 주소와 위치 정보를 빠르게 확인하세요. Check your public IP address, location, timezone, and ISP.",
              applicationCategory: "UtilityApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              inLanguage: ["ko", "en", "ja", "zh", "ru"],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
