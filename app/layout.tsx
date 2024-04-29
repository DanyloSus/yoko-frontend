"use client";

import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";
import Header from "@/ui/Header";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

const dmSans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const kyiv = localFont({
  src: "../public/fonts/KyivTypeSans-Bold2.woff2",
  display: "swap",
  variable: "--font-kyiv",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#6d64e8",
    },
  },
  typography: {
    fontFamily: dmSans.style.fontFamily,
  },
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
