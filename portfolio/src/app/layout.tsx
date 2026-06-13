import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
      "Florian Lux — Knowledge Systems Builder",
    template: "%s — Florian Lux",
  },
  description:
    "Florian Lux builds knowledge systems, intelligence platforms and structured information products for complex domains.",
  metadataBase: new URL("https://florianlux.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Florian Lux",
    title: "Florian Lux — Knowledge Systems Builder",
    description:
      "Knowledge systems, intelligence platforms and structured information products by Florian Lux.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florian Lux",
    description:
      "Knowledge systems builder crafting structured information products.",
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
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
