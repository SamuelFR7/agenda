import { z } from "zod"

export const userSchema = z.object({
  username: z
    .string({ required_error: "Digite um nome de usuário" })
    .min(1, "Digite um nome de usuário")
    .toUpperCase(),
  password: z
    .string({ required_error: "Digite uma senha" })
    .min(1, "Digite uma senha"),
})
