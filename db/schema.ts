import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique(),
  password: varchar({ length: 255 }).notNull(),
  picture: varchar({ length: 255 }).default(""),
});

// Table for predefined tasks
export const tasksTable = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  displayOrder: integer().notNull(),
});

// Table for daily user progress
export const progressTable = pgTable(
  "progress",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid()
      .notNull()
      .references(() => usersTable.id),
    taskId: integer()
      .notNull()
      .references(() => tasksTable.id),
    date: varchar({ length: 255 }).notNull(),
    yearMonth: varchar({ length: 255 }).notNull(),
    completed: boolean().notNull().default(false),
    completedAt: timestamp({ withTimezone: true }),
  },
  (table) => [unique().on(table.userId, table.taskId, table.date)]
);
