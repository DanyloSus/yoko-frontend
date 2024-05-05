// custom theme needs CSR
"use client";

// external imports
import { ThemeProvider } from "@mui/material/styles";
// internal imports
import "./globals.scss";
import ReduxWrapper from "@/components/wrappers/ReduxWrapper";
import theme from "@/ui/theming/Theme";

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
