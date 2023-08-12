import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().nonempty({ message: "Digite um nome" }).toUpperCase(),
  phone1: z.string().nonempty({ message: "Digite um telefone" }).toUpperCase(),
  phone2: z.string().optional().nullable(),
  phone3: z.string().optional().nullable(),
  phone4: z.string().optional().nullable(),
  phone5: z.string().optional().nullable(),
  contact1: z.string().optional().nullable(),
  contact2: z.string().optional().nullable(),
  contact3: z.string().optional().nullable(),
  contact4: z.string().optional().nullable(),
  contact5: z.string().optional().nullable(),
  email: z.string().toLowerCase().optional().nullable(),
  address: z.string().toUpperCase().optional().nullable(),
  observations: z.string().toUpperCase().optional().nullable(),
})

export const getContactSchema = z.object({
  id: z.string(),
})
