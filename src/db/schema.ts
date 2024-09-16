import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  // id: integer("id").notNull().primaryKey({ autoIncrement: true }),
  id: text("id").notNull().primaryKey().default("1"),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  // notifications_count: integer("notifications_count").notNull().default(0),
  emailAddress: text("emailAddress").notNull().unique(),
  age: integer("age").notNull().default(18),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey().default("1"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const spendingTable = pgTable("spending", {
  id: integer("id").notNull().primaryKey(),
  date: timestamp("date", { mode: "date" }).notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
});
export type Spending = typeof spendingTable.$inferInsert;

// export const categoryTable = pgTable("category", {
//   id: integer("id").notNull().primaryKey(),
//   date: timestamp("date", { mode: "date" }).notNull(),
//   description: text("description").notNull(),
//   category: text("category").notNull(),
//   price: integer("price").notNull(),
// });
// export type Category = typeof categoryTable.$inferInsert;

export const webhookEvents = pgTable("webhookEvent", {
  id: integer("id").primaryKey().default(1),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  eventName: text("eventName").notNull(),
  processed: boolean("processed").default(false),
  body: jsonb("body").notNull(),
  processingError: text("processingError"),
});

export type NewWebhookEvent = typeof webhookEvents.$inferInsert;
