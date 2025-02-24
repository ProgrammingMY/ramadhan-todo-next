import type { Metadata, Viewport } from "next";
import { Quicksand } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import BottomNavBar from "./_components/navbar";

const APP_NAME = "Ramadhan Companion";
const APP_DESCRIPTION = "Ramadhan Companion to help you stay on track";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: "%s - Ramadhan Companion",
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
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
            h1 {
              text-align: center;
            }
              .pb-safe {
              padding-bottom: env(safe-area-inset-bottom, 16px);
            }
            `}</style>
      </head>
      <body className="min-h-screen ">
        <main className="pb-20">{children}</main>
        <BottomNavBar />
      </body>
    </html>
  );
}
