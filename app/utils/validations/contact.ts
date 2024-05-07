import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string({ required_error: "Digite um nome " })
    .min(1, "Digite um nome")
    .toUpperCase(),
  phone1: z
    .string({ required_error: "Digite um nome " })
    .min(1, "Digite um telefone")
    .toUpperCase(),
  phone2: z.string().optional(),
  phone3: z.string().optional(),
  phone4: z.string().optional(),
  phone5: z.string().optional(),
  contact1: z.string().optional(),
  contact2: z.string().optional(),
  contact3: z.string().optional(),
  contact4: z.string().optional(),
  contact5: z.string().optional(),
  email: z.string().email().toLowerCase().optional(),
  address: z.string().toUpperCase().optional(),
  observations: z.string().toUpperCase().optional(),
})
