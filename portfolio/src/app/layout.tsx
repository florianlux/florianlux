import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      lang="de"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
