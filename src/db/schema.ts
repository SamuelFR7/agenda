import { type InferModel } from "drizzle-orm"
import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core"

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

export type Contact = InferModel<typeof contacts>
