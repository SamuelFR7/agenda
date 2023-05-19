import { type GetServerSidePropsContext } from 'next'
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { env } from '~/env.mjs'
import { prisma } from '~/server/db'
import { z } from 'zod'
import { compare } from 'bcryptjs'
import { User } from 'next-auth'

declare module 'next-auth' {
  // eslint-disable-next-line
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line
  interface JWT {
    id: string
    user: User
  }
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  secret: env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const credentialsSchema = z.object({
          username: z.string(),
          password: z.string(),
        })

        const parsedCredentials = credentialsSchema.parse(credentials)

        const userExists = await prisma.user.findUnique({
          where: {
            username: parsedCredentials.username,
          },
        })

        if (!userExists) {
          throw new Error('Username or password are incorrects')
        }

        const passwordMatches = await compare(
          parsedCredentials.password,
          userExists.password,
        )

        if (!passwordMatches) {
          throw new Error('Username or password are incorrects')
        }

        return {
          id: userExists.id,
          email: userExists.username,
          image: '',
          name: userExists.username,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.id
      }

      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
