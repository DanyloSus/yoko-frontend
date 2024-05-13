// external imports
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";

// get google font, DM Sans
const dmSans = DM_Sans({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

// get local kyiv font
const kyiv = localFont({
  src: "../../public/fonts/KyivTypeSerif-Bold2.woff2",
  display: "swap",
  variable: "--font-kyiv",
});

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body
        className={`${dmSans.variable} ${kyiv.variable}`}
        suppressHydrationWarning={true}
      >
        <div id="modal"></div>
        {children}
      </body>
    </html>
  );
}
