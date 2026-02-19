import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../db/schema";


const connection = process.env.DATABASE_URL!;

const client = postgres(connection, {
    prepare: false,
});

export const db = drizzle(client, { schema });
