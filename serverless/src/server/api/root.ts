import { createTRPCRouter } from '~/server/api/trpc'
import { contactsRouter } from './routers/contacts'

export const appRouter = createTRPCRouter({
  contacts: contactsRouter,
})

export type AppRouter = typeof appRouter
