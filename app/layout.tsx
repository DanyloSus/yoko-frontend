"use client";

import "./globals.scss";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/ui/theming/Theme";
import ReduxWrapper from "@/components/wrappers/ReduxWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <html>
        <body>
          <ReduxWrapper>{children}</ReduxWrapper>
        </body>
      </html>
    </ThemeProvider>
  );
}
