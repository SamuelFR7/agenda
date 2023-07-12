import { type InferModel } from "drizzle-orm"
import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core"

export const contacts = mysqlTable("contacts", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  phone_1: varchar("phone_1", { length: 191 }).notNull(),
  phone_2: varchar("phone_2", { length: 191 }),
  phone_3: varchar("phone_3", { length: 191 }),
  phone_4: varchar("phone_4", { length: 191 }),
  phone_5: varchar("phone_5", { length: 191 }),
  contact_1: varchar("contact_1", { length: 191 }),
  contact_2: varchar("contact_2", { length: 191 }),
  contact_3: varchar("contact_3", { length: 191 }),
  contact_4: varchar("contact_4", { length: 191 }),
  contact_5: varchar("contact_5", { length: 191 }),
  email: varchar("email", { length: 191 }),
  address: varchar("address", { length: 191 }),
  observations: text("observations"),
})

export type Contact = InferModel<typeof contacts>

export const users = mysqlTable("users", {
  id: varchar("id", { length: 191 }).primaryKey(),
  username: varchar("username", { length: 191 }).notNull().unique(),
  password: varchar("password", { length: 191 }).notNull(),
})

export type User = InferModel<typeof users>
