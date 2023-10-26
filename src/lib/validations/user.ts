import { z } from "zod"

export const userSchema = z.object({
  username: z
    .string({ required_error: "Digite um nome de usuário " })
    .nonempty({ message: "Digite um nome de usuário " })
    .toLowerCase(),
  password: z
    .string({ required_error: "Digite uma senha " })
    .nonempty({ message: "Digite uma senha " }),
})
