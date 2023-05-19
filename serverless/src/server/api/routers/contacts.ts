import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const contactsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        search: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (input.search) {
        const contacts = await ctx.prisma.contact.findMany({
          where: {
            name: {
              contains: input.search.toUpperCase(),
            },
          },
          skip: (input.page - 1) * 10,
          take: 10,
        })

        const count = await ctx.prisma.contact.count({
          where: {
            name: {
              contains: input.search.toUpperCase(),
            },
          },
        })

        return {
          contacts,
          count,
        }
      }

      const contacts = await ctx.prisma.contact.findMany({
        skip: (input.page - 1) * 10,
        take: 10,
      })

      const count = await ctx.prisma.contact.count()

      return {
        contacts,
        count,
      }
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty().toUpperCase(),
        phone_1: z.string().nonempty().toUpperCase(),
        phone_2: z.string().nullish(),
        phone_3: z.string().nullish(),
        phone_4: z.string().nullish(),
        phone_5: z.string().nullish(),
        contact_1: z.string().nullish(),
        contact_2: z.string().nullish(),
        contact_3: z.string().nullish(),
        contact_4: z.string().nullish(),
        contact_5: z.string().nullish(),
        email: z.string().toLowerCase().nullish(),
        address: z.string().toUpperCase().nullish(),
        observations: z.string().toUpperCase().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newContact = await ctx.prisma.contact.create({
        data: input,
      })

      return newContact
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
        name: z.string().nonempty().toUpperCase(),
        phone_1: z.string().nonempty().toUpperCase(),
        phone_2: z.string().nullish(),
        phone_3: z.string().nullish(),
        phone_4: z.string().nullish(),
        phone_5: z.string().nullish(),
        contact_1: z.string().nullish(),
        contact_2: z.string().nullish(),
        contact_3: z.string().nullish(),
        contact_4: z.string().nullish(),
        contact_5: z.string().nullish(),
        email: z.string().toLowerCase().nullish(),
        address: z.string().toUpperCase().nullish(),
        observations: z.string().toUpperCase().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedContact = await ctx.prisma.contact.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          phone_1: input.phone_1,
          address: input.address,
          contact_1: input.contact_1,
          contact_2: input.contact_2,
          contact_3: input.contact_3,
          contact_4: input.contact_4,
          contact_5: input.contact_5,
          email: input.email,
          observations: input.observations,
          phone_2: input.phone_2,
          phone_3: input.phone_3,
          phone_4: input.phone_4,
          phone_5: input.phone_5,
        },
      })

      return updatedContact
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.contact.delete({
        where: {
          id: input.id,
        },
      })

      return 'Ok'
    }),
})
