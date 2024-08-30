import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (token == null) return false
      return true
    }
  }
})

export const config = {
  matcher: ['/panel/:path*']
}
