import "dotenv/config"

import { env } from "~/utils/env"
import type { Config } from "drizzle-kit"

export default {
  schema: "./app/utils/db/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config
