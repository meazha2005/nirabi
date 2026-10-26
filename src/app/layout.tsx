import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { siteConfig } from "@/data/siteConfig";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://nirabi-design-studio.vercel.app"),
  title: {
    default: "NIRABI DESIGN STUDIO — Interior Architecture & Design",
    template: "%s — NIRABI DESIGN STUDIO",
  },
  description: siteConfig.heroSupportingText,
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/logo.png"],
    apple: [{ url: "/logo.png" }, { url: "/apple-touch-icon.png" }],
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
        <LocalBusinessSchema />
      </head>
      <body className="font-body bg-near-black text-ivory antialiased selection:bg-gold selection:text-near-black">
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
