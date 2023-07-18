import { z } from "zod"

export const createContactSchema = z.object({
  name: z.string().nonempty({ message: "Digite um nome" }).toUpperCase(),
  phone_1: z.string().nonempty({ message: "Digite um telefone" }).toUpperCase(),
  phone_2: z.string().optional(),
  phone_3: z.string().optional(),
  phone_4: z.string().optional(),
  phone_5: z.string().optional(),
  contact_1: z.string().optional(),
  contact_2: z.string().optional(),
  contact_3: z.string().optional(),
  contact_4: z.string().optional(),
  contact_5: z.string().optional(),
  email: z.string().toLowerCase().optional(),
  address: z.string().toUpperCase().optional(),
  observations: z.string().toUpperCase().optional(),
})
