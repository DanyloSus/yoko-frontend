import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";

const dmSans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const kyiv = localFont({
  src: "./KyivTypeSans-Bold2.woff2",
  display: "swap",
  variable: "--font-kyiv",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} ${dmSans.variable} ${kyiv.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
