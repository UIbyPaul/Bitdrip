import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StarknetProvider } from "@/lib/starknet/provider";
import { Navbar } from "@/components/layout/Navbar";
import { NotificationToast } from "@/components/ui/NotificationToast";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Bitdrip — Automated BTC Vault on Starknet",
  description:
    "Non-custodial, programmable Bitcoin accumulation powered by Starknet smart contracts.",
  openGraph: {
    title: "Bitdrip",
    description: "Automated BTC stacking on Starknet",
    siteName: "Bitdrip",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen" style={{ background: "#f0f4ff", color: "#1a2740" }}>
        <StarknetProvider>
          <Navbar />
          <main className="ml-64 min-h-screen p-8" style={{ background: "linear-gradient(135deg, #f5f8ff 0%, #e8f0fe 100%)" }}>
            {children}
          </main>
          <NotificationToast />
        </StarknetProvider>
      </body>
    </html>
  );
}
