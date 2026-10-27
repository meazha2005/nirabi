import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { siteConfig } from "@/data/siteConfig";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080808",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nirabi-design-studio.vercel.app"),
  title: {
    default: "NIRABI DESIGN STUDIO — Interior Design & Turnkey Solutions in Chennai",
    template: "%s — NIRABI DESIGN STUDIO",
  },
  description: siteConfig.heroSupportingText,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "NIRABI DESIGN STUDIO",
    description: siteConfig.heroSupportingText,
    type: "website",
    siteName: "NIRABI DESIGN STUDIO",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <LocalBusinessSchema />
      </head>
      <body className="font-body bg-[#080808] text-ivory antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
