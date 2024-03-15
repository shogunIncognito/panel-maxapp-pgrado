import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (token == null) return false
      if (req.nextUrl.pathname === '/panel/users' && token?.role !== 'admin') {
        return false
      }
      return true
    }
  }
})

export const config = {
  matcher: ['/panel/:path*']
}
