/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { API_URL } from '@/utils/envconfig'
import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password', placeholder: '*********' }
      },
      async authorize (credentials) {
        const user = await axios.post(`${API_URL}/auth/login`, credentials)
        return user.data
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }) {
      (Boolean((token?.token))) && await axios.post(`${API_URL}/auth/validate-token`, { token: token.token })
      return { ...token, ...user }
    },
    async session ({ session, token }) {
      session.user = token as any
      return session
    }
  },
  pages: {
    signIn: '/'
  }
})

export { handler as GET, handler as POST }
