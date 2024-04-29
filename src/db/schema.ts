import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const contacts = pgTable("contacts", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone1: varchar("phone_1", { length: 255 }).notNull(),
  phone2: varchar("phone_2", { length: 255 }),
  phone3: varchar("phone_3", { length: 255 }),
  phone4: varchar("phone_4", { length: 255 }),
  phone5: varchar("phone_5", { length: 255 }),
  contact1: varchar("contact_1", { length: 255 }),
  contact2: varchar("contact_2", { length: 255 }),
  contact3: varchar("contact_3", { length: 255 }),
  contact4: varchar("contact_4", { length: 255 }),
  contact5: varchar("contact_5", { length: 255 }),
  email: varchar("email", { length: 255 }),
  address: varchar("address", { length: 255 }),
  observations: text("observations"),
})

export type Contact = typeof contacts.$inferSelect

export const users = pgTable("users", {
  id: varchar("id", { length: 16 }).primaryKey().notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}))

export type User = typeof users.$inferSelect

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))
