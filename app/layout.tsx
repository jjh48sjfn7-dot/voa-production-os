import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { RootShell } from "@/components/layout/RootShell";
import { brandAssets } from "@/lib/brand-assets";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Victory Outreach Antioch | Sunday Experience",
  description:
    "VOA Production OS v1.0 — Centralizing production knowledge for Victory Outreach Antioch. Pre-Service checklist, Sunday Experience dashboard, and Audio Department tools.",
  icons: {
    icon: brandAssets.circle,
    apple: brandAssets.circle,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
