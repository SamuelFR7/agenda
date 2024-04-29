import { env } from "@/env.js"
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"
import { sessions, users } from "./schema"

export const connection = postgres(env.DATABASE_URL)

export const db = drizzle(connection, { schema })

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)
