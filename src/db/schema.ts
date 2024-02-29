import { bigint, pgTable, text, varchar } from "drizzle-orm/pg-core"

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
  id: varchar("id", { length: 15 }).primaryKey().notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
})

export type User = typeof users.$inferSelect

export const keys = pgTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => users.id),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
})

export const sessions = pgTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => users.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
})
