import type { Metadata } from "next";
import { Geist, Geist_Mono, Fascinate_Inline } from "next/font/google";
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
        className={`${geistSans.variable} ${geistMono.variable} ${fascinateInline.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
