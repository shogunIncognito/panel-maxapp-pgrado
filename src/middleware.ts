import { withAuth } from 'next-auth/middleware'

const adminRoutes = ['/panel/users', '/panel/stats']

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (token == null) return false
      if (adminRoutes.includes(req.nextUrl.pathname) && token?.role !== 'admin') {
        return false
      }
      return true
    }
  }
})

export const config = {
  matcher: ['/panel/:path*']
}
