import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomCTA } from "@/components/layout/MobileBottomCTA";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { BackToTop } from "@/components/layout/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valora Tour & Travel — Private Tour Turki untuk Wisatawan Indonesia",
  description:
    "Private tour Turki dengan guide berlisensi, armada VIP Mercedes-Benz, itinerary fleksibel, dan harga transparan.",
  keywords: [
    "tur Turki",
    "private tour Turki",
    "wisata Turki",
    "Istanbul tour",
    "Cappadocia",
    "Pamukkale",
    "Mercedes Vito Turki",
    "tour guide Indonesia Turki",
  ],
  openGraph: {
    title: "Valora Tour & Travel — Private Tour Turki untuk Wisatawan Indonesia",
    description:
      "Private tour Turki dengan guide berlisensi, armada VIP Mercedes-Benz, itinerary fleksibel, dan harga transparan.",
    type: "website",
    locale: "id_ID",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal">
        <Navbar />
        <ScrollToTop />
        <BackToTop />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomCTA />
      </body>
    </html>
  );
}
