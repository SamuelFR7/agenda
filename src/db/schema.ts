import { bigint, mysqlTable, text, varchar } from "drizzle-orm/mysql-core"

export const contacts = mysqlTable("contacts", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  phone1: varchar("phone_1", { length: 191 }).notNull(),
  phone2: varchar("phone_2", { length: 191 }),
  phone3: varchar("phone_3", { length: 191 }),
  phone4: varchar("phone_4", { length: 191 }),
  phone5: varchar("phone_5", { length: 191 }),
  contact1: varchar("contact_1", { length: 191 }),
  contact2: varchar("contact_2", { length: 191 }),
  contact3: varchar("contact_3", { length: 191 }),
  contact4: varchar("contact_4", { length: 191 }),
  contact5: varchar("contact_5", { length: 191 }),
  email: varchar("email", { length: 191 }),
  address: varchar("address", { length: 191 }),
  observations: text("observations"),
})

export type Contact = typeof contacts.$inferSelect

export const users = mysqlTable("users", {
  id: varchar("id", { length: 15 }).primaryKey().notNull(),
  username: varchar("username", { length: 191 }).notNull().unique(),
})

export type User = typeof users.$inferSelect

export const keys = mysqlTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
})

export const sessions = mysqlTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
})
