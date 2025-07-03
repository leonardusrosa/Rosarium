import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const prayers = pgTable("prayers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  section: text("section").notNull(), // 'initium', 'gaudiosa', 'dolorosa', 'gloriosa', 'ultima'
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const intentions = pgTable("intentions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  text: text("text").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPrayerSchema = createInsertSchema(prayers).omit({
  id: true,
  completedAt: true,
  createdAt: true,
});

export const insertIntentionSchema = createInsertSchema(intentions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPrayer = z.infer<typeof insertPrayerSchema>;
export type Prayer = typeof prayers.$inferSelect;
export type InsertIntention = z.infer<typeof insertIntentionSchema>;
export type Intention = typeof intentions.$inferSelect;
