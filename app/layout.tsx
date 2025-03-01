import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import BottomNavBar from "./_components/navbar";
import { ThemeProvider } from "./_components/theme-provider";
import { quicksand } from "./lib/fonts";
import { Toaster } from "@/components/ui/sonner";

const APP_NAME = "Ramadan Garden";
const APP_DESCRIPTION = "Ramadan Companion to help you stay on consistent with your sunnah";


export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s - Ramadhan Garden",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
    startupImage: [
      { url: "/icons/launch-640x1136.png", media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/launch-750x1294.png", media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/launch-1125x2436.png", media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/launch-1242x2148.png", media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" },
      { url: "/icons/launch-1536x2048.png", media: "(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/launch-1668x2224.png", media: "(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" },
      { url: "/icons/launch-2048x2732.png", media: "(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" },
    ]
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

// change theme color depending on the theme
export const viewport: Viewport = {
  themeColor: "#289672",
};

[
  { media: "(prefers-color-scheme: dark)", color: "#000000" },
  { media: "(prefers-color-scheme: light)", color: "#289672" }
]

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${quicksand.className}`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <style>{`
            html, body, #__next {
              height: 100%;
              padding-bottom: env(safe-area-inset-bottom, 16px);
            }
            #__next {
              margin: 0 auto;
            }
              .pb-safe {
              padding-bottom: env(safe-area-inset-bottom, 16px);
            }
            `}</style>
      </head>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="pb-20">{children}</main>
          <Toaster richColors position="top-center" />
          <BottomNavBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
