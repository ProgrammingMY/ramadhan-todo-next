import { db } from "./drizzle";
import { tasksTable } from "./schema";

const DEFAULT_TASKS = [
    "Qiam",
    "Bersahur",
    "Membaca Al-Quran",
    "Berzikir/Berselawat",
    "Bersedakah/Memberi Makanan Berbuka",
    "Berdoa Sebelum Berbuka",
    "Solat Terawih",
    "Beriktikaf Di Dalam Masjid",
  ];
  
  // Seed function to insert tasks
async function seedTasks(db: any) {
    for (let i = 0; i < DEFAULT_TASKS.length; i++) {
      await db.insert(tasksTable).values({
        name: DEFAULT_TASKS[i],
        displayOrder: i + 1,
      });
    }
  }

seedTasks(db);