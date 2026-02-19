import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { tasksTable } from "./schema";

const DEFAULT_TASKS = [
  "Qiam",
  "Bersahur",
  "Membaca Al-Quran",
  "Berzikir/Berselawat",
  "Bessedakah/Memberi Makanan Berbuka",
  "Berdoa Sebelum Berbuka",
  "Solat Terawih",
  "Beriktikaf Di Dalam Masjid",
];

async function seed() {
  const connectionString = process.env.DATABASE_URL!;

  if (!connectionString) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client, { schema });

  console.log("Seeding tasks...");

  try {
    for (let i = 0; i < DEFAULT_TASKS.length; i++) {
      await db.insert(tasksTable).values({
        name: DEFAULT_TASKS[i],
        displayOrder: i + 1,
      }).onConflictDoNothing();
      console.log(`Inserted: ${DEFAULT_TASKS[i]}`);
    }
    console.log("Seeding completed!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await client.end();
  }
}

seed();
