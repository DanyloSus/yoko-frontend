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
