import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { isPublicRelease } from "./publication";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { identity } from "./site-data";
import "./globals.css";
import "./motionswitch.css";

const instrumentSans = localFont({
  src: "./fonts/instrument-sans-latin.woff2",
  variable: "--font-instrument-sans",
  weight: "400 700",
  display: "optional",
  fallback: ["Arial"],
  adjustFontFallback: "Arial",
});
const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  variable: "--font-jetbrains-mono",
  weight: "400",
  display: "swap",
  preload: false,
});
export const viewport: Viewport = { themeColor: "#080809" };
export const metadata: Metadata = {
  metadataBase: new URL(identity.origin),
  title: {
    default: "Florian Lux — Developer. Founder. Creative Technologist.",
    template: "%s — Florian Lux",
  },
  description: identity.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: identity.name,
    title: "Florian Lux — One person. Multiple modes.",
    description: identity.description,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Florian Lux — One person. Multiple modes.",
    description: identity.description,
    images: ["/opengraph-image"],
  },
  robots: { index: isPublicRelease, follow: isPublicRelease },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
