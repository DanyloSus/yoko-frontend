// custom theme needs CSR
"use client";

// external imports
import { ThemeProvider } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// internal imports
import ReduxWrapper from "@/components/wrappers/ReduxWrapper";
import "@/public/styles/globals.scss";
import theme from "@/ui/theming/Theme";

// function to get theme
function getDefautTheme() {
  // get theme from localStorage
  const defaultTheme = localStorage.getItem("theme");

  // if theme dark or on pc dark theme
  if (
    defaultTheme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark");
  } else {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get pathaname
  const pathname = usePathname();

  // use effect which check theme on start and when pathname
  // changing
  useEffect(() => {
    getDefautTheme();
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <html>
        <body
          style={{
            position: "initial",
            paddingRight: "0px",
          }}
        >
          <ReduxWrapper>{children}</ReduxWrapper>
        </body>
      </html>
    </ThemeProvider>
  );
}
