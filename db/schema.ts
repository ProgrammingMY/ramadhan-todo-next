import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
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
  gender: varchar({ length: 255 }).$type<"male" | "female">().default("male"),
  picture: varchar({ length: 255 }).default(""),
});

// Table for predefined tasks
export const tasksTable = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  displayOrder: integer().notNull(),
  isPeriodCan: boolean().default(true),
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

export const subscriptionsTable = pgTable("subscriptions", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  deviceId: varchar({ length: 255 }).unique()
    .notNull(),
  subscription: text().notNull(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp({ withTimezone: true }).notNull().default(sql`now()`),
  updatedAt: timestamp({ withTimezone: true }).notNull().default(sql`now()`),
},
  (table) => [unique().on(table.deviceId, table.subscription)]
);

export const periodTable = pgTable("period", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: varchar({ length: 255 }).notNull(),
  yearMonth: varchar({ length: 255 }).notNull(),
  isPeriod: boolean().notNull().default(false),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id),
},
  (table) => [unique().on(table.userId, table.date)]
);

export const feedbackTable = pgTable("feedback", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  rating: integer().notNull(),
  feedback: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().default(sql`now()`),
});
