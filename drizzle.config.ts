import "dotenv/config"

import { env } from "~/utils/env"
import type { Config } from "drizzle-kit"

export default {
  schema: "./app/utils/db/schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config
