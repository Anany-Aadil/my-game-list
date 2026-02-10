import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Fascinate_Inline,
  Iceberg,
  Nunito,
  Asimovian,
  Delius,
  Exo,
} from "next/font/google";
import "./globals.css";

import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fascinateInline = Fascinate_Inline({
  variable: "--font-fascinate-inline",
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
      <body
        className={`
          ${geistSans.variable} 
          ${nunito.variable} 
          ${iceberg.variable} 
          ${geistMono.variable} 
          ${fascinateInline.variable}  
          ${asimovian.variable} 
          ${delius.variable} 
          ${exo.variable}
          antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
