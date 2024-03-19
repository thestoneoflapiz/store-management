"use client"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { SessionProvider } from 'next-auth/react';

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
