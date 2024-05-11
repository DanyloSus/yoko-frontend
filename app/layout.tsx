// custom theme needs CSR
"use client";

// external imports
import { ThemeProvider } from "@mui/material/styles";
// internal imports
import "./globals.scss";
import ReduxWrapper from "@/components/wrappers/ReduxWrapper";
import theme from "@/ui/theming/Theme";
import { useEffect } from "react";

function getDefautTheme() {
  const defaultTheme = localStorage.getItem("theme");

  if (
    defaultTheme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark");
  } else {
    console.log(window.matchMedia("(prefers-color-scheme: dark)").matches);
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
  useEffect(() => {
    getDefautTheme();
  }, []);

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
