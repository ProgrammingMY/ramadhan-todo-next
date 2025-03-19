import { Quicksand } from "next/font/google";
import localFont from "next/font/local"

export const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const uthmaniQuran = localFont({
  src: "../../public/fonts/uthmanicHafs.otf",
  display: "swap",
  variable: "--font-arabic",
});