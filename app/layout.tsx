"use client";

import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/ui/Theming/Theme";

export const dmSans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const kyiv = localFont({
  src: "../public/fonts/KyivTypeSans-Bold2.woff2",
  display: "swap",
  variable: "--font-kyiv",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body
          className={`${dmSans.className} ${dmSans.variable} ${kyiv.variable}`}
        >
          <>{children}</>
        </body>
      </html>
    </ThemeProvider>
  );
}
