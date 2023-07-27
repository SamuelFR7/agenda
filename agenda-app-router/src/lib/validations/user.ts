import { z } from "zod"

export const userSchema = z.object({
  username: z.string().nonempty().toUpperCase(),
  password: z.string().nonempty(),
})
