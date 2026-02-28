import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Geist,
  Geist_Mono,
  Jolly_Lodger,
  Iceberg,
  Nunito,
  Asimovian,
  Delius,
  Exo,
} from "next/font/google";
import "./globals.css";

import Providers from "./providers";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jollyRoger = Jolly_Lodger({
  variable: "--font-jolly",
  subsets: ["latin"],
  weight: "400",
});

const iceberg = Iceberg({
  variable: "--font-iceberg",
  subsets: ["latin"],
  weight: "400",
});

const asimovian = Asimovian({
  variable: "--font-asimovian",
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"],
  weight: "400",
});
const delius = Delius({
  variable: "--font-delius",
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});
const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Game List",
  description: "A comprehensive list for Video Games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/9e1096b839.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${nunito.variable} 
          ${iceberg.variable} 
          ${geistMono.variable} 
          ${jollyRoger.variable}  
          ${asimovian.variable} 
          ${delius.variable} 
          ${exo.variable}
          antialiased custom-vertical-scroll h-screen`}
      >
        <SpeedInsights />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
