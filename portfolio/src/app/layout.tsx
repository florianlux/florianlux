import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SignalLine from "@/components/SignalLine";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Florian Lux — Builder digitaler Systeme, Produkte & Wissensplattformen",
    template: "%s — Florian Lux",
  },
  description:
    "Florian Lux entwickelt intelligente digitale Systeme an der Schnittstelle von Wissen, Design und Technologie. Projekte: Synapedia, Neurocodex.",
  metadataBase: new URL("https://florianlux.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Florian Lux",
    title:
      "Florian Lux — Builder digitaler Systeme, Produkte & Wissensplattformen",
    description:
      "Florian Lux entwickelt intelligente digitale Systeme an der Schnittstelle von Wissen, Design und Technologie.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florian Lux",
    description:
      "Builder digitaler Systeme an der Schnittstelle von Wissen, Design und Technologie.",
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
      lang="en"
      className={`${instrumentSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0A0A0F]">
        <Navigation />
        <SignalLine />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
