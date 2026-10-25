import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ARI — Creative Developer & Visual Engineer",
  description:
    "Luxury dark portfolio blending modern web engineering, cinematic motion design, and high-fidelity interactive experiences.",
  keywords: [
    "Creative Developer",
    "Portfolio",
    "Next.js",
    "Web Design",
    "Ari Mahendra",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#050608] text-zinc-100 font-sans selection:bg-amber-400/90 selection:text-black">
        {children}
      </body>
    </html>
  );
}
