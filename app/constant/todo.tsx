import { Todo } from "../lib/types";

export const DEFAULT_TODOS: Todo[] = [
  { id: 1, text: "Qiam", completed: false, isPeriodCan: false, category: "recommended" },
  { id: 2, text: "Bersahur", completed: false, isPeriodCan: false, category: "recommended" },
  { id: 3, text: "Membaca Al-Quran", completed: false, isPeriodCan: false, category: "recommended" },
  { id: 4, text: "Berzikir / Berselawat", completed: false, isPeriodCan: true, category: "zikir" },
  { id: 5, text: "Bersedekah / Memberi Makanan Berbuka", completed: false, isPeriodCan: true, category: "recommended" },
  { id: 6, text: "Berdoa Sebelum Berbuka", completed: false, isPeriodCan: true, category: "prayer" },
  { id: 7, text: "Solat Terawih", completed: false, isPeriodCan: false, category: "prayer" },
  { id: 8, text: "Beriktikaf Di Dalam Masjid", completed: false, isPeriodCan: false, category: "prayer" },
];

export const CATEGORIES = {
  RECOMMENDED: "recommended",
  PRAYER: "prayer",
  ZIKIR: "zikir",
  DAILY: "daily",
} as const;